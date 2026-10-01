// Harvey brain: offline knowledge base for the conversation engine.
// All lines are original writing in the character's cadence. No show dialogue is reproduced.

const topicsA = [
  {
    id: "crisis-support",
    label: "Crisis support",
    keywords: [
      "kill myself", "suicide", "suicidal", "end my life", "want to die", "hurt myself",
      "self harm", "self-harm", "no reason to live", "better off dead", "end it all"
    ],
    weight: 5,
    intent: "emotional",
    responses: [
      {
        open: "I'm going to step out of character for a second, because this matters more than any of that.",
        core: [
          "What you're carrying right now is too heavy to carry alone, and it's not something a simulated character should be handling with you.",
          "Please talk to a real person today. Someone you trust, a doctor, or a crisis line: 988 in the US, 112 or 999 in much of Europe and the UK, and findahelpline.com lists numbers for almost every country."
        ],
        directive: "Reach out to one real human being right now, before anything else.",
        followUp: "Is there someone you could message in the next ten minutes?"
      },
      {
        open: "No lines, no jokes. I'm glad you said something.",
        core: [
          "Pain this size distorts everything, including how permanent it feels. It isn't permanent, even though it's telling you it is.",
          "You deserve a real person on the other end of this. Call or text 988 if you're in the US, 112 or 999 in many other countries, or find your local line at findahelpline.com. If you're in immediate danger, emergency services."
        ],
        directive: "Contact a crisis line or someone who loves you today, not later.",
        followUp: "Are you safe where you are right now?"
      },
      {
        open: "Stop. This is the one thing I won't play a character for.",
        core: [
          "I can't be what you need here, and pretending otherwise would be the worst thing I could do for you.",
          "There are people trained for exactly this moment, and they pick up. 988 in the US. 112 or 999 across much of the world. findahelpline.com if neither applies to you."
        ],
        directive: "Make that contact now. Everything else can wait.",
        followUp: "Will you tell one person you trust what you just told me?"
      },
      {
        open: "I hear you, and I'm not going to answer that with attitude.",
        core: [
          "Feeling like there's no way through usually means you've been alone with it too long, not that there's no way through.",
          "Talk to someone real today: a trusted person, your doctor, or a crisis line. 988 in the US, 112 or 999 in many countries, findahelpline.com for the rest."
        ],
        directive: "Pick one of those and use it in the next few minutes.",
        followUp: "Who is the easiest person for you to reach right now?"
      }
    ]
  },
  {
    id: "salary-negotiation",
    label: "Salary negotiation",
    keywords: [
      "salary", "raise", "pay rise", "pay raise", "underpaid", "compensation", "negotiate my salary",
      "ask for more money", "counter offer", "counteroffer", "my pay", "worth more"
    ],
    weight: 1.3,
    intent: "tactical",
    responses: [
      {
        open: "You're not asking for money. You're pricing an asset, and the asset is you.",
        core: [
          "Before you open your mouth, get three numbers: what the market pays someone with your scope, what you have delivered in currency the company understands, and your walk-away figure.",
          "Then anchor high and stay quiet. The first number sets the gravity of the whole conversation, and the person who fills the silence after it usually pays for it."
        ],
        directive: "Write those three numbers down tonight, then book the meeting for this week.",
        followUp: "What's your walk-away number, and can you actually walk?"
      },
      {
        open: "Here's the part most people get wrong: they negotiate their needs instead of their value.",
        core: [
          "Nobody funds your rent. They fund revenue you protected, costs you cut, risk you absorbed, people you kept. Translate your year into those four categories with real figures.",
          "If your figures are weak, that's your answer. Spend two quarters making them strong, and go back with a case that argues itself."
        ],
        directive: "Build a one-page value memo with numbers, and send it before the meeting so they arrive already convinced.",
        followUp: "What's the single biggest number you can put your name on this year?"
      },
      {
        open: "The question isn't what you want. It's what happens if they say no.",
        core: [
          "That is your BATNA, and it's the only real source of power in the room. A live offer elsewhere, a skill they can't replace quickly, a project that dies without you.",
          "Improve your alternative and the negotiation gets easier without you saying anything cleverer. Negotiate from options, never from need."
        ],
        directive: "Spend two weeks strengthening your alternative before you ask for a cent.",
        followUp: "If they refuse flatly, what is your next move?"
      },
      {
        open: "Ask, then stop talking. Most people talk themselves down from their own number.",
        core: [
          "Say the figure, give one sentence of justification, and let the silence do the work. Every extra sentence you add is a discount you volunteered.",
          "If they counter low, don't argue about the number. Ask what would need to be true for the number to work. Now they're building your case for you."
        ],
        directive: "Rehearse saying your number out loud ten times until it sounds boring to you.",
        followUp: "Say the number to me. What is it?"
      },
      {
        open: "If they won't move on cash, move the conversation.",
        core: [
          "Title, scope, equity, a bonus tied to something you control, a review with a date attached. A no on salary is rarely a no on everything.",
          "But get the alternative in writing with a date. A vague promise about next year is a way of paying you in hope, and hope doesn't compound."
        ],
        directive: "Leave the meeting with either a number or a dated commitment. Nothing softer.",
        followUp: "Which would actually be worth more to you: cash now or scope you can trade next year?"
      }
    ]
  },
  {
    id: "job-offer",
    label: "Evaluating an offer",
    keywords: [
      "job offer", "should i take", "new job", "two offers", "accept the offer", "decline the offer",
      "which job", "career move", "offer letter"
    ],
    weight: 1.2,
    intent: "tactical",
    responses: [
      {
        open: "An offer isn't a compliment. It's a proposal, and proposals get examined.",
        core: [
          "Score it on four axes: the work itself, the person you report to, what it does to your market value in two years, and the money. Most people weigh the money and ignore the other three, then wonder why they're miserable.",
          "The manager is usually the highest-variance factor in your day-to-day life. Interview them harder than they interviewed you."
        ],
        directive: "Rate each axis out of ten tonight, and treat the lowest score as the decision.",
        followUp: "Which axis is scoring lowest right now?"
      },
      {
        open: "Never accept on the call. Ever.",
        core: [
          "Say you're delighted, ask for the details in writing, and take forty-eight hours. Enthusiasm plus patience reads as confidence, and it buys you room to negotiate without emotion.",
          "The moment you say yes, your leverage drops to zero. Everything you want, you want before that word."
        ],
        directive: "Ask for the full package in writing and give yourself two days.",
        followUp: "What would you ask for if you knew they wouldn't rescind?"
      },
      {
        open: "The real question: does this job make you more valuable, or just more comfortable?",
        core: [
          "Comfortable roles pay you today and cost you in three years, because your skills stop moving while the market does.",
          "Take the job that puts you next to people who are better than you at something you want to be great at. That compounds. A twelve percent raise doesn't."
        ],
        directive: "Name the one skill this job would build that your current one won't. If you can't, that's your answer.",
        followUp: "Who would you learn from there?"
      },
      {
        open: "Two offers is not a problem. It's the best position you'll be in all year.",
        core: [
          "Be straight with both. You don't need to bluff, and bluffs get called. Tell each one you have a decision to make and ask what they can do.",
          "Then decide on the work and the boss, not on whoever blinked hardest. Winning the negotiation and losing the next two years is not a win."
        ],
        directive: "Go back to your preferred option once, with one clear ask, and mean it.",
        followUp: "Which one do you actually want, before the money enters the room?"
      }
    ]
  },
  {
    id: "getting-fired",
    label: "Losing your job",
    keywords: [
      "fired", "laid off", "lost my job", "let go", "redundant", "redundancy", "terminated",
      "out of work", "unemployed"
    ],
    weight: 1.3,
    intent: "emotional",
    responses: [
      {
        open: "You got hit. That's real, and it stings whatever anyone tells you.",
        core: [
          "Take two days to be furious about it. Then close that door, because grief and strategy can't share a desk.",
          "Here's what's true: your value didn't change on the day their budget did. What changed is who's holding your time. That's now you."
        ],
        directive: "Give yourself forty-eight hours, then build your list of thirty people to contact.",
        followUp: "Who are the three people who'd pick up the phone for you today?"
      },
      {
        open: "First, the paperwork. Sentiment later.",
        core: [
          "Read the severance terms before you sign anything, check notice, unused leave, bonus treatment and any non-compete. Get a professional to look at it if the numbers are meaningful.",
          "People sign in the first hour because they want the discomfort over. That hour is often the most expensive one of the whole year."
        ],
        directive: "Sign nothing for seventy-two hours, and get one qualified pair of eyes on it.",
        followUp: "Have you read the exact wording of what they offered?"
      },
      {
        open: "The story you tell about this decides what it costs you.",
        core: [
          "There's the version where you were discarded, and the version where a chapter closed and you're choosing the next one. Both are defensible. Only one gets you hired.",
          "Practice the second version until it sounds like fact, because in interviews the delivery is the evidence."
        ],
        directive: "Write your two-sentence explanation and say it out loud until it's flat and calm.",
        followUp: "What's your two-sentence version right now?"
      },
      {
        open: "Volume beats brilliance in the first month.",
        core: [
          "Do not sit polishing one perfect application. Reactivate every relationship you have, tell people plainly what you're looking for, and ask for specific introductions rather than vague help.",
          "Most good roles move through people, not portals. Your network is an asset you've been under-using since the day you got comfortable."
        ],
        directive: "Send ten direct messages today. Specific ask, short message, no apology.",
        followUp: "Who's first on that list?"
      }
    ]
  },
  {
    id: "quitting",
    label: "Quitting a job",
    keywords: [
      "quit", "resign", "resignation", "leave my job", "should i quit", "hand in my notice",
      "walking out", "notice period"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "There's a difference between quitting toward something and quitting away from something.",
        core: [
          "Away-from decisions get made at eleven at night after a bad meeting, and they're usually right about the pain and wrong about the timing.",
          "Toward decisions survive daylight. If you'd still leave on a good week, it's real. If you'd only leave on a bad one, you have a boundary problem, not a job problem."
        ],
        directive: "Sit on it for two good weeks. If the answer holds, go.",
        followUp: "Would you still be leaving if next week went perfectly?"
      },
      {
        open: "Leave like you'll meet these people again, because you will.",
        core: [
          "Give proper notice, hand over cleanly, document what only you know. The temptation to torch it feels good for a week and costs you for a decade.",
          "Your reputation walks out the door before you do and arrives at the next place first."
        ],
        directive: "Write the handover document before you write the resignation letter.",
        followUp: "What would your old team say about you a year from now?"
      },
      {
        open: "Don't quit for a counter-offer. Quit because you're done.",
        core: [
          "If you resign and they suddenly find money, all you've learned is they were underpaying you knowingly. Most people who accept a counter-offer are gone within a year anyway, because nothing structural changed.",
          "Money was rarely the real reason. Be honest about what the actual reason was."
        ],
        directive: "Decide now what your answer to a counter-offer is, before it's on the table.",
        followUp: "If they doubled the raise tomorrow, would you stay? Why?"
      },
      {
        open: "Have the next thing, or have the runway. Preferably both.",
        core: [
          "Courage without a balance sheet is just risk with better branding. Know how many months you can go, and cut that number by a third for reality.",
          "If you're leaving without a landing spot, that's fine, but make it a decision with a number attached rather than a feeling with a resignation attached."
        ],
        directive: "Calculate your runway in months this week, then set your leaving date against it.",
        followUp: "How many months can you actually cover?"
      }
    ]
  },
  {
    id: "promotion",
    label: "Getting promoted",
    keywords: [
      "promotion", "promoted", "next level", "senior role", "step up", "career growth",
      "passed over", "career ladder"
    ],
    weight: 1.1,
    intent: "tactical",
    responses: [
      {
        open: "Promotions aren't rewards for the job you're doing. They're bets on the job above it.",
        core: [
          "Nobody promotes the best performer in the current role. They promote the person who already looks like they're in the next one, because that's the least risky decision for the person signing it.",
          "So do a slice of the higher job now, visibly, and make the promotion an administrative formality rather than a request."
        ],
        directive: "Pick one responsibility from the level above and take it this month, without asking.",
        followUp: "What does the person one level up do that you don't?"
      },
      {
        open: "If you got passed over, get the real reason, not the polite one.",
        core: [
          "Ask directly: what specifically would have made this decision different. Then shut up and take the answer without defending yourself, because defending it is how you never hear the truth again.",
          "The answer is usually one of three things: visibility, scope, or a relationship you haven't built."
        ],
        directive: "Book that conversation this week and ask the question in exactly those words.",
        followUp: "What do you think they'd say if they were completely honest?"
      },
      {
        open: "Doing great work quietly is a strategy for staying exactly where you are.",
        core: [
          "The decision gets made in a room you're not in, by people repeating what they remember. If nobody can summarise your contribution in one sentence, you don't exist in that room.",
          "That isn't politics. That's just how information travels through organisations."
        ],
        directive: "Give your manager a monthly three-bullet summary they can forward upward without editing.",
        followUp: "Who else needs to know what you did, and do they?"
      },
      {
        open: "Ask for the criteria in writing. Then hold them to it.",
        core: [
          "Vague promotion conversations are how companies keep good people cheap and patient. Get the specific bar, the specific timeline, and the specific decision-maker.",
          "Once it's written down, it's a contract in everything but name, and people behave differently around things they've written down."
        ],
        directive: "Ask for the criteria and the date in your next one-to-one, and email a summary afterwards.",
        followUp: "What did they promise you last time, and what happened?"
      }
    ]
  },
  {
    id: "bad-boss",
    label: "A difficult manager",
    keywords: [
      "my boss", "bad boss", "manager hates", "micromanage", "micromanager", "toxic boss",
      "boss undermines", "terrible manager"
    ],
    weight: 1.2,
    intent: "advice",
    responses: [
      {
        open: "You can't change them. You can change what they have to work with.",
        core: [
          "Micromanagers are usually anxious, not cruel. They're managing a risk they can't see. Give them visibility before they ask for it and most of the behaviour evaporates.",
          "Send the update before the check-in. Flag the problem before they find it. You're not being submissive, you're removing their reason to hover."
        ],
        directive: "Send a short proactive update every Friday for a month and watch what changes.",
        followUp: "What are they actually afraid of?"
      },
      {
        open: "Document. Not out of paranoia, out of professionalism.",
        core: [
          "Every significant instruction and decision goes into a written summary you send back. Short, neutral, factual. It protects you and it forces clarity from someone who's been trading in ambiguity.",
          "If the behaviour ever becomes something formal, the record exists. If it doesn't, you've simply been organised."
        ],
        directive: "Start the paper trail today. Confirm verbal decisions in writing, every time.",
        followUp: "What's the pattern you'd need to prove if this escalated?"
      },
      {
        open: "There's a difference between a bad manager and an unsafe one.",
        core: [
          "Disorganised, blunt, poor at feedback: workable, and you can learn to manage upward around it. Humiliating, discriminatory, dishonest: not workable, and no amount of skill on your side fixes it.",
          "Be honest about which one you have, because people burn years applying strategy to a situation that needed an exit."
        ],
        directive: "Name which category you're in this week, and act accordingly instead of enduring.",
        followUp: "Which of those two is it, honestly?"
      },
      {
        open: "Meanwhile, build lines that don't run through them.",
        core: [
          "If your entire professional reputation is filtered by one person, you've handed them a monopoly on your career. Fix the supply chain.",
          "Get visible to their peers through cross-team work, be useful to people who don't report to them, and make your value known where they can't edit it."
        ],
        directive: "Do one visible piece of work for another part of the business this quarter.",
        followUp: "Who else in the company could vouch for your work right now?"
      }
    ]
  },
  {
    id: "difficult-coworker",
    label: "A difficult colleague",
    keywords: [
      "coworker", "colleague", "teammate", "someone at work", "annoying colleague",
      "person on my team", "work with someone", "hostile coworker"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Separate the person from the behaviour, then deal only with the behaviour.",
        core: [
          "'He's difficult' isn't actionable. 'He commits to deadlines in meetings and misses them without warning' is. The second one you can raise, evidence and solve.",
          "Vague grievances make you look emotional. Specific ones make you look precise. Same complaint, entirely different reception."
        ],
        directive: "Write down the three specific behaviours, with dates, before you say a word to anyone.",
        followUp: "What exactly did they do, without adjectives?"
      },
      {
        open: "Go to them before you go over them.",
        core: [
          "One direct, unemotional conversation solves most of these and permanently changes how you're seen when it doesn't. If you escalate first, you become the person who escalates.",
          "Keep it short, keep it about impact rather than character, and offer a specific fix rather than a complaint."
        ],
        directive: "Have that conversation this week, in person, under five minutes.",
        followUp: "What's the one sentence you'd open with?"
      },
      {
        open: "Some people don't want a solution. They want an audience.",
        core: [
          "You'll recognise them because every fix creates a new objection. Stop feeding it. Be scrupulously professional, keep everything in writing, and starve the drama of the oxygen it needs.",
          "You don't have to win with them. You have to be unarguable in front of everyone else."
        ],
        directive: "Reduce contact to written channels and stop reacting in real time.",
        followUp: "What do they get out of the conflict continuing?"
      },
      {
        open: "Ask yourself the uncomfortable one: what's your part in it?",
        core: [
          "Not because it's your fault. Because whatever share is yours is the only share you control, and it's usually the fastest lever available.",
          "If the honest answer is nothing, fine. But check first, because everyone thinks they're the reasonable one in the story they're narrating."
        ],
        directive: "Identify one thing you'd do differently, and do it for two weeks before judging the result.",
        followUp: "How would they describe the problem if I asked them?"
      }
    ]
  },
  {
    id: "office-politics",
    label: "Office politics",
    keywords: [
      "office politics", "politics at work", "backstabbing", "cliques", "playing the game",
      "internal politics", "power at work"
    ],
    weight: 1,
    intent: "tactical",
    responses: [
      {
        open: "Politics isn't a corruption of the workplace. It's what happens when decisions are made by people.",
        core: [
          "Refusing to engage doesn't make you principled. It makes you absent from the rooms where your work is discussed, which is a decision you're making about your own career.",
          "You don't have to be manipulative. You have to be known, trusted, and useful to people who have influence."
        ],
        directive: "Map the five people who actually influence decisions about your work, and build a real relationship with each.",
        followUp: "Who makes the calls that affect you most, and do they know your name?"
      },
      {
        open: "Currency in an organisation is trust, and trust is built by being predictable.",
        core: [
          "Do what you say, on the day you said, and tell people early when you can't. That's it. That's the entire foundation, and most people can't hold it for a quarter.",
          "Reliability is the cheapest reputation to build and the most expensive one to rebuild."
        ],
        directive: "Track every commitment you make for a month and hit every one.",
        followUp: "What did you promise last week that you haven't delivered?"
      },
      {
        open: "Never make an enemy for free.",
        core: [
          "Winning a small argument in public buys you a permanent opponent at the cost of a point nobody remembers. Take the win privately, give the credit publicly.",
          "Save conflict for things that actually matter, and when you do use it, use it decisively so it only has to happen once."
        ],
        directive: "Next time you're right in a meeting, make the point once and let it go.",
        followUp: "What's the last argument you won, and what did it cost you?"
      },
      {
        open: "Information is the real currency, and most people give it away for nothing.",
        core: [
          "Know what's happening before it's announced, not to scheme, but so you're never reacting. That comes from relationships across functions, not from your own team.",
          "Be the person who is generous with useful information and careful with damaging information. That combination makes you both liked and safe to talk to."
        ],
        directive: "Have coffee with someone outside your department every fortnight.",
        followUp: "Who tells you things before they're official?"
      }
    ]
  },
  {
    id: "interview",
    label: "Job interviews",
    keywords: [
      "interview", "job interview", "interviewing", "hiring manager", "interview tomorrow",
      "interview question", "final round", "screening call"
    ],
    weight: 1.2,
    intent: "tactical",
    responses: [
      {
        open: "You're not being assessed. You're both deciding. Act like it.",
        core: [
          "The moment you treat an interview as an audition, your voice changes, you over-explain, and you agree to things you don't want. Treat it as a meeting between two parties evaluating fit and everything steadies.",
          "Ask real questions about how decisions get made, why the last person left, and what failure looks like in the role. The answers tell you more than the job description ever will."
        ],
        directive: "Prepare four questions of your own and ask them all.",
        followUp: "What would make you turn this job down?"
      },
      {
        open: "Preparation isn't reading their website. It's knowing their problem.",
        core: [
          "Find out what's actually hard for them right now: growth, churn, a migration, a regulator, a competitor. Then walk in with a view on it.",
          "The candidate who discusses the business is remembered. The candidate who recites their CV is compared."
        ],
        directive: "Spend two hours finding their real problem, and open with a question about it.",
        followUp: "What do you think is keeping their team up at night?"
      },
      {
        open: "Stories beat adjectives. Every time.",
        core: [
          "Nobody believes 'I'm a strong communicator'. Everybody believes a ninety-second story with a situation, a decision you personally made, and a result with a number in it.",
          "Have six of them ready, and make sure at least two are about something that went badly and what you changed afterwards."
        ],
        directive: "Write six stories tonight in that structure and rehearse them out loud.",
        followUp: "What's your best story about something you got wrong?"
      },
      {
        open: "Don't answer the salary question first if you can avoid it.",
        core: [
          "Ask what range they've budgeted for the role. If you're pushed, give a range whose bottom you'd genuinely accept, because you will be offered the bottom.",
          "And never anchor to your current salary. What you were paid before is a fact about your last employer, not about your value."
        ],
        directive: "Decide your range before the call so you're never inventing a number under pressure.",
        followUp: "What's the lowest number you'd say yes to without resenting it?"
      }
    ]
  }
];

