const DATA_FILES = [
  "quran",
  "tafsir",
  "hadith",
  "fiqh",
  "seerah",
  "aqeedah",
  "religions-sects"
];

// Add future Word-file content in /data/*.json. HTML pages should stay reusable templates.
const iconPaths = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  "book-open": '<path d="M12 7v14"/><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H12v18H5.5A2.5 2.5 0 0 0 3 23z"/><path d="M21 5.5A2.5 2.5 0 0 0 18.5 3H12v18h6.5A2.5 2.5 0 0 1 21 23z"/>',
  "book-marked": '<path d="M10 2v8l3-2 3 2V2"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z"/>',
  library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
  scroll: '<path d="M8 21h8"/><path d="M12 21V7a4 4 0 1 1 4 4H6a4 4 0 1 1 4-4v14"/><path d="M16 7H8"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L11 4.93"/><path d="M14 11a5 5 0 0 0-7.07 0L4.81 13.1a5 5 0 0 0 7.07 7.08L13 19.07"/>',
  scale: '<path d="m16 16 3-8 3 8c-.87.65-1.87 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.87 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/>',
  landmark: '<path d="M3 22h18"/><path d="M6 18V9"/><path d="M10 18V9"/><path d="M14 18V9"/><path d="M18 18V9"/><path d="m12 2 9 5H3z"/>',
  mosque: '<path d="M4 22V10l8-6 8 6v12"/><path d="M9 22v-7a3 3 0 0 1 6 0v7"/><path d="M7 10h.01"/><path d="M17 10h.01"/>',
  light: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M8.5 14a6 6 0 1 1 7 0c-.8.6-1.5 1.5-1.5 2.5h-4c0-1-.7-1.9-1.5-2.5Z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  badge: '<path d="M7.5 7.5h9v9h-9z"/><path d="M12 2l2.2 3.1 3.8-.1-.1 3.8L21 12l-3.1 3.2.1 3.8-3.8-.1L12 22l-2.2-3.1-3.8.1.1-3.8L3 12l3.1-3.2L6 5l3.8.1z"/><path d="m9.5 12 1.7 1.7 3.3-3.4"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20"/><path d="M12 2a15.3 15.3 0 0 0 0 20"/>',
  route: '<circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M12 19h1a5 5 0 0 0 0-10h-2a5 5 0 0 1 0-10h1"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 3v6h6"/><path d="M12 7v5l3 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
  archive: '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  "file-search": '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h5"/><path d="M14 2v6h6"/><circle cx="16" cy="16" r="3"/><path d="m21 21-2.2-2.2"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  "search-check": '<path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/>',
  alert: '<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.7 3.86a2 2 0 0 0-3.4 0z"/>',
  ban: '<circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/>',
  chevron: '<path d="m15 18-6-6 6-6"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  sparkles: '<path d="m12 3-1.9 5.8L4 11l6.1 2.2L12 19l1.9-5.8L20 11l-6.1-2.2z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>'
};

