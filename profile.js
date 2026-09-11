(() => {
  "use strict";

  const root = document.querySelector("#profile-root");
  const languageButtons = [...document.querySelectorAll(".profile-language-switch button")];
  const languageSwitch = document.querySelector(".profile-language-switch");
  const loadingText = document.querySelector("#profile-loading-text");
  const config = window.PROFILE_BUILDER_CONFIG || {};
  const apiKey = config.SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_ANON_KEY || "";
  const params = new URLSearchParams(window.location.search);
  const id = (params.get("id") || "").trim().toUpperCase();

  const translations = {
    en: {
      languageAria: "Choose language",
      loading: "Loading your personal website...",
      titleSuffix: "Personal Site",
      personalSpace: "PERSONAL SPACE",
      profileCode: "PROFILE",
      hello: "HELLO, I AM",
      glow: "Move your pointer",
      glowActive: "The glow is following you ✦",
      confetti: "Click anywhere to try it",
      reveal: "Reveal a hidden message",
      revealed: "Message revealed ✓",
      defaultSecret: "Welcome to my personal website.",
      madeWith: "MADE WITH AI PRACTICE CLUB",
      footerLine: "THREE LAYOUTS · ONE UNIQUE ID · YOUR WEBSITE",
      createMine: "Create my personal website →",
      notFoundTitle: "Page not found",
      notFoundMessage: "This ID does not exist, or the personal website has not been published successfully.",
      invalidTitle: "Incomplete link",
      invalidMessage: "Make sure the URL includes a four-character personal ID such as ?id=AB12.",
      loadFailedTitle: "Unable to load this website",
      loadFailedMessage: "Check the network connection or database configuration, then refresh the page."
    },
    zh: {
      languageAria: "选择语言",
      loading: "正在读取个人网页……",
      titleSuffix: "个人网页",
      personalSpace: "个人空间",
      profileCode: "个人编号",
      hello: "你好，我是",
      glow: "移动你的指针",
      glowActive: "光点正在跟随你 ✦",
      confetti: "点击任意位置试试看",
      reveal: "揭晓一条隐藏留言",
      revealed: "隐藏留言已揭晓 ✓",
      defaultSecret: "欢迎来到我的个人网页。",
      madeWith: "由人工智能实践社制作",
      footerLine: "三种布局 · 一个专属编号 · 你的个人网页",
      createMine: "创建我的个人网页 →",
      notFoundTitle: "页面没有找到",
      notFoundMessage: "这个编号不存在，或者个人网页尚未成功发布。",
      invalidTitle: "链接不完整",
      invalidMessage: "请确认网址中包含正确的四位个人编号。",
      loadFailedTitle: "暂时无法读取网页",
      loadFailedMessage: "请检查网络连接或数据库配置，然后刷新页面重试。"
    }
  };

  let language = "en";
  let loadedProfile = null;
  let currentError = null;

  function t(key) {
    return translations[language][key] || translations.en[key] || key;
  }

  function hasDatabaseConfig() {
    return Boolean(
      config.SUPABASE_URL &&
      apiKey &&
      !config.SUPABASE_URL.startsWith("YOUR_") &&
      !apiKey.startsWith("YOUR_")
    );
  }

  function databaseHeaders() {
    const headers = { apikey: apiKey };
    if (apiKey.split(".").length === 3) headers.Authorization = `Bearer ${apiKey}`;
    return headers;
  }

  function initials(value) {
    const parts = value.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "YOU";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  }

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    language = nextLanguage;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    languageSwitch.setAttribute("aria-label", t("languageAria"));
    languageButtons.forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (loadingText) loadingText.textContent = t("loading");
    if (loadedProfile) renderProfile(loadedProfile);
    else if (currentError) showError(currentError.titleKey, currentError.messageKey);
  }

  function showError(titleKey, messageKey) {
    currentError = { titleKey, messageKey };
    root.className = "profile-error";
    root.innerHTML = "";
    document.title = `${t(titleKey)} · ${t("titleSuffix")}`;
    const wrap = document.createElement("div");
    const heading = document.createElement("h1");
    const copy = document.createElement("p");
    const link = document.createElement("a");
    heading.textContent = t(titleKey);
    copy.textContent = t(messageKey);
    link.href = "index.html";
    link.textContent = t("createMine");
    wrap.append(heading, copy, link);
    root.append(wrap);
  }

  async function fetchProfile() {
    if (!/^[A-Z2-9]{4}$/.test(id)) throw new Error("INVALID_ID");

    if (!hasDatabaseConfig()) {
      const saved = localStorage.getItem(`profile_builder_${id}`);
      return saved ? JSON.parse(saved) : null;
    }

    const base = config.SUPABASE_URL.replace(/\/$/, "");
    const fields = "id,name,title,bio,accent_color,interaction,secret_text,template_id,created_at";
    const endpoint = `${base}/rest/v1/profiles?id=eq.${encodeURIComponent(id)}&select=${fields}&limit=1`;
    const response = await fetch(endpoint, { headers: databaseHeaders() });
    if (!response.ok) throw new Error(`LOAD_FAILED_${response.status}`);
    const rows = await response.json();
    return rows[0] || null;
  }

  function interactionLabel(kind) {
    if (kind === "confetti") return t("confetti");
    if (kind === "reveal") return t("reveal");
    return t("glow");
  }

  function renderProfile(profile) {
    currentError = null;
    const template = ["orbit", "blueprint", "studio"].includes(profile.template_id)
      ? profile.template_id
      : "orbit";
    const accent = /^#[0-9A-F]{6}$/i.test(profile.accent_color) ? profile.accent_color : "#C7FF43";
    const shortName = initials(profile.name);

    document.title = `${profile.name} · ${t("titleSuffix")}`;
    document.documentElement.style.setProperty("--accent", accent);
    root.className = `generated-profile template-${template}`;
    root.innerHTML = `
      <header class="profile-top">
        <div class="profile-logo"><i>AI</i><span>${t("personalSpace")}</span></div>
        <div class="profile-code">${t("profileCode")} / ${id}</div>
      </header>
      <section class="profile-main">
        <div class="profile-index">01/03</div>
        <div class="profile-copy">
          <div class="profile-kicker">${t("hello")}</div>
          <h1 data-field="name"></h1>
          <h2 class="profile-title" data-field="title"></h2>
          <p class="profile-bio" data-field="bio"></p>
          <button class="profile-interaction" type="button"><span>✦</span> ${interactionLabel(profile.interaction)}</button>
          <div class="secret-slot"></div>
        </div>
        <div class="profile-art" data-initials="${shortName.replace(/[^\p{L}\p{N}]/gu, "")}" aria-hidden="true"></div>
      </section>
      <footer class="profile-footer">
        <span>${t("madeWith")}</span>
        <span>${t("footerLine")}</span>
      </footer>
    `;

    root.querySelector("[data-field='name']").textContent = profile.name;
    root.querySelector("[data-field='title']").textContent = profile.title;
    root.querySelector("[data-field='bio']").textContent = profile.bio;
    activateInteraction(profile);
  }

  function activateInteraction(profile) {
    const button = root.querySelector(".profile-interaction");

    if (profile.interaction === "glow") {
      const glow = document.createElement("div");
      glow.className = "cursor-glow";
      glow.hidden = true;
      root.append(glow);
      root.addEventListener("pointermove", (event) => {
        glow.hidden = false;
        glow.style.left = `${event.clientX}px`;
        glow.style.top = `${event.clientY}px`;
      });
      root.addEventListener("pointerleave", () => { glow.hidden = true; });
      button.addEventListener("click", () => { button.textContent = t("glowActive"); });
      return;
    }

    if (profile.interaction === "confetti") {
      const burst = (event) => {
        const x = event.clientX ?? window.innerWidth / 2;
        const y = event.clientY ?? window.innerHeight / 2;
        for (let index = 0; index < 16; index += 1) {
          const piece = document.createElement("i");
          const angle = (Math.PI * 2 * index) / 16;
          const distance = 70 + Math.random() * 110;
          piece.className = "confetti-piece";
          piece.style.left = `${x}px`;
          piece.style.top = `${y}px`;
          piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
          piece.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
          piece.style.setProperty("--rot", `${180 + Math.random() * 540}deg`);
          if (index % 3 === 0) piece.style.background = "white";
          document.body.append(piece);
          piece.addEventListener("animationend", () => piece.remove(), { once: true });
        }
      };
      root.addEventListener("click", burst);
      return;
    }

    button.addEventListener("click", () => {
      const slot = root.querySelector(".secret-slot");
      if (slot.firstChild) return;
      const message = document.createElement("div");
      message.className = "secret-message";
      message.textContent = profile.secret_text || t("defaultSecret");
      slot.append(message);
      button.textContent = t("revealed");
    });
  }

  async function start() {
    try {
      const profile = await fetchProfile();
      if (!profile) {
        showError("notFoundTitle", "notFoundMessage");
        return;
      }
      loadedProfile = profile;
      renderProfile(profile);
    } catch (error) {
      if (error.message === "INVALID_ID") showError("invalidTitle", "invalidMessage");
      else showError("loadFailedTitle", "loadFailedMessage");
    }
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  setLanguage("en");
  start();
})();