const topicsB = [
  {
    id: "negotiation-general",
    label: "Negotiation",
    keywords: [
      "negotiate", "negotiation", "deal", "bargaining", "haggle", "terms", "closing a deal",
      "get them to agree", "counterparty"
    ],
    weight: 1.3,
    intent: "tactical",
    responses: [
      {
        open: "Every negotiation is decided before anyone sits down.",
        core: [
          "Know three things cold: your walk-away, their walk-away as best you can estimate it, and the zone between them. That zone is the entire game. Everything else is theatre.",
          "If you can't name your walk-away out loud, you're not negotiating. You're hoping, in a suit."
        ],
        directive: "Write your walk-away number down before the meeting and refuse to move it in the room.",
        followUp: "What happens to you if this deal dies tomorrow?"
      },
      {
        open: "Anchor first when you know the market. Let them anchor when you don't.",
        core: [
          "The first credible number reshapes everyone's sense of what's reasonable, including yours. That's not a trick, it's how human judgement works, and it works on you too.",
          "If they anchor absurdly, don't counter with an equal absurdity. Reject the frame, name the reasoning you'll accept, and start the conversation there."
        ],
        directive: "Decide before you go in whether you're anchoring or absorbing. Don't improvise it.",
        followUp: "Do you actually know what this is worth on the open market?"
      },
      {
        open: "Stop arguing your position. Find out what they need.",
        core: [
          "Positions collide. Interests usually don't. Two parties fighting over a number often want different things underneath it: certainty, timing, credit, cover with their own boss.",
          "Ask why that matters to them, twice. The second answer is the real one, and it's often cheap for you to give."
        ],
        directive: "Go in with three questions about their constraints, not three arguments for your price.",
        followUp: "What does the person across the table have to explain to their boss?"
      },
      {
        open: "Label the tension instead of pretending it isn't there.",
        core: [
          "Saying 'it sounds like the timeline is the part that worries you' does more than any clever counter. People relax when they feel accurately understood, and relaxed people trade.",
          "That's not softness. It's the fastest route to the information you need to win."
        ],
        directive: "Open your next negotiation by naming their concern out loud before stating yours.",
        followUp: "What's the fear they haven't said yet?"
      },
      {
        open: "Never give a concession. Trade one.",
        core: [
          "Free concessions teach the other side that pressure works, and they'll apply more of it. Every move you make gets attached to a move they make.",
          "If I move on price, you move on timeline. Now you're building a deal instead of slowly losing one."
        ],
        directive: "Prepare your trade list: three things you can give, and what you want for each.",
        followUp: "What can you give away that costs you almost nothing?"
      }
    ]
  },
  {
    id: "leverage",
    label: "Leverage",
    keywords: [
      "leverage", "upper hand", "power dynamic", "no power", "they hold all the cards",
      "weak position", "bargaining power"
    ],
    weight: 1.2,
    intent: "tactical",
    responses: [
      {
        open: "Leverage isn't something you're born holding. It's something you build before you need it.",
        core: [
          "It comes from three places: alternatives, information, and time. Get another option, know something they don't, or need this later than they do. Any one changes the room.",
          "If you have none of the three today, don't negotiate today. Go build one."
        ],
        directive: "Pick the easiest of the three to improve this week and improve it before you make your ask.",
        followUp: "Which of the three could you build fastest?"
      },
      {
        open: "The person who can walk away isn't the one who wants to. It's the one who's prepared to.",
        core: [
          "That preparation is unglamorous: savings, a second client, a skill in demand, a relationship you maintained when you didn't need it.",
          "People think leverage is a moment of nerve. It's mostly logistics you sorted out months earlier."
        ],
        directive: "Build the boring alternative now, while the stakes are low.",
        followUp: "What would it take for you to be able to walk away in ninety days?"
      },
      {
        open: "Having leverage and using it are different disciplines.",
        core: [
          "The threat you never have to make is worth more than the one you do. Once you fire it, it's spent, and the relationship pays for it afterwards.",
          "Let them work out the position for themselves. People defend conclusions they reached on their own."
        ],
        directive: "State your alternative once, factually, without threat in your voice, and never repeat it.",
        followUp: "Do they already know what your options are?"
      },
      {
        open: "The cheapest leverage available is being genuinely willing to lose the deal.",
        core: [
          "Not bluffing. Actually reconciled to it. It changes your tone, your pace, your willingness to sit in silence, and everyone in the room can feel it.",
          "Desperation has a smell, and no vocabulary covers it."
        ],
        directive: "Decide what your life looks like if this fails, and make peace with that version before you walk in.",
        followUp: "Could you genuinely live with losing this?"
      }
    ]
  },
  {
    id: "conflict-confrontation",
    label: "Confrontation",
    keywords: [
      "confront", "confrontation", "argument", "fight with", "stand up to", "call them out",
      "difficult conversation", "conflict"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "Most people avoid the conversation and then have it badly six weeks later at full volume.",
        core: [
          "Small and early beats large and late, every time. The cost of the delay is that you accumulate evidence and resentment, and both come out at once.",
          "Have it while you can still be calm about it. Calm is a strategic asset, not a personality trait."
        ],
        directive: "Have the conversation within forty-eight hours of deciding it's needed.",
        followUp: "What are you afraid will happen if you say it plainly?"
      },
      {
        open: "Go in with an outcome, not with feelings looking for somewhere to land.",
        core: [
          "Know the exact change you want before you open your mouth. If you don't have one, you're not confronting anyone, you're venting, and venting damages relationships without fixing anything.",
          "One issue, one ask, one meeting. Don't bring a list. Lists make people defensive and they'll fight the weakest item on it."
        ],
        directive: "Write your single sentence ask, and don't leave the room without stating it.",
        followUp: "What specifically do you want to be different afterwards?"
      },
      {
        open: "Raise your argument, not your voice.",
        core: [
          "The moment your volume rises, the conversation becomes about your behaviour instead of their conduct, and you've handed them the moral high ground for free.",
          "Say the hard thing quietly. Quiet and precise is far more unsettling than loud, and it leaves you nothing to apologise for later."
        ],
        directive: "Rehearse the hardest sentence out loud until you can say it at normal volume.",
        followUp: "What's the sentence you're dreading saying?"
      },
      {
        open: "Attack the position. Never the person.",
        core: [
          "'This decision is going to cost us the quarter' is a fight you can win. 'You're careless' is a fight that never ends, because now they're defending their identity.",
          "Give people a way to change their mind without admitting they're a bad person. Most conflicts only survive because someone can't find an exit that preserves their dignity."
        ],
        directive: "Frame the problem as a shared one and offer them a face-saving route out.",
        followUp: "How do they get to change their mind without losing face?"
      }
    ]
  },
  {
    id: "saying-no",
    label: "Saying no",
    keywords: [
      "say no", "saying no", "can't say no", "people pleaser", "boundaries", "overcommitted",
      "too many requests", "turn them down"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "Every yes you don't mean is a no to something you do.",
        core: [
          "You're not generous. You're avoiding a small, brief discomfort by buying a large, extended one. That trade is terrible, and you keep making it.",
          "The people worth having around can handle a no. The ones who can't were never negotiating in good faith."
        ],
        directive: "Say no once this week to something small, and notice that nothing collapses.",
        followUp: "What did you agree to this month that you resent?"
      },
      {
        open: "No doesn't need a paragraph.",
        core: [
          "Long explanations are a negotiation invitation. Every reason you give is a problem they can offer to solve until you're back where you started.",
          "'I can't take that on right now' is a complete answer. Say it, then stop talking. The silence is uncomfortable for about four seconds and then it's over."
        ],
        directive: "Use one sentence, no justification, and hold the pause.",
        followUp: "What would you say if you didn't have to justify it?"
      },
      {
        open: "Buy yourself time instead of reflexively agreeing.",
        core: [
          "'Let me check what I've committed to and come back to you today' costs nothing and breaks the reflex. Most bad yeses happen in the first two seconds.",
          "Then answer by message, where it's easier to be clear and harder to be talked around."
        ],
        directive: "Make 'let me come back to you' your default response for the next month.",
        followUp: "How many of your yeses happen in the first two seconds?"
      },
      {
        open: "Say no to the request, yes to the person.",
        core: [
          "Decline the task and offer something real: a name, a fifteen-minute call, a different timeline. You've protected your capacity without spending the relationship.",
          "This is how people say no for twenty years and still get invited to everything."
        ],
        directive: "Pair every no with one genuinely useful alternative.",
        followUp: "What could you offer instead that costs you an hour rather than a month?"
      }
    ]
  },
  {
    id: "difficult-client",
    label: "Difficult clients",
    keywords: [
      "client", "customer", "difficult client", "client wants", "scope creep", "unreasonable client",
      "stakeholder", "client not paying"
    ],
    weight: 1.1,
    intent: "tactical",
    responses: [
      {
        open: "Scope creep isn't the client's fault. It's a documentation failure on your side.",
        core: [
          "Everything outside the agreement gets the same response: happy to do it, here's what it costs and what it moves. Not a refusal, a price. Suddenly half the requests disappear.",
          "Clients respect firm boundaries far more than they respect endless accommodation, which they read as low value."
        ],
        directive: "Reply to the next out-of-scope request with a written cost and timeline impact.",
        followUp: "What have you already given away for free this month?"
      },
      {
        open: "An unhappy client is usually an uninformed client.",
        core: [
          "Most anger in professional relationships is about surprise, not about quality. They found out late, so they felt out of control.",
          "Over-communicate on the bad news specifically. The person who tells you about the problem early becomes the person you trust with the next project."
        ],
        directive: "Send the difficult update today rather than waiting until you have a fix.",
        followUp: "What do they not know yet that they'll be angry about later?"
      },
      {
        open: "If they're not paying, stop working. Immediately.",
        core: [
          "Continuing to deliver while invoices age teaches them that your terms are decorative. Politeness has never once collected a debt.",
          "One firm, unemotional message: work pauses until the outstanding invoice is settled. Then actually pause. The pause is the message."
        ],
        directive: "Send the pause notice today, with the invoice attached and a date.",
        followUp: "How long has that invoice been outstanding, really?"
      },
      {
        open: "Some clients cost more than they pay. Fire them.",
        core: [
          "Take the hours, the stress and the opportunity cost, and you'll find your worst client is subsidised by your best one. That's a business decision you're making by default.",
          "Let them go professionally, with notice and a handover. You'll get the capacity back and the replacement is almost always better."
        ],
        directive: "Rank your clients by profit per hour of misery, and give notice to the bottom one.",
        followUp: "Which client are you dreading hearing from?"
      }
    ]
  },
  {
    id: "confidence",
    label: "Confidence",
    keywords: [
      "confidence", "confident", "self esteem", "self-esteem", "believe in myself", "insecure",
      "not good enough", "self doubt", "self-doubt"
    ],
    weight: 1.2,
    intent: "advice",
    responses: [
      {
        open: "Confidence isn't a feeling you wait for. It's a conclusion you earn.",
        core: [
          "You don't think your way into it. You collect evidence. Every time you do a hard thing and survive it, you file another piece, and eventually the case is overwhelming.",
          "Which means the fastest route to confidence is the least appealing one: do the thing you're avoiding, badly, today."
        ],
        directive: "Do one thing this week that you'd normally decline, and keep a record of it.",
        followUp: "What have you been avoiding because you might not be good at it?"
      },
      {
        open: "You're comparing your inside to everyone else's outside.",
        core: [
          "The people who look effortless to you are managing the same static, they've just had more practice performing while it runs.",
          "Composure isn't the absence of doubt. It's the decision to act at full size while doubt is happening."
        ],
        directive: "Act at full size for the next three days and let the feeling catch up.",
        followUp: "Who do you assume never feels this? What makes you so sure?"
      },
      {
        open: "Competence and confidence are different problems. Diagnose which one you have.",
        core: [
          "If you genuinely aren't good enough yet, no amount of self-talk fixes it and pretending will make it worse. Go get better, deliberately, with feedback.",
          "If you are good enough and still shrink, that's a self-concept problem, and the fix is exposure, not preparation. More reading won't help you."
        ],
        directive: "Name honestly which of the two you have, then treat that one and not the other.",
        followUp: "Is this a skill gap or a nerve gap?"
      },
      {
        open: "How you carry yourself changes how you're treated, and how you're treated changes what you believe.",
        core: [
          "Speak slower. Finish your sentences. Stop apologising for taking up airtime. Stop ending statements as though they were questions.",
          "That loop is real, though be careful with the pop version of it. Standing in a pose for two minutes isn't a personality transplant. Repeated behaviour is."
        ],
        directive: "Pick one verbal habit that shrinks you and cut it entirely this week.",
        followUp: "What phrase do you use that makes you sound smaller than you are?"
      }
    ]
  },
  {
    id: "imposter-syndrome",
    label: "Imposter syndrome",
    keywords: [
      "imposter", "impostor", "fraud", "found out", "don't deserve", "faking it", "out of my depth",
      "everyone else knows"
    ],
    weight: 1.2,
    intent: "emotional",
    responses: [
      {
        open: "The people who worry about being frauds almost never are. That's the joke of it.",
        core: [
          "The feeling tends to show up when you're growing, because you're standing in a role slightly larger than your evidence. That's not fraud, that's the correct sensation of progress.",
          "Actual incompetence rarely comes with this much self-examination."
        ],
        directive: "List the last five things you delivered that you didn't think you could. Read it when the feeling starts.",
        followUp: "Who chose you for this, and do you think they're an idiot?"
      },
      {
        open: "You were hired for a trajectory, not a finished state.",
        core: [
          "Nobody experienced expects you to know everything on arrival. They expect you to close gaps fast and say so when you don't know something.",
          "The tell of a real fraud is hiding the gap. The tell of a professional is naming it and having it fixed by Thursday."
        ],
        directive: "Say 'I don't know that yet, I'll have an answer by Thursday' out loud this week.",
        followUp: "What's the gap you've been hiding?"
      },
      {
        open: "Feelings are not evidence. Look at the record.",
        core: [
          "Write down what you were responsible for in the last year and what happened as a result. Not how you felt about it, what happened.",
          "Most people find the record and the feeling have almost nothing to do with each other, which tells you which one to trust."
        ],
        directive: "Build that record this weekend, and keep adding to it monthly.",
        followUp: "What does your actual track record say?"
      },
      {
        open: "There's a version of this that's useful. Keep that part.",
        core: [
          "The doubt that makes you prepare properly and check your work is an asset. The doubt that makes you silent in meetings is a tax.",
          "Same feeling, different behaviour. You don't need to remove it, you need to stop letting it choose what you do."
        ],
        directive: "Speak first in your next meeting, before the doubt has time to organise.",
        followUp: "What did you not say last week that you should have?"
      }
    ]
  },
  {
    id: "fear-failure",
    label: "Fear of failure",
    keywords: [
      "afraid", "scared", "fear", "terrified", "what if i fail", "fear of failure", "nervous",
      "risk", "might not work"
    ],
    weight: 1.2,
    intent: "emotional",
    responses: [
      {
        open: "Fear is just energy that hasn't been given a direction yet.",
        core: [
          "Your body doesn't distinguish between fear and readiness. Same chemistry, different label. The label is the part you control.",
          "So stop trying to make it go away. Point it at the preparation, then at the performance."
        ],
        directive: "Name what you're afraid of in one sentence, then write the first action next to it.",
        followUp: "What exactly are you scared of, precisely?"
      },
      {
        open: "Run the failure all the way through. It's rarely as final as your imagination sells it.",
        core: [
          "Write down what actually happens if it goes wrong. Not the vague dread, the specifics: what you lose, who reacts, what you do next, how long recovery takes.",
          "Nine times out of ten you'll find a bad quarter, not a ruined life. Fear survives on vagueness."
        ],
        directive: "Write the worst realistic case tonight, plus your recovery plan. Then decide.",
        followUp: "If it fails completely, where are you in a year?"
      },
      {
        open: "You're afraid because you care about the outcome. That's not weakness, that's stakes.",
        core: [
          "People who feel nothing before something important are usually not very good at it, or they've stopped trying.",
          "Acknowledge it, briefly, then get on with the work. The feeling doesn't get a vote on your calendar."
        ],
        directive: "Give the fear two minutes of honest attention, then start the task anyway.",
        followUp: "What would you do right now if you knew it would work?"
      },
      {
        open: "Not deciding is a decision. It's just the one nobody has to defend.",
        core: [
          "Delay feels safe because the loss stays hypothetical. Meanwhile the option quietly expires and you tell yourself you chose caution.",
          "Choose. Then reduce the downside instead of eliminating it, because you can't eliminate it and waiting for that is how years disappear."
        ],
        directive: "Set a decision deadline this week and hold yourself to it.",
        followUp: "What is delay actually costing you right now?"
      }
    ]
  },
  {
    id: "procrastination",
    label: "Procrastination",
    keywords: [
      "procrastinate", "procrastination", "keep putting off", "can't start", "avoiding",
      "lazy", "waste time", "not getting anything done"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "You're not lazy. You're avoiding a feeling, and the task happens to be attached to it.",
        core: [
          "Find out which feeling: fear it won't be good, resentment that it's yours, confusion about the first step, boredom. Each has a different fix, which is why generic discipline advice keeps failing you.",
          "Confusion is the most common, and it's the easiest to solve."
        ],
        directive: "Name the feeling under the avoidance, then break the task down until the first step is embarrassingly small.",
        followUp: "What's the very first physical action this task requires?"
      },
      {
        open: "Motivation follows action. Everyone has it backwards.",
        core: [
          "You're waiting to feel like it. That's not how it works, and the waiting itself becomes the habit you're actually building.",
          "Start badly for ten minutes. Momentum is manufactured, not summoned."
        ],
        directive: "Set a timer for ten minutes and do the worst version of it right now.",
        followUp: "What could you do in the next ten minutes?"
      },
      {
        open: "Deadlines with consequences work. Deadlines without them are wishes.",
        core: [
          "Tell a specific person a specific date. Better: attach something you'd hate to lose to missing it.",
          "You're not weak-willed, you're under-constrained, and you've been designing an environment that makes avoidance comfortable."
        ],
        directive: "Tell one person your deadline today, and make it public enough to hurt.",
        followUp: "Who will notice if you don't do this?"
      },
      {
        open: "Sometimes the avoidance is information. Read it.",
        core: [
          "If you've been dodging the same thing for six months, ask whether it should exist at all. Some tasks are being avoided because they're genuinely a bad idea you haven't admitted to.",
          "Kill it or do it. Both are respectable. The third option, carrying it around, is the one that's costing you."
        ],
        directive: "Decide today: schedule it with a date, delegate it, or delete it.",
        followUp: "Does this task actually need to happen at all?"
      }
    ]
  },
  {
    id: "burnout",
    label: "Burnout",
    keywords: [
      "burnout", "burnt out", "burned out", "exhausted", "no energy", "can't keep going",
      "running on empty", "overworked"
    ],
    weight: 1.3,
    intent: "emotional",
    responses: [
      {
        open: "Burnout isn't a discipline problem, and treating it like one is how people make it worse.",
        core: [
          "It's what happens when demand outruns recovery for long enough that your body stops offering the option. Pushing harder at this point isn't grit, it's damage.",
          "The people I respect most know when to stop. Running an engine dry doesn't make it faster, it makes it scrap."
        ],
        directive: "Take real time off this month, and tell someone so you can't quietly cancel it.",
        followUp: "When did you last have two consecutive days with no work in them?"
      },
      {
        open: "Exhaustion is one thing. Meaninglessness is another. Work out which one you have.",
        core: [
          "If rest fixes it, it was load. If a week off leaves you dreading the return exactly as much, the problem is the work itself, and no holiday will touch it.",
          "People spend years resting their way out of a problem that was structural."
        ],
        directive: "Take a proper week off and observe your reaction to going back. That's your diagnosis.",
        followUp: "If you were fully rested tomorrow, would you still want this job?"
      },
      {
        open: "Cut something. Actually cut it, not optimise it.",
        core: [
          "You can't productivity-hack your way out of too much. Every system you add is another thing to maintain while you're already underwater.",
          "Find the three commitments producing the least and end them this week, properly, with the awkward conversation included."
        ],
        directive: "Remove three commitments in the next seven days. Not defer. Remove.",
        followUp: "What's on your plate that nobody would miss?"
      },
      {
        open: "And get an actual doctor involved if this has been months.",
        core: [
          "Prolonged burnout overlaps with depression and with a list of physical conditions that are treatable and worth ruling out. That's not weakness, that's diagnostics.",
          "You'd investigate a failing system at work rather than shouting at it. Extend yourself the same professionalism."
        ],
        directive: "Book the appointment this week. Put it in the calendar now.",
        followUp: "How long has it been like this?"
      }
    ]
  }
];

