import { useEffect, useState } from "react";
import Button from "../../components/Button";

function formatTime(value) {
  const date = new Date(value || Date.now());
  const now = Date.now();
  const diff = Math.max(0, now - date.getTime());
  if (diff < 60_000) return "now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

async function copyText(text) {
  if (globalThis.navigator?.clipboard?.writeText) {
    await globalThis.navigator.clipboard.writeText(text);
    return;
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();
  document.execCommand("copy");
  document.body.removeChild(field);
}

export default function MessageBubble({ role, blocks, label, at, streaming = false, isSupport = false }) {
  const [copied, setCopied] = useState(false);
  const isHarvey = role === "harvey";
  const text = (blocks || []).join("\n\n");

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const onCopy = async () => {
    try {
      await copyText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article
      className={[
        "chat-message",
        `chat-message--${role}`,
        isSupport && "chat-message--support",
        streaming && "is-streaming",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isHarvey ? (
        <div className="chat-avatar" aria-hidden="true">
          {isSupport ? "•" : "HS"}
        </div>
      ) : null}

      <div className="chat-message__stack">
        {isHarvey && (label || at) ? (
          <div className="chat-message__meta">
            {label ? <span>{isSupport ? "Support" : label}</span> : null}
            {at ? <time dateTime={new Date(at).toISOString()}>{formatTime(at)}</time> : null}
          </div>
        ) : null}

        <div className="chat-bubble">
          {(blocks || []).map((block, index) => (
            <p key={`${index}-${block.slice(0, 12)}`}>{block}</p>
          ))}
          {streaming && !text ? (
            <div className="chat-typing" aria-label="Harvey is thinking">
              <span />
              <span />
              <span />
            </div>
          ) : null}
        </div>

        {isHarvey && text ? (
          <Button
            className="chat-copy"
            variant="ghost"
            size="sm"
            onClick={onCopy}
            type="button"
            aria-label="Copy Harvey's reply"
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}
