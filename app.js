(() => {
  "use strict";

  const CLUB_WECHAT = "1120091123";
  const BASE_COMPLETIONS = 43;

  const personas = {
    creator: {
      name: "THE CREATOR",
      traits: "Visual · Curious · Expressive",
      strength: "Turning ideas into visuals.",
      project: "AI Brand Studio",
      tags: ["POSTER", "LOGO", "SOCIAL MEDIA", "VIDEO"],
      summary: "A compact creative studio that turns a rough idea into a visual direction.",
      toolkit: [["AI IMAGING", "Explore visual directions"], ["DESIGN SYSTEM", "Keep every output consistent"], ["VIDEO TOOLS", "Bring the concept to life"]],
      difficulty: "●●○○○"
    },
    builder: {
      name: "THE BUILDER",
      traits: "Practical · Inventive · Persistent",
      strength: "Turning ideas into working systems.",
      project: "Personal AI Assistant",
      tags: ["WEB APP", "AUTOMATION", "AI WORKFLOW"],
      summary: "A useful mini-product that connects a clear interface with an automated workflow.",
      toolkit: [["SIMPLE CODING", "Build the web interface"], ["AI ASSISTANT", "Handle the smart step"], ["AUTOMATION", "Make repeated work disappear"]],
      difficulty: "●●●○○"
    },
    study: {
      name: "THE OPTIMIZER",
      traits: "Focused · Efficient · Resourceful",
      strength: "Finding smarter ways to learn.",
      project: "AI Study System",
      tags: ["NOTES", "REVISION", "FLASHCARDS", "RESEARCH"],
      summary: "A personal learning system that turns your materials into active daily practice.",
      toolkit: [["AI ASSISTANT", "Explain difficult ideas"], ["AUTOMATION", "Create daily practice"], ["KNOWLEDGE BASE", "Keep notes organized"]],
      difficulty: "●●○○○"
    },
    analyst: {
      name: "THE ANALYST",
      traits: "Curious · Logical · Experimental",
      strength: "Turning information into decisions.",
      project: "AI Research Assistant",
      tags: ["DATA ANALYSIS", "BUSINESS", "RESEARCH", "VISUALIZATION"],
      summary: "A research tool that gathers evidence, compares options and makes the result easier to understand.",
      toolkit: [["AI RESEARCH", "Collect and summarize information"], ["DATA TOOLS", "Compare patterns and numbers"], ["VISUALIZATION", "Make insights easy to see"]],
      difficulty: "●●●○○"
    },
    storyteller: {
      name: "THE STORYTELLER",
      traits: "Expressive · Empathetic · Imaginative",
      strength: "Turning ideas into things people remember.",
      project: "AI Content Studio",
      tags: ["SCRIPTS", "VIDEOS", "STORIES", "CAMPAIGNS"],
      summary: "A content workflow that develops one message into a story people want to follow.",
      toolkit: [["AI WRITING", "Find a strong narrative"], ["MEDIA TOOLS", "Turn words into content"], ["EDITING", "Refine tone and pacing"]],
      difficulty: "●●○○○"
    },
    explorer: {
      name: "THE EXPLORER",
      traits: "Open · Curious · Experimental",
      strength: "Trying things before everyone else does.",
      project: "Your First AI Experiment",
      tags: ["IMAGES", "CODING", "AUTOMATION", "RESEARCH"],
      summary: "A fast experiment designed to help you discover which kind of AI building feels exciting.",
      toolkit: [["AI PLAYGROUND", "Try several types of tools"], ["PROMPTING", "Give AI useful context"], ["MINI PROJECT", "Finish one shareable result"]],
      difficulty: "●○○○○"
    }
  };

  const quizRounds = [
    {
      type: "TEXT DETECTION",
      question: "Which one was written by AI?",
      answers: [
        "After school, I usually head to the library because it's one of the few places where I can actually focus.",
        "After a long school day, I prefer visiting the library, where the peaceful atmosphere allows me to concentrate effectively."
      ],
      correct: 1,
      insight: "The polished answer sounds fluent, but its phrasing is more generic and less personal."
    },
    {
      type: "PROMPT CHALLENGE",
      question: "Which prompt would probably create the better result?",
      answers: [
        "Make me a poster.",
        "Create a minimalist recruitment poster for a high-school AI club, using strong typography, clear hierarchy and a single visual focal point."
      ],
      correct: 1,
      insight: "Good prompting is less about “magic words” and more about giving AI useful context."
    }
  ];

  const state = {
    screen: "start",
    persona: "explorer",
    idea: "",
    quizRound: 0,
    quizScore: 0,
    logoClicks: 0,
    logoTimer: null
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const progressMap = {
    persona: ["LEVEL 01", "01 / 04", 25],
    idea: ["LEVEL 02", "02 / 04", 50],
    quiz: ["LEVEL 03", "03 / 04", 75],
    profile: ["PROFILE", "04 / 04", 100],
    signup: ["JOIN", "FINAL STEP", 100]
  };

  function safeStorageGet(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* Storage can be blocked in private mode. */ }
  }

  function updateCompletionStat() {
    const localCount = Number(safeStorageGet("aipc-completed", "0")) || 0;
    $("#completionStat").textContent = `${BASE_COMPLETIONS + localCount} students have completed the experiment.`;
  }

  function showScreen(name) {
    $$(".screen").forEach(screen => {
      const active = screen.dataset.screen === name;
      screen.classList.toggle("is-active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    state.screen = name;
    const progress = $("#progressShell");
    if (name === "start") {
      progress.hidden = true;
    } else {
      progress.hidden = false;
      const [level, text, width] = progressMap[name];
      $("#levelText").textContent = level;
      $("#progressText").textContent = text;
      $("#progressFill").style.width = `${width}%`;
    }
    $("#headerStatus").textContent = name === "start" ? "SYSTEM READY" : name === "signup" ? "JOIN MODE" : "EXPERIMENT LIVE";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const heading = $(`[data-screen="${name}"] h1, [data-screen="${name}"] h2, [data-screen="${name}"] textarea, [data-screen="${name}"] input`);
      if (heading) heading.focus({ preventScroll: true });
    }, 380);
  }

  async function typeTerminal() {
    const target = $("#terminalText");
    const lines = ["Initializing AI Profile...", "User detected.", "Ready for experiment."];
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      target.textContent = "";
      for (const char of lines[lineIndex]) {
        target.textContent += char;
        await delay(lineIndex === 0 ? 28 : 22);
      }
      await delay(lineIndex === 0 ? 420 : 280);
    }
    $("#startButton").disabled = false;
    $("#startButton").classList.add("is-ready");
    $(".start-microcopy").classList.add("is-ready");
  }

  function selectPersona(card) {
    if ($(".persona-card.is-selected")) return;
    state.persona = card.dataset.persona;
    card.classList.add("is-selected");
    $$(".persona-card").forEach(item => { item.disabled = true; });
    $("#signalToast").classList.add("is-visible");
    setTimeout(() => {
      $("#signalToast").classList.remove("is-visible");
      showScreen("idea");
      $("#ideaInput").focus();
    }, 650);
  }

  function inferProjectTitle(idea, fallback) {
    const lower = idea.toLowerCase();
    if (/vocab|word|language|english|英语|单词|词汇/.test(lower)) return "AI Vocabulary Trainer";
    if (/homework|assignment|作业/.test(lower)) return "AI Homework Organizer";
    if (/market|stock|finance|company|金融|股票|公司/.test(lower)) return "AI Market Research Assistant";
    if (/poster|brand|logo|海报|品牌/.test(lower)) return "AI Brand Studio";
    if (/video|story|script|视频|故事|脚本/.test(lower)) return "AI Content Studio";
    if (/note|revision|flashcard|study|复习|笔记|学习/.test(lower)) return "AI Study System";
    return fallback;
  }

  async function processIdea(event) {
    event.preventDefault();
    const input = $("#ideaInput");
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    state.idea = input.value.trim();
    $("#ideaForm").hidden = true;
    $("#ideaProcessing").hidden = false;
    const steps = [
      ["Understanding idea...", 24],
      ["Finding possibilities...", 49],
      ["Matching AI tools...", 76],
      ["Project detected.", 100]
    ];
    for (const [label, width] of steps) {
      $("#ideaProcessingText").textContent = label;
      $("#ideaProcessingBar").style.width = `${width}%`;
      await delay(410);
    }
    await delay(180);
    $("#ideaProcessing").hidden = true;
    renderProjectResult();
    $("#projectResult").hidden = false;
  }

  function renderProjectResult() {
    const profile = personas[state.persona];
    const title = inferProjectTitle(state.idea, profile.project);
    $("#detectedProjectName").textContent = title;
    $("#projectSummary").textContent = profile.summary;
    $("#difficultyDots").textContent = profile.difficulty;
    $("#toolkitList").replaceChildren(...profile.toolkit.map((item, index) => {
      const row = document.createElement("div");
      row.className = "toolkit-item";
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const titleEl = document.createElement("strong");
      titleEl.textContent = item[0];
      const desc = document.createElement("p");
      desc.textContent = item[1];
      row.append(number, titleEl, desc);
      return row;
    }));
  }

  function renderQuizRound() {
    const round = quizRounds[state.quizRound];
    $("#roundNumber").textContent = `ROUND ${String(state.quizRound + 1).padStart(2, "0")}`;
    $("#roundType").textContent = round.type;
    $("#quizQuestion").textContent = round.question;
    $("#quizFeedback").hidden = true;
    const cards = round.answers.map((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-card";
      button.type = "button";
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = index === 0 ? "A" : "B";
      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => answerQuiz(index));
      return button;
    });
    $("#answerGrid").replaceChildren(...cards);
  }

  function answerQuiz(index) {
    const round = quizRounds[state.quizRound];
    const correct = index === round.correct;
    if (correct) state.quizScore += 1;
    const buttons = $$(".answer-card");
    buttons.forEach((button, buttonIndex) => {
      button.disabled = true;
      if (buttonIndex === round.correct) button.classList.add("is-correct");
      if (buttonIndex === index && !correct) button.classList.add("is-wrong");
    });
    const percentage = 55 + Math.floor(Math.random() * 28);
    $("#feedbackTitle").textContent = correct ? "CORRECT" : "NOT THIS TIME";
    $("#feedbackText").textContent = `${percentage}% of students chose the same answer. ${round.insight}`;
    $("#quizNextButton span").textContent = state.quizRound === quizRounds.length - 1 ? "SEE MY AI PROFILE" : "NEXT ROUND";
    $("#quizFeedback").hidden = false;
    $("#quizFeedback").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function generateProfile() {
    showScreen("profile");
    $("#profileGeneration").hidden = false;
    $("#profileContent").hidden = true;
    const steps = ["Reading choices...", "Matching interests...", "Mapping your build style...", "AI Profile generated."];
    for (const step of steps) {
      $("#profileGenerationText").textContent = step;
      await delay(430);
    }
    renderProfile();
    $("#profileGeneration").hidden = true;
    $("#profileContent").hidden = false;
    const count = Number(safeStorageGet("aipc-completed", "0")) || 0;
    if (!safeStorageGet("aipc-counted", "")) {
      safeStorageSet("aipc-completed", String(count + 1));
      safeStorageSet("aipc-counted", "yes");
      updateCompletionStat();
    }
  }

  function renderProfile() {
    const profile = personas[state.persona];
    $("#profileName").textContent = profile.name;
    $("#profileTraits").textContent = profile.traits;
    $("#profileStrength").textContent = profile.strength;
    $("#profileProject").textContent = profile.project;
    $("#profileProjectTags").replaceChildren(...profile.tags.map(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = text.split(" ");
    let line = "";
    let lineCount = 0;
    for (let n = 0; n < words.length && lineCount < maxLines; n += 1) {
      const testLine = `${line}${words[n]} `;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
        line = `${words[n]} `;
        lineCount += 1;
      } else {
        line = testLine;
      }
    }
    if (lineCount < maxLines) ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  async function createProfileCanvas() {
    const profile = personas[state.persona];
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#11120f";
    ctx.fillRect(0, 0, 1080, 1350);

    ctx.strokeStyle = "#30322e";
    ctx.lineWidth = 2;
    [250, 390, 530].forEach(radius => {
      ctx.beginPath();
      ctx.arc(1060, 30, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    ctx.fillStyle = "#f4f4ef";
    ctx.font = "700 25px monospace";
    ctx.fillText("AI PRACTICE CLUB", 62, 72);
    ctx.textAlign = "right";
    ctx.fillText("PROFILE / 2026", 1018, 72);
    ctx.textAlign = "left";
    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 102); ctx.lineTo(1018, 102); ctx.stroke();

    ctx.fillStyle = "#aeb0a7";
    ctx.font = "700 22px monospace";
    ctx.fillText("YOUR AI PROFILE", 62, 170);
    ctx.fillStyle = "#c7ff43";
    const nameSize = profile.name.length > 15 ? 100 : 122;
    ctx.font = `900 ${nameSize}px Arial, sans-serif`;
    wrapCanvasText(ctx, profile.name, 62, 288, 920, 102, 2);

    ctx.fillStyle = "#d5d6ce";
    ctx.font = "26px monospace";
    ctx.fillText(profile.traits, 62, 420);

    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 462); ctx.lineTo(1018, 462); ctx.stroke();
    ctx.fillStyle = "#aeb0a7";
    ctx.font = "700 21px monospace";
    ctx.fillText("YOUR AI STRENGTH", 62, 510);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = "700 38px Arial, sans-serif";
    wrapCanvasText(ctx, profile.strength, 62, 558, 880, 44, 2);

    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 640); ctx.lineTo(1018, 640); ctx.stroke();
    ctx.fillStyle = "#aeb0a7";
    ctx.font = "700 21px monospace";
    ctx.fillText("YOUR NEXT SKILL", 62, 688);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = "700 34px Arial, sans-serif";
    wrapCanvasText(ctx, "Build AI tools instead of only using them.", 62, 736, 880, 42, 2);

    ctx.fillStyle = "#c7ff43";
    ctx.fillRect(0, 815, 1080, 330);
    ctx.fillStyle = "#38450d";
    ctx.font = "700 21px monospace";
    ctx.fillText("RECOMMENDED PROJECT", 62, 870);
    ctx.fillStyle = "#11120f";
    ctx.font = "900 55px Arial, sans-serif";
    wrapCanvasText(ctx, profile.project, 62, 940, 930, 58, 2);
    ctx.font = "21px monospace";
    ctx.fillText("CREATE WITH:", 62, 1025);
    ctx.font = "700 24px monospace";
    ctx.fillText(profile.tags.join("  /  "), 62, 1076);

    ctx.fillStyle = "#aeb0a7";
    ctx.font = "700 20px monospace";
    ctx.fillText("AI LEVEL", 62, 1208);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = "700 25px monospace";
    ctx.fillText("LV. 01 — EXPLORER", 62, 1246);
    try {
      const qr = await loadImage("./assets/wechat-qr.png");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(864, 1168, 154, 154);
      ctx.drawImage(qr, 872, 1176, 138, 138);
    } catch (_) { /* The card still saves if the local QR image cannot load. */ }
    ctx.fillStyle = "#f4f4ef";
    ctx.font = "700 22px monospace";
    ctx.fillText("DON'T JUST USE AI. BUILD WITH IT.", 62, 1310);
    return canvas;
  }

  async function canvasBlob(canvas) {
    return new Promise(resolve => canvas.toBlob(resolve, "image/png", 1));
  }

  async function saveProfile() {
    const button = $("#saveProfileButton");
    button.disabled = true;
    $("#actionNote").textContent = "Rendering your share card...";
    const canvas = await createProfileCanvas();
    const link = document.createElement("a");
    link.download = `ai-practice-club-${state.persona}-profile.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    $("#actionNote").textContent = "Profile saved as a 4:5 PNG — ready to share.";
    button.disabled = false;
  }

  async function shareProfile() {
    const profile = personas[state.persona];
    const shareText = `My AI Practice Club profile: ${profile.name}. What could you build with AI?`;
    try {
      const canvas = await createProfileCanvas();
      const blob = await canvasBlob(canvas);
      const file = blob ? new File([blob], `aipc-${state.persona}.png`, { type: "image/png" }) : null;
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: "My AI Profile", text: shareText, files: [file] });
        $("#actionNote").textContent = "Share panel opened.";
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: "AI Practice Club", text: shareText, url: window.location.href });
        $("#actionNote").textContent = "Share panel opened.";
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      $("#actionNote").textContent = "Share message and link copied.";
    } catch (error) {
      if (error && error.name === "AbortError") return;
      $("#actionNote").textContent = "Sharing is unavailable here — save the profile image instead.";
    }
  }

  function submitSignup(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const interests = form.getAll("interests");
    if (!interests.length) {
      $("#interestGrid").scrollIntoView({ behavior: "smooth", block: "center" });
      $("#interestGrid").style.outline = "3px solid #d94b31";
      setTimeout(() => { $("#interestGrid").style.outline = ""; }, 1400);
      return;
    }
    const record = {
      name: String(form.get("name") || "").trim(),
      grade: String(form.get("grade") || "").trim(),
      wechat: String(form.get("wechat") || "").trim(),
      interests,
      persona: state.persona,
      idea: state.idea,
      savedAt: new Date().toISOString()
    };
    safeStorageSet("aipc-local-signup", JSON.stringify(record));
    event.currentTarget.hidden = true;
    const panel = document.createElement("div");
    panel.className = "welcome-panel";
    panel.innerHTML = `
      <div class="welcome-copy">
        <p class="eyebrow">APPLICATION READY</p>
        <h2>WELCOME,<br><span id="welcomeName"></span>.</h2>
        <p>Your experiment starts here.</p>
      </div>
      <div class="join-qr-block">
        <img src="./assets/wechat-qr.png" alt="AI Practice Club WeChat group QR code">
        <div><strong>Scan to join the group</strong><span>WECHAT: ${CLUB_WECHAT}</span><small>Your form details remain on this device. Joining the WeChat group completes the real sign-up.</small></div>
      </div>
      <p>See you at the first workshop.</p>
      <button class="secondary-button" type="button" id="restartButton">RESTART EXPERIMENT</button>`;
    $("#signupTitle").closest(".section-heading").hidden = true;
    $(".signup-layout").append(panel);
    $("#welcomeName").textContent = record.name.toUpperCase();
    $("#restartButton").addEventListener("click", () => window.location.reload());
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showEasterEgg() {
    const overlay = document.createElement("div");
    overlay.className = "easter-egg";
    overlay.innerHTML = `
      <div class="easter-card" role="dialog" aria-modal="true" aria-labelledby="easterTitle">
        <button class="close-button" type="button" aria-label="Close">×</button>
        <h2 id="easterTitle">ADMIN MODE DETECTED.</h2>
        <div class="easter-terminal"><span>› Just kidding.</span><span>› You haven't joined the club yet.</span></div>
        <button class="primary-button fix-button" type="button"><span>FIX THAT</span><span>↗</span></button>
      </div>`;
    document.body.append(overlay);
    const close = () => overlay.remove();
    $(".close-button", overlay).addEventListener("click", close);
    overlay.addEventListener("click", event => { if (event.target === overlay) close(); });
    $(".fix-button", overlay).addEventListener("click", () => { close(); showScreen("signup"); });
    $(".close-button", overlay).focus();
  }

  function handleLogoClick() {
    state.logoClicks += 1;
    clearTimeout(state.logoTimer);
    if (state.logoClicks >= 5) {
      state.logoClicks = 0;
      showEasterEgg();
      return;
    }
    state.logoTimer = setTimeout(() => { state.logoClicks = 0; }, 1500);
  }

  function bindEvents() {
    $("#startButton").addEventListener("click", () => showScreen("persona"));
    $$(".persona-card").forEach(card => card.addEventListener("click", () => selectPersona(card)));
    $("#ideaInput").addEventListener("input", event => { $("#charCount").textContent = event.target.value.length; });
    $("#ideaForm").addEventListener("submit", processIdea);
    $("#nextChallengeButton").addEventListener("click", () => { state.quizRound = 0; renderQuizRound(); showScreen("quiz"); });
    $("#quizNextButton").addEventListener("click", () => {
      if (state.quizRound < quizRounds.length - 1) {
        state.quizRound += 1;
        renderQuizRound();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        generateProfile();
      }
    });
    $("#saveProfileButton").addEventListener("click", saveProfile);
    $("#shareProfileButton").addEventListener("click", shareProfile);
    $("#joinButton").addEventListener("click", () => showScreen("signup"));
    $("#signupForm").addEventListener("submit", submitSignup);
    $("#logoButton").addEventListener("click", handleLogoClick);
  }

  updateCompletionStat();
  bindEvents();
  typeTerminal();
})();