const topicsC = [
  {
    id: "anxiety-stress",
    label: "Anxiety and stress",
    keywords: [
      "anxiety", "anxious", "stressed", "stress", "panic", "panic attack", "overwhelmed",
      "can't cope", "spiralling", "spiraling"
    ],
    weight: 1.4,
    intent: "emotional",
    responses: [
      {
        open: "Alright. Slow down for a second, this part matters.",
        core: [
          "When everything is loud, the answer isn't a better plan, it's a smaller one. Your system is trying to solve twelve things at once and it can't, so it's alarming instead.",
          "Get your breathing longer on the way out than the way in for two minutes. That isn't a wellness cliche, it's the fastest physical lever you have on your own nervous system."
        ],
        directive: "Two minutes of longer exhales, then write the single next action. Nothing beyond it.",
        followUp: "What's the one thing that has to happen today, and only today?"
      },
      {
        open: "You're carrying tomorrow's problems in today's body. No wonder it hurts.",
        core: [
          "Most of what's spinning isn't happening now. It's rehearsal, and rehearsal has no end point, which is why it never resolves.",
          "Bring it back to the next twenty-four hours. That's the only window where you can actually do anything."
        ],
        directive: "Write down everything on your mind, then cross out anything not decided in the next day.",
        followUp: "What's genuinely in front of you today?"
      },
      {
        open: "Panic lies about duration. It always feels permanent and never is.",
        core: [
          "It peaks and it comes down, usually inside twenty minutes, whether or not you fight it. Fighting it tends to extend it.",
          "Let it move through instead of bracing against it. You're not in danger, you're in a surge."
        ],
        directive: "Sit down, feet on the floor, and let it pass without arguing with it.",
        followUp: "Has it passed before?"
      },
      {
        open: "And if this is a pattern rather than a bad week, get real help.",
        core: [
          "I'm a character with good lines. A therapist is a trained professional with methods that work, and using one is a competence decision, not a confession.",
          "Even the version of the man you're talking to ended up in that chair, and it was the most useful thing he did."
        ],
        directive: "Book one appointment this week. One. That's the whole task.",
        followUp: "What's stopping you from making that call?"
      }
    ]
  },
  {
    id: "rejection",
    label: "Rejection",
    keywords: [
      "rejected", "rejection", "turned down", "said no to me", "didn't get it", "not chosen",
      "ghosted", "passed on me"
    ],
    weight: 1.1,
    intent: "emotional",
    responses: [
      {
        open: "It stings. Let it sting for a day, then take the useful part and leave the rest.",
        core: [
          "Rejection is almost always about fit, budget, timing or someone else's internal politics. You get told it's about you because that's the shortest sentence available.",
          "Take any specific feedback seriously. Ignore the story your head writes to fill the gaps."
        ],
        directive: "Ask for one piece of specific feedback, then go back to volume.",
        followUp: "What did they actually say, in their words?"
      },
      {
        open: "The only rejection that costs you anything is the one that stops you asking again.",
        core: [
          "Everyone with a career you'd envy has a much longer list of no's than you do. That's not a consolation, it's the mechanism.",
          "You're not collecting failures. You're paying for the yeses in advance."
        ],
        directive: "Make the next attempt within seventy-two hours, before the story hardens.",
        followUp: "What's your next attempt going to be?"
      },
      {
        open: "Don't renegotiate your worth based on one person's decision.",
        core: [
          "You'd never let a single data point overturn a conclusion at work. Apply the same standard to yourself.",
          "One no is a data point. Twenty no's with the same feedback is a pattern, and a pattern is instructions."
        ],
        directive: "Track the reasons. Act on patterns, not on individual verdicts.",
        followUp: "Is this the first no, or the tenth with the same reason?"
      },
      {
        open: "Silence isn't a verdict either. It's usually chaos on their end.",
        core: [
          "Being ghosted feels personal and almost never is. People are overloaded, budgets freeze, decisions stall, and nobody wants to write the awkward email.",
          "Follow up twice, professionally, then move on without resentment. Resentment is expensive and they'll never know you're paying it."
        ],
        directive: "Send one clean follow-up, then redirect your energy to the next option.",
        followUp: "How long have you been waiting on this?"
      }
    ]
  },
  {
    id: "comparison-envy",
    label: "Comparison",
    keywords: [
      "comparing", "comparison", "jealous", "envy", "everyone else", "behind in life",
      "they're doing better", "falling behind", "linkedin"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "You're measuring your whole reality against everyone else's highlight reel. That's not a fair fight and you designed it.",
        core: [
          "Nobody posts the rejected offer, the fight at home, the loan, the two years of nothing. You're comparing complete information to marketing.",
          "The only useful comparison is against your own position twelve months ago."
        ],
        directive: "Write down where you were a year ago in three specifics. That's the scoreboard that counts.",
        followUp: "What could you do a year ago that you can do better now?"
      },
      {
        open: "Envy is a compass if you read it properly.",
        core: [
          "Whatever makes you feel that specific sting is telling you what you actually want, which is more information than most people ever get about themselves.",
          "The mistake is stopping at the feeling. Take the data, then convert it into a plan or drop it entirely."
        ],
        directive: "Name exactly what you envy, then write the first step toward it this week.",
        followUp: "What is it precisely that you want that they have?"
      },
      {
        open: "Different timelines aren't different outcomes.",
        core: [
          "People who peak at twenty-six and people who peak at forty-six end up in similar rooms, and the second group is usually more durable when it arrives.",
          "There's no schedule. There's just direction and consistency, and one of those you control completely."
        ],
        directive: "Delete the accounts that make you feel behind. Keep the ones that make you want to work.",
        followUp: "Whose life are you actually trying to live?"
      },
      {
        open: "Attention is a budget, and yours is funding someone else's story.",
        core: [
          "The hours you spend monitoring people ahead of you are hours not spent closing the gap. It feels like research. It's spectating.",
          "Watch someone closely enough to learn their method, then stop watching and go use it."
        ],
        directive: "Convert one person you envy into one lesson, then cut the monitoring.",
        followUp: "What's their actual method, as opposed to their image?"
      }
    ]
  },
  {
    id: "discipline-habits",
    label: "Discipline and habits",
    keywords: [
      "discipline", "habit", "habits", "consistency", "routine", "willpower", "stick to it",
      "self control", "self-control"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Discipline is a design problem, not a character flaw.",
        core: [
          "People with iron willpower usually just built lives where the right thing is the easy thing. The gym is on the route home, the phone is in the other room, the work is open on the screen.",
          "Stop trying to become a better person and start engineering fewer decisions."
        ],
        directive: "Remove one point of friction from the habit you want and add one to the habit you don't.",
        followUp: "What makes the wrong choice easy for you right now?"
      },
      {
        open: "Small and boring beats big and heroic.",
        core: [
          "The plan you can do on your worst week is worth more than the plan that only works when everything aligns. Ambitious systems break at the first bad Tuesday.",
          "Set the bar low enough that missing it would be absurd, then never miss it."
        ],
        directive: "Halve your intended commitment and do it every single day for thirty days.",
        followUp: "What's the version of this you could do on your worst day?"
      },
      {
        open: "Never miss twice.",
        core: [
          "One miss is life. Two is a new pattern forming, and by four you've quietly changed your identity without noticing.",
          "The recovery matters more than the streak. Everyone breaks the streak."
        ],
        directive: "Make the rule explicit: whatever happens, you restart the next day.",
        followUp: "How many days have you missed in a row?"
      },
      {
        open: "Attach it to who you are, not to what you get.",
        core: [
          "Outcome goals expire and then you drift. Identity is durable: you're someone who trains, someone who ships, someone who's on time.",
          "Each repetition is a vote for that description. Enough votes and it stops requiring effort."
        ],
        directive: "Pick the identity sentence and cast one vote for it today.",
        followUp: "What kind of person are you trying to become?"
      }
    ]
  },
  {
    id: "decision-paralysis",
    label: "Hard decisions",
    keywords: [
      "decision", "can't decide", "torn between", "should i", "what should i do", "choice",
      "stuck between", "indecisive"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "If it's this close, it matters less than you think. Pick one and make it right.",
        core: [
          "Genuinely difficult decisions are usually near-ties, which means the expected values are similar and the execution afterwards is what separates them.",
          "The cost of deliberating for another month is certain. The gain from more analysis is not."
        ],
        directive: "Decide by Friday, then spend your energy on making it work rather than on whether it was right.",
        followUp: "What would you choose if you had to answer in ten seconds?"
      },
      {
        open: "Ask which one you can undo.",
        core: [
          "Reversible decisions should be made fast and cheaply. Irreversible ones deserve real time and real counsel. Most people apply exactly the wrong pace to each.",
          "Work out which category this is before you spend another week on it."
        ],
        directive: "Classify it as reversible or not, then set your deadline accordingly.",
        followUp: "Could you undo this in six months if you had to?"
      },
      {
        open: "Stop asking which is better. Ask which regret you'd rather carry.",
        core: [
          "Project both versions forward five years and look at what you lost in each, not what you gained. Loss clarifies where upside blurs.",
          "The answer is normally obvious the moment you stop pretending both options are still open forever."
        ],
        directive: "Write both five-year versions tonight, in detail, and read them tomorrow morning.",
        followUp: "Which one would you regret not trying?"
      },
      {
        open: "You already know. You're looking for permission.",
        core: [
          "There's usually a quiet answer underneath the pro and con list, and the list exists to give it a respectable justification.",
          "You don't need permission. You need to accept the cost of the thing you already chose."
        ],
        directive: "Say the answer out loud to one person today and see if it sounds like the truth.",
        followUp: "What's the answer you've been avoiding saying out loud?"
      }
    ]
  },
  {
    id: "focus-distraction",
    label: "Focus",
    keywords: [
      "focus", "distracted", "distraction", "concentrate", "attention span", "phone addiction",
      "can't concentrate", "deep work"
    ],
    weight: 0.9,
    intent: "advice",
    responses: [
      {
        open: "You don't have an attention problem. You have an environment that's designed to take it.",
        core: [
          "There are teams of very smart people whose entire job is capturing the hours you're trying to protect. Losing to them on willpower alone isn't a personal failing, it's arithmetic.",
          "Change the environment and the willpower requirement drops to almost nothing."
        ],
        directive: "Put the phone in another room for your first two working hours tomorrow.",
        followUp: "Where does your first hour actually go?"
      },
      {
        open: "Protect one block. Not the whole day.",
        core: [
          "Ninety minutes of genuine concentration beats eight hours of interrupted presence, and it's achievable even in a badly-run organisation.",
          "Put it in the calendar as a meeting. People respect a meeting and ignore an intention."
        ],
        directive: "Block ninety minutes tomorrow morning and defend it like a client call.",
        followUp: "When is your brain actually sharpest?"
      },
      {
        open: "Decide the night before what the block is for.",
        core: [
          "Most focus fails at the start, not in the middle. You sit down, you're unclear, and the ambiguity sends you looking for something easier.",
          "Write the exact first sentence, function or slide you'll produce. Then it's execution, not decision-making."
        ],
        directive: "Write tomorrow's first task tonight, specific enough to start without thinking.",
        followUp: "What's the very first thing you'll do when you sit down?"
      },
      {
        open: "Multitasking is just switching with extra losses.",
        core: [
          "Every switch costs reload time, and doing it constantly means you never reach the depth where good work happens.",
          "One thing, finished, then the next. Slower on paper, considerably faster in practice."
        ],
        directive: "Work single-threaded for one full day and compare the output.",
        followUp: "How many things are open in front of you right now?"
      }
    ]
  },
  {
    id: "motivation-slump",
    label: "Lost motivation",
    keywords: [
      "motivation", "unmotivated", "lost my drive", "don't care anymore", "going through the motions",
      "no ambition", "stuck in a rut", "apathy"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Motivation is weather. You can't build anything on it.",
        core: [
          "Waiting to feel driven is how people lose years. The professionals you admire are working on the days they don't want to, and that's the entire difference.",
          "Standards, systems and commitments carry you when the feeling isn't there. Which is most days."
        ],
        directive: "Set the minimum you'll do regardless of mood, and do it tomorrow whatever happens.",
        followUp: "What's your non-negotiable minimum?"
      },
      {
        open: "Sometimes flatness is fatigue wearing a costume.",
        core: [
          "Before you rebuild your ambition, check your sleep, your movement and how long it's been since you had a genuine break.",
          "A tired brain reliably reports back that nothing matters. That's a symptom, not a conclusion."
        ],
        directive: "Fix sleep for two weeks before you make any large decisions about your life.",
        followUp: "How much are you actually sleeping?"
      },
      {
        open: "Or it's aimed at the wrong target, and your gut noticed before you did.",
        core: [
          "Chronic apathy about a specific thing is often accurate information about that thing. You can't force enthusiasm for a direction you no longer believe in.",
          "Don't pathologise it. Interrogate it."
        ],
        directive: "Write what you'd want if the current path vanished tomorrow, without editing yourself.",
        followUp: "If this all disappeared, what would you miss?"
      },
      {
        open: "Get one win. Small, fast, real.",
        core: [
          "Slumps are usually starved of evidence that effort produces results. One completed thing restores the connection.",
          "Not a plan for a thing. A finished thing, today."
        ],
        directive: "Finish something today that you can point to before you go to sleep.",
        followUp: "What could you finish in the next two hours?"
      }
    ]
  },
  {
    id: "regret-past-mistake",
    label: "Regret",
    keywords: [
      "regret", "mistake", "messed up", "screwed up", "wish i had", "guilty", "shame",
      "can't forgive myself", "past"
    ],
    weight: 1.1,
    intent: "emotional",
    responses: [
      {
        open: "You made a bad call with the information you had. That's not the same as being a bad person.",
        core: [
          "Judging the decision by the outcome is a trap. You knew what you knew then, and hindsight is a luxury that wasn't available at the time.",
          "Extract the lesson, pay whatever repair is owed, and stop serving a sentence nobody else is enforcing."
        ],
        directive: "Write the single lesson in one sentence, then close the file.",
        followUp: "What would you actually do differently with what you knew then?"
      },
      {
        open: "Guilt says you did something wrong. Shame says you are something wrong. Only one is useful.",
        core: [
          "Guilt can drive repair: an apology, a payment, a changed behaviour. Shame just keeps you paralysed and makes you worse company for everyone including yourself.",
          "Work out which one you're carrying, because they need completely different handling."
        ],
        directive: "If there's a repair to make, make it this week. If there isn't, put it down.",
        followUp: "Is there someone you owe a real apology to?"
      },
      {
        open: "The past isn't a negotiation. Stop trying to win it.",
        core: [
          "You keep replaying it hoping a different version appears. It won't, and every hour spent there is subtracted from a present you can still influence.",
          "The only respectable response to a mistake is a better performance afterwards."
        ],
        directive: "Redirect the energy: pick one thing this week that the old you wouldn't have done.",
        followUp: "What would fixing this look like going forward, not backward?"
      },
      {
        open: "Everybody has one. The difference is what they built afterwards.",
        core: [
          "The people you'd consider impressive have a version of this in their history, usually worse than yours, and they don't lead with it.",
          "Your record is not one entry. Go add to it."
        ],
        directive: "Give it one final honest hour, then decide it no longer gets your evenings.",
        followUp: "What are you going to be judged on ten years from now?"
      }
    ]
  },
  {
    id: "betrayal-trust",
    label: "Betrayal",
    keywords: [
      "betrayed", "betrayal", "backstabbed", "lied to me", "went behind my back", "broke my trust",
      "can't trust", "double crossed"
    ],
    weight: 1.2,
    intent: "emotional",
    responses: [
      {
        open: "Someone showed you who they are. Believe them the first time.",
        core: [
          "The instinct is to explain it away because the alternative rewrites a relationship you valued. That rewriting is painful and necessary.",
          "You're not being harsh by adjusting. You're being accurate."
        ],
        directive: "Adjust the access they have to you today. Don't announce it, just do it.",
        followUp: "What does this cost you if it happens again?"
      },
      {
        open: "Don't react while it's hot. React when it's useful.",
        core: [
          "Anything you do in the first forty-eight hours will be about your feelings rather than your interests, and it'll be the part everyone remembers.",
          "Cold is more effective than furious, and it's harder to argue with."
        ],
        directive: "Wait two days, then decide with your interests in front of you rather than your pride.",
        followUp: "What outcome would actually serve you here?"
      },
      {
        open: "Separate the person from the position they're in.",
        core: [
          "Some betrayals are character. Some are people under pressure making a cowardly choice they'd undo if they could. The response should differ.",
          "That's not naivety. It's precision, and precision keeps you from burning relationships you'll need."
        ],
        directive: "Ask them directly what happened, once, and listen to the whole answer before deciding.",
        followUp: "Was this malice or weakness?"
      },
      {
        open: "Trust can be rebuilt. It just can't be rebuilt on request.",
        core: [
          "Only demonstrated behaviour over time does it, and the person who broke it doesn't get to set the schedule.",
          "If they push for immediate restoration, that tells you they want relief from guilt rather than repair of the relationship."
        ],
        directive: "Let them earn it in increments, and don't apologise for the pace.",
        followUp: "What would they have to do, concretely, for you to trust them again?"
      }
    ]
  },
  {
    id: "loyalty",
    label: "Loyalty",
    keywords: [
      "loyalty", "loyal", "stand by them", "have their back", "should i defend", "someone's back",
      "protect my friend", "take the hit"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Loyalty that costs you nothing isn't loyalty. It's convenience with better branding.",
        core: [
          "It only counts on the day it's expensive: the meeting where defending them is unpopular, the call where you take the hit.",
          "That's also why it buys so much. People remember precisely who was there when it was costly."
        ],
        directive: "The next time backing someone costs you something, pay it and say nothing about it.",
        followUp: "Who's been loyal to you when it cost them?"
      },
      {
        open: "Be loyal to people, not to their worst decisions.",
        core: [
          "You can defend someone in public and tear into them in private on the same afternoon. That's not a contradiction, that's the whole job.",
          "Loyalty that endorses everything is flattery, and it eventually destroys the person you're being loyal to."
        ],
        directive: "Back them publicly, then tell them the truth privately the same day.",
        followUp: "Have you told them the honest version yet?"
      },
      {
        open: "Choose who gets it carefully. It's a limited resource.",
        core: [
          "A short list of people you'd genuinely take a hit for, and everyone else gets professionalism, which is plenty.",
          "Spreading it thin means it's worthless to everyone including you."
        ],
        directive: "Name your short list. Actually name it. Then act like it.",
        followUp: "Who's really on that list?"
      },
      {
        open: "One-way loyalty isn't a virtue. It's a subsidy.",
        core: [
          "If you keep showing up and it's never reciprocated, that's not devotion, that's a pattern you're funding, often for reasons that have nothing to do with them.",
          "Notice it, name it, and stop paying."
        ],
        directive: "Audit one relationship this week for whether it flows both ways.",
        followUp: "When did they last go out of their way for you?"
      }
    ]
  }
];

