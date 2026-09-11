(() => {
  "use strict";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const form = $("#builder-form");
  const nameInput = $("#name");
  const titleInput = $("#title");
  const bioInput = $("#bio");
  const secretInput = $("#secret");
  const bioCount = $("#bio-count");
  const preview = $("#preview-site");
  const overlay = $("#construction-overlay");
  const progressBar = $("#progress-bar");
  const progressTrack = $(".progress-track");
  const progressNumber = $("#progress-number");
  const progressStep = $("#construction-step");
  const resultDialog = $("#result-dialog");
  const resultUrl = $("#result-url");
  const openSite = $("#open-site");
  const copyUrlButton = $("#copy-url");
  const demoWarning = $("#demo-warning");
  const formError = $("#form-error");
  const wizardSteps = $$(".wizard-step");
  const wizardBack = $("#wizard-back");
  const wizardNext = $("#wizard-next");
  const wizardProgressBar = $("#wizard-progress-bar");
  const wizardStepCount = $("#wizard-step-count");
  const wizardStepName = $("#wizard-step-name");
  const wizardViewport = $("#wizard-viewport");
  const wizardTrack = $("#wizard-track");
  const wizardSlider = $("#wizard-slider");
  const draftStatus = $("#draft-status");
  const config = window.PROFILE_BUILDER_CONFIG || {};
  const apiKey = config.SUPABASE_PUBLISHABLE_KEY || config.SUPABASE_ANON_KEY || "";

  const translations = {
    en: {
      pageTitle: "Personal Site Builder · AI Practice Club",
      pageDescription: "AI Practice Club personal site builder",
      languageAria: "Choose language",
      brandAria: "Return to the builder home",
      brandTitle: "Personal Site Builder",
      clubName: "AI Practice Club",
      githubReady: "GitHub Pages Ready",
      eyebrow: "BUILD YOUR SPACE",
      heroTitle: "Build your website, one choice at a time.",
      heroIntro: "Four short steps. Your page changes with every answer.",
      wizardProgressAria: "Builder progress",
      stepCount: "STEP %1 / %2",
      stepIdentity: "Your identity",
      stepExpression: "Your expression",
      stepInteraction: "Your interaction",
      stepReview: "Ready to publish",
      questionOne: "QUESTION 1–2",
      questionThreeFour: "QUESTION 3–4",
      questionFive: "QUESTION 5",
      finalStep: "FINAL STEP",
      identityTitle: "Who is this page about?",
      identityIntro: "Give your page a name and a title.",
      identityTip: "Try a title that says what you make, explore, or care about.",
      nameLabel: "Name",
      titleLabel: "Personal title",
      bioLabel: "One-line introduction",
      expressionTitle: "What should your page feel like?",
      expressionIntro: "Write one line, then choose its visual energy.",
      colorTitle: "Choose your energy",
      colorIntro: "Pick a color to reshape the whole visual system.",
      themeColorAria: "Theme color",
      limeAria: "Electric lime",
      blueAria: "Cobalt blue",
      orangeAria: "Bright orange",
      pinkAria: "Bright pink",
      customColorAria: "Custom color",
      customColor: "CUSTOM",
      activeColor: "ACTIVE COLOR",
      interactionTitle: "How should visitors interact?",
      interactionIntro: "Choose one small effect that gives your page personality.",
      interactionAria: "Interactive feature",
      glowTitle: "Cursor glow",
      glowIntro: "A soft glow follows the pointer",
      confettiTitle: "Click confetti",
      confettiIntro: "Clicks release colorful fragments",
      revealTitle: "Hidden message",
      revealIntro: "A button reveals one personal detail",
      secretLabel: "What should the hidden message say?",
      reviewTitle: "Ready to make it real?",
      reviewIntro: "Check the essentials. Your final layout is still a surprise.",
      reviewProfile: "PROFILE",
      templateTitle: "3 templates, chosen at random",
      templateIntro: "The layout is revealed after the ten-second build.",
      publish: "Publish My Website",
      back: "Back",
      continue: "Continue",
      slideToNavigate: "SLIDE TO CHANGE PAGE",
      slideAria: "Slide to change page",
      draftSaved: "Draft saved",
      draftSaving: "Saving...",
      previewAria: "Live personal site preview",
      livePreview: "LIVE PREVIEW",
      previewSizeAria: "Preview size",
      mobile: "Mobile",
      desktop: "Desktop",
      profileYear: "PROFILE / 2026",
      hello: "HELLO, I AM",
      explore: "Explore my world",
      madeWith: "MADE WITH AI PRACTICE CLUB",
      previewCaption: "Every choice updates this preview.",
      constructing: "AI is constructing your website",
      progressAria: "Website construction progress",
      aboutTenSeconds: "About 10 seconds",
      stepReading: "Reading your style...",
      stepLayout: "Selecting your layout...",
      stepInteraction: "Building your interaction...",
      stepLink: "Connecting your unique link...",
      stepFinishing: "Finishing details...",
      closeAria: "Close",
      resultEyebrow: "YOUR WEBSITE IS LIVE",
      resultTitle: "Your personal website is ready.",
      templateLabel: "Template",
      idLabel: "Personal ID",
      shareLink: "Share this link",
      copyUrl: "Copy URL",
      copied: "Copied ✓",
      openSite: "Open my website ↗",
      demoWarning: "This is local demo mode. Configure Supabase before opening links on another device.",
      fallbackName: "Your Name",
      fallbackTitle: "Your Title",
      fallbackBio: "Introduce yourself in one sentence.",
      uniqueIdError: "Could not create a unique ID. Please try again.",
      publishFailed: "Publish failed",
      configRetry: "Check the database configuration and try again.",
      template_orbit: "Orbit",
      template_blueprint: "Blueprint",
      template_studio: "Studio"
    },
    zh: {
      pageTitle: "个人网页生成器 · 人工智能实践社",
      pageDescription: "人工智能实践社个人网页生成器",
      languageAria: "选择语言",
      brandAria: "返回生成器首页",
      brandTitle: "个人网页生成器",
      clubName: "人工智能实践社",
      githubReady: "适配静态网页托管",
      eyebrow: "创建你的空间",
      heroTitle: "一步一个选择，创建你的个人网页。",
      heroIntro: "只需四个简短步骤，每次回答都会改变你的页面。",
      wizardProgressAria: "网页创建进度",
      stepCount: "第 %1 步，共 %2 步",
      stepIdentity: "你的身份",
      stepExpression: "你的表达",
      stepInteraction: "你的互动",
      stepReview: "准备发布",
      questionOne: "问题一至二",
      questionThreeFour: "问题三至四",
      questionFive: "问题五",
      finalStep: "最后一步",
      identityTitle: "这个页面的主角是谁？",
      identityIntro: "给你的页面一个名字和个人标题。",
      identityTip: "个人标题可以说明你喜欢创作、探索或关注什么。",
      nameLabel: "名字",
      titleLabel: "个人标题",
      bioLabel: "一句话介绍",
      expressionTitle: "你希望页面给人什么感觉？",
      expressionIntro: "先写一句介绍，再选择页面的视觉能量。",
      colorTitle: "选择页面能量",
      colorIntro: "点选颜色，实时改变整个视觉系统。",
      themeColorAria: "主题颜色",
      limeAria: "电光黄绿色",
      blueAria: "钴蓝色",
      orangeAria: "亮橙色",
      pinkAria: "亮粉色",
      customColorAria: "自定义颜色",
      customColor: "自定义",
      activeColor: "当前颜色",
      interactionTitle: "你希望访客怎样与页面互动？",
      interactionIntro: "选择一个小效果，让页面更有自己的性格。",
      interactionAria: "互动功能",
      glowTitle: "光点跟随",
      glowIntro: "指针经过时产生柔和光晕",
      confettiTitle: "点击彩片",
      confettiIntro: "点击页面释放主题色碎片",
      revealTitle: "隐藏留言",
      revealIntro: "点击按钮揭晓一条个人信息",
      secretLabel: "隐藏留言想写什么？",
      reviewTitle: "准备好把它变成真正的网页了吗？",
      reviewIntro: "检查主要信息，最终版式仍会保留惊喜。",
      reviewProfile: "个人主页",
      templateTitle: "三套模板随机生成",
      templateIntro: "十秒构建完成后，最终版式才会揭晓。",
      publish: "发布我的网页",
      back: "返回",
      continue: "继续",
      slideToNavigate: "滑动切换页面",
      slideAria: "滑动切换页面",
      draftSaved: "草稿已保存",
      draftSaving: "正在保存……",
      previewAria: "个人网页实时预览",
      livePreview: "实时预览",
      previewSizeAria: "预览尺寸",
      mobile: "手机端",
      desktop: "桌面端",
      profileYear: "个人主页 / 2026",
      hello: "你好，我是",
      explore: "了解我的世界",
      madeWith: "由人工智能实践社制作",
      previewCaption: "每个选择都会立即更新预览。",
      constructing: "人工智能正在构建你的网页",
      progressAria: "网页生成进度",
      aboutTenSeconds: "大约十秒",
      stepReading: "正在读取你的风格……",
      stepLayout: "正在选择页面布局……",
      stepInteraction: "正在构建互动功能……",
      stepLink: "正在连接专属网址……",
      stepFinishing: "正在完成最后细节……",
      closeAria: "关闭",
      resultEyebrow: "你的网页已上线",
      resultTitle: "你的个人网页已生成。",
      templateLabel: "模板",
      idLabel: "个人编号",
      shareLink: "分享这个链接",
      copyUrl: "复制网址",
      copied: "已复制 ✓",
      openSite: "打开我的网页 ↗",
      demoWarning: "当前是本地演示模式；配置在线数据库后，链接才能在其他设备打开。",
      fallbackName: "你的名字",
      fallbackTitle: "你的标题",
      fallbackBio: "用一句话介绍你自己。",
      uniqueIdError: "无法生成唯一编号，请重试。",
      publishFailed: "发布失败",
      configRetry: "请检查数据库配置后重试。",
      template_orbit: "星际轨道",
      template_blueprint: "网格蓝图",
      template_studio: "创意工作室"
    }
  };

  const localizedDefaults = {
    title: { en: "Student Builder", zh: "学生创作者" },
    bio: { en: "Turning ideas into things that actually work.", zh: "把想法做成真正能运行的东西。" },
    secret: { en: "I am learning how to turn AI into real work.", zh: "我正在学习如何把人工智能变成真正的作品。" }
  };

  let accent = "#C7FF43";
  let publishing = false;
  let language = "en";
  let currentStep = 0;
  let draftTimer = 0;
  let restoringDraft = false;
  const draftKey = "profile_builder_draft_v3";
  const stepNameKeys = ["stepIdentity", "stepExpression", "stepInteraction", "stepReview"];

  function t(key) {
    return translations[language][key] || translations.en[key] || key;
  }

  function translateDefaultInput(input, key, nextLanguage) {
    const values = Object.values(localizedDefaults[key]);
    if (values.includes(input.value)) input.value = localizedDefaults[key][nextLanguage];
  }

  function setLanguage(nextLanguage) {
    if (!translations[nextLanguage]) return;
    translateDefaultInput(titleInput, "title", nextLanguage);
    translateDefaultInput(bioInput, "bio", nextLanguage);
    translateDefaultInput(secretInput, "secret", nextLanguage);
    language = nextLanguage;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = t("pageTitle");
    $("meta[name='description']").setAttribute("content", t("pageDescription"));
    $$('[data-i18n]').forEach((element) => {
      element.textContent = t(element.dataset.i18n);
    });
    $$('[data-i18n-aria]').forEach((element) => {
      element.setAttribute("aria-label", t(element.dataset.i18nAria));
    });
    $$(".language-switch button").forEach((button) => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    progressStep.textContent = t("stepReading");
    if (!resultDialog.open) copyUrlButton.textContent = t("copyUrl");
    updatePreview();
    updateReview();
    updateWizardUi();
  }

  function initials(value) {
    const parts = value.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "YOU";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts.at(-1)[0]}`.toUpperCase();
  }

  function updatePreview() {
    const name = nameInput.value.trim() || t("fallbackName");
    $("#preview-name").textContent = name;
    $("#preview-title").textContent = titleInput.value.trim() || t("fallbackTitle");
    $("#preview-bio").textContent = bioInput.value.trim() || t("fallbackBio");
    $("#preview-initials").textContent = initials(name);
    bioCount.value = `${bioInput.value.length} / 180`;
  }

  function interactionName() {
    const keys = { glow: "glowTitle", confetti: "confettiTitle", reveal: "revealTitle" };
    return t(keys[selectedInteraction()] || "glowTitle");
  }

  function updateReview() {
    const name = nameInput.value.trim() || t("fallbackName");
    $("#review-name").textContent = name;
    $("#review-title").textContent = titleInput.value.trim() || t("fallbackTitle");
    $("#review-initials").textContent = initials(name);
    $("#review-color").style.background = accent;
    $("#review-interaction").textContent = interactionName();
  }

  function updateWizardUi() {
    const current = currentStep + 1;
    const total = wizardSteps.length;
    wizardStepCount.textContent = t("stepCount")
      .replace("%1", String(current).padStart(2, "0"))
      .replace("%2", String(total).padStart(2, "0"));
    wizardStepName.textContent = t(stepNameKeys[currentStep]);
    wizardProgressBar.style.width = `${(current / total) * 100}%`;
    wizardTrack.style.transform = `translateX(-${currentStep * 100}%)`;
    wizardSlider.value = String(current);
    wizardSlider.style.setProperty("--slider-progress", `${((current - 1) / (total - 1)) * 100}%`);
    $(".wizard-progress").setAttribute("aria-valuenow", String(current));
    wizardBack.hidden = currentStep === 0;
    wizardNext.hidden = currentStep === total - 1;
    $$(".wizard-dots i").forEach((dot, index) => {
      dot.classList.toggle("active", index <= currentStep);
    });
    wizardSteps.forEach((step, index) => {
      const active = index === currentStep;
      step.classList.toggle("active", active);
      step.setAttribute("aria-hidden", String(!active));
      if ("inert" in step) step.inert = !active;
    });
  }

  function draftSnapshot() {
    return {
      name: nameInput.value,
      title: titleInput.value,
      bio: bioInput.value,
      secret: secretInput.value,
      accent,
      interaction: selectedInteraction(),
      currentStep,
      savedAt: Date.now()
    };
  }

  function saveDraftNow() {
    if (restoringDraft) return;
    try {
      localStorage.setItem(draftKey, JSON.stringify(draftSnapshot()));
      draftStatus.textContent = t("draftSaved");
      draftStatus.classList.add("saved");
      setTimeout(() => draftStatus.classList.remove("saved"), 650);
    } catch {
      // The builder still keeps every answer while this tab remains open.
    }
  }

  function queueDraftSave() {
    if (restoringDraft) return;
    clearTimeout(draftTimer);
    draftStatus.textContent = t("draftSaving");
    draftTimer = setTimeout(saveDraftNow, 180);
  }

  function restoreDraft() {
    try {
      const saved = JSON.parse(localStorage.getItem(draftKey) || "null");
      if (!saved || typeof saved !== "object") return;
      restoringDraft = true;
      if (typeof saved.name === "string") nameInput.value = saved.name.slice(0, 32);
      if (typeof saved.title === "string") titleInput.value = saved.title.slice(0, 48);
      if (typeof saved.bio === "string") bioInput.value = saved.bio.slice(0, 180);
      if (typeof saved.secret === "string") secretInput.value = saved.secret.slice(0, 80);
      if (/^#[0-9A-F]{6}$/i.test(saved.accent || "")) accent = saved.accent.toUpperCase();
      const interaction = ["glow", "confetti", "reveal"].includes(saved.interaction) ? saved.interaction : "glow";
      const radio = $(`input[name='interaction'][value='${interaction}']`);
      if (radio) radio.checked = true;
      currentStep = Math.max(0, Math.min(wizardSteps.length - 1, Number(saved.currentStep) || 0));
      document.documentElement.style.setProperty("--accent", accent);
      $("#color-value").textContent = accent;
      $("#custom-color").value = accent;
      $$(".color-orb").forEach((button) => {
        const active = button.dataset.color.toUpperCase() === accent;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    } catch {
      // Ignore an old or incomplete draft and continue with safe defaults.
    } finally {
      restoringDraft = false;
    }
  }

  function pulsePreview() {
    preview.classList.remove("preview-pulse");
    requestAnimationFrame(() => preview.classList.add("preview-pulse"));
  }

  function validateCurrentStep() {
    const controls = $$("input, textarea", wizardSteps[currentStep]);
    const invalid = controls.find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    return false;
  }

  function goToStep(nextStep) {
    const target = Math.max(0, Math.min(wizardSteps.length - 1, nextStep));
    if (target === currentStep) return;
    currentStep = target;
    updateReview();
    updateWizardUi();
    queueDraftSave();
    pulsePreview();
    if (window.innerWidth <= 1050) {
      $(".wizard-progress").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function setAccent(color, sourceButton = null) {
    accent = color.toUpperCase();
    document.documentElement.style.setProperty("--accent", accent);
    $("#color-value").textContent = accent;
    $("#custom-color").value = accent;
    $$(".color-orb").forEach((button) => {
      const active = button === sourceButton || button.dataset.color.toUpperCase() === accent;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    updateReview();
    pulsePreview();
    queueDraftSave();
  }

  function selectedInteraction() {
    return $("input[name='interaction']:checked").value;
  }

  function updateInteractionCards() {
    $$(".interaction-card").forEach((card) => {
      card.classList.toggle("active", $("input", card).checked);
    });
    $("#secret-field").hidden = selectedInteraction() !== "reveal";
    updateReview();
    queueDraftSave();
  }

  function chooseTemplate() {
    const templates = ["orbit", "blueprint", "studio"];
    const previous = sessionStorage.getItem("lastProfileTemplate");
    const choices = templates.filter((item) => item !== previous);
    const values = new Uint32Array(1);
    crypto.getRandomValues(values);
    const chosen = choices[values[0] % choices.length];
    sessionStorage.setItem("lastProfileTemplate", chosen);
    return chosen;
  }

  function createId() {
    const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const values = new Uint32Array(4);
    crypto.getRandomValues(values);
    return [...values].map((value) => alphabet[value % alphabet.length]).join("");
  }

  function hasDatabaseConfig() {
    return Boolean(
      config.SUPABASE_URL &&
      apiKey &&
      !config.SUPABASE_URL.startsWith("YOUR_") &&
      !apiKey.startsWith("YOUR_")
    );
  }

  function databaseHeaders(withContentType = false) {
    const headers = { apikey: apiKey };
    if (apiKey.split(".").length === 3) headers.Authorization = `Bearer ${apiKey}`;
    if (withContentType) headers["Content-Type"] = "application/json";
    return headers;
  }

  async function postProfile(profile) {
    const endpoint = `${config.SUPABASE_URL.replace(/\/$/, "")}/rest/v1/profiles`;
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { ...databaseHeaders(true), Prefer: "return=minimal" },
      body: JSON.stringify(profile)
    });
    if (!response.ok) {
      const details = await response.text();
      const error = new Error(details || `Database request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
  }

  async function saveProfile(draft) {
    if (!hasDatabaseConfig()) {
      const profile = { ...draft, id: createId(), created_at: new Date().toISOString() };
      localStorage.setItem(`profile_builder_${profile.id}`, JSON.stringify(profile));
      return { profile, demo: true };
    }

    for (let attempt = 0; attempt < 6; attempt += 1) {
      const profile = { ...draft, id: createId() };
      try {
        await postProfile(profile);
        return { profile, demo: false };
      } catch (error) {
        if (error.status !== 409 || attempt === 5) throw error;
      }
    }
    throw new Error(t("uniqueIdError"));
  }

  function animateConstruction() {
    const duration = 10000;
    const steps = [
      [0, "stepReading"],
      [23, "stepLayout"],
      [50, "stepInteraction"],
      [76, "stepLink"],
      [94, "stepFinishing"]
    ];
    const started = performance.now();

    return new Promise((resolve) => {
      function frame(now) {
        const percent = Math.min(100, ((now - started) / duration) * 100);
        const rounded = Math.round(percent);
        progressBar.style.width = `${percent}%`;
        progressTrack.setAttribute("aria-valuenow", String(rounded));
        progressNumber.textContent = `${rounded}%`;
        const activeStep = [...steps].reverse().find(([threshold]) => percent >= threshold);
        progressStep.textContent = t(activeStep[1]);
        if (percent >= 100) resolve();
        else requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    });
  }

  function profileUrl(id) {
    const url = new URL("profile.html", window.location.href);
    url.search = "";
    url.hash = "";
    url.searchParams.set("id", id);
    return url.href;
  }

  async function publish(event) {
    event.preventDefault();
    if (publishing) return;
    formError.hidden = true;
    if (!form.checkValidity()) {
      const invalid = $(":invalid", form);
      const invalidStep = invalid?.closest(".wizard-step");
      if (invalidStep) goToStep(Number(invalidStep.dataset.step));
      setTimeout(() => invalid?.reportValidity(), 180);
      return;
    }

    publishing = true;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    progressBar.style.width = "0%";
    progressNumber.textContent = "0%";
    progressTrack.setAttribute("aria-valuenow", "0");

    const draft = {
      name: nameInput.value.trim(),
      title: titleInput.value.trim(),
      bio: bioInput.value.trim(),
      accent_color: accent,
      interaction: selectedInteraction(),
      secret_text: secretInput.value.trim(),
      template_id: chooseTemplate()
    };

    try {
      const [saved] = await Promise.all([saveProfile(draft), animateConstruction()]);
      const url = profileUrl(saved.profile.id);
      resultUrl.value = url;
      openSite.href = url;
      $("#result-template").textContent = t(`template_${saved.profile.template_id}`);
      $("#result-id").textContent = saved.profile.id;
      demoWarning.hidden = !saved.demo;
      overlay.hidden = true;
      resultDialog.showModal();
    } catch (error) {
      overlay.hidden = true;
      const details = language === "zh" ? t("configRetry") : (error.message || t("configRetry"));
      formError.textContent = `${t("publishFailed")}: ${details}`;
      formError.hidden = false;
    } finally {
      publishing = false;
      document.body.style.overflow = "";
    }
  }

  [nameInput, titleInput, bioInput, secretInput].forEach((input) => input.addEventListener("input", () => {
    updatePreview();
    updateReview();
    queueDraftSave();
  }));
  $$(".color-orb").forEach((button) => button.addEventListener("click", () => setAccent(button.dataset.color, button)));
  $("#custom-color").addEventListener("input", (event) => setAccent(event.target.value));
  $$("input[name='interaction']").forEach((radio) => radio.addEventListener("change", updateInteractionCards));
  $$(".device-switch button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".device-switch button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      preview.classList.toggle("mobile", button.dataset.device === "mobile");
      pulsePreview();
    });
  });
  wizardNext.addEventListener("click", () => {
    if (validateCurrentStep()) goToStep(currentStep + 1);
  });
  wizardBack.addEventListener("click", () => goToStep(currentStep - 1));
  wizardSlider.addEventListener("input", () => goToStep(Number(wizardSlider.value) - 1));

  let swipeStartX = null;
  let swipeStartY = null;
  wizardViewport.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" || event.target.closest("input, textarea, button, label")) return;
    swipeStartX = event.clientX;
    swipeStartY = event.clientY;
  });
  wizardViewport.addEventListener("pointerup", (event) => {
    if (swipeStartX === null || swipeStartY === null) return;
    const distanceX = event.clientX - swipeStartX;
    const distanceY = event.clientY - swipeStartY;
    swipeStartX = null;
    swipeStartY = null;
    if (Math.abs(distanceX) < 54 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
    if (distanceX < 0 && currentStep < wizardSteps.length - 1) {
      if (validateCurrentStep()) goToStep(currentStep + 1);
    } else if (distanceX > 0) {
      goToStep(currentStep - 1);
    }
  });
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.tagName !== "TEXTAREA" && currentStep < wizardSteps.length - 1) {
      event.preventDefault();
      wizardNext.click();
    }
  });
  form.addEventListener("submit", publish);
  $$(".language-switch button").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });
  $(".dialog-close").addEventListener("click", () => resultDialog.close());
  copyUrlButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(resultUrl.value);
    } catch {
      resultUrl.select();
      document.execCommand("copy");
    }
    copyUrlButton.textContent = t("copied");
    setTimeout(() => { copyUrlButton.textContent = t("copyUrl"); }, 1800);
  });

  restoreDraft();
  setLanguage("en");
  updateInteractionCards();
  updateWizardUi();
  window.addEventListener("pagehide", saveDraftNow);
})();