const subjectIconMap = {
  quran: "book-marked",
  tafsir: "book-open",
  hadith: "scroll",
  fiqh: "scale",
  seerah: "route",
  aqeedah: "shield",
  "religions-sects": "globe"
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.file}</svg>`;
}

function subjectIcon(subject) {
  return subjectIconMap[subject.id] || subject.icon || "book";
}

function groupIcon(group) {
  const value = `${group.id} ${group.title}`;
  if (/history|تاریخ|ارتقا|تدوین|خلافت|دور/.test(value)) return "history";
  if (/source|مصادر|مراجع/.test(value)) return "library";
  if (/research|تحقیق|ڈیجیٹل|فہارس/.test(value)) return "database";
  if (/authority|حجیت|ایمان|عقائد|توحید/.test(value)) return "shield";
  if (/fiqh|فقہ|قضاء|فتوی|قواعد/.test(value)) return "scale";
  if (/sects|فرق|مذاہب|ادیان/.test(value)) return "globe";
  return group.icon || "layers";
}

function topicIcon(topic) {
  const value = `${topic.id} ${topic.title}`;
  if (/intro|تعارف/.test(value)) return "library";
  if (/sunnah|سنت/.test(value)) return "book-marked";
  if (/authority|حجیت|عقیدہ|ایمان|توحید/.test(value)) return "shield";
  if (/types|اقسام|طبقات/.test(value)) return "layers";
  if (/history|تاریخ|عہد|دور|تدوین/.test(value)) return "history";
  if (/isnad|سند|اسناد|link/.test(value)) return "link";
  if (/jarh|تعدیل|تحقیق|تخریج|search/.test(value)) return "file-search";
  if (/sahih|صحیح/.test(value)) return "badge";
  if (/daeef|ضعیف|کمزور/.test(value)) return "alert";
  if (/mawdu|موضوع/.test(value)) return "ban";
  if (/quran|قرآن/.test(value)) return "book-marked";
  if (/fiqh|فقہ|قضاء|فتوی/.test(value)) return "scale";
  if (/seerah|سیرت|غزو|ہجرت|نبوی/.test(value)) return "route";
  return topic.icon || "file";
}

function applyTheme(subjectId) {
  document.body.classList.remove(...DATA_FILES.map((id) => `theme-${id}`));
  if (subjectId) document.body.classList.add(`theme-${subjectId}`);
}

function hydrateStaticIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    node.innerHTML = icon(node.dataset.icon);
  });
}

function params() {
  return new URLSearchParams(window.location.search);
}

async function getJSON(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.json();
}

async function getSubjects() {
  return getJSON("data/subjects.json");
}

async function getSubject(id) {
  return getJSON(`data/${id}.json`);
}

async function getAllSubjectsData() {
  const subjects = await getSubjects();
  const data = await Promise.all(subjects.map((subject) => getSubject(subject.id)));
  return { subjects, data };
}

function topicUrl(subjectId, groupId, topicId) {
  return `topic.html?subject=${encodeURIComponent(subjectId)}&group=${encodeURIComponent(groupId)}&topic=${encodeURIComponent(topicId)}`;
}

function subjectUrl(subjectId) {
  return `subject.html?subject=${encodeURIComponent(subjectId)}`;
}

function flattenTopics(subject) {
  const flat = [];
  subject.groups.forEach((group) => {
    group.topics.forEach((topic) => flat.push({ subject, group, topic }));
  });
  return flat;
}

function countTopics(subject) {
  return subject.groups.reduce((sum, group) => sum + group.topics.length, 0);
}

function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function setError(target, message) {
  if (target) target.innerHTML = `<div class="error-state">${escapeHTML(message)}</div>`;
}

function formatArabicSnippets(text) {
  return text
    .replace(/﴿([^﴾]+)﴾/g, '<span class="arabic-block" lang="ar" dir="rtl">﴿$1﴾</span>')
    .replace(/“([^”]*[\u064B-\u065F\u0670][^”]*)”/g, '<span class="arabic-quote" lang="ar" dir="rtl">“$1”</span>');
}

function formatAnswer(answer = "") {
  return String(answer)
    .split(/\n{2,}/)
    .filter((paragraph) => paragraph.trim())
    .map((paragraph) => `<p class="answer-paragraph">${formatArabicSnippets(escapeHTML(paragraph.trim()))}</p>`)
    .join("");
}

function breadcrumbs(items) {
  const root = document.getElementById("breadcrumbs");
  if (!root) return;
  root.innerHTML = items.map((item, index) => {
    const sep = index ? "<span>←</span>" : "";
    const node = item.href ? `<a href="${item.href}">${escapeHTML(item.label)}</a>` : `<span>${escapeHTML(item.label)}</span>`;
    return `${sep}${node}`;
  }).join("");
}

async function renderHome() {
  const grid = document.getElementById("subjects-grid");
  try {
    const { subjects, data } = await getAllSubjectsData();
    grid.innerHTML = subjects.map((subject) => {
      const full = data.find((item) => item.id === subject.id);
      return `<a class="subject-card theme-${subject.id}" href="${subjectUrl(subject.id)}">
        <span class="card-icon">${icon(subjectIcon(subject))}</span>
        <h3>${escapeHTML(subject.title)}</h3>
        <p>${escapeHTML(subject.description)}</p>
        <span class="meta-row">
          <span class="pill">${icon("layers")} ${full.groups.length} گروپس</span>
          <span class="pill">${icon("list")} ${countTopics(full)} موضوعات</span>
        </span>
      </a>`;
    }).join("");
  } catch (error) {
    setError(grid, "مواد لوڈ نہیں ہو سکا۔ براہِ کرم data فولڈر چیک کریں۔");
  }
}

async function renderSubject() {
  const subjectId = params().get("subject") || DATA_FILES[0];
  const hero = document.getElementById("subject-hero");
  const list = document.getElementById("groups-list");
  try {
    const subject = await getSubject(subjectId);
    applyTheme(subject.id);
    document.title = `${subject.title} | الحیات مرکز علوم اسلامیہ`;
    breadcrumbs([
      { label: "صفحۂ اول", href: "index.html" },
      { label: subject.title }
    ]);
    hero.innerHTML = `<span class="card-icon">${icon(subjectIcon(subject))}</span>
      <p class="eyebrow">مضمون</p>
      <h1>${escapeHTML(subject.title)}</h1>
      <p>${escapeHTML(subject.description || "گروپس کھول کر موضوع منتخب کریں۔")}</p>`;
    list.innerHTML = subject.groups.map((group, index) => `<article class="group-card" id="${group.id}">
      <button class="group-toggle" type="button" aria-expanded="${index === 0}" data-group-toggle>
        <span>${icon(groupIcon(group))} ${escapeHTML(group.title)}</span>
        <span class="pill">${group.topics.length} موضوعات ${icon("chevron")}</span>
      </button>
      <div class="topic-grid" ${index === 0 ? "" : "hidden"}>
        ${group.topics.map((topic) => `<a class="topic-button" href="${topicUrl(subject.id, group.id, topic.id)}">${icon(topicIcon(topic))}<span>${escapeHTML(topic.title)}</span></a>`).join("")}
      </div>
    </article>`).join("");
  } catch (error) {
    setError(list, "یہ مضمون نہیں مل سکا۔");
  }
}

async function renderTopic() {
  const subjectId = params().get("subject");
  const groupId = params().get("group");
  const topicId = params().get("topic");
  const view = document.getElementById("topic-view");
  try {
    const subject = await getSubject(subjectId);
    applyTheme(subject.id);
    const group = subject.groups.find((item) => item.id === groupId);
    const topic = group?.topics.find((item) => item.id === topicId);
    if (!group || !topic) throw new Error("Topic not found");
    const flat = flattenTopics(subject);
    const currentIndex = flat.findIndex((item) => item.group.id === groupId && item.topic.id === topicId);
    const previous = flat[currentIndex - 1];
    const next = flat[currentIndex + 1];
    document.title = `${topic.title} | ${subject.title}`;
    breadcrumbs([
      { label: "صفحۂ اول", href: "index.html" },
      { label: subject.title, href: subjectUrl(subject.id) },
      { label: group.title, href: `${subjectUrl(subject.id)}#${group.id}` },
      { label: topic.title }
    ]);
    const questions = topic.questions?.length ? topic.questions : sampleQuestions(topic.title);
    view.innerHTML = `<header class="topic-head">
        <span class="card-icon">${icon(topicIcon(topic))}</span>
        <div>
          <p class="eyebrow">${escapeHTML(group.title)}</p>
          <h1>${escapeHTML(topic.title)}</h1>
          <p class="topic-summary">${escapeHTML(topic.summary || "اس موضوع کا تفصیلی مستند مواد آئندہ Word فائل سے شامل کیا جائے گا۔")}</p>
        </div>
      </header>
      <div class="qa-list">
        ${questions.map((qa, index) => `<section class="qa-item">
          <button class="qa-question" type="button" aria-expanded="false" data-qa-toggle>
            <span>${escapeHTML(qa.q)}</span>
            <span class="pill">جواب دیکھیں ${icon("chevron")}</span>
          </button>
          <div class="qa-answer">${formatAnswer(qa.a)}</div>
        </section>`).join("")}
      </div>
      <nav class="topic-nav" aria-label="موضوعات کی نیویگیشن">
        ${previous ? `<a class="button" href="${topicUrl(subject.id, previous.group.id, previous.topic.id)}">${icon("arrow")} پچھلا موضوع</a>` : "<span></span>"}
        <a class="button" href="${subjectUrl(subject.id)}">${icon("layers")} مضمون پر واپس جائیں</a>
        ${next ? `<a class="button" href="${topicUrl(subject.id, next.group.id, next.topic.id)}">اگلا موضوع ${icon("chevron")}</a>` : "<span></span>"}
      </nav>`;
  } catch (error) {
    setError(view, "یہ موضوع نہیں مل سکا۔");
  }
}