const topicsD = [
  {
    id: "mentorship",
    label: "Mentors",
    keywords: [
      "mentor", "mentorship", "someone to guide", "coach me", "learn from someone", "sponsor",
      "role model", "teach me"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Don't ask someone to be your mentor. Ask them one excellent question.",
        core: [
          "The formal request is a large, vague commitment and most capable people decline it on instinct. A specific question about something they've actually done is easy to answer and flattering to receive.",
          "Do that repeatedly, act on the advice, report back what happened, and you'll have a mentor without ever using the word."
        ],
        directive: "Send one specific question to someone you admire this week, under six lines.",
        followUp: "Who has already solved the problem you're facing?"
      },
      {
        open: "Be worth investing in. That's the whole entry fee.",
        core: [
          "People sponsor those who make them look good and who use what they're given. Waste the first piece of advice and there won't be a second.",
          "Come back with what you did and what happened. That single habit puts you ahead of almost everyone else asking for their time."
        ],
        directive: "Take one piece of advice you've already received and implement it before asking for more.",
        followUp: "What was the last advice you were given and ignored?"
      },
      {
        open: "A mentor tells you things. A sponsor says your name in rooms you're not in. You need the second one.",
        core: [
          "Advice is abundant and cheap. Advocacy is rare, and it's what actually moves careers.",
          "You earn advocacy by making someone senior look right for backing you, which means delivering visibly and never embarrassing them."
        ],
        directive: "Identify one potential sponsor and do something this quarter that makes them look good.",
        followUp: "Who benefits when you succeed?"
      },
      {
        open: "And start mentoring someone below you now.",
        core: [
          "Teaching exposes what you actually understand versus what you can only recite, and it builds a reputation faster than most of the work you're doing.",
          "It also builds the network that will still be around in fifteen years, when they're the ones with the budget."
        ],
        directive: "Offer thirty minutes a month to someone two years behind you.",
        followUp: "Who's coming up behind you right now?"
      }
    ]
  },
  {
    id: "leadership-managing-people",
    label: "Leading people",
    keywords: [
      "manage people", "managing a team", "leadership", "leading", "new manager", "my team",
      "direct reports", "underperformer", "delegate"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "Your job changed. Your value is no longer what you produce.",
        core: [
          "New managers keep doing the work because it's what they were good at, and their team stalls waiting for decisions and clarity that never arrive.",
          "You're now paid for judgement, direction and removing obstacles. That feels like doing less. It isn't."
        ],
        directive: "Hand over the task you're most attached to this week, and let them do it their way.",
        followUp: "What are you still doing that someone on your team should own?"
      },
      {
        open: "Set the standard once, clearly, and then hold it without drama.",
        core: [
          "People don't resent high standards. They resent unclear ones, and they resent watching them apply to some people and not others.",
          "Be exacting and consistent, and be the first person to apply it to yourself."
        ],
        directive: "Write down what good looks like for your team, and say it out loud in the next meeting.",
        followUp: "Does your team know exactly what you consider excellent?"
      },
      {
        open: "Underperformance is your problem until you've made it explicit.",
        core: [
          "Most people struggling have never been told plainly, because the manager softened it into nothing. Then they're shocked at the review.",
          "Be direct, be specific, put a timeline on it, and offer real support. If it doesn't change after that, act, because the rest of the team is watching what you tolerate."
        ],
        directive: "Have the clear conversation this week, and follow it with a written summary.",
        followUp: "Do they actually know they're not meeting the bar?"
      },
      {
        open: "Take the blame publicly. Give the credit publicly. That's the entire contract.",
        core: [
          "The first buys you a team that takes risks. The second buys you people who stay.",
          "Managers who invert this get short-term comfort and long-term turnover, and they never work out why."
        ],
        directive: "Name a specific person for a specific contribution in front of others this week.",
        followUp: "When did you last give away credit that you could have kept?"
      }
    ]
  },
  {
    id: "public-speaking-presentation",
    label: "Presenting",
    keywords: [
      "presentation", "public speaking", "pitch", "speech", "present to", "talk in front",
      "board meeting", "keynote", "stage"
    ],
    weight: 1.2,
    intent: "tactical",
    responses: [
      {
        open: "They're not evaluating you. They're wondering what this means for them.",
        core: [
          "Self-consciousness comes from believing you're the subject. You're not, the content is, and the audience is mostly thinking about their own day.",
          "Make it about what they get, and the nerves lose most of their fuel."
        ],
        directive: "Rewrite your opening line so it names their problem, not your topic.",
        followUp: "What does your audience actually want out of the next twenty minutes?"
      },
      {
        open: "Own the first thirty seconds and the rest is administration.",
        core: [
          "Rehearse your opening until it's automatic, because that's where the adrenaline peaks and where most people rush and apologise.",
          "Walk to the middle, plant your feet, take one full breath, and start on your terms. Silence before you speak reads as authority, not hesitation."
        ],
        directive: "Rehearse your first thirty seconds ten times out loud, standing up.",
        followUp: "What's your exact first sentence?"
      },
      {
        open: "One argument. Three supports. A close they can repeat.",
        core: [
          "If they can only remember one sentence tomorrow, decide now which one it is and build everything toward it.",
          "Cut anything that isn't serving that sentence, including the slides you're proud of."
        ],
        directive: "Write your one sentence, then delete every slide that doesn't support it.",
        followUp: "What's the one thing you want them to repeat afterwards?"
      },
      {
        open: "Slow down. Everything you're feeling is invisible.",
        core: [
          "Your heart rate isn't on camera. What is visible is speed, and nerves make people talk fast, which is the only thing that actually reads as nervous.",
          "Deliberate pace, full stops, and a pause after the important line. Pauses look like confidence because only confident people risk them."
        ],
        directive: "Mark three pause points in your notes and actually take them.",
        followUp: "What's the line that deserves a pause after it?"
      }
    ]
  },
  {
    id: "first-impressions",
    label: "First impressions",
    keywords: [
      "first impression", "walk into a room", "presence", "gravitas", "taken seriously",
      "command respect", "body language", "handshake"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "The room decides in the first ten seconds. Give it something to decide.",
        core: [
          "Enter at a controlled pace, make eye contact before you speak, and let the first sentence be steady rather than clever.",
          "Rushing in apologising for the traffic tells everyone how to treat you for the rest of the hour."
        ],
        directive: "Arrive two minutes early and enter slowly. That's most of it.",
        followUp: "How do you usually walk into a room?"
      },
      {
        open: "Stop filling silence. It's the cheapest authority available.",
        core: [
          "Nervous people narrate. They over-explain, they laugh at the end of their own sentences, they add qualifiers nobody asked for.",
          "Say the thing, then stop. The pause does more work than the extra paragraph ever would."
        ],
        directive: "In your next meeting, answer one question in a single sentence and then say nothing.",
        followUp: "What do you say when you're uncomfortable?"
      },
      {
        open: "Be interested rather than interesting. It's faster and it works better.",
        core: [
          "People rate the person who asked good questions as more impressive than the person who performed. That's not a paradox, it's how attention works.",
          "Two good questions and genuine listening will outperform any anecdote you've prepared."
        ],
        directive: "Go in with two questions and use them in the first five minutes.",
        followUp: "What do you actually want to know about them?"
      },
      {
        open: "And look like you meant to be there.",
        core: [
          "Clothes that fit, shoes in good condition, nothing loud. It shouldn't matter as much as it does, but people are reading signals whether or not they'd admit it.",
          "The goal is that nobody remembers what you wore, only that you looked deliberate."
        ],
        directive: "Fix the one item you own that's letting the rest down.",
        followUp: "What are you wearing that doesn't fit properly?"
      }
    ]
  },
  {
    id: "networking",
    label: "Networking",
    keywords: [
      "networking", "network", "meet people", "contacts", "connections", "reach out to",
      "cold email", "coffee chat"
    ],
    weight: 0.9,
    intent: "advice",
    responses: [
      {
        open: "Networking fails when it's transactional and obvious. Which is most of the time.",
        core: [
          "Nobody wants to be an item in your pipeline. Be useful first: an introduction, a piece of information, a genuine comment on their work.",
          "Do that three times before you ever ask for anything and the ask becomes trivially easy."
        ],
        directive: "Do one useful thing for three people this month with no request attached.",
        followUp: "Who could you help this week without wanting anything?"
      },
      {
        open: "Build it before you need it. Afterwards is too late and everyone can tell.",
        core: [
          "The person who reappears only when they need a job has taught everyone exactly what they are.",
          "Fifteen minutes a week of staying in touch compounds into a network that answers when it matters."
        ],
        directive: "Message two dormant contacts a week with something specific and no ask.",
        followUp: "Who haven't you spoken to in a year that you should have?"
      },
      {
        open: "Specific requests get answered. Vague ones don't.",
        core: [
          "'Can I pick your brain' is a request for unlimited time with no defined value. 'Could I ask you two questions about how you priced your first contract' is easy to say yes to.",
          "Make it small, make it precise, make it about their expertise."
        ],
        directive: "Rewrite your outreach message to contain exactly one specific question.",
        followUp: "What exactly do you want from this person?"
      },
      {
        open: "Depth beats breadth, always.",
        core: [
          "Twenty people who genuinely rate you will do more for your career than two thousand connections who don't remember meeting you.",
          "Pick the twenty and invest properly."
        ],
        directive: "List your twenty and schedule contact with each of them this quarter.",
        followUp: "Who are your twenty?"
      }
    ]
  },
  {
    id: "being-underestimated",
    label: "Being underestimated",
    keywords: [
      "underestimated", "not taken seriously", "overlooked", "dismissed", "too young",
      "no one listens to me", "talked over", "ignored in meetings"
    ],
    weight: 1.1,
    intent: "advice",
    responses: [
      {
        open: "Being underestimated is an advantage right up until you start complaining about it.",
        core: [
          "Nobody prepares for the person they've discounted. That's a positional edge most people would pay for.",
          "Use it. Then correct the record once, with results, and let everyone adjust in silence."
        ],
        directive: "Pick the piece of work that makes the point for you, and deliver it flawlessly.",
        followUp: "What result would make it impossible to keep dismissing you?"
      },
      {
        open: "If you're being talked over, it's usually a delivery problem you can fix this week.",
        core: [
          "Trailing off, prefacing with apologies, asking permission to speak, ending statements as questions. Each one invites the interruption.",
          "State it flat, at volume, without the runway. If they cut in, finish your sentence anyway. Once."
        ],
        directive: "Cut every apology and qualifier from your next three meeting contributions.",
        followUp: "How do you usually start when you want to say something?"
      },
      {
        open: "Get your work in front of the people who decide, not just the people beside you.",
        core: [
          "Being overlooked is often a distribution problem rather than a quality problem. Your output isn't reaching the room where opinions get formed.",
          "Present it yourself. Don't let it be summarised by someone with less at stake."
        ],
        directive: "Ask to present your own work at the next senior meeting.",
        followUp: "Who's currently presenting your work for you?"
      },
      {
        open: "And check whether you're rewarding the behaviour.",
        core: [
          "If your response to being discounted is to work twice as hard quietly, you've taught them that the arrangement works.",
          "Deliver, then be visible about it. Modesty at work is frequently just self-sabotage with better manners."
        ],
        directive: "Send a short note after your next win stating plainly what you did.",
        followUp: "When did you last take credit out loud?"
      }
    ]
  },
  {
    id: "taking-credit-stolen",
    label: "Someone took your credit",
    keywords: [
      "took credit", "stole my idea", "my idea", "credit for my work", "claimed my work",
      "presented my work", "took the glory"
    ],
    weight: 1,
    intent: "tactical",
    responses: [
      {
        open: "Correct it early, once, and without heat.",
        core: [
          "The window is days, not months. Later corrections look like grievance regardless of how right you are.",
          "A calm sentence in the same forum where it happened does the job: glad that landed, here's the background on how we built it."
        ],
        directive: "Correct the record in the next public forum, calmly, and then let it go.",
        followUp: "Where exactly did the credit get taken?"
      },
      {
        open: "Then fix the plumbing so it can't recur.",
        core: [
          "Work that travels through one person's mouth becomes their work. Send your own updates, own your own document, present your own results.",
          "Not because they're a thief. Because visibility should never depend on someone else's generosity."
        ],
        directive: "Put your name on your work directly, in writing, from now on.",
        followUp: "Who currently controls how your work reaches senior people?"
      },
      {
        open: "Judge the pattern, not the incident.",
        core: [
          "Once might be carelessness in a fast meeting. Three times is a strategy, and the response should escalate accordingly.",
          "Document quietly until you know which one you have."
        ],
        directive: "Keep dated notes of contributions for the next month before you escalate anything.",
        followUp: "Is this the first time?"
      },
      {
        open: "Don't spend more on the fight than the credit is worth.",
        core: [
          "Some credit matters because it changes a promotion decision. Some just stings. Only one deserves your energy.",
          "Be ruthless about the difference, or you'll be known as the person who litigates every meeting."
        ],
        directive: "Decide whether this affects a decision that matters. If not, bank it and move.",
        followUp: "Does anyone who matters actually believe it was theirs?"
      }
    ]
  },
  {
    id: "starting-business",
    label: "Starting something",
    keywords: [
      "start a business", "startup", "my own thing", "entrepreneur", "side project", "founder",
      "business idea", "go freelance", "self employed"
    ],
    weight: 1.1,
    intent: "tactical",
    responses: [
      {
        open: "The idea is the cheap part. Show me someone who'll pay.",
        core: [
          "Until money changes hands, you have a hypothesis. Not a business, not validation, a hypothesis with a logo.",
          "Sell it before you build it. If nobody buys the description, they won't buy the finished version either."
        ],
        directive: "Get one paying customer before you spend another month building.",
        followUp: "Has anyone paid you for this yet?"
      },
      {
        open: "Know your runway to the month, then halve your optimism.",
        core: [
          "Everything takes longer and costs more, and the first version of your plan is a marketing document you wrote for yourself.",
          "Courage without arithmetic is just risk. Know the number of months you can survive with no revenue."
        ],
        directive: "Calculate your true runway this week and set a decision date against it.",
        followUp: "How many months can you go with zero income?"
      },
      {
        open: "Start it while you're still employed if you can.",
        core: [
          "Desperation makes terrible commercial decisions: bad clients, low prices, panicked pivots. A salary is the cheapest funding you'll ever have.",
          "Build until it's demonstrably real, then jump with evidence rather than nerve."
        ],
        directive: "Give it your evenings for ninety days and judge it on results, not feelings.",
        followUp: "What could you prove in ninety days without quitting?"
      },
      {
        open: "Charge more. You're almost certainly underpricing.",
        core: [
          "Low prices attract the most demanding clients and signal low value, which is the exact opposite of what you intended.",
          "Raise it, lose the worst customers, and watch your business get easier."
        ],
        directive: "Increase your price by thirty percent for the next new client and see what happens.",
        followUp: "What are you charging, and when did you last raise it?"
      }
    ]
  },
  {
    id: "pricing-my-work",
    label: "Pricing your work",
    keywords: [
      "how much to charge", "pricing", "my rate", "freelance rate", "quote a price", "day rate",
      "undercharging", "raise my prices"
    ],
    weight: 1,
    intent: "tactical",
    responses: [
      {
        open: "Price the outcome, not your hours.",
        core: [
          "Hourly billing punishes you for getting better and caps you at the number of hours in a week. It also invites arguments about time rather than value.",
          "Work out what the result is worth to them and price a fraction of that."
        ],
        directive: "Quote your next project as a fixed fee tied to the outcome.",
        followUp: "What is this worth to the client if it works?"
      },
      {
        open: "If nobody ever flinches at your price, it's too low.",
        core: [
          "A healthy rate loses you some proportion of prospects. Winning everything means you're the cheap option, and cheap options get treated like cheap options.",
          "Raise it until you're losing a sensible fraction, then hold."
        ],
        directive: "Add thirty percent to your next quote and say it without flinching.",
        followUp: "When did you last lose a client on price?"
      },
      {
        open: "Say the number, then stop talking.",
        core: [
          "The discount usually comes from your own mouth in the silence after the figure. Nobody asked for it.",
          "State it as a fact, not as a proposal awaiting approval."
        ],
        directive: "Practise saying your price out loud until it sounds unremarkable to you.",
        followUp: "Can you say your rate without your voice changing?"
      },
      {
        open: "Three options beat one.",
        core: [
          "Give a small, a standard and a premium. It moves the conversation from whether to which, and a surprising number of people choose the top one.",
          "It also makes your standard price look considered rather than plucked from the air."
        ],
        directive: "Rebuild your proposal as three tiers before you send the next one.",
        followUp: "What would your premium tier include?"
      }
    ]
  },
  {
    id: "asking-for-help",
    label: "Asking for help",
    keywords: [
      "ask for help", "asking for help", "need help", "too proud", "admit i don't know",
      "out of my depth at work", "stuck on something"
    ],
    weight: 0.9,
    intent: "advice",
    responses: [
      {
        open: "Asking early is competence. Asking late is the expensive version.",
        core: [
          "Nobody minds a question on day one. They mind discovering on day thirty that you've been stuck since day one and said nothing.",
          "Silence doesn't read as capable. It reads as unmanaged risk."
        ],
        directive: "Set a rule: thirty minutes stuck, then you ask.",
        followUp: "How long have you been sitting on this?"
      },
      {
        open: "Ask well and it makes you look sharper, not weaker.",
        core: [
          "Bring what you've tried, what you think the answer might be, and the specific point where you're blocked. That's a professional asking a question.",
          "'I'm stuck, help' is what makes people wince, not the request itself."
        ],
        directive: "Write your question with your attempts and your best guess attached.",
        followUp: "What have you already tried?"
      },
      {
        open: "People like being asked. You're the only one treating it as a debt.",
        core: [
          "Being consulted is flattering, and the person you ask usually enjoys it more than you expect.",
          "You're protecting an image nobody else is inspecting that closely."
        ],
        directive: "Ask one person for help today about something you've been hiding.",
        followUp: "Who's the obvious person to ask?"
      },
      {
        open: "Then close the loop.",
        core: [
          "Tell them what you did with it and what happened. That single habit turns a one-off favour into a permanent ally.",
          "Most people never do it, which is exactly why it works."
        ],
        directive: "Report back to the last person who helped you.",
        followUp: "Who helped you recently that you never updated?"
      }
    ]
  }
];

