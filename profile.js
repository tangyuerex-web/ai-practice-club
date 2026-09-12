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
      profileCode: "PERSONAL PAGE",
      profileLabel: "PROFILE",
      nicknameLabel: "NICKNAME",
      aboutLabel: "ABOUT ME",
      knowMore: "Know more about me",
      playLabel: "PLAYGROUND",
      interactionTitle: "Click to see more.",
      interactionIntro: "This space responds with the effect I chose.",
      backToProfile: "Back to profile",
      pageSliderAria: "Personal page navigation",
      stars: "Tap for stars",
      ribbons: "Tap for ribbons",
      starsHint: "Tap the button or anywhere on this page to release tiny stars.",
      ribbonsHint: "Tap the button or anywhere on this page to release colorful ribbons.",
      clickToSee: "Click to see more",
      revealed: "More about me ✓",
      defaultSecret: "Welcome to my personal website.",
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
      profileCode: "个人主页",
      profileLabel: "个人资料",
      nicknameLabel: "绰号",
      aboutLabel: "关于我",
      knowMore: "进一步了解我",
      playLabel: "互动空间",
      interactionTitle: "点击了解更多。",
      interactionIntro: "这个空间会用我选择的效果回应你。",
      backToProfile: "返回个人资料",
      pageSliderAria: "个人主页分页导航",
      stars: "触碰释放星星",
      ribbons: "触碰释放彩带",
      starsHint: "触碰按钮或页面任意位置，就会出现小星星。",
      ribbonsHint: "触碰按钮或页面任意位置，就会出现彩色飘带。",
      clickToSee: "点击了解更多",
      revealed: "更多信息已显示 ✓",
      defaultSecret: "欢迎来到我的个人网页。",
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
  let currentProfilePage = 0;

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

  function monogram(value) {
    const first = [...value.trim()].find((character) => /[\p{L}\p{N}]/u.test(character));
    return (first || "Y").toUpperCase();
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

  function effectKind(kind) {
    return kind === "confetti" ? "ribbons" : "stars";
  }

  function effectLabel(kind) {
    return t(effectKind(kind));
  }

  function effectHint(kind) {
    return t(`${effectKind(kind)}Hint`);
  }

  function goToProfilePage(page) {
    currentProfilePage = Math.max(0, Math.min(1, Number(page) || 0));
    const track = root.querySelector(".personal-page-track");
    const slider = root.querySelector(".personal-page-slider");
    if (!track || !slider) return;
    track.style.transform = `translateX(-${currentProfilePage * 100}%)`;
    slider.value = String(currentProfilePage);
    slider.style.setProperty("--page-progress", `${currentProfilePage * 100}%`);
    root.dataset.page = String(currentProfilePage + 1);
    root.querySelectorAll("[data-profile-page]").forEach((control) => {
      control.classList.toggle("active", Number(control.dataset.profilePage) === currentProfilePage);
    });
  }

  function activateProfileNavigation() {
    root.querySelectorAll("[data-profile-page]").forEach((control) => {
      control.addEventListener("click", () => goToProfilePage(control.dataset.profilePage));
    });
    const slider = root.querySelector(".personal-page-slider");
    slider.addEventListener("input", () => goToProfilePage(slider.value));

    const viewport = root.querySelector(".personal-page-viewport");
    let startX = null;
    let startY = null;
    viewport.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, input")) return;
      startX = event.clientX;
      startY = event.clientY;
    });
    viewport.addEventListener("pointerup", (event) => {
      if (startX === null || startY === null) return;
      const distanceX = event.clientX - startX;
      const distanceY = event.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(distanceX) < 56 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
      goToProfilePage(distanceX < 0 ? 1 : 0);
    });
    viewport.addEventListener("pointercancel", () => {
      startX = null;
      startY = null;
    });
    goToProfilePage(currentProfilePage);
  }

  function renderProfile(profile) {
    currentError = null;
    const template = ["orbit", "blueprint", "studio"].includes(profile.template_id)
      ? profile.template_id
      : "orbit";
    const accent = /^#[0-9A-F]{6}$/i.test(profile.accent_color) ? profile.accent_color : "#C7FF43";
    const shortName = monogram(profile.name);

    document.title = `${profile.name} · ${t("titleSuffix")}`;
    document.documentElement.style.setProperty("--accent", accent);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", accent);
    const effect = effectKind(profile.interaction);
    root.className = `generated-profile template-${template} effect-${effect}`;
    root.style.setProperty("--accent", accent);
    root.innerHTML = `
      <header class="profile-top">
        <button class="profile-logo" type="button" data-profile-page="0" aria-label="${t("backToProfile")}"><i>${shortName}</i><span data-field="owner"></span></button>
        <div class="profile-code">${t("profileCode")} / ${id}</div>
      </header>
      <div class="personal-page-viewport">
        <div class="personal-page-track">
          <section class="profile-slide profile-overview">
            <div class="profile-copy">
              <div class="profile-kicker">${t("profileLabel")} · 01</div>
              <h1 data-field="name"></h1>
              <div class="nickname-block"><span>${t("nicknameLabel")}</span><h2 class="profile-title" data-field="title"></h2></div>
              <div class="about-block"><span>${t("aboutLabel")}</span><p class="profile-bio" data-field="bio"></p></div>
              <button class="profile-next" type="button" data-profile-page="1"><span>${t("knowMore")}</span><b aria-hidden="true">→</b></button>
            </div>
            <div class="profile-watermark" aria-hidden="true">${shortName}</div>
          </section>
          <section class="profile-slide profile-playground">
            <div class="effect-decoration" aria-hidden="true">${"<i></i>".repeat(9)}</div>
            <div class="profile-monogram" aria-hidden="true">${shortName}</div>
            <aside class="interaction-panel">
              <div class="profile-kicker">${t("playLabel")} · 02</div>
              <h2>${t("interactionTitle")}</h2>
              <p>${effectHint(profile.interaction)}</p>
              <div class="effect-choice"><span aria-hidden="true">${effect === "stars" ? "✦" : "〰"}</span>${effectLabel(profile.interaction)}</div>
              <button class="profile-interaction" type="button"><span>${effect === "stars" ? "✦" : "〰"}</span><b>${t("clickToSee")}</b></button>
              <div class="secret-slot"></div>
            </aside>
          </section>
        </div>
      </div>
      <nav class="personal-page-nav" aria-label="${t("pageSliderAria")}">
        <button type="button" data-profile-page="0">01 <span>${t("profileLabel")}</span></button>
        <input class="personal-page-slider" type="range" min="0" max="1" step="1" value="0" aria-label="${t("pageSliderAria")}" />
        <button type="button" data-profile-page="1">02 <span>${t("playLabel")}</span></button>
      </nav>
    `;

    root.querySelector("[data-field='owner']").textContent = profile.name;
    root.querySelector("[data-field='name']").textContent = profile.name;
    root.querySelector("[data-field='title']").textContent = profile.title;
    root.querySelector("[data-field='bio']").textContent = profile.bio;
    activateProfileNavigation();
    activateInteraction(profile);
  }

  function activateInteraction(profile) {
    const button = root.querySelector(".profile-interaction");
    const playground = root.querySelector(".profile-playground");
    const effect = effectKind(profile.interaction);

    const revealInformation = () => {
      const slot = root.querySelector(".secret-slot");
      if (slot.firstChild) return;
      const message = document.createElement("div");
      message.className = "secret-message";
      message.textContent = profile.secret_text || t("defaultSecret");
      slot.append(message);
      button.querySelector("b").textContent = t("revealed");
    };

    const burst = (event) => {
      const bounds = playground.getBoundingClientRect();
      const fallback = button.getBoundingClientRect();
      const hasPointerCoordinates = event.detail !== 0 && Number.isFinite(event.clientX) && Number.isFinite(event.clientY);
      const x = hasPointerCoordinates ? event.clientX - bounds.left : fallback.left + fallback.width / 2 - bounds.left;
      const y = hasPointerCoordinates ? event.clientY - bounds.top : fallback.top + fallback.height / 2 - bounds.top;
      const total = effect === "stars" ? 12 : 16;
      for (let index = 0; index < total; index += 1) {
        const piece = document.createElement("i");
        const angle = (Math.PI * 2 * index) / total;
        const distance = 62 + Math.random() * 110;
        piece.className = effect === "stars" ? "star-piece" : "confetti-piece";
        piece.textContent = effect === "stars" ? "✦" : "";
        piece.style.left = `${x}px`;
        piece.style.top = `${y}px`;
        piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
        piece.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);
        piece.style.setProperty("--rot", `${180 + Math.random() * 540}deg`);
        if (effect === "ribbons" && index % 3 === 0) piece.classList.add("light-piece");
        playground.append(piece);
        piece.addEventListener("animationend", () => piece.remove(), { once: true });
      }
    };

    playground.addEventListener("click", burst);
    button.addEventListener("click", revealInformation);
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