function sampleQuestions(title) {
  return [
    {
      q: `${title} سے متعلق نمونہ سوال کیا ہے؟`,
      a: "یہ عارضی نمونہ جواب ہے۔ اصل علمی جواب بعد میں Word فائل سے اسی JSON موضوع میں شامل کیا جائے گا۔"
    },
    {
      q: "آئندہ مواد کس طرح شامل ہوگا؟",
      a: "ہر موضوع کی سوال و جواب فائل پڑھ کر اسی مضمون کے JSON میں صرف متعلقہ topic کے questions array کو اپ ڈیٹ کیا جائے گا۔"
    }
  ];
}

function bindAccordions() {
  document.addEventListener("click", (event) => {
    const groupButton = event.target.closest("[data-group-toggle]");
    if (groupButton) {
      const panel = groupButton.nextElementSibling;
      const expanded = groupButton.getAttribute("aria-expanded") === "true";
      groupButton.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
    }

    const qaButton = event.target.closest("[data-qa-toggle]");
    if (qaButton) {
      const item = qaButton.closest(".qa-item");
      const open = item.classList.toggle("is-open");
      qaButton.setAttribute("aria-expanded", String(open));
    }
  });
}

let audioContext;

function playSoftClick() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext ||= new AudioCtx();
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(520, now);
    oscillator.frequency.exponentialRampToValueAtTime(300, now + 0.045);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.065);
  } catch (error) {
    // Audio feedback is optional and must never block navigation.
  }
}

function bindClickSound() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest(".subject-card, .group-toggle, .topic-button, .button, .icon-link, .qa-question, .search-box button");
    if (!target || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") return;
    playSoftClick();
  });
}

function boot() {
  hydrateStaticIcons();
  bindAccordions();
  bindClickSound();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "subject") renderSubject();
  if (page === "topic") renderTopic();
}

document.addEventListener("DOMContentLoaded", boot);