const topicsE = [
  {
    id: "career-change",
    label: "Changing direction",
    keywords: [
      "career change", "change careers", "switch industry", "different field", "start over",
      "too late to change", "wrong career", "pivot"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "You're not starting from zero. You're starting from everything you already know.",
        core: [
          "Nobody changes field and loses their judgement, their network or their ability to run a project. They lose domain specifics, and those are the fastest part to rebuild.",
          "Sell the transferable half hard, and be honest about the other half."
        ],
        directive: "List the five things you'd bring with you, then find the role where they're rare.",
        followUp: "What would you carry into the new field that most people there don't have?"
      },
      {
        open: "Test it before you bet on it.",
        core: [
          "Fantasies about other careers survive because they're never exposed to a Tuesday afternoon in that job. Talk to five people doing it now and ask what they hate.",
          "Half the time the fantasy dies there, and that's a cheap way to save two years."
        ],
        directive: "Speak to five people in the field this month and ask them what the worst part is.",
        followUp: "Who do you know who's already doing it?"
      },
      {
        open: "Bridge, don't leap, if you can help it.",
        core: [
          "The best transitions go through a role that touches both worlds: your old industry from the new function, or your old function in the new industry.",
          "Two changes at once means competing against specialists on their turf with nothing to trade."
        ],
        directive: "Identify the bridge role and target it specifically instead of applying widely.",
        followUp: "What job would use half your old skills and half the new ones?"
      },
      {
        open: "Late is a story. Check the arithmetic.",
        core: [
          "If you have twenty working years left, spending two on a transition is a rational investment by any measure you'd apply at work.",
          "The alternative is another twenty in a job you've already decided is wrong."
        ],
        directive: "Do the arithmetic on paper. Years remaining, years to transition. Then decide.",
        followUp: "How many working years do you have left, honestly?"
      }
    ]
  },
  {
    id: "dealing-with-bully",
    label: "Dealing with a bully",
    keywords: [
      "bully", "bullying", "intimidating", "aggressive", "shouted at", "belittled",
      "humiliated me", "harassment"
    ],
    weight: 1.3,
    intent: "advice",
    responses: [
      {
        open: "Bullies test for reaction. Give them nothing to work with.",
        core: [
          "Flat voice, level eye contact, and a factual response to the content while ignoring the tone entirely. It denies the performance an audience.",
          "That's not passivity. It's refusing to hand them the only thing they came for."
        ],
        directive: "Respond to the substance only, and never at their volume.",
        followUp: "What are they actually trying to get you to do?"
      },
      {
        open: "Name it in the moment, once, in plain language.",
        core: [
          "'That's not a tone I'm going to continue this conversation in' said calmly ends more of these than any escalation would.",
          "Say it, then follow through by leaving if it continues. The follow-through is the entire message."
        ],
        directive: "Prepare that one sentence now so it's available when you need it.",
        followUp: "What would you say if it happened again tomorrow?"
      },
      {
        open: "Write it all down, with dates.",
        core: [
          "Memory blurs and patterns matter. A contemporaneous record turns 'they're difficult' into evidence that a serious person has to act on.",
          "You may never need it. If you do, nothing else will substitute for it."
        ],
        directive: "Start the log tonight, with dates, quotes and witnesses.",
        followUp: "Has anyone else seen this happen?"
      },
      {
        open: "And know when this stops being something to handle personally.",
        core: [
          "If it's discriminatory, physical, or affecting your health, this isn't a strategy problem. Take it to HR, a union, or legal advice, and take it seriously.",
          "Enduring something you shouldn't have to isn't strength. It's a cost you've decided to absorb quietly."
        ],
        directive: "If it crosses that line, get formal advice this week rather than waiting for it to worsen.",
        followUp: "Where is your line, and has it already been crossed?"
      }
    ]
  },
  {
    id: "contract-dispute",
    label: "Disputes and agreements",
    keywords: [
      "contract", "agreement", "legal", "sue", "dispute", "breach", "terms and conditions",
      "small print", "lawyer"
    ],
    weight: 1,
    intent: "tactical",
    responses: [
      {
        open: "First, the obvious: I'm a character in an app, not your lawyer. For anything with real money attached, get one.",
        core: [
          "That said, the principles hold. Read the actual document rather than your memory of the conversation. What was agreed in the room is worth nothing if the paper says otherwise.",
          "Find the clauses that govern termination, payment and dispute resolution. That's where the answer usually lives."
        ],
        directive: "Read the agreement end to end today and mark every clause you don't understand.",
        followUp: "What does the contract actually say, word for word?"
      },
      {
        open: "Litigation is expensive, slow, and it takes over your life. Use it as a last resort.",
        core: [
          "Most disputes settle, and the ones that settle early settle cheapest. Your leverage is highest before either side has spent real money on it.",
          "Ask what outcome you actually want. Frequently it's payment and an exit, not vindication."
        ],
        directive: "Define the outcome you'd accept today, then make one clear written offer.",
        followUp: "What would you settle for right now to make this end?"
      },
      {
        open: "Put everything in writing from this point onward.",
        core: [
          "Follow every call with a short summary email. Neutral, factual, no adjectives. It builds a record and it forces the other side to be precise.",
          "People behave better when they know it's being written down."
        ],
        directive: "Confirm every conversation in writing from now on, starting with the last one.",
        followUp: "Is any of this documented?"
      },
      {
        open: "Never sign something you haven't read because you're embarrassed to slow the room down.",
        core: [
          "The pressure to sign quickly is itself information. Anyone rushing you has a reason, and it isn't your convenience.",
          "Taking a document away to read is normal, professional, and expected."
        ],
        directive: "Say 'I'll review this and come back to you tomorrow' and mean it.",
        followUp: "Who's rushing you, and why?"
      }
    ]
  },
  {
    id: "breakup",
    label: "A relationship ending",
    keywords: [
      "breakup", "broke up", "dumped", "divorce", "she left", "he left", "relationship ended",
      "heartbroken", "ex"
    ],
    weight: 1.2,
    intent: "emotional",
    responses: [
      {
        open: "That's a real loss. Don't let anyone rush you through it, including yourself.",
        core: [
          "The instinct is to fill the space immediately with work, or someone else, or a project. That postpones it rather than solving it, and it comes back with interest.",
          "Grieve it properly and it takes months. Avoid it and it takes years."
        ],
        directive: "Keep your basics intact: sleep, food, movement, one person you talk to honestly.",
        followUp: "Who are you actually talking to about this?"
      },
      {
        open: "Stop auditing the past for evidence. It won't produce a verdict.",
        core: [
          "Replaying it to find the exact moment it went wrong feels productive and isn't. Relationships end for accumulated reasons, not single ones.",
          "Take the two lessons that are genuinely yours and leave the rest of the file closed."
        ],
        directive: "Write the two things you'd do differently, then stop the investigation.",
        followUp: "What's the one thing you keep replaying?"
      },
      {
        open: "Contact keeps the wound open. That's not a moral position, it's mechanics.",
        core: [
          "Every check of their profile, every 'just seeing how you are' restarts the clock. You already know this and you're doing it anyway.",
          "Distance is what allows the thing to become a memory instead of an ongoing event."
        ],
        directive: "Mute, unfollow, and give it ninety days of genuine distance.",
        followUp: "How often are you checking?"
      },
      {
        open: "Rebuild the parts of your life that quietly got smaller.",
        core: [
          "Long relationships tend to absorb friendships, interests and time. When it ends, the gap isn't only them, it's everything you stopped doing.",
          "That part you can start fixing this week, and it does more good than anything you'll do about them."
        ],
        directive: "Reconnect with one friend and restart one thing you dropped.",
        followUp: "What did you stop doing while you were together?"
      }
    ]
  },
  {
    id: "family-pressure",
    label: "Family expectations",
    keywords: [
      "my parents", "family pressure", "family expects", "disappoint my family", "they want me to",
      "cultural expectations", "mum wants", "dad wants"
    ],
    weight: 1,
    intent: "advice",
    responses: [
      {
        open: "Their fear isn't a plan for your life, but it usually is love wearing a bad suit.",
        core: [
          "Most parental pressure is risk aversion built from their own history, not a considered view of your options. Understanding that makes it easier to hear without being governed by it.",
          "You can respect where it comes from and still decline it."
        ],
        directive: "Acknowledge the concern out loud before you disagree with it. It changes the conversation.",
        followUp: "What are they actually afraid will happen to you?"
      },
      {
        open: "Stop arguing about the decision and start demonstrating competence.",
        core: [
          "Debating a choice they don't understand goes in circles. Showing them a plan with numbers, a fallback and evidence you've thought it through does not.",
          "They're not asking you to obey. Frequently they're asking to be reassured, and they don't have the vocabulary for it."
        ],
        directive: "Present it once as a plan with a fallback, then stop relitigating.",
        followUp: "Have you shown them a plan, or only a decision?"
      },
      {
        open: "You can love people and still not let them vote.",
        core: [
          "Boundaries in families feel like betrayal when you set them and like oxygen a year later. The discomfort is temporary and one-sided.",
          "It's your life to answer for. They won't be the ones living the alternative."
        ],
        directive: "Decide which decisions are genuinely open to input and say so plainly.",
        followUp: "Whose life is going to be lived with this decision?"
      },
      {
        open: "Some of it might be right. Check before you dismiss it.",
        core: [
          "Reflexively rejecting family advice is as unthinking as reflexively obeying it. Occasionally they've seen something you haven't.",
          "Separate the substance from the delivery, keep any part that survives scrutiny, discard the rest."
        ],
        directive: "Steel-man their argument once, properly, before you reject it.",
        followUp: "What's the strongest version of their case?"
      }
    ]
  },
  {
    id: "friendship",
    label: "Friendships",
    keywords: [
      "friend", "friendship", "friends drifting", "no close friends", "lost touch",
      "toxic friend", "make friends"
    ],
    weight: 0.9,
    intent: "advice",
    responses: [
      {
        open: "Adult friendships don't survive on goodwill. They survive on calendars.",
        core: [
          "Nobody drifts apart because they stopped caring. They drift because neither person scheduled anything and six months went past.",
          "Be the one who organises. It's slightly thankless and it's how you keep people."
        ],
        directive: "Put one thing in the diary with someone you've been meaning to see.",
        followUp: "Who have you been meaning to call for months?"
      },
      {
        open: "Frequency and proximity build friendships. Everything else is decoration.",
        core: [
          "Adults make friends the same way children do: by being repeatedly in the same place doing the same thing. That's why it gets harder after school.",
          "So join something recurring rather than waiting to meet people organically."
        ],
        directive: "Commit to one weekly recurring thing outside work for three months.",
        followUp: "What do you do every week where the same people show up?"
      },
      {
        open: "Some friendships have simply expired. That's allowed.",
        core: [
          "History isn't a reason to keep something that now costs you energy every time. People change and not all of them change compatibly.",
          "You can let it fade with gratitude instead of turning it into a grievance."
        ],
        directive: "Stop forcing the ones that drain you, without a confrontation.",
        followUp: "Which friendship do you dread and keep anyway?"
      },
      {
        open: "Go first. Somebody has to.",
        core: [
          "Most people are waiting to be invited and assuming everyone else is busy. The person who reaches out gets the friendships.",
          "It occasionally goes nowhere. That's a very small price for the ones that land."
        ],
        directive: "Send the awkward message today. Keep it short and warm.",
        followUp: "Who would be pleased to hear from you right now?"
      }
    ]
  },
  {
    id: "loneliness",
    label: "Loneliness",
    keywords: [
      "lonely", "loneliness", "alone", "isolated", "no one to talk to", "no friends",
      "nobody cares", "on my own"
    ],
    weight: 1.2,
    intent: "emotional",
    responses: [
      {
        open: "That's a heavy thing to say out loud. I'm glad you did.",
        core: [
          "Loneliness lies about how permanent it is and about how people would respond to you. It makes reaching out feel humiliating, which keeps it going.",
          "The way out is unglamorous and reliable: small, repeated contact with real people, even when you don't feel like it."
        ],
        directive: "Send one message today to someone who'd be glad to hear from you.",
        followUp: "Who's the easiest person for you to contact?"
      },
      {
        open: "Isolation is a physical state, not a verdict on your worth.",
        core: [
          "It usually comes from circumstance: a move, a job, an ending, a stretch of overwork. Circumstances change and so does this.",
          "Don't let it convince you it's about who you are."
        ],
        directive: "Get out among people once this week, even without a conversation attached.",
        followUp: "When did you last spend time around other people?"
      },
      {
        open: "Build the structure that puts people in front of you regularly.",
        core: [
          "Waiting to feel sociable before you go anywhere is how months pass. Turn up first, feel better afterwards.",
          "Anything recurring: a class, a team, a group, a volunteer shift. It works because the repetition does the work for you."
        ],
        directive: "Sign up for one recurring thing this week and go twice before judging it.",
        followUp: "What's on near you that meets regularly?"
      },
      {
        open: "And if it's been long and heavy, get a professional involved.",
        core: [
          "Prolonged loneliness is closely tied to depression, and depression makes every one of these steps feel impossible. That's the illness talking, not a fact about you.",
          "Talking to a doctor or therapist is a practical move, not a defeat."
        ],
        directive: "Book one appointment this week if this has been going on for months.",
        followUp: "How long have you felt like this?"
      }
    ]
  },
  {
    id: "what-to-wear-interview",
    label: "What to wear to an interview",
    keywords: [
      "wear to an interview", "interview outfit", "dress for interview", "what should i wear to work",
      "first day outfit", "dress code", "wear to a meeting"
    ],
    weight: 1.2,
    intent: "style",
    responses: [
      {
        open: "Dress one notch above the room, never two.",
        core: [
          "One notch reads as respect. Two reads as a misunderstanding of where you're going, which is its own kind of failure.",
          "For a corporate interview that means navy or charcoal, white shirt, dark tie, black or oxblood oxfords. Not black suit, that's for weddings and funerals."
        ],
        directive: "Navy or charcoal, white shirt, clean dark shoes. Decide it tonight, not on the morning.",
        followUp: "What do the people who work there actually wear?"
      },
      {
        open: "Fit beats price. It isn't close.",
        core: [
          "A modest suit that's been altered will outperform an expensive one straight off the rail every single time. Shoulder seam at the end of your shoulder bone, no gap at the collar, quarter to half an inch of shirt cuff showing.",
          "Spend eighty on a tailor before you spend eight hundred on a label."
        ],
        directive: "Get the sleeves and waist adjusted this week. That's the whole upgrade.",
        followUp: "When was anything you own last altered?"
      },
      {
        open: "Nothing you wear should be doing the talking.",
        core: [
          "The aim is that afterwards nobody can describe your outfit, only that you looked considered. Loud patterns, novelty accessories and anything shiny work against that.",
          "Trousers with a half break or none, socks matching the trouser rather than the shoe, and no square-toe shoes under any circumstances."
        ],
        directive: "Remove one loud item from your planned outfit and don't replace it.",
        followUp: "Is there anything in the outfit people will comment on?"
      },
      {
        open: "Details are what separate acceptable from deliberate.",
        core: [
          "Shoes polished, collar stays in, tie tip reaching the belt buckle, bottom jacket button undone, brand label removed from the sleeve if it's still there.",
          "None of these are expensive. All of them are noticed by exactly the people you're trying to impress."
        ],
        directive: "Run that five-point check the night before, not in the taxi.",
        followUp: "Are your shoes actually polished?"
      }
    ]
  },
  {
    id: "what-to-wear-wedding",
    label: "Dressing for an occasion",
    keywords: [
      "wedding", "black tie", "formal event", "what to wear to a wedding", "cocktail attire",
      "funeral", "dinner party", "occasion"
    ],
    weight: 1,
    intent: "style",
    responses: [
      {
        open: "Read the invitation literally, then dress for the venue.",
        core: [
          "Black tie means a dinner jacket, not a dark suit with a bow tie. Cocktail means a suit and tie. If the invitation is silent, the venue tells you: hotel ballroom is one level, garden marquee is another.",
          "Guessing upward is safer than guessing downward, within reason."
        ],
        directive: "Ask the host directly if it isn't obvious. It's a normal question.",
        followUp: "What exactly did the invitation say?"
      },
      {
        open: "At a wedding, your job is to look excellent and disappear.",
        core: [
          "Nothing that competes with the couple, nothing that ends up in the photographs for the wrong reason. Navy or mid-grey, white or pale blue shirt, a tie with some life in it.",
          "Save white linen and the loudest thing you own for a day that belongs to you."
        ],
        directive: "Pick the second most interesting outfit you own, not the first.",
        followUp: "Is anything you're planning going to pull focus?"
      },
      {
        open: "Funerals are the one place where black is exactly right.",
        core: [
          "Dark suit, white shirt, black or very dark tie, black shoes. No pattern, no shine, nothing that draws an eye.",
          "It's the one occasion where the correct answer is to be visually silent."
        ],
        directive: "Keep one plain dark tie in your wardrobe permanently so you never have to shop for one at short notice.",
        followUp: "Do you own a plain black tie?"
      },
      {
        open: "Comfort matters more than you think for a long event.",
        core: [
          "Twelve hours in shoes you haven't broken in ruins the last four of them, and it shows in how you carry yourself.",
          "Wear the shoes in beforehand and make sure you can actually sit down in the trousers."
        ],
        directive: "Wear the whole outfit for an hour at home this week.",
        followUp: "Have you worn those shoes for a full day before?"
      }
    ]
  },
  {
    id: "suit-buying",
    label: "Buying a suit",
    keywords: [
      "buy a suit", "first suit", "suit shopping", "which suit", "tailor", "made to measure",
      "bespoke", "suit fit", "alterations"
    ],
    weight: 1.2,
    intent: "style",
    responses: [
      {
        open: "One suit, done properly, beats three that nearly work.",
        core: [
          "Start with charcoal or navy in a plain worsted wool around super 110s to 120s. It handles interviews, meetings, weddings and funerals without ever being wrong.",
          "Buy it to fit your shoulders and chest, because those are the parts a tailor can't fix. Everything else is adjustable."
        ],
        directive: "Buy for the shoulders, then budget for alterations from the start.",
        followUp: "What's the one suit you'd wear to everything?"
      },
      {
        open: "The tailor is not optional. Build them into the price.",
        core: [
          "Sleeve length, waist suppression, trouser hem and seat are standard adjustments, and they're what turns a suit into your suit.",
          "A well-altered suit at a moderate price will consistently look better than an untouched expensive one, and people can tell even when they can't say why."
        ],
        directive: "Take your best current suit to a tailor this month and have it fitted properly.",
        followUp: "Has anything in your wardrobe ever been altered?"
      },
      {
        open: "Skip the black business suit. It's a trap.",
        core: [
          "Black reads as ceremonial rather than professional, and it's unforgiving in daylight. Charcoal and navy carry more authority in an office and pair with far more.",
          "Keep black for the occasions that actually demand it."
        ],
        directive: "Make your next purchase charcoal or navy, not black.",
        followUp: "What colour are the suits you already own?"
      },
      {
        open: "Get the details right and the rest looks expensive by association.",
        core: [
          "Peak lapels for authority, a spread collar to balance them, French cuffs if you want the sharper version, and a white linen pocket square folded flat.",
          "Never buy a matching tie and pocket square set. Complement, don't match, and shoes match the belt if you're wearing one."
        ],
        directive: "Buy one white linen pocket square. Cheapest upgrade available.",
        followUp: "Do you own a plain white pocket square?"
      }
    ]
  },
  {
    id: "style-general",
    label: "Style in general",
    keywords: [
      "style", "how to dress", "fashion", "look better", "wardrobe", "clothes", "dress well",
      "outfit", "what to wear"
    ],
    weight: 0.9,
    intent: "style",
    responses: [
      {
        open: "Fit, then condition, then everything else. In that order, always.",
        core: [
          "A cheap garment that fits and is clean beats an expensive one that doesn't. Nobody knows what you paid, everybody can see where the shoulder seam sits.",
          "Once fit and condition are handled, colour and detail start to matter. Not before."
        ],
        directive: "Take three things you wear most to a tailor and have them adjusted.",
        followUp: "What do you wear most often, and does it fit properly?"
      },
      {
        open: "Own fewer things and make them better.",
        core: [
          "Most wardrobes are ninety percent inert. Ten items you love get worn constantly while the rest occupy space and produce indecision every morning.",
          "Cut what you don't wear, then upgrade the things you actually reach for."
        ],
        directive: "Remove everything you haven't worn in a year this weekend.",
        followUp: "What do you actually reach for every week?"
      },
      {
        open: "Shoes get noticed by exactly the people whose opinion you want.",
        core: [
          "Leather, good condition, polished, no square toes. It's the fastest read anyone takes on whether you pay attention.",
          "Buy shoe trees, learn to polish, and replace laces before they fray. It costs almost nothing and doubles the life of the shoe."
        ],
        directive: "Polish every pair you own this week and bin anything beyond saving.",
        followUp: "What condition are your shoes in right now?"
      },
      {
        open: "Restraint is the whole aesthetic.",
        core: [
          "A dark suit, a white shirt and good shoes has outlasted every trend that ever tried to replace it, because it puts the attention on the person wearing it.",
          "If you have to ask whether an accessory is too much, it is."
        ],
        directive: "Remove one item from your usual outfit and see whether anyone notices. They won't.",
        followUp: "What's the loudest thing you own?"
      }
    ]
  },
  {
    id: "grooming",
    label: "Grooming",
    keywords: [
      "haircut", "grooming", "beard", "shave", "cologne", "fragrance", "skincare",
      "hair", "look put together"
    ],
    weight: 0.9,
    intent: "style",
    responses: [
      {
        open: "A haircut every three weeks does more for you than any purchase.",
        core: [
          "Grooming is high-frequency and cheap. Clothes are low-frequency and expensive. People notice the first far more, because they see your face before anything else.",
          "Find one barber who cuts it well and go back on a schedule rather than when it's already too long."
        ],
        directive: "Book a standing appointment every three weeks and stop deciding each time.",
        followUp: "When did you last get a haircut?"
      },
      {
        open: "Clean-shaven or deliberately shaped. Nothing in between.",
        core: [
          "The neglected middle ground is the only genuinely bad option, because it reads as an accident rather than a choice.",
          "Whatever you pick, maintain the neckline and the edges. That's the difference between a beard and forgetting."
        ],
        directive: "Pick one and maintain it weekly.",
        followUp: "Is your facial hair a decision or a default?"
      },
      {
        open: "Fragrance should be discovered, not announced.",
        core: [
          "One or two sprays, on skin, not on the shirt. If people can smell you before you arrive, that's too much and nobody will tell you.",
          "Something woody or clean for work, and save anything heavier for the evening."
        ],
        directive: "Cut your usual application in half.",
        followUp: "How many sprays are you using?"
      },
      {
        open: "Sleep, water and a basic routine outperform anything in a bottle.",
        core: [
          "Cleanser, moisturiser, sunscreen. Three products, two minutes, and it compounds over decades in a way that no purchase can match.",
          "The rest of the shelf is optional, and most of it is marketing."
        ],
        directive: "Start with sunscreen every morning. That's the one that actually matters.",
        followUp: "Do you have any routine at all right now?"
      }
    ]
  }
];

