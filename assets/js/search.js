function normalizeSearch(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/[اأإآ]/g, "ا")
    .replace(/[ىي]/g, "ی")
    .replace(/[ة]/g, "ہ")
    .replace(/[ؤ]/g, "و")
    .replace(/[ئ]/g, "ی")
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .trim();
}

function makeSearchIndex(data) {
  const rows = [];
  data.forEach((subject) => {
    subject.groups.forEach((group) => {
      group.topics.forEach((topic) => {
        const questions = topic.questions?.length ? topic.questions : sampleQuestions(topic.title);
        questions.forEach((qa) => {
          rows.push({
            subjectId: subject.id,
            subjectTitle: subject.title,
            groupId: group.id,
            groupTitle: group.title,
            topicId: topic.id,
            topicTitle: topic.title,
            question: qa.q || "",
            answer: qa.a || "",
            haystack: normalizeSearch([subject.title, group.title, topic.title, qa.q, qa.a].join(" "))
          });
        });
      });
    });
  });
  return rows;
}

function scoreRow(row, query) {
  const q = normalizeSearch(query);
  if (!q) return 0;
  const topic = normalizeSearch(row.topicTitle);
  const question = normalizeSearch(row.question);
  const answer = normalizeSearch(row.answer);
  const group = normalizeSearch(row.groupTitle);
  const subject = normalizeSearch(row.subjectTitle);
  let score = 0;
  if (topic.includes(q)) score += 100;
  if (question.includes(q)) score += 70;
  if (answer.includes(q)) score += 40;
  if (group.includes(q)) score += 28;
  if (subject.includes(q)) score += 18;
  const words = q.split(/\s+/).filter(Boolean);
  words.forEach((word) => {
    if (word.length > 1 && row.haystack.includes(word)) score += 6;
  });
  return score;
}

function snippet(text, query) {
  const clean = text || "";
  const q = normalizeSearch(query);
  if (!q) return escapeHTML(clean.slice(0, 180));
  const normalized = normalizeSearch(clean);
  const index = normalized.indexOf(q);
  const start = index > 35 ? index - 35 : 0;
  const visible = clean.slice(start, start + 190);
  return highlight(visible, query);
}

function highlight(text, query) {
  const escaped = escapeHTML(text);
  const q = escapeHTML(query.trim());
  if (!q) return escaped;
  return escaped.replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), (match) => `<mark>${match}</mark>`);
}

async function renderSearchPage() {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const filter = document.getElementById("subject-filter");
  const results = document.getElementById("search-results");
  const summary = document.getElementById("search-summary");
  const { subjects, data } = await getAllSubjectsData();
  const index = makeSearchIndex(data);
  const initial = params();

  filter.innerHTML = `<option value="">تمام مضامین</option>${subjects.map((subject) => `<option value="${subject.id}">${escapeHTML(subject.title)}</option>`).join("")}`;
  input.value = initial.get("q") || "";
  filter.value = initial.get("subject") || "";

  function run() {
    const query = input.value.trim();
    const subjectId = filter.value;
    const filtered = index
      .filter((row) => !subjectId || row.subjectId === subjectId)
      .map((row) => ({ row, score: scoreRow(row, query) }))
      .filter((item) => query ? item.score > 0 : true)
      .sort((a, b) => b.score - a.score || a.row.topicTitle.localeCompare(b.row.topicTitle, "ur"));

    const unique = [];
    const seen = new Set();
    filtered.forEach((item) => {
      const key = `${item.row.subjectId}/${item.row.groupId}/${item.row.topicId}/${item.row.question}`;
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(item);
      }
    });

    summary.textContent = query
      ? `${unique.length} نتائج ملے`
      : "تلاش کے لیے کوئی لفظ لکھیں، یا مضمون منتخب کر کے تمام موضوعات دیکھیں۔";

    results.innerHTML = unique.slice(0, 80).map(({ row }) => `<article class="result-card theme-${row.subjectId}">
      <div class="result-path">${escapeHTML(row.subjectTitle)} ← ${escapeHTML(row.groupTitle)}</div>
      <h2>${highlight(row.topicTitle, query)}</h2>
      <p><strong>${highlight(row.question, query)}</strong></p>
      <p>${snippet(row.answer, query)}</p>
      <p class="meta-row"><a class="button primary-button" href="${topicUrl(row.subjectId, row.groupId, row.topicId)}">موضوع کھولیں</a></p>
    </article>`).join("") || `<div class="empty-state">کوئی نتیجہ نہیں ملا۔ مختلف املا یا مختصر لفظ سے دوبارہ تلاش کریں۔</div>`;

    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set("q", query);
    if (subjectId) nextUrl.searchParams.set("subject", subjectId);
    else nextUrl.searchParams.delete("subject");
    window.history.replaceState({}, "", nextUrl);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    run();
  });
  input.addEventListener("input", run);
  filter.addEventListener("change", run);
  run();
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.dataset.page === "search") {
    renderSearchPage().catch(() => {
      document.getElementById("search-results").innerHTML = `<div class="error-state">تلاش کا مواد لوڈ نہیں ہو سکا۔</div>`;
    });
  }
});
