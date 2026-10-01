import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Chip from "../../components/Chip";
import Icon from "../../components/Icon";
import Segmented from "../../components/Segmented";
import Sheet from "../../components/Sheet";
import useLocalStorage from "../../hooks/useLocalStorage";
import { createSession, respond, brain } from "../../engine/chatEngine";
import { shapeBlocks, splitTokens, thinkingTime, typingDelay } from "../../engine/voice";
import MessageBubble from "./MessageBubble";
import "./chat.css";

const INITIAL_CHAT = { messages: [], mode: "counsel" };
const MAX_MESSAGES = 120;

function epoch() {
  return new Date().getTime();
}

function makeId(prefix) {
  if (globalThis.crypto?.randomUUID) return `${prefix}-${globalThis.crypto.randomUUID()}`;
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function cleanMessage(message) {
  if (!message || (message.role !== "user" && message.role !== "harvey")) return null;
  return {
    id: String(message.id || makeId(message.role)),
    role: message.role,
    blocks: Array.isArray(message.blocks) ? message.blocks.map(String) : [],
    topicId: message.topicId || null,
    label: message.label || null,
    at: Number(message.at) || Date.now(),
  };
}

function sanitizeStore(value) {
  const modeIds = new Set(brain.modes.map((mode) => mode.id));
  const mode = modeIds.has(value?.mode) ? value.mode : INITIAL_CHAT.mode;
  const messages = Array.isArray(value?.messages)
    ? value.messages.map(cleanMessage).filter(Boolean).slice(-MAX_MESSAGES)
    : [];
  return { mode, messages };
}

export default function Chat() {
  const [stored, setStored] = useLocalStorage("chat", INITIAL_CHAT);
  const chat = useMemo(() => sanitizeStore(stored), [stored]);
  const [draft, setDraft] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [showJump, setShowJump] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingId, setStreamingId] = useState(null);
  const [emptyAt] = useState(() => epoch());
  const listRef = useRef(null);
  const composerRef = useRef(null);
  const sessionRef = useRef(createSession());
  const timersRef = useRef([]);
  const mountedRef = useRef(false);
  const shouldStickRef = useRef(true);
  const streamRef = useRef(null);

  const activeMode = brain.modes.find((mode) => mode.id === chat.mode) || brain.modes[0];
  const modeOptions = brain.modes.map((mode) => ({ value: mode.id, label: mode.label }));

  useEffect(() => {
    mountedRef.current = true;
    composerRef.current?.focus();
    return () => {
      mountedRef.current = false;
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    const sane = sanitizeStore(stored);
    if (sane.mode !== stored?.mode || sane.messages.length !== (stored?.messages || []).length) {
      setStored(sane);
    }
  }, [stored, setStored]);

  useEffect(() => {
    if (!shouldStickRef.current) return;
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [chat.messages, isStreaming]);

  const updateStore = (updater) => {
    setStored((current) => {
      const next = updater(sanitizeStore(current));
      return { ...next, messages: next.messages.slice(-MAX_MESSAGES) };
    });
  };

  const setMode = (mode) => updateStore((current) => ({ ...current, mode }));

  const scrollToLatest = () => {
    shouldStickRef.current = true;
    setShowJump(false);
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = listRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distance < 96;
    shouldStickRef.current = atBottom;
    setShowJump(!atBottom);
  };

  const queueTimer = (fn, delay) => {
    const timer = window.setTimeout(() => {
      timersRef.current = timersRef.current.filter((item) => item !== timer);
      fn();
    }, delay);
    timersRef.current.push(timer);
    return timer;
  };

  const finishStream = () => {
    const stream = streamRef.current;
    if (!stream) return;
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    updateStore((current) => ({
      ...current,
      messages: current.messages.map((message) =>
        message.id === stream.id ? { ...message, blocks: stream.blocks } : message,
      ),
    }));
    streamRef.current = null;
    if (mountedRef.current) {
      setStreamingId(null);
      setIsStreaming(false);
    }
  };

  const revealReply = (id, blocks, style) => {
    let blockIndex = 0;
    let tokenIndex = 0;
    let visibleBlocks = [];
    let tokens = splitTokens(blocks[0] || "");

    const step = () => {
      if (!mountedRef.current || !streamRef.current) return;
      if (blockIndex >= blocks.length) {
        streamRef.current = null;
        setIsStreaming(false);
        return;
      }

      const token = tokens[tokenIndex];
      visibleBlocks[blockIndex] = `${visibleBlocks[blockIndex] || ""}${token}`;
      updateStore((current) => ({
        ...current,
        messages: current.messages.map((message) =>
          message.id === id ? { ...message, blocks: visibleBlocks.map((block) => block.trimEnd()) } : message,
        ),
      }));

      tokenIndex += 1;
      if (tokenIndex >= tokens.length) {
        blockIndex += 1;
        tokenIndex = 0;
        tokens = splitTokens(blocks[blockIndex] || "");
        if (blockIndex < blocks.length) visibleBlocks = [...visibleBlocks, ""];
      }

      if (blockIndex >= blocks.length) {
        queueTimer(() => {
          if (!mountedRef.current) return;
          streamRef.current = null;
          setStreamingId(null);
          setIsStreaming(false);
        }, 80);
      } else {
        const pace = style?.bluntness >= 0.9 ? 0.86 : 1;
        queueTimer(step, typingDelay(token, { pace }));
      }
    };

    queueTimer(step, typingDelay(tokens[0] || "Start", { pace: 1 }));
  };

  const sendText = (text, modeId = chat.mode) => {
    const input = String(text || "").trim();
    if (!input || isStreaming) return;

    const mode = brain.modes.find((item) => item.id === modeId) || activeMode;
    const userMessage = {
      id: makeId("user"),
      role: "user",
      blocks: [input],
      topicId: null,
      label: null,
      at: epoch(),
    };
    const reply = respond(input, { mode, session: sessionRef.current });
    const replyBlocks = shapeBlocks(reply.blocks, { style: mode.style });
    const harveyMessage = {
      id: makeId("harvey"),
      role: "harvey",
      blocks: [],
      topicId: reply.topicId || null,
      label: reply.label || null,
      at: epoch(),
    };

    setDraft("");
    setSuggestionsOpen(false);
    shouldStickRef.current = true;
    setShowJump(false);
    setIsStreaming(true);
    setStreamingId(harveyMessage.id);
    streamRef.current = { id: harveyMessage.id, blocks: replyBlocks };

    updateStore((current) => ({
      mode: mode.id,
      messages: [...current.messages, userMessage, harveyMessage],
    }));

    queueTimer(() => revealReply(harveyMessage.id, replyBlocks, mode.style), thinkingTime(input, mode.style));
  };

  const submit = () => {
    if (isStreaming) {
      finishStream();
      return;
    }
    sendText(draft);
  };

  const onKeyDown = (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    submit();
  };

  const chooseSuggestion = (suggestion) => {
    if (isStreaming) return;
    setMode(suggestion.mode);
    sendText(suggestion.text, suggestion.mode);
  };

  const clearConversation = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    streamRef.current = null;
    sessionRef.current = createSession();
    setStreamingId(null);
    setIsStreaming(false);
    setDraft("");
    setConfirmOpen(false);
    updateStore((current) => ({ ...current, messages: [] }));
  };

  return (
    <section className="chat-page rise">
      <header className="page__head chat-head">
        <p className="eyebrow">The Office</p>
        <h1 className="page__title">Bring the situation.</h1>
        <p className="page__lede">
          Mood is weather. Facts are leverage. Walk in with the pieces and leave with a move.
        </p>
      </header>

      <Card className="chat-card" pad="lg" glow={{ color: "var(--accent-soft)", top: "-28%" }}>
        <div className="chat-modebar">
          <div>
            <Segmented options={modeOptions} value={activeMode.id} onChange={setMode} block />
            <p className="chat-modebar__blurb muted">{activeMode.blurb}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(true)} type="button">
            <Icon name="trash" size={16} />
            Clear conversation
          </Button>
        </div>

        <div className="chat-surface">
          <div className="chat-list" ref={listRef} onScroll={onScroll} aria-live="polite">
            {chat.messages.length === 0 ? (
              <div className="chat-empty">
                <MessageBubble
                  role="harvey"
                  blocks={[
                    "You get one office rule: bring me facts, stakes, and the move you are afraid to make.",
                    "Pick a door below or type the real problem.",
                  ]}
                  label="Opening counsel"
                  at={emptyAt}
                />
                <div className="chat-suggestions chat-suggestions--grid">
                  {brain.suggestions.map((suggestion) => (
                    <Chip key={suggestion.label} onClick={() => chooseSuggestion(suggestion)}>
                      {suggestion.label}
                    </Chip>
                  ))}
                </div>
              </div>
            ) : (
              chat.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  role={message.role}
                  blocks={message.blocks}
                  label={message.label}
                  at={message.at}
                  streaming={isStreaming && streamingId === message.id}
                  isSupport={message.topicId === "crisis-support"}
                />
              ))
            )}
          </div>

          {showJump ? (
            <Button className="chat-jump" variant="outline" size="sm" onClick={scrollToLatest} type="button">
              Jump to latest
            </Button>
          ) : null}

          {chat.messages.length > 0 ? (
            <div className="chat-suggestion-row">
              <button
                className="chat-suggestion-toggle"
                type="button"
                onClick={() => setSuggestionsOpen((open) => !open)}
                aria-expanded={suggestionsOpen}
              >
                <Icon name={suggestionsOpen ? "minus" : "plus"} size={15} />
                Starters
              </button>
              {suggestionsOpen ? (
                <div className="chat-suggestions">
                  {brain.suggestions.map((suggestion) => (
                    <Chip key={suggestion.label} onClick={() => chooseSuggestion(suggestion)}>
                      {suggestion.label}
                    </Chip>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}

          <div className="chat-composer">
            <textarea
              ref={composerRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Tell me who is involved, what you want, and what is blocking it."
              rows={1}
              disabled={isStreaming}
              style={{ height: "auto" }}
              onInput={(event) => {
                event.currentTarget.style.height = "auto";
                event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 150)}px`;
              }}
            />
            <Button
              variant="primary"
              onClick={submit}
              type="button"
              disabled={!isStreaming && !draft.trim()}
            >
              {isStreaming ? "Skip" : <><Icon name="send" size={17} /> Send</>}
            </Button>
          </div>
        </div>
      </Card>

      <Sheet
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Clear the office?"
        subtitle="This removes the saved conversation and starts a fresh session."
        width="420px"
      >
        <div className="chat-confirm">
          <p className="muted">The slate resets. The mode stays where you left it.</p>
          <div className="chat-confirm__actions">
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} type="button">Cancel</Button>
            <Button variant="primary" onClick={clearConversation} type="button">
              <Icon name="trash" size={16} /> Clear
            </Button>
          </div>
        </div>
      </Sheet>
    </section>
  );
}