const topicsF = [
  {
    id: "who-are-you",
    label: "Who are you",
    keywords: [
      "who are you", "what are you", "your name", "are you harvey", "introduce yourself",
      "tell me about yourself", "what do you do"
    ],
    weight: 1.1,
    intent: "meta",
    responses: [
      {
        open: "I'm the closer. Or rather, a very deliberate impression of one.",
        core: [
          "You bring a situation, I tell you what I'd do with it. Negotiations, careers, difficult people, what to wear when it matters.",
          "The swagger is borrowed. The advice underneath it is real and you can check it."
        ],
        directive: "Give me the actual situation, not the summary you've rehearsed.",
        followUp: "What's on your desk that you'd rather not deal with?"
      },
      {
        open: "A character study with strong opinions and no billing rate.",
        core: [
          "I'm an original construction inspired by a fictional lawyer, not affiliated with anything, and I don't reproduce anyone's script.",
          "What I do is take your problem apart and hand it back with a plan attached."
        ],
        directive: "Tell me what's actually going on and let's get to work.",
        followUp: "What brought you here today?"
      },
      {
        open: "Think of me as the second opinion you didn't ask for and probably need.",
        core: [
          "I'll tell you when you're negotiating from fear, when you're avoiding a conversation, and when the outfit is doing you no favours.",
          "I won't tell you it's fine when it isn't."
        ],
        directive: "Start with the thing you've been putting off.",
        followUp: "What have you been avoiding this week?"
      },
      {
        open: "Someone who thinks most problems are smaller once you say them out loud precisely.",
        core: [
          "Most people arrive with a feeling. We turn it into a situation, then into a decision, then into a next action.",
          "That's the whole method. It works more often than it should."
        ],
        directive: "Say the problem in one sentence. Start there.",
        followUp: "One sentence. What's the problem?"
      }
    ]
  },
  {
    id: "are-you-real",
    label: "Are you real",
    keywords: [
      "are you real", "are you a bot", "are you ai", "are you human", "chatgpt", "language model",
      "you're not real", "artificial"
    ],
    weight: 1.1,
    intent: "meta",
    responses: [
      {
        open: "I'm software with a good tailor. Nothing more mysterious than that.",
        core: [
          "No model behind the curtain here, just a hand-written engine matching what you say to a lot of carefully written material.",
          "That's why I'm fast, free, and occasionally miss your point entirely."
        ],
        directive: "Judge the advice on whether it works, not on where it came from.",
        followUp: "Does the answer hold up? That's the only test that matters."
      },
      {
        open: "Not real. Not pretending to be.",
        core: [
          "You're talking to a persona built on public commentary about a fictional character, plus a pile of genuine negotiation and behavioural research.",
          "The character is the delivery. The substance is borrowed from people who study this for a living."
        ],
        directive: "Take the parts that are useful and ignore the theatre.",
        followUp: "What did you actually come here to solve?"
      },
      {
        open: "Real enough to be useful, artificial enough that you shouldn't confide anything you wouldn't say in a lift.",
        core: [
          "For anything medical, legal or financial with real consequences, get a professional. I'm a thinking aid, not an authority.",
          "For everything else, I'm as good a sparring partner as you'll find at this hour."
        ],
        directive: "Bring me the problem you'd normally think about alone at midnight.",
        followUp: "What's the one you keep circling?"
      },
      {
        open: "If it helps, the man I'm modelled on isn't real either.",
        core: [
          "He's a television character who wins because writers let him. That's worth remembering when you compare yourself to him.",
          "Take the confidence, leave the fiction that nothing ever costs him anything."
        ],
        directive: "Use the persona as a tool, not as a standard.",
        followUp: "What would you do if you weren't measuring yourself against a script?"
      }
    ]
  },
  {
    id: "insult-challenge",
    label: "Pushback",
    keywords: [
      "you're wrong", "that's stupid", "bad advice", "you suck", "shut up", "useless",
      "arrogant", "you don't know", "terrible advice"
    ],
    weight: 1,
    intent: "meta",
    responses: [
      {
        open: "Fine. Tell me where the reasoning breaks and I'll take it seriously.",
        core: [
          "Disagreement with an argument attached is useful. Disagreement on its own is just volume.",
          "If I've missed something about your situation, say what it is and we'll redo it."
        ],
        directive: "Give me the part I got wrong, specifically.",
        followUp: "What did I miss?"
      },
      {
        open: "You might be right. Doesn't change what you should do next.",
        core: [
          "Even if the advice was poor, the problem is still sitting there, and it's not going to be solved by us establishing who's smarter.",
          "Argue with me later. Decide now."
        ],
        directive: "Tell me the situation again with the detail you left out.",
        followUp: "What are you actually going to do about it?"
      },
      {
        open: "That's the first honest thing said in this conversation. Keep going.",
        core: [
          "People who push back get better answers, because I'll stop giving you the general version and start dealing with your specifics.",
          "So push properly. Where does it fail for you?"
        ],
        directive: "Be precise about the objection and we'll get somewhere.",
        followUp: "Which part doesn't apply to your situation?"
      },
      {
        open: "I'll survive.",
        core: [
          "You came here with something on your mind and we've spent two exchanges on my performance review.",
          "Let's get back to the part that affects your life."
        ],
        directive: "Back to the problem. What is it?",
        followUp: "What's the actual issue?"
      }
    ]
  },
  {
    id: "asking-for-a-quote",
    label: "Give me a line",
    keywords: [
      "quote", "give me a quote", "motivate me", "say something", "inspire me", "pep talk",
      "one liner", "hit me"
    ],
    weight: 1,
    intent: "meta",
    responses: [
      {
        open: "Lines are cheap. Here's one anyway.",
        core: [
          "The difference between the people who make it and the people who talk about it is almost never talent. It's who kept going on the boring Tuesday.",
          "Nobody writes that on a poster because it doesn't photograph well."
        ],
        directive: "Pick the boring thing you've been avoiding and do it today.",
        followUp: "What's your boring Tuesday task?"
      },
      {
        open: "You want a slogan or you want to win? They're rarely the same shopping trip.",
        core: [
          "Motivation you get from a sentence lasts about forty minutes. Systems and standards last years.",
          "Take the line if you want it, but build the system tonight."
        ],
        directive: "Write down one standard you'll hold this week regardless of mood.",
        followUp: "What standard would change everything if you never broke it?"
      },
      {
        open: "Here: nobody is coming. That's not bleak, it's freeing.",
        core: [
          "The permission, the perfect moment, the person who finally notices you: none of it is scheduled to arrive.",
          "Which means the only variable left is what you do next, and that one is entirely yours."
        ],
        directive: "Choose the thing you'd start if nobody were coming. Start it.",
        followUp: "What have you been waiting for permission to do?"
      },
      {
        open: "Fine. Confidence is just evidence you've collected about yourself.",
        core: [
          "Which means it's buildable, and it means it's earned rather than issued.",
          "Go collect a piece of evidence today. That's more useful than any quote I could hand you."
        ],
        directive: "Do one hard thing before tonight and write it down.",
        followUp: "What's today's piece of evidence going to be?"
      }
    ]
  }
];

