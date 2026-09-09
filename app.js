(() => {
  "use strict";

  const CLUB_WECHAT = "1120091123";
  const BASE_COMPLETIONS = 43;

  const translations = {
    en: {
      metaTitle: "AI Practice Club — Recruitment Experiment",
      metaDescription: "A two-minute AI experiment by AI Practice Club — 2026 founding members recruitment.",
      skip: "Skip to experiment", logoAria: "AI Practice Club home", brand: "AI PRACTICE CLUB",
      founding: "FOUNDING MEMBERS / 2026", heroLine1: "AI PRACTICE", heroLine2: "CLUB",
      heroQuestion: "What could you build with AI?", terminalId: "PROFILE_LAB.EXE", live: "● LIVE",
      start: "START EXPERIMENT", takes: "Takes less than 2 minutes.", footerRecruitment: "AI Practice Club · 2026 Recruitment",
      chooseSignal: "CHOOSE A SIGNAL", personaTitle: "What would you do with AI?", personaSubtitle: "Pick the one that sounds most like you.",
      signalDetected: "Profile signal detected.", oneIdea: "ONE IDEA", ideaTitle: "What would you build?",
      ideaSubtitle: "Imagine AI could help you create anything. What would you try?", yourExperiment: "YOUR EXPERIMENT",
      ideaPlaceholder: "e.g. An app that automatically organizes my homework...", buildIdea: "BUILD IDEA",
      projectDetected: "PROJECT DETECTED", toolkit: "POSSIBLE TOOLKIT", difficulty: "DIFFICULTY", buildable: "BUILDABLE?",
      definitely: "DEFINITELY.", noCode: "And you don't need to know how to code yet.", nextChallenge: "NEXT CHALLENGE",
      twoRounds: "TWO RANDOM ROUNDS", quizTitle: "Human or AI?", quizSubtitle: "Two questions are randomly drawn from a bank of ten.",
      profileEngine: "PROFILE ENGINE", generating: "Generating profile...", complete: "EXPERIMENT COMPLETE",
      profileReady: "Your AI profile is ready.", notDiagnosis: "Built from the choices you made — not a personality diagnosis.",
      profile2026: "PROFILE / 2026", yourProfile: "YOUR AI PROFILE", yourStrength: "YOUR AI STRENGTH",
      nextSkill: "YOUR NEXT SKILL", nextSkillText: "Build AI tools instead of only using them.",
      recommendedProject: "RECOMMENDED PROJECT", createWith: "Create with:", aiLevel: "AI LEVEL", levelExplorer: "LV. 01 — EXPLORER",
      motto: "DON'T JUST USE AI. BUILD WITH IT.", saveProfile: "↓ SAVE MY PROFILE", shareProfile: "↗ SHARE WITH A FRIEND",
      nextLevel: "THE NEXT LEVEL", maybeStarts: "Maybe this starts here.",
      clubCopy: "AI Practice Club isn't about sitting in a classroom listening to lectures.",
      experiment: "WE EXPERIMENT.", build: "WE BUILD.", learnDoing: "WE LEARN BY DOING.", firstWorkshop: "FIRST WORKSHOP",
      buildSomething: "Build Something With AI", workshopCopy: "No coding experience required.<br>No AI experience required.<br>Just bring an idea.",
      learn: "Learn", learnCopy: "Understand useful AI tools.", buildWord: "Build", buildCopy: "Create real mini-projects.",
      share: "Share", shareCopy: "Turn ideas into something others can see.", joinClub: "JOIN AI PRACTICE CLUB",
      limited: "Founding Members Recruitment · Limited places for the first workshop.", application: "FOUNDING MEMBER APPLICATION",
      youreIn: "You're in.", tellUs: "Tell us a little about you.", name: "NAME", grade: "GRADE", wechat: "WECHAT",
      namePlaceholder: "Your name", gradePlaceholder: "e.g. Grade 10", wechatPlaceholder: "Your WeChat ID",
      interestsLegend: "WHAT INTERESTS YOU MOST?", interestAi: "AI Tools", interestCoding: "Coding", interestDesign: "Design",
      interestBusiness: "Business", interestResearch: "Research", interestProductivity: "Productivity", interestExplore: "Just exploring",
      privacy: "Static site note: this form only remembers your details on this device. Scan the QR code after submitting to complete your sign-up.",
      submit: "SUBMIT", applicationReady: "APPLICATION READY", welcome: "WELCOME", startsHere: "Your experiment starts here.",
      scanJoin: "Scan to join the group", wechatDisplay: "WECHAT: 1120091123", localOnly: "Your form details remain on this device. Joining the WeChat group completes the real sign-up.",
      seeYou: "See you at the first workshop.", restart: "RESTART EXPERIMENT", qrAlt: "AI Practice Club WeChat group QR code"
    },
    zh: {
      metaTitle: "人工智能实践社 — 2026 招新实验",
      metaDescription: "人工智能实践社的两分钟互动招新实验。",
      skip: "跳到实验", logoAria: "返回人工智能实践社首页", brand: "人工智能实践社",
      founding: "创始成员招募 / 2026", heroLine1: "AI 实践", heroLine2: "社团",
      heroQuestion: "你想用 AI 创造什么？", terminalId: "画像实验室.程序", live: "● 运行中",
      start: "开始实验", takes: "用时不到两分钟。", footerRecruitment: "人工智能实践社 · 2026 招新",
      chooseSignal: "选择你的方向", personaTitle: "你想用 AI 做什么？", personaSubtitle: "选择最像你的那一项。",
      signalDetected: "已检测到画像信号。", oneIdea: "一个想法", ideaTitle: "你想创造什么？",
      ideaSubtitle: "想象 AI 可以帮助你创造任何东西。你会尝试什么？", yourExperiment: "你的实验",
      ideaPlaceholder: "例如：一个能自动整理作业的应用……", buildIdea: "分析想法",
      projectDetected: "已发现项目", toolkit: "可用工具组合", difficulty: "难度", buildable: "能实现吗？",
      definitely: "当然可以。", noCode: "而且，你现在还不需要会编程。", nextChallenge: "进入下一关",
      twoRounds: "两道随机题", quizTitle: "人类还是 AI？", quizSubtitle: "系统将从十道题中随机抽取两道，且不会重复。",
      profileEngine: "画像生成系统", generating: "正在生成画像……", complete: "实验完成",
      profileReady: "你的 AI 画像已生成。", notDiagnosis: "画像来自你的选择，仅供互动体验，并非性格诊断。",
      profile2026: "画像 / 2026", yourProfile: "你的 AI 画像", yourStrength: "你的 AI 优势",
      nextSkill: "你的下一项技能", nextSkillText: "不只使用 AI，更要学会创造 AI 工具。",
      recommendedProject: "推荐项目", createWith: "你可以制作：", aiLevel: "AI 等级", levelExplorer: "等级 01 — 探索者",
      motto: "别只会使用 AI，和它一起创造。", saveProfile: "↓ 保存我的画像", shareProfile: "↗ 分享给朋友",
      nextLevel: "下一阶段", maybeStarts: "也许，一切从这里开始。",
      clubCopy: "人工智能实践社不是坐在教室里听讲座的地方。",
      experiment: "我们实验。", build: "我们创造。", learnDoing: "我们在实践中学习。", firstWorkshop: "第一次工作坊",
      buildSomething: "用 AI 创造一个作品", workshopCopy: "不需要编程经验。<br>不需要 AI 使用经验。<br>只需要带来一个想法。",
      learn: "学习", learnCopy: "理解实用的 AI 工具。", buildWord: "创造", buildCopy: "完成真正的小项目。",
      share: "分享", shareCopy: "让别人看见你的想法。", joinClub: "加入人工智能实践社",
      limited: "创始成员招募 · 第一次工作坊名额有限。", application: "创始成员报名",
      youreIn: "欢迎加入。", tellUs: "简单介绍一下你自己。", name: "姓名", grade: "年级", wechat: "微信号",
      namePlaceholder: "你的姓名", gradePlaceholder: "例如：十年级", wechatPlaceholder: "你的微信号",
      interestsLegend: "你最感兴趣的方向是什么？", interestAi: "AI 工具", interestCoding: "编程", interestDesign: "设计",
      interestBusiness: "商业", interestResearch: "研究", interestProductivity: "效率提升", interestExplore: "先探索看看",
      privacy: "静态网页提示：这些信息只会保存在当前设备。提交后请扫描二维码，完成正式报名。",
      submit: "提交", applicationReady: "报名信息已准备", welcome: "欢迎", startsHere: "你的实验从这里开始。",
      scanJoin: "扫码加入微信群", wechatDisplay: "微信号：1120091123", localOnly: "表单信息仅保存在当前设备；加入微信群后才算完成正式报名。",
      seeYou: "第一次工作坊见。", restart: "重新开始实验", qrAlt: "人工智能实践社微信群二维码"
    }
  };

  const personaData = {
    creator: {
      en: { cardName: "CREATOR", description: "I want to make things look better.", keywords: "Design · Images · Video", name: "THE CREATOR", traits: "Visual · Curious · Expressive", strength: "Turning ideas into visuals.", project: "AI Brand Studio", tags: ["POSTER", "LOGO", "SOCIAL MEDIA", "VIDEO"], summary: "A compact creative studio that turns a rough idea into a visual direction.", toolkit: [["AI IMAGING", "Explore visual directions"], ["DESIGN SYSTEM", "Keep every output consistent"], ["VIDEO TOOLS", "Bring the concept to life"]] },
      zh: { cardName: "创造者", description: "我想让创意变得更好看。", keywords: "设计 · 图像 · 视频", name: "创造者", traits: "敏锐 · 好奇 · 富有表达力", strength: "把想法变成视觉作品。", project: "AI 品牌工作室", tags: ["海报", "标志", "社交媒体", "视频"], summary: "把一个模糊想法发展成完整视觉方向的小型创意工作室。", toolkit: [["AI 图像", "探索不同视觉方向"], ["设计系统", "保持作品风格一致"], ["视频工具", "让概念动起来"]] },
      difficulty: "●●○○○"
    },
    builder: {
      en: { cardName: "BUILDER", description: "I want to build something that works.", keywords: "Coding · Apps · Automation", name: "THE BUILDER", traits: "Practical · Inventive · Persistent", strength: "Turning ideas into working systems.", project: "Personal AI Assistant", tags: ["WEB APP", "AUTOMATION", "AI WORKFLOW"], summary: "A useful mini-product that connects a clear interface with an automated workflow.", toolkit: [["SIMPLE CODING", "Build the web interface"], ["AI ASSISTANT", "Handle the smart step"], ["AUTOMATION", "Make repeated work disappear"]] },
      zh: { cardName: "构建者", description: "我想做出真正可以运行的东西。", keywords: "编程 · 应用 · 自动化", name: "构建者", traits: "务实 · 有创意 · 坚持不懈", strength: "把想法变成可以运行的系统。", project: "个人 AI 助手", tags: ["网页应用", "自动化", "AI 工作流"], summary: "把清晰的操作界面和自动化流程连接起来，做成一个实用小产品。", toolkit: [["基础编程", "搭建网页界面"], ["AI 助手", "处理智能环节"], ["自动化", "减少重复操作"]] },
      difficulty: "●●●○○"
    },
    study: {
      en: { cardName: "STUDY HACKER", description: "I want to learn faster.", keywords: "Research · Notes · Productivity", name: "THE OPTIMIZER", traits: "Focused · Efficient · Resourceful", strength: "Finding smarter ways to learn.", project: "AI Study System", tags: ["NOTES", "REVISION", "FLASHCARDS", "RESEARCH"], summary: "A personal learning system that turns your materials into active daily practice.", toolkit: [["AI ASSISTANT", "Explain difficult ideas"], ["AUTOMATION", "Create daily practice"], ["KNOWLEDGE BASE", "Keep notes organized"]] },
      zh: { cardName: "学习优化者", description: "我想用更聪明的方法学习。", keywords: "研究 · 笔记 · 效率", name: "学习优化者", traits: "专注 · 高效 · 善用工具", strength: "找到更聪明的学习方法。", project: "AI 学习系统", tags: ["笔记", "复习", "记忆卡", "研究"], summary: "把学习材料转化成每天都能主动练习的个人学习系统。", toolkit: [["AI 助手", "解释困难概念"], ["自动化", "生成每日练习"], ["知识库", "整理学习笔记"]] },
      difficulty: "●●○○○"
    },
    analyst: {
      en: { cardName: "ANALYST", description: "I like turning information into answers.", keywords: "Data · Business · Finance", name: "THE ANALYST", traits: "Curious · Logical · Experimental", strength: "Turning information into decisions.", project: "AI Research Assistant", tags: ["DATA ANALYSIS", "BUSINESS", "RESEARCH", "VISUALIZATION"], summary: "A research tool that gathers evidence, compares options and makes the result easier to understand.", toolkit: [["AI RESEARCH", "Collect and summarize information"], ["DATA TOOLS", "Compare patterns and numbers"], ["VISUALIZATION", "Make insights easy to see"]] },
      zh: { cardName: "分析者", description: "我喜欢把信息转化成答案。", keywords: "数据 · 商业 · 金融", name: "分析者", traits: "好奇 · 理性 · 勇于实验", strength: "把复杂信息转化成决策。", project: "AI 研究助手", tags: ["数据分析", "商业研究", "资料整理", "可视化"], summary: "收集证据、比较不同选项，并让研究结果更容易理解。", toolkit: [["AI 研究", "收集并总结资料"], ["数据工具", "比较规律与数字"], ["可视化", "清楚展示结论"]] },
      difficulty: "●●●○○"
    },
    storyteller: {
      en: { cardName: "STORYTELLER", description: "I want to create content people remember.", keywords: "Writing · Video · Media", name: "THE STORYTELLER", traits: "Expressive · Empathetic · Imaginative", strength: "Turning ideas into things people remember.", project: "AI Content Studio", tags: ["SCRIPTS", "VIDEOS", "STORIES", "CAMPAIGNS"], summary: "A content workflow that develops one message into a story people want to follow.", toolkit: [["AI WRITING", "Find a strong narrative"], ["MEDIA TOOLS", "Turn words into content"], ["EDITING", "Refine tone and pacing"]] },
      zh: { cardName: "故事创作者", description: "我想创造让人记住的内容。", keywords: "写作 · 视频 · 媒体", name: "故事创作者", traits: "善于表达 · 有同理心 · 富有想象力", strength: "把想法变成让人记住的故事。", project: "AI 内容工作室", tags: ["脚本", "视频", "故事", "宣传活动"], summary: "把一个核心信息发展成别人愿意看下去的完整故事。", toolkit: [["AI 写作", "找到有吸引力的叙事"], ["媒体工具", "把文字变成内容"], ["编辑", "调整语气与节奏"]] },
      difficulty: "●●○○○"
    },
    explorer: {
      en: { cardName: "EXPLORER", description: "I have no idea. I just want to explore.", keywords: "Curiosity · Experiments · Discovery", name: "THE EXPLORER", traits: "Open · Curious · Experimental", strength: "Trying things before everyone else does.", project: "Your First AI Experiment", tags: ["IMAGES", "CODING", "AUTOMATION", "RESEARCH"], summary: "A fast experiment designed to help you discover which kind of AI building feels exciting.", toolkit: [["AI PLAYGROUND", "Try several types of tools"], ["PROMPTING", "Give AI useful context"], ["MINI PROJECT", "Finish one shareable result"]] },
      zh: { cardName: "探索者", description: "我还不确定，只想看看 AI 能做什么。", keywords: "好奇 · 实验 · 发现", name: "探索者", traits: "开放 · 好奇 · 勇于尝试", strength: "在别人之前开始尝试新事物。", project: "你的第一次 AI 实验", tags: ["图像", "编程", "自动化", "研究"], summary: "通过一次快速实验，发现哪一种 AI 创作方向最让你兴奋。", toolkit: [["AI 实验台", "尝试不同类型的工具"], ["提示词", "为 AI 提供有效背景"], ["小型项目", "完成一个可分享的成果"]] },
      difficulty: "●○○○○"
    }
  };

  const quizBank = [
    {
      id: "library",
      correct: 1,
      en: { question: "Which passage was more likely written by AI?", answers: ["After school, I usually head to the library because it's one of the few places where I can actually focus.", "After a long school day, I prefer visiting the library, where the peaceful atmosphere allows me to concentrate effectively."], insight: "The second answer is fluent but generic; it lacks a specific personal detail." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["放学后我一般会去图书馆，因为那里是少数几个能让我真正集中注意力的地方。", "结束一天繁忙的校园生活后，我更喜欢前往图书馆，那里宁静的氛围能够让我高效地集中注意力。"], insight: "第二段很流畅，却比较笼统，缺少具体的个人细节。" }
    },
    {
      id: "canteen",
      correct: 1,
      en: { question: "Which review was more likely written by AI?", answers: ["The noodles were a bit salty, but I still finished them because I'd skipped breakfast.", "The school canteen provides a convenient dining experience, although the food quality could be improved in several areas."], insight: "The second answer sounds balanced and polished, but it says almost nothing concrete." },
      zh: { question: "哪一条评价更可能由 AI 写成？", answers: ["面有点咸，但我没吃早饭，所以最后还是全吃完了。", "学校食堂提供了便利的用餐体验，不过餐食品质在多个方面仍有提升空间。"], insight: "第二条听起来客观完整，却几乎没有提供具体信息。" }
    },
    {
      id: "group-project",
      correct: 0,
      en: { question: "Which passage was more likely written by AI?", answers: ["Group projects encourage collaboration, communication and the exchange of diverse perspectives among students.", "Our slides looked terrible until Leo fixed the colours ten minutes before we presented."], insight: "The first answer lists broad benefits without a lived detail or distinctive voice." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["小组项目能够促进学生之间的合作、沟通，以及多元观点的交流。", "我们的幻灯片本来特别难看，幸好上台前十分钟小李把配色救了回来。"], insight: "第一段列出了宽泛的好处，却没有真实细节或鲜明语气。" }
    },
    {
      id: "weekend",
      correct: 1,
      en: { question: "Which passage was more likely written by AI?", answers: ["I said I'd sleep in on Saturday, but my neighbour started drilling at eight, so that plan disappeared.", "Weekends offer a valuable opportunity to relax, recharge and spend meaningful time with friends and family."], insight: "The second answer uses a neat three-part list but remains impersonal." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["我本来准备周六睡个懒觉，结果邻居八点就开始装修，计划直接泡汤。", "周末为人们提供了放松身心、恢复精力，并与亲友共度美好时光的宝贵机会。"], insight: "第二段使用了整齐的三项并列，却缺乏个人感受。" }
    },
    {
      id: "basketball",
      correct: 0,
      en: { question: "Which passage was more likely written by AI?", answers: ["Basketball is an engaging sport that improves physical fitness while also teaching teamwork and perseverance.", "I missed the first five shots, then somehow scored the one that tied the game."], insight: "The first answer is tidy and general; the second contains an imperfect, memorable moment." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["篮球是一项富有吸引力的运动，不仅能够提升身体素质，还能培养团队合作与坚持不懈的精神。", "我前五个球一个都没进，最后却莫名其妙投进了扳平比分的那个。"], insight: "第一段整齐而宽泛；第二段则有一个不完美但让人记得住的瞬间。" }
    },
    {
      id: "rain",
      correct: 1,
      en: { question: "Which passage was more likely written by AI?", answers: ["My umbrella turned inside out near the station, and I had to carry the broken thing all the way to school.", "Rainy weather can make commuting more challenging, so it is important to prepare suitable clothing and allow extra travel time."], insight: "The second answer gives sensible advice in a detached, textbook-like style." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["快到地铁站时我的伞被吹翻了，只能一路拎着那把坏伞去学校。", "雨天可能会增加通勤难度，因此应当准备合适的衣物，并为出行预留更多时间。"], insight: "第二段给出了合理建议，但语气疏离，很像说明文字。" }
    },
    {
      id: "presentation",
      correct: 1,
      en: { question: "Which passage was more likely written by AI?", answers: ["I forgot what came after slide three, stared at the screen for a second, and then just explained the chart in my own words.", "Although public speaking may initially feel intimidating, adequate preparation can significantly improve confidence and performance."], insight: "The second answer is polished guidance; the first describes a precise moment of recovery." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["讲到第三页后我突然忘词了，盯着屏幕停了一秒，最后干脆用自己的话解释那张图。", "尽管公开演讲最初可能令人紧张，但充分准备能够显著提升自信心与表现。"], insight: "第二段像经过整理的建议；第一段则描述了一个具体的应变瞬间。" }
    },
    {
      id: "app",
      correct: 0,
      en: { question: "Which passage was more likely written by AI?", answers: ["Technology applications have transformed daily life by making communication, learning and entertainment more accessible.", "I mostly use the app to save articles, then forget about them until I have twenty unread tabs."], insight: "The first answer makes a broad claim with familiar categories but no individual habit." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["科技应用通过提升沟通、学习与娱乐的便利性，深刻改变了人们的日常生活。", "我一般用这个应用收藏文章，然后把它们忘掉，直到未读页面攒到二十多个。"], insight: "第一段使用常见分类表达了宽泛观点，却没有个人习惯。" }
    },
    {
      id: "music",
      correct: 1,
      en: { question: "Which passage was more likely written by AI?", answers: ["When I revise maths, I play the same film soundtrack because songs with lyrics make me write down the wrong numbers.", "Listening to music while studying can create a pleasant atmosphere and may help some students maintain concentration."], insight: "The second answer is cautious and generic; the first includes an unusual personal reason." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["复习数学时我总循环同一张电影原声，因为有歌词的歌会让我抄错数字。", "学习时听音乐能够营造舒适的氛围，也可能帮助部分学生保持专注。"], insight: "第二段谨慎而笼统；第一段则包含一个特别的个人原因。" }
    },
    {
      id: "advice",
      correct: 0,
      en: { question: "Which passage was more likely written by AI?", answers: ["Constructive advice plays an essential role in personal growth by helping individuals recognize weaknesses and develop better strategies.", "My teacher told me to stop memorising every sentence and learn the three ideas I actually wanted people to remember."], insight: "The first answer sounds formal and universal; the second preserves one person's exact advice." },
      zh: { question: "哪一段更可能由 AI 写成？", answers: ["建设性的建议在个人成长中发挥着重要作用，能够帮助人们认识不足并制定更有效的策略。", "老师让我别再背每一句话，而是记住我真正希望大家听完后留下的三个观点。"], insight: "第一段正式而普遍；第二段保留了一个人真正说过的具体建议。" }
    }
  ];

  const state = {
    language: "en",
    screen: "start",
    persona: "explorer",
    idea: "",
    quizRound: 0,
    quizScore: 0,
    quizRounds: [],
    quizAnswers: [],
    quizPercentages: [],
    processingStep: 0,
    generationStep: 0,
    logoClicks: 0,
    logoTimer: null,
    terminalRun: 0
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const t = key => translations[state.language][key];
  const profile = () => personaData[state.persona][state.language];

  const progressMap = {
    en: { persona: ["LEVEL 01", "01 / 04", 25], idea: ["LEVEL 02", "02 / 04", 50], quiz: ["LEVEL 03", "03 / 04", 75], profile: ["PROFILE", "04 / 04", 100], signup: ["JOIN", "FINAL STEP", 100] },
    zh: { persona: ["第 01 关", "01 / 04", 25], idea: ["第 02 关", "02 / 04", 50], quiz: ["第 03 关", "03 / 04", 75], profile: ["画像", "04 / 04", 100], signup: ["加入", "最后一步", 100] }
  };

  const dynamicText = {
    en: {
      status: { start: "SYSTEM READY", signup: "JOIN MODE", other: "EXPERIMENT LIVE" },
      terminal: ["Initializing AI Profile...", "User detected.", "Ready for experiment."],
      processing: ["Understanding idea...", "Finding possibilities...", "Matching AI tools...", "Project detected."],
      generation: ["Reading choices...", "Matching interests...", "Mapping your build style...", "AI Profile generated."],
      round: n => `ROUND ${String(n).padStart(2, "0")} / 02`, roundType: "TEXT DETECTION",
      correct: "CORRECT", wrong: "NOT THIS TIME", sameAnswer: p => `${p}% of students chose the same answer.`,
      nextRound: "NEXT ROUND", seeProfile: "SEE MY AI PROFILE", completion: n => `${n} students have completed the experiment.`,
      renderCard: "Rendering your share card...", saved: "Profile saved as a 4:5 PNG — ready to share.",
      shareOpened: "Share panel opened.", copied: "Share message and link copied.", unavailable: "Sharing is unavailable here — save the profile image instead.",
      shareText: name => `My AI Practice Club profile: ${name}. What could you build with AI?`,
      switchAria: "Switch to Chinese", admin: "ADMIN MODE DETECTED.", kidding: "Just kidding.", notJoined: "You haven't joined the club yet.", fix: "FIX THAT"
    },
    zh: {
      status: { start: "系统就绪", signup: "报名模式", other: "实验进行中" },
      terminal: ["正在初始化 AI 画像……", "已检测到用户。", "实验准备就绪。"],
      processing: ["正在理解想法……", "正在寻找可能性……", "正在匹配 AI 工具……", "已发现项目。"],
      generation: ["正在读取选择……", "正在匹配兴趣……", "正在分析创造方式……", "AI 画像已生成。"],
      round: n => `第 ${n} 题 / 共 2 题`, roundType: "文字判断",
      correct: "回答正确", wrong: "这次没有答对", sameAnswer: p => `${p}% 的同学选择了相同答案。`,
      nextRound: "下一题", seeProfile: "查看我的 AI 画像", completion: n => `已有 ${n} 位同学完成实验。`,
      renderCard: "正在生成分享画像……", saved: "画像已保存为四比五图片，可以直接分享。",
      shareOpened: "已打开系统分享面板。", copied: "分享文字和链接已复制。", unavailable: "当前浏览器无法分享，请改用保存画像功能。",
      shareText: name => `我的人工智能实践社画像是“${name}”。你想用 AI 创造什么？`,
      switchAria: "切换为英文", admin: "检测到管理员模式。", kidding: "开个玩笑。", notJoined: "你还没有加入社团。", fix: "立即加入"
    }
  };

  function safeStorageGet(key, fallback) {
    try { return localStorage.getItem(key) ?? fallback; } catch (_) { return fallback; }
  }

  function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* Local storage can be unavailable. */ }
  }

  function updatePersonaCards() {
    $$(".persona-card").forEach(card => {
      const data = personaData[card.dataset.persona][state.language];
      $("[data-persona-field='name']", card).textContent = data.cardName;
      $("[data-persona-field='description']", card).textContent = data.description;
      $("[data-persona-field='keywords']", card).textContent = data.keywords;
    });
  }

  function updateCompletionStat() {
    const localCount = Number(safeStorageGet("aipc-completed", "0")) || 0;
    $("#completionStat").textContent = dynamicText[state.language].completion(BASE_COMPLETIONS + localCount);
  }

  function updateChrome() {
    const [level, count, width] = progressMap[state.language][state.screen] || progressMap[state.language].persona;
    $("#levelText").textContent = level;
    $("#progressText").textContent = count;
    $("#progressFill").style.width = `${width}%`;
    const statuses = dynamicText[state.language].status;
    $("#headerStatus").textContent = state.screen === "start" ? statuses.start : state.screen === "signup" ? statuses.signup : statuses.other;
  }

  function applyLanguage(language) {
    state.language = language;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = t("metaTitle");
    $("meta[name='description']").setAttribute("content", t("metaDescription"));
    $$('[data-i18n]').forEach(element => { element.textContent = t(element.dataset.i18n); });
    $$('[data-i18n-html]').forEach(element => { element.innerHTML = t(element.dataset.i18nHtml); });
    $$('[data-i18n-placeholder]').forEach(element => { element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder)); });
    $$('[data-i18n-aria]').forEach(element => { element.setAttribute("aria-label", t(element.dataset.i18nAria)); });
    $$('[data-i18n-alt]').forEach(element => { element.setAttribute("alt", t(element.dataset.i18nAlt)); });
    $("#languageCurrent").textContent = language === "en" ? "EN" : "中";
    $("#languageTarget").textContent = language === "en" ? "中" : "EN";
    $("#languageToggle").setAttribute("aria-label", dynamicText[language].switchAria);
    $("#languageToggle").setAttribute("aria-pressed", String(language === "zh"));
    updatePersonaCards();
    updateCompletionStat();
    updateChrome();
    $("#actionNote").textContent = "";
    if (state.screen === "start") typeTerminal();
    if (!$("#projectResult").hidden) renderProjectResult();
    if (state.screen === "quiz" && state.quizRounds.length) renderQuizRound();
    if (state.screen === "profile" && !$("#profileContent").hidden) renderProfile();
    if (!$("#ideaProcessing").hidden) $("#ideaProcessingText").textContent = dynamicText[language].processing[state.processingStep];
    if (!$("#profileGeneration").hidden) $("#profileGenerationText").textContent = dynamicText[language].generation[state.generationStep];
  }

  function showScreen(name) {
    $$(".screen").forEach(screen => {
      const active = screen.dataset.screen === name;
      screen.classList.toggle("is-active", active);
      screen.setAttribute("aria-hidden", String(!active));
    });
    state.screen = name;
    $("#progressShell").hidden = name === "start";
    updateChrome();
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const target = $(`[data-screen="${name}"] textarea, [data-screen="${name}"] input, [data-screen="${name}"] button`);
      if (target) target.focus({ preventScroll: true });
    }, 380);
  }

  async function typeTerminal() {
    const run = ++state.terminalRun;
    const target = $("#terminalText");
    const lines = dynamicText[state.language].terminal;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      if (run !== state.terminalRun) return;
      target.textContent = "";
      for (const char of lines[lineIndex]) {
        if (run !== state.terminalRun) return;
        target.textContent += char;
        await delay(lineIndex === 0 ? 28 : 22);
      }
      await delay(lineIndex === 0 ? 420 : 280);
    }
    if (run !== state.terminalRun) return;
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
    const names = state.language === "zh" ? {
      vocab: "AI 词汇训练器", homework: "AI 作业整理助手", market: "AI 市场研究助手", brand: "AI 品牌工作室", content: "AI 内容工作室", study: "AI 学习系统"
    } : {
      vocab: "AI Vocabulary Trainer", homework: "AI Homework Organizer", market: "AI Market Research Assistant", brand: "AI Brand Studio", content: "AI Content Studio", study: "AI Study System"
    };
    if (/vocab|word|language|english|英语|单词|词汇/.test(lower)) return names.vocab;
    if (/homework|assignment|作业/.test(lower)) return names.homework;
    if (/market|stock|finance|company|金融|股票|公司/.test(lower)) return names.market;
    if (/poster|brand|logo|海报|品牌/.test(lower)) return names.brand;
    if (/video|story|script|视频|故事|脚本/.test(lower)) return names.content;
    if (/note|revision|flashcard|study|复习|笔记|学习/.test(lower)) return names.study;
    return fallback;
  }

  async function processIdea(event) {
    event.preventDefault();
    const input = $("#ideaInput");
    if (!input.value.trim()) { input.focus(); return; }
    state.idea = input.value.trim();
    $("#ideaForm").hidden = true;
    $("#ideaProcessing").hidden = false;
    const widths = [24, 49, 76, 100];
    for (let index = 0; index < widths.length; index += 1) {
      state.processingStep = index;
      $("#ideaProcessingText").textContent = dynamicText[state.language].processing[index];
      $("#ideaProcessingBar").style.width = `${widths[index]}%`;
      await delay(410);
    }
    await delay(180);
    $("#ideaProcessing").hidden = true;
    renderProjectResult();
    $("#projectResult").hidden = false;
  }

  function renderProjectResult() {
    const data = profile();
    $("#detectedProjectName").textContent = inferProjectTitle(state.idea, data.project);
    $("#projectSummary").textContent = data.summary;
    $("#difficultyDots").textContent = personaData[state.persona].difficulty;
    $("#toolkitList").replaceChildren(...data.toolkit.map((item, index) => {
      const row = document.createElement("div");
      row.className = "toolkit-item";
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const title = document.createElement("strong");
      title.textContent = item[0];
      const description = document.createElement("p");
      description.textContent = item[1];
      row.append(number, title, description);
      return row;
    }));
  }

  function pickTwoQuestions() {
    const shuffled = [...quizBank];
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled.slice(0, 2);
  }

  function startQuiz() {
    state.quizRound = 0;
    state.quizScore = 0;
    state.quizRounds = pickTwoQuestions();
    state.quizAnswers = [null, null];
    state.quizPercentages = [55 + Math.floor(Math.random() * 28), 55 + Math.floor(Math.random() * 28)];
    renderQuizRound();
    showScreen("quiz");
  }

  function renderQuizRound() {
    const round = state.quizRounds[state.quizRound];
    if (!round) return;
    const content = round[state.language];
    $("#roundNumber").textContent = dynamicText[state.language].round(state.quizRound + 1);
    $("#roundType").textContent = dynamicText[state.language].roundType;
    $("#quizQuestion").textContent = content.question;
    $("#quizFeedback").hidden = true;
    const cards = content.answers.map((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-card";
      button.type = "button";
      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = state.language === "zh" ? (index === 0 ? "甲" : "乙") : (index === 0 ? "A" : "B");
      const text = document.createElement("span");
      text.className = "answer-text";
      text.textContent = answer;
      button.append(letter, text);
      button.addEventListener("click", () => answerQuiz(index));
      return button;
    });
    $("#answerGrid").replaceChildren(...cards);
    const previousAnswer = state.quizAnswers[state.quizRound];
    if (previousAnswer !== null) showQuizFeedback(previousAnswer);
  }

  function showQuizFeedback(selectedIndex) {
    const round = state.quizRounds[state.quizRound];
    const correct = selectedIndex === round.correct;
    $$(".answer-card").forEach((button, index) => {
      button.disabled = true;
      if (index === round.correct) button.classList.add("is-correct");
      if (index === selectedIndex && !correct) button.classList.add("is-wrong");
    });
    const copy = dynamicText[state.language];
    $("#feedbackTitle").textContent = correct ? copy.correct : copy.wrong;
    $("#feedbackText").textContent = `${copy.sameAnswer(state.quizPercentages[state.quizRound])} ${round[state.language].insight}`;
    $("#quizNextButton span").textContent = state.quizRound === 1 ? copy.seeProfile : copy.nextRound;
    $("#quizFeedback").hidden = false;
  }

  function answerQuiz(index) {
    if (state.quizAnswers[state.quizRound] !== null) return;
    state.quizAnswers[state.quizRound] = index;
    if (index === state.quizRounds[state.quizRound].correct) state.quizScore += 1;
    showQuizFeedback(index);
    $("#quizFeedback").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  async function generateProfile() {
    showScreen("profile");
    $("#profileGeneration").hidden = false;
    $("#profileContent").hidden = true;
    for (let index = 0; index < 4; index += 1) {
      state.generationStep = index;
      $("#profileGenerationText").textContent = dynamicText[state.language].generation[index];
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
    const data = profile();
    $("#profileName").textContent = data.name;
    $("#profileTraits").textContent = data.traits;
    $("#profileStrength").textContent = data.strength;
    $("#profileProject").textContent = data.project;
    $("#profileProjectTags").replaceChildren(...data.tags.map(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const useCharacters = state.language === "zh";
    const units = useCharacters ? [...text] : text.split(" ");
    const spacer = useCharacters ? "" : " ";
    let line = "";
    let lineCount = 0;
    for (const unit of units) {
      if (lineCount >= maxLines) break;
      const testLine = `${line}${unit}${spacer}`;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line.trim(), x, y + lineCount * lineHeight);
        line = `${unit}${spacer}`;
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

  function drawContained(ctx, image, x, y, width, height) {
    const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * ratio;
    const drawHeight = image.naturalHeight * ratio;
    ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
  }

  async function createProfileCanvas() {
    const data = profile();
    const labels = translations[state.language];
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    const sans = state.language === "zh" ? '"PingFang SC", "Microsoft YaHei", Arial, sans-serif' : "Arial, sans-serif";
    ctx.fillStyle = "#11120f";
    ctx.fillRect(0, 0, 1080, 1350);
    ctx.strokeStyle = "#30322e";
    ctx.lineWidth = 2;
    [250, 390, 530].forEach(radius => { ctx.beginPath(); ctx.arc(1060, 30, radius, 0, Math.PI * 2); ctx.stroke(); });

    ctx.fillStyle = "#f4f4ef";
    ctx.font = `700 25px ${sans}`;
    ctx.fillText(labels.brand, 62, 72);
    ctx.textAlign = "right";
    ctx.fillText(labels.profile2026, 1018, 72);
    ctx.textAlign = "left";
    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 102); ctx.lineTo(1018, 102); ctx.stroke();

    ctx.fillStyle = "#aeb0a7";
    ctx.font = `700 22px ${sans}`;
    ctx.fillText(labels.yourProfile, 62, 170);
    ctx.fillStyle = "#c7ff43";
    const nameSize = state.language === "zh" ? 118 : data.name.length > 15 ? 100 : 122;
    ctx.font = `900 ${nameSize}px ${sans}`;
    wrapCanvasText(ctx, data.name, 62, 288, 920, 112, 2);

    ctx.fillStyle = "#d5d6ce";
    ctx.font = `26px ${sans}`;
    ctx.fillText(data.traits, 62, 420);
    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 462); ctx.lineTo(1018, 462); ctx.stroke();
    ctx.fillStyle = "#aeb0a7";
    ctx.font = `700 21px ${sans}`;
    ctx.fillText(labels.yourStrength, 62, 510);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = `700 38px ${sans}`;
    wrapCanvasText(ctx, data.strength, 62, 558, 880, 44, 2);

    ctx.strokeStyle = "#474a42";
    ctx.beginPath(); ctx.moveTo(62, 640); ctx.lineTo(1018, 640); ctx.stroke();
    ctx.fillStyle = "#aeb0a7";
    ctx.font = `700 21px ${sans}`;
    ctx.fillText(labels.nextSkill, 62, 688);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = `700 34px ${sans}`;
    wrapCanvasText(ctx, labels.nextSkillText, 62, 736, 880, 42, 2);

    ctx.fillStyle = "#c7ff43";
    ctx.fillRect(0, 815, 1080, 330);
    ctx.fillStyle = "#38450d";
    ctx.font = `700 21px ${sans}`;
    ctx.fillText(labels.recommendedProject, 62, 870);
    ctx.fillStyle = "#11120f";
    ctx.font = `900 55px ${sans}`;
    wrapCanvasText(ctx, data.project, 62, 940, 930, 58, 2);
    ctx.font = `21px ${sans}`;
    ctx.fillText(labels.createWith, 62, 1025);
    ctx.font = `700 24px ${sans}`;
    ctx.fillText(data.tags.join("  /  "), 62, 1076);

    ctx.fillStyle = "#aeb0a7";
    ctx.font = `700 20px ${sans}`;
    ctx.fillText(labels.aiLevel, 62, 1208);
    ctx.fillStyle = "#f4f4ef";
    ctx.font = `700 25px ${sans}`;
    ctx.fillText(labels.levelExplorer, 62, 1246);
    try {
      const qr = await loadImage("./assets/wechat-qr.jpg");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(850, 1154, 168, 168);
      drawContained(ctx, qr, 858, 1162, 152, 152);
    } catch (_) { /* The share card still saves if the QR image cannot load. */ }
    ctx.fillStyle = "#f4f4ef";
    ctx.font = `700 22px ${sans}`;
    ctx.fillText(labels.motto, 62, 1310);
    return canvas;
  }

  const canvasBlob = canvas => new Promise(resolve => canvas.toBlob(resolve, "image/png", 1));

  async function saveProfile() {
    const button = $("#saveProfileButton");
    button.disabled = true;
    $("#actionNote").textContent = dynamicText[state.language].renderCard;
    const canvas = await createProfileCanvas();
    const link = document.createElement("a");
    link.download = `ai-practice-club-${state.persona}-profile.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    $("#actionNote").textContent = dynamicText[state.language].saved;
    button.disabled = false;
  }

  async function shareProfile() {
    const shareText = dynamicText[state.language].shareText(profile().name);
    try {
      const canvas = await createProfileCanvas();
      const blob = await canvasBlob(canvas);
      const file = blob ? new File([blob], `aipc-${state.persona}.png`, { type: "image/png" }) : null;
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: t("metaTitle"), text: shareText, files: [file] });
        $("#actionNote").textContent = dynamicText[state.language].shareOpened;
      } else if (navigator.share) {
        await navigator.share({ title: t("metaTitle"), text: shareText, url: window.location.href });
        $("#actionNote").textContent = dynamicText[state.language].shareOpened;
      } else {
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        $("#actionNote").textContent = dynamicText[state.language].copied;
      }
    } catch (error) {
      if (error && error.name === "AbortError") return;
      $("#actionNote").textContent = dynamicText[state.language].unavailable;
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
      name: String(form.get("name") || "").trim(), grade: String(form.get("grade") || "").trim(),
      wechat: String(form.get("wechat") || "").trim(), interests, persona: state.persona, idea: state.idea, savedAt: new Date().toISOString()
    };
    safeStorageSet("aipc-local-signup", JSON.stringify(record));
    event.currentTarget.hidden = true;
    $(".signup-heading").hidden = true;
    $("#welcomeName").textContent = state.language === "zh" ? record.name : record.name.toUpperCase();
    $("#welcomePanel").hidden = false;
    $("#welcomePanel").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showEasterEgg() {
    const copy = dynamicText[state.language];
    const overlay = document.createElement("div");
    overlay.className = "easter-egg";
    overlay.innerHTML = `<div class="easter-card" role="dialog" aria-modal="true" aria-labelledby="easterTitle"><button class="close-button" type="button" aria-label="Close">×</button><h2 id="easterTitle"></h2><div class="easter-terminal"><span class="joke-line"></span><span class="join-line"></span></div><button class="primary-button fix-button" type="button"><span class="fix-label"></span><span>↗</span></button></div>`;
    $("#easterTitle", overlay).textContent = copy.admin;
    $(".joke-line", overlay).textContent = `› ${copy.kidding}`;
    $(".join-line", overlay).textContent = `› ${copy.notJoined}`;
    $(".fix-label", overlay).textContent = copy.fix;
    $(".close-button", overlay).setAttribute("aria-label", state.language === "zh" ? "关闭" : "Close");
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
    if (state.logoClicks >= 5) { state.logoClicks = 0; showEasterEgg(); return; }
    state.logoTimer = setTimeout(() => { state.logoClicks = 0; }, 1500);
  }

  function bindEvents() {
    $("#languageToggle").addEventListener("click", () => applyLanguage(state.language === "en" ? "zh" : "en"));
    $("#startButton").addEventListener("click", () => showScreen("persona"));
    $$(".persona-card").forEach(card => card.addEventListener("click", () => selectPersona(card)));
    $("#ideaInput").addEventListener("input", event => { $("#charCount").textContent = event.target.value.length; });
    $("#ideaForm").addEventListener("submit", processIdea);
    $("#nextChallengeButton").addEventListener("click", startQuiz);
    $("#quizNextButton").addEventListener("click", () => {
      if (state.quizRound === 0) {
        state.quizRound = 1;
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
    $("#restartButton").addEventListener("click", () => window.location.reload());
    $("#logoButton").addEventListener("click", handleLogoClick);
  }

  window.__AIPC_DIAGNOSTICS__ = Object.freeze({
    quizBankSize: quizBank.length,
    sampleQuestionIds: () => pickTwoQuestions().map(question => question.id),
    supportedLanguages: ["en", "zh"],
    defaultLanguage: state.language
  });

  bindEvents();
  applyLanguage("en");
})();
