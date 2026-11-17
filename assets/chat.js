/* Rosjos chat widget
   Answers common questions instantly, then hands the conversation to WhatsApp or email.
   Contact details come from SITE in assets/site.js. */
(function () {
  "use strict";

  const CHAT = {
    // "Online now" is shown when true. Keep it true only while someone can reply on WhatsApp.
    showOnlineStatus: true
  };

  const ROOT = new URL("../", document.currentScript.src);
  const pageUrl = (path) => new URL(path, ROOT).href;

  const ICON_CHAT = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  const ICON_CLOSE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const ICON_LOGO = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';

  const GREETING_KEYWORDS = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
  const GREETING_ANSWER = "Hello! I can answer common questions about our tutoring. What would you like to know?";
  const FALLBACK_ANSWER = "I'm not sure I can answer that well, but our team can help you directly.";
  const QUICK_REPLIES = ["What do you cover?", "How do I get started?", "How much does it cost?", "Talk to a person"];

  // Each entry matches when any of its keywords appear as whole words in the visitor's message.
  // The entry with the most matching words wins. Edit answers here to match your services.
  const ENTRIES = [
    {
      keywords: ["service", "services", "cover", "teach", "what do you do"],
      answer: "We offer one-on-one online tutoring for high school, college courses, test prep, and academic writing feedback.",
      link: { label: "Browse our services", path: "services/" }
    },
    {
      keywords: ["start", "begin", "book", "booking", "sign up", "enroll", "first session", "get started"],
      answer: "To get started, tell us your subject, your deadline, and what you'd like to work on. We confirm the scope and price before you book."
    },
    {
      keywords: ["price", "prices", "pricing", "cost", "fee", "fees", "how much", "rate", "rates", "charge", "payment", "payments", "pay"],
      answer: "Pricing depends on the subject and how many sessions you need. We confirm the price with you before you book, and we confirm the payment options when we agree on your plan."
    },
    {
      keywords: ["homework", "assignment", "do my", "write my", "complete my", "take my"],
      answer: "We explain concepts, work through examples, and review drafts. You complete and submit your own work, so you're ready for the next one."
    },
    {
      keywords: ["how long", "length", "duration", "schedule", "availability", "when"],
      answer: "Session length and timing depend on your plan. We agree on both before you book."
    },
    {
      keywords: ["essay", "essays", "thesis", "citation", "citations", "apa", "mla", "writing", "draft", "paper"],
      answer: "We help with structure, clarity, and citations, and we explain the reasons behind every suggestion. You keep your own ideas and voice.",
      link: { label: "Writing feedback", path: "services/writing-feedback/" }
    },
    {
      keywords: ["test", "tests", "exam", "exams", "prep", "score", "sat", "act", "ged", "nclex"],
      answer: "Test prep sessions include practice questions, review of missed answers, and a study plan built around your exam date. We can't guarantee a score, but we'll be honest about what's realistic.",
      link: { label: "Test prep", path: "services/test-prep/" }
    },
    {
      keywords: ["high school", "algebra", "math", "science", "english", "social studies"],
      answer: "We support high school students in math, science, English, and social studies, with homework help, test preparation, and a plan built around your goals.",
      link: { label: "High school tutoring", path: "services/high-school/" }
    },
    {
      keywords: ["college", "university", "syllabus", "course"],
      answer: "For college, we build sessions around your syllabus, from introductory courses to upper-level classes, with problem sets and exam preparation.",
      link: { label: "College tutoring", path: "services/college/" }
    },
    {
      keywords: ["thanks", "thank", "thx", "appreciate"],
      answer: "You're welcome! Is there anything else I can help with?"
    },
    {
      keywords: ["person", "human", "agent", "talk", "speak", "call", "phone", "email", "contact"],
      answer: "Of course. Our team can help you directly.",
      handoff: true
    }
  ];

  function normalize(text) {
    return " " + text.toLowerCase().replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
  }

  function score(padded, keywords) {
    return keywords.reduce((total, keyword) => (
      padded.includes(" " + keyword + " ") ? total + keyword.split(" ").length : total
    ), 0);
  }

  function findAnswer(question) {
    const padded = normalize(question);
    let best = null;
    let bestScore = 0;
    ENTRIES.forEach((entry) => {
      const value = score(padded, entry.keywords);
      if (value > bestScore) {
        best = entry;
        bestScore = value;
      }
    });
    if (best) return best;
    if (score(padded, GREETING_KEYWORDS) > 0) return { answer: GREETING_ANSWER };
    return null;
  }

  function whatsappUrl(message) {
    return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  function handoffActions(question) {
    const actions = [{
      label: "Continue on WhatsApp",
      href: whatsappUrl(question),
      className: "wa",
      external: true
    }];
    if (SITE.email) {
      actions.push({
        label: "Send an email",
        href: `mailto:${SITE.email}?subject=${encodeURIComponent("Question for " + SITE.name)}&body=${encodeURIComponent(question)}`
      });
    }
    return actions;
  }

  function buildResponse(question) {
    const match = findAnswer(question);
    if (!match) {
      return { text: FALLBACK_ANSWER, actions: handoffActions(question) };
    }
    if (match.handoff) {
      return { text: match.answer, actions: handoffActions(question) };
    }
    const actions = [];
    if (match.link) {
      actions.push({ label: match.link.label, href: pageUrl(match.link.path) });
    }
    actions.push({ label: "Ask on WhatsApp", href: whatsappUrl(question), className: "wa", external: true });
    return { text: match.answer, actions };
  }

  function el(tag, attrs, text) {
    const node = document.createElement(tag);
    Object.keys(attrs || {}).forEach((key) => node.setAttribute(key, attrs[key]));
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function buildWidget() {
    const root = el("div", { class: "chat-widget" });

    const launcher = el("button", {
      class: "chat-launcher",
      type: "button",
      "aria-expanded": "false",
      "aria-controls": "chat-panel"
    });
    launcher.insertAdjacentHTML("afterbegin", ICON_CHAT);
    launcher.append(el("span", { class: "status-dot", "aria-hidden": "true" }), el("span", {}, "Chat with us"));

    const panel = el("section", {
      class: "chat-panel",
      id: "chat-panel",
      role: "dialog",
      "aria-label": "Chat with " + SITE.name,
      hidden: ""
    });

    const head = el("header", { class: "chat-head" });
    const avatar = el("div", { class: "avatar", "aria-hidden": "true" });
    avatar.insertAdjacentHTML("afterbegin", ICON_LOGO);
    const titles = el("div");
    const status = CHAT.showOnlineStatus
      ? el("div", { class: "chat-status" }, "Online now")
      : el("div", { class: "chat-status away" }, "Away, we'll reply soon");
    titles.append(el("strong", {}, SITE.name), status);
    const closeBtn = el("button", { class: "chat-close", type: "button", "aria-label": "Close chat" });
    closeBtn.insertAdjacentHTML("afterbegin", ICON_CLOSE);
    head.append(avatar, titles, closeBtn);

    const log = el("div", { class: "chat-log", "aria-live": "polite" });

    const chips = el("div", { class: "chat-chips" });
    const form = el("form", { class: "chat-form", autocomplete: "off" });
    const input = el("input", {
      type: "text",
      placeholder: "Type your question",
      "aria-label": "Your question",
      maxlength: "500"
    });
    const sendBtn = el("button", { type: "submit" }, "Send");
    form.append(input, sendBtn);

    panel.append(head, log, chips, form);
    root.append(launcher, panel);
    document.body.append(root);

    let greeted = false;
    let typingEl = null;

    function addBubble(who, text, actions) {
      const bubble = el("div", { class: "chat-bubble " + who }, text);
      if (actions && actions.length) {
        const row = el("div", { class: "chat-actions" });
        actions.forEach((action) => {
          const link = el("a", { href: action.href, class: action.className || "" }, action.label);
          if (action.external) {
            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener");
          }
          row.append(link);
        });
        bubble.append(row);
      }
      log.append(bubble);
      log.scrollTop = log.scrollHeight;
    }

    function showTyping() {
      typingEl = el("div", { class: "chat-bubble bot", "aria-label": "Typing" }, "Typing…");
      log.append(typingEl);
      log.scrollTop = log.scrollHeight;
    }

    function removeTyping() {
      if (typingEl) {
        typingEl.remove();
        typingEl = null;
      }
    }

    function ask(question) {
      const text = question.trim();
      if (!text) return;
      addBubble("user", text);
      const reply = buildResponse(text);
      showTyping();
      window.setTimeout(() => {
        removeTyping();
        addBubble("bot", reply.text, reply.actions);
      }, 450);
    }

    QUICK_REPLIES.forEach((text) => {
      const chip = el("button", { type: "button" }, text);
      chip.addEventListener("click", () => ask(text));
      chips.append(chip);
    });

    function open() {
      panel.hidden = false;
      launcher.hidden = true;
      launcher.setAttribute("aria-expanded", "true");
      if (!greeted) {
        addBubble("bot", `Hi, welcome to ${SITE.name}! Ask a question below or choose a topic.`);
        greeted = true;
      }
      input.focus();
    }

    function close() {
      panel.hidden = true;
      launcher.hidden = false;
      launcher.setAttribute("aria-expanded", "false");
      launcher.focus();
    }

    launcher.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    panel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      ask(input.value);
      input.value = "";
    });
  }

  buildWidget();
})();