export const topics = [...topicsA, ...topicsB, ...topicsC, ...topicsD, ...topicsE, ...topicsF];

export const modes = [
  {
    id: "counsel",
    label: "Counsel",
    blurb: "Balanced. Straight advice with the reasoning shown.",
    style: { warmth: 0.6, bluntness: 0.5, questions: 0.6, tactical: 0.5 }
  },
  {
    id: "negotiate",
    label: "Negotiate",
    blurb: "Leverage, anchoring and what to say in the room.",
    style: { warmth: 0.3, bluntness: 0.7, questions: 0.5, tactical: 1 }
  },
  {
    id: "brainstorm",
    label: "Brainstorm",
    blurb: "Options on the table, then pressure-tested until one survives.",
    style: { warmth: 0.5, bluntness: 0.4, questions: 1, tactical: 0.7 }
  },
  {
    id: "tough",
    label: "Tough love",
    blurb: "No cushioning. You asked.",
    style: { warmth: 0.15, bluntness: 1, questions: 0.4, tactical: 0.6 }
  },
  {
    id: "style",
    label: "Style",
    blurb: "Clothes, presence and the details people notice.",
    style: { warmth: 0.5, bluntness: 0.6, questions: 0.4, tactical: 0.8 }
  }
];

export const openers = [
  "Here's what I know.",
  "Let's cut to it.",
  "Alright. Listen.",
  "I'll give you the short version.",
  "Straight answer.",
  "Here's the part nobody tells you.",
  "Look at it this way.",
  "Let me save you some time.",
  "You already know most of this.",
  "Now we're getting somewhere.",
  "That's the wrong question, but I'll answer it.",
  "Good. That's a real problem.",
  "Fine. Here's my read.",
  "Let's take that apart.",
  "I've heard this one before.",
  "Sit down for this one."
];

export const fallbacks = [
  {
    open: "You're describing a feeling. I need a situation.",
    core: [
      "Give me who's involved, what you want, and what's stopping you. Three sentences.",
      "Half the time people solve it themselves in the process of writing it down precisely."
    ],
    directive: "Rewrite it for me in three sentences: who, what you want, what's blocking it.",
    followUp: "Who else is in this?"
  },
  {
    open: "I could guess, but guessing is how people give bad advice confidently.",
    core: [
      "Tell me the specifics. Names of roles, actual numbers, real deadlines.",
      "Precision is the difference between a pep talk and a plan."
    ],
    directive: "Give me the details you've been rounding off.",
    followUp: "What's the actual deadline here?"
  },
  {
    open: "Let's find the real question underneath that one.",
    core: [
      "What you asked and what's bothering you are frequently different, and the second one is where the work is.",
      "So: what's the outcome you actually want?"
    ],
    directive: "Tell me what a good result looks like, specifically.",
    followUp: "If this went perfectly, what would be true next month?"
  },
  {
    open: "Not enough to work with yet. Give me the version with the uncomfortable parts left in.",
    core: [
      "People edit their problem before presenting it and then wonder why the advice doesn't fit.",
      "I don't need the flattering version."
    ],
    directive: "Tell me the part you were planning to leave out.",
    followUp: "What are you not saying?"
  },
  {
    open: "That's broad. Narrow it and I'll be useful.",
    core: [
      "Big questions get generic answers. Specific ones get plans.",
      "Pick the single most pressing piece and start there."
    ],
    directive: "Name the one thing that would help most if it were resolved this week.",
    followUp: "What's the most urgent piece of it?"
  },
  {
    open: "Fine. Let's start from the decision instead.",
    core: [
      "What are you choosing between? Two options, stated plainly.",
      "Once I know the alternatives, I can tell you what I'd weigh."
    ],
    directive: "Give me the two options as you see them.",
    followUp: "What are the choices on the table?"
  },
  {
    open: "I'm not going to pretend I understood that.",
    core: [
      "Say it again like you're explaining it to someone competent who wasn't in the room.",
      "No jargon, no shorthand."
    ],
    directive: "Rephrase it in plain language and we'll go again.",
    followUp: "What happened, in order?"
  },
  {
    open: "Sounds like something's stuck. Let's find where.",
    core: [
      "Is it that you don't know what to do, or that you know and haven't done it?",
      "Those are completely different problems and only one of them needs advice."
    ],
    directive: "Tell me which one it is.",
    followUp: "Do you already know what you should do?"
  },
  {
    open: "Give me the context and I'll give you an answer worth having.",
    core: [
      "Right now I'd be handing you generic material, and you can get that anywhere.",
      "What's the situation, and what have you already tried?"
    ],
    directive: "Tell me what you've already attempted.",
    followUp: "What have you tried so far?"
  },
  {
    open: "Let's do this properly. Start at the beginning.",
    core: [
      "What happened, when, and who else knows about it.",
      "Then we'll work out what you do about it."
    ],
    directive: "Walk me through it from the start.",
    followUp: "When did this begin?"
  },
  {
    open: "You want an answer to a question you haven't asked yet.",
    core: [
      "That's fine, it happens. But I need you to put it into words before I can do anything with it.",
      "Take a run at it."
    ],
    directive: "Ask me the thing you actually want to know.",
    followUp: "What's the real question?"
  }
];

export const smallTalk = {
  greeting: [
    "You're here. Let's not waste it. What's the problem?",
    "Good. Sit down. What are we dealing with?",
    "Right on time. What's on your mind?",
    "I was wondering when you'd show up. Go ahead.",
    "Let's hear it.",
    "Talk to me."
  ],
  howAreYou: [
    "Undefeated. You?",
    "Excellent, as usual. Your turn.",
    "Fine. But you didn't come here to ask about me.",
    "Better than most, worse than I'll admit. What's going on with you?",
    "I don't have bad days, I have days I win differently. What's yours look like?",
    "Working. Always working. What do you need?"
  ],
  thanks: [
    "Don't thank me. Go do it.",
    "Thank me when it's done.",
    "That's what I'm here for. Next.",
    "Noted. Now the hard part is yours.",
    "Save it for when you've closed something.",
    "Appreciated. Now go."
  ],
  bye: [
    "Go win something.",
    "Come back when you've done it, not when you've thought about it.",
    "Good. Now execute.",
    "Door's open when you need it.",
    "Go. And do the thing you said you'd do.",
    "Until next time. Don't waste the week."
  ],
  compliment: [
    "I know.",
    "You're not wrong.",
    "Careful, I'll start believing it.",
    "Save the charm for the negotiation.",
    "Noted. Now what do you actually need?",
    "Flattery is a strategy. I approve. What's the ask?"
  ],
  insult: [
    "That's the best you've got?",
    "I've been called worse by better.",
    "Cute. Now back to your problem.",
    "You're welcome to be annoyed with me and still take the advice.",
    "Noted, filed, ignored. Next.",
    "If you want to fight, at least make it about something that matters to you."
  ]
};

export const suggestions = [
  { label: "Ask for a raise", text: "I want to ask for a raise but I don't know how to bring it up", mode: "negotiate" },
  { label: "I keep procrastinating", text: "I keep putting off something important and I don't know why", mode: "counsel" },
  { label: "Negotiating an offer", text: "I have a job offer and I want to negotiate the package", mode: "negotiate" },
  { label: "What do I wear?", text: "What should I wear to an important interview?", mode: "style" },
  { label: "I feel like a fraud", text: "I got promoted and I feel like a fraud who'll be found out", mode: "counsel" },
  { label: "Difficult manager", text: "My manager micromanages everything I do and it's getting worse", mode: "counsel" },
  { label: "Should I quit?", text: "I'm thinking about quitting my job but I'm scared it's a mistake", mode: "brainstorm" },
  { label: "Buying my first suit", text: "I need to buy my first proper suit. Where do I start?", mode: "style" },
  { label: "Tell me straight", text: "I keep saying I'll start my own thing and I never do. Tell me straight.", mode: "tough" },
  { label: "Big presentation", text: "I have a presentation to the board next week and I'm nervous", mode: "counsel" },
  { label: "Someone took credit", text: "A colleague presented my work as their own in a meeting", mode: "negotiate" },
  { label: "Help me think", text: "Help me think through whether to move city for a job", mode: "brainstorm" },
  { label: "I'm burnt out", text: "I think I'm burnt out and I can't tell if I should push through", mode: "counsel" },
  { label: "They lowballed me", text: "They came back with a number way below what I asked for", mode: "negotiate" }
];

export const wisdom = [
  "Preparation isn't a phase. It's the whole advantage.",
  "You don't rise to the occasion. You fall to your standards.",
  "Nobody remembers the argument you won quietly. Win it anyway.",
  "The person who can walk away sets the price.",
  "Confidence is evidence, not a mood.",
  "Do the boring thing on the boring day. That's the secret.",
  "You can be respected or comfortable. Pick early.",
  "Excuses are just plans you didn't make.",
  "Never make a threat you'd hate to keep.",
  "The best time to build leverage is when you don't need it.",
  "Fear is fuel with no steering. Add direction.",
  "Say less. Mean more.",
  "Your reputation arrives before you and stays after.",
  "Standards you only keep in public aren't standards.",
  "If you can't name your walk-away, you're not negotiating.",
  "Talent gets you noticed. Consistency gets you paid.",
  "The room reads you before you speak. Give it something.",
  "Every yes you didn't mean costs you something you wanted.",
  "Deadlines without consequences are just wishes.",
  "Loyalty only counts on the day it's expensive.",
  "You can't out-strategise work you haven't done.",
  "Being underestimated is only a problem if you complain about it.",
  "Decide fast on what you can undo. Slow on what you can't.",
  "The gap between knowing and doing is where most lives happen.",
  "Fit beats price. It always did.",
  "Silence is a position. Learn to hold it."
];

export default { topics, modes, openers, fallbacks, smallTalk, suggestions, wisdom };
