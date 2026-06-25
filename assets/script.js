/* ============================================================
   Tao Chen — personal site interactions + EN/中文 i18n
   ============================================================ */
(function () {
  "use strict";

  /* ---------- theme ----------
     Initial data-theme is set by the inline script in <head> (before first
     paint, so there is no light→dark flash). Here: toggle + UI sync. */
  const root = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const themeMetas = document.querySelectorAll('meta[name="theme-color"]');
  function syncThemeUI() {
    const dark = root.getAttribute("data-theme") === "dark";
    themeMetas.forEach(function (m) { m.setAttribute("content", dark ? "#0c0e14" : "#fbfaf8"); });
    themeToggle && themeToggle.setAttribute("aria-pressed", String(dark));
  }
  syncThemeUI();
  themeToggle && themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncThemeUI();
  });

  /* ---------- i18n ---------- */
  // Every key maps to innerHTML for [data-i18n="key"] elements.
  // English lives here too so toggling back never depends on the original DOM.
  const I18N = {
    en: {
      "nav.about": "About", "nav.news": "News", "nav.research": "Research",
      "nav.publications": "Publications", "nav.background": "Background",

      "hero.name": "Tao&nbsp;Chen", "hero.name2": "陈韬",
      "hero.bio": "I use light to measure heat — with optical methods I study thermal transport at the micro- and nanoscale and measure the thermal properties of materials. I will join <strong>Yale University</strong> as a PhD student in Fall 2026, advised by Prof.&nbsp;<strong>Peijun&nbsp;Guo</strong>. During my master's with Prof.&nbsp;Puqing&nbsp;Jiang at HUST, I built <strong>pump–probe thermoreflectance</strong> instruments along with the modeling and inverse analysis behind them.",

      "news.title": "News",
      "news.yale": "I will join <strong>Yale University</strong> as a PhD student in Fall 2026.",
      "news.grad": "Named an Outstanding Graduate; my master's thesis was recognized as an Outstanding Graduate Thesis.",
      "news.offers": "Received PhD offers with full fellowships from Yale, Princeton, the University of Chicago, Cornell, and others.",
      "news.nat25": "Awarded the National Graduate Scholarship.",
      "news.nat24": "Awarded the National Graduate Scholarship.",
      "news.merit": "Named a Merit Student of HUST.",
      "news.hust": "Began my master's at HUST, admitted with the top entrance ranking in the major.",
      "news.apl": 'Our paper on universal thermometry of solid–liquid interfaces was selected as a <a href="https://doi.org/10.1063/5.0300377" target="_blank" rel="noopener">Featured Article in <em>Applied Physics Letters</em></a>.',
      "news.cover": 'Our work on intrinsic parameter relationships in thermoreflectance was published as a <a href="https://doi.org/10.7498/aps.73.20241369" target="_blank" rel="noopener">Cover Article in <em>Acta Physica Sinica</em></a>.',
      "news.talkWtt": 'Gave an oral presentation, “Pressure-dependent thermal properties of thermal interface materials,” at the 9th Workshop on Thermal Transport (WTT 2025), China.',
      "news.talkCctp": 'Presented “Revealing the intrinsic relationship of thermal property parameters in thermoreflectance experiments” at the 3rd Chinese Conference on Thermal Properties, China — received an Outstanding Conference Paper Award.',
      "news.talkCset": 'Gave two oral presentations at the 2024 Annual Conference on Heat and Mass Transfer (Chinese Society of Engineering Thermophysics), China.',
      "news.talkActs": 'Gave an oral presentation at the 3rd Asian Conference on Thermal Sciences (ACTS 2024), Shanghai.',

      "research.title": "Research",
      "research.body": "A focused laser heats a sample; a second laser reads the surface temperature through <strong>thermoreflectance</strong>. From signals spanning 1&nbsp;Hz–10&nbsp;MHz I extract thermal conductivity, heat capacity, and interfacial conductance of micro/nanoscale structures.",
      "research.caption": "Optical layout of the home-built platform integrating SPS, FDTR, and SDTR.",
      "research.capLab": "In the lab with the home-built platform.",
      "cap1.t": "Optical instrumentation",
      "cap1.d": "Designed and built a multi-technique pump–probe platform from the optical table up — laser optics, lock-in detection, automated acquisition.",
      "cap2.t": "Modeling &amp; inverse problems",
      "cap2.d": "Multilayer heat-conduction models, sensitivity and SVD-based identifiability analysis — knowing what an experiment can and cannot measure.",
      "cap3.t": "Materials &amp; applications",
      "cap3.d": "Thin films, liquids and solid–liquid interfaces, 3D anisotropic conductivity tensors, thermal interface materials under pressure, GaN electronics.",

      "selected.title": "Selected Publications",
      "selected.kapitza": "Frequency-dependent interfacial conductance reveals weakly coupled diffusional and phonon-like heat channels in liquids.",
      "selected.tim": "One optical measurement tracks how the bulk and interfacial thermal properties of TIMs evolve with applied pressure.",
      "selected.apl": "A single non-contact scheme that measures the interfacial conductance of arbitrary solid–liquid interfaces, extracting it together with the liquid's thermal properties across diverse liquids.",
      "selected.langmuir": "A differential SPS strategy cancels the influence of known parameters when probing liquids and their interfaces.",
      "selected.pra": "SVD reveals the dimensionless groups that govern the thermoreflectance signal, giving an identifiability framework for designing experiments, validated on GaN/Si heterostructures.",
      "selected.ichmt": "One platform measures thermal conductivity, heat capacity, and interfacial thermal conductance simultaneously, validated on standards from 0.2 to 2000 W/(m·K).",
      "selected.bosps": "Beam-offset SPS resolves all six independent components of the 3D thermal-conductivity tensor.",
      "selected.meas": "Optical mapping of local convective heat-transfer coefficients at sub-millimeter resolution.",
      "selected.natcoord": "Physics-based variable transformations recast skewed thermophysical parameters as near-Gaussian natural coordinates, enabling fast analytical uncertainty propagation that matches Monte Carlo benchmarks.",

      "full.title": "Full Publication List",
      "full.hint": "Scroll within the panel to browse all entries.",
      "full.preprints": "Preprints &amp; in review", "full.journal": "Journal articles",
      "full.conf": "Conference talks", "full.patents": "Patents",

      "tag.prl": "Under revision · Phys. Rev. Lett.", "tag.review": "Under review",
      "tag.revsub": "Revision submitted · Appl. Therm. Eng.",
      "tag.first": "First author", "tag.featured": "Featured Article", "tag.cover": "Cover Article",
      "tag.oral": "Oral", "tag.oral2": "Two orals", "tag.award": "Outstanding Paper Award",

      "pubtitle.jhust": "A measurement method for thermal conductivity and specific heat of submillimeter-sized low-thermal-conductivity materials",
      "venue.jhust": "Journal of Huazhong University of Science and Technology (Natural Science Edition)",
      "pubtitle.acta": "Unraveling intrinsic relationship of thermal properties in thermoreflectance experiments",
      "venue.acta": "Acta Physica Sinica",

      "conf.wtt": "The 9th Workshop on Thermal Transport (WTT 2025), China",
      "conf.cset": "2024 Annual Conference on Heat and Mass Transfer, Chinese Society of Engineering Thermophysics, China",
      "conf.cctp": "The 3rd Chinese Conference on Thermal Properties, China (2024)",
      "conf.acts": "The 3rd Asian Conference on Thermal Sciences (ACTS 2024), Shanghai",

      "patent.soft": "System and method for measuring thermal properties of soft-matter thin films",
      "patent.conv": "Method and system for measuring local convective heat-transfer coefficient",
      "patent.aniso": "Method and system for measuring anisotropic thermal properties of sub-millimeter-scale samples",
      "patent.appno": "Patent Application No.", "patent.no": "Patent No.",

      "bg.title": "Background", "bg.edu": "Education", "bg.honors": "Honors", "bg.skills": "Skills",
      "bg.service": "Professional Service",
      "service.body": 'Referee for <strong><em>Physical Review Letters</em></strong>, <strong><em>Physical Review Applied</em></strong>, and <strong><em>Physical Review Materials</em></strong>.',
      "edu.yale.deg": "PhD student (incoming)", "edu.yale.org": "Yale University",
      "edu.yale.note": "Advisor: Prof. Peijun Guo",
      "edu.msc.deg": "M.Eng., Energy &amp; Power Engineering", "edu.msc.org": "Huazhong University of Science and Technology",
      "edu.msc.note": "Advisor: Prof. Puqing Jiang",
      "edu.bsc.deg": "B.Eng., Energy &amp; Power Engineering", "edu.bsc.org": "Huazhong University of Science and Technology",
      "honor.nat25": "<strong>National Graduate Scholarship</strong>, Ministry of Education, China",
      "honor.grad": "Outstanding Graduate; Outstanding Graduate Thesis",
      "honor.nat24": "<strong>National Graduate Scholarship</strong>, Ministry of Education, China",
      "honor.merit": "Merit Student, HUST",
      "honor.award": "Outstanding Conference Paper Award, 3rd Chinese Conference on Thermal Properties",
      "skills.exp": "Methods:", "skills.tools": "Tools:",
      "skills.strength": "Strengths:", "skills.math": "Mathematics",

      "a11y.skip": "Skip to content",
      "a11y.theme": "Toggle dark mode",
      "footer.updated": "Last updated June 25, 2026",

      "_title": "Tao Chen — Optical Thermal Metrology · Yale University",
      "_desc": "Tao Chen (陈韬) — incoming PhD student at Yale University, advised by Prof. Peijun Guo. Optical pump–probe thermoreflectance metrology for micro/nanoscale thermal transport."
    },

    zh: {
      "nav.about": "关于", "nav.news": "动态", "nav.research": "研究",
      "nav.publications": "论文", "nav.background": "履历",

      "hero.name": "陈韬", "hero.name2": "Tao Chen",
      "hero.bio": "我用光来测量热——以光学方法研究微纳尺度的热输运，并测量材料的热物性。2026 年秋我将入学<strong>耶鲁大学</strong>攻读博士，导师为 <strong>Peijun&nbsp;Guo</strong> 教授。硕士期间师从华中科技大学江普庆教授，我搭建了<strong>泵浦-探测热反射</strong>测量系统及其背后的建模与反演分析。",

      "news.title": "动态",
      "news.yale": "将于 2026 年秋入学<strong>耶鲁大学</strong>攻读博士。",
      "news.grad": "获评优秀毕业生，学位论文获评优秀毕业论文。",
      "news.offers": "收到耶鲁、普林斯顿、芝加哥大学、康奈尔等高校的博士全额奖学金 offer。",
      "news.nat25": "获研究生国家奖学金。",
      "news.nat24": "获研究生国家奖学金。",
      "news.merit": "获评华中科技大学三好学生。",
      "news.hust": "以专业第一的成绩考入华中科技大学攻读硕士。",
      "news.apl": '固液界面普适测温工作入选 <a href="https://doi.org/10.1063/5.0300377" target="_blank" rel="noopener"><em>Applied Physics Letters</em> Featured Article</a>。',
      "news.cover": '热反射实验中热物性参数本征关系的工作以<a href="https://doi.org/10.7498/aps.73.20241369" target="_blank" rel="noopener">封面文章发表于《物理学报》</a>。',
      "news.talkWtt": '在第九届热输运研讨会（WTT 2025，中国）作口头报告"压强依赖的热界面材料热物性"。',
      "news.talkCctp": '在第三届中国热物性大会（中国）报告"揭示热反射实验中热物性参数的本征关系"，并获优秀会议论文奖。',
      "news.talkCset": '在 2024 年中国工程热物理学会传热传质学术会议（中国）作两场口头报告。',
      "news.talkActs": '在第三届亚洲热科学会议（ACTS 2024，上海）作口头报告。',

      "research.title": "研究",
      "research.body": "一束激光加热样品，另一束激光通过<strong>热反射</strong>读取表面温度。基于 1&nbsp;Hz–10&nbsp;MHz 的信号，我可以提取微纳结构的热导率、热容与界面热导。",
      "research.caption": "自建 SPS / FDTR / SDTR 一体化测量平台光路图。",
      "research.capLab": "实验室中的我与自建测量平台。",
      "cap1.t": "光学仪器搭建",
      "cap1.d": "从光学平台起自主设计搭建多技术泵浦-探测系统：激光光路、锁相探测与自动化采集。",
      "cap2.t": "建模与反问题",
      "cap2.d": "多层传热模型、灵敏度与基于 SVD 的可辨识性分析——清楚一个实验能测什么、不能测什么。",
      "cap3.t": "材料与应用",
      "cap3.d": "薄膜、液体与固液界面、三维各向异性热导率张量、压强下的热界面材料、GaN 电子器件。",

      "selected.title": "代表性论文",
      "selected.kapitza": "频率依赖的界面热导揭示了液体中扩散与类声子两类热输运通道的弱耦合。",
      "selected.tim": "单次光学测量同步追踪热界面材料体相与界面热物性随压强的演化。",
      "selected.apl": "提出一种非接触方案，可测量任意固液界面的界面热导，并同时提取液体的热物性，适用于多种液体。",
      "selected.langmuir": "差分 SPS 策略消除已知参数的影响，同步测量液体与界面热物性。",
      "selected.pra": "用 SVD 揭示决定热反射信号的无量纲数，并据此构建可辨识性框架用于实验设计，在 GaN/Si 异质结构上验证。",
      "selected.ichmt": "单一平台同时测量热导率、热容与界面热导，在 0.2–2000 W/(m·K) 标准样品上验证。",
      "selected.bosps": "光斑偏移 SPS 可同时解析三维热导率张量的全部六个独立分量。",
      "selected.meas": "以亚毫米分辨率对局部对流换热系数进行光学成像测量。",
      "selected.natcoord": "基于物理的变量变换将偏态的热物性参数重构为近高斯的自然坐标，从而实现快速的解析式不确定度传播，结果与蒙特卡洛基准高度吻合。",

      "full.title": "论文全列表",
      "full.hint": "在面板内滚动可浏览全部条目。",
      "full.preprints": "预印本与在审", "full.journal": "期刊论文",
      "full.conf": "会议报告", "full.patents": "专利",

      "tag.prl": "PRL 修改稿在审", "tag.review": "在审",
      "tag.revsub": "修改稿已提交 · Appl. Therm. Eng.",
      "tag.first": "一作", "tag.featured": "特色文章", "tag.cover": "封面文章",
      "tag.oral": "口头报告", "tag.oral2": "两场口头报告", "tag.award": "优秀会议论文奖",

      "pubtitle.jhust": "亚毫米级低导热材料热导率与比热容测量方法",
      "venue.jhust": "华中科技大学学报（自然科学版）",
      "pubtitle.acta": "揭示热反射实验中热物性参数的本征关系",
      "venue.acta": "物理学报",

      "conf.wtt": "第九届热输运研讨会（WTT 2025），中国",
      "conf.cset": "2024 中国工程热物理学会传热传质学术会议，中国",
      "conf.cctp": "第三届中国热物性大会（2024），中国",
      "conf.acts": "第三届亚洲热科学会议（ACTS 2024），上海",

      "patent.soft": "软物质薄膜热物性测量系统及方法",
      "patent.conv": "局部对流换热系数测量方法及系统",
      "patent.aniso": "亚毫米尺度样品各向异性热物性测量方法及系统",
      "patent.appno": "申请号", "patent.no": "专利号",

      "bg.title": "履历", "bg.edu": "教育经历", "bg.honors": "荣誉", "bg.skills": "技能",
      "bg.service": "学术服务",
      "service.body": '担任 <strong><em>Physical Review Letters</em></strong>、<strong><em>Physical Review Applied</em></strong>、<strong><em>Physical Review Materials</em></strong> 期刊审稿人。',
      "edu.yale.deg": "博士研究生（即将入学）", "edu.yale.org": "耶鲁大学",
      "edu.yale.note": "导师：Peijun Guo 教授",
      "edu.msc.deg": "工程硕士 · 能源与动力工程", "edu.msc.org": "华中科技大学",
      "edu.msc.note": "导师：江普庆 教授",
      "edu.bsc.deg": "工程学士 · 能源与动力工程", "edu.bsc.org": "华中科技大学",
      "honor.nat25": "<strong>研究生国家奖学金</strong>（教育部，国家级）",
      "honor.grad": "优秀毕业生；优秀毕业论文",
      "honor.nat24": "<strong>研究生国家奖学金</strong>（教育部，国家级）",
      "honor.merit": "三好学生（华中科技大学）",
      "honor.award": "优秀会议论文奖（第三届中国热物性大会）",
      "skills.exp": "实验方法：", "skills.tools": "工具：",
      "skills.strength": "强项：", "skills.math": "数学",

      "a11y.skip": "跳到正文",
      "a11y.theme": "切换深浅色模式",
      "footer.updated": "最后更新于 2026 年 6 月 25 日",

      "_title": "陈韬 — 光学热测量 · 耶鲁大学",
      "_desc": "陈韬（Tao Chen）— 耶鲁大学准博士生，导师 Peijun Guo 教授。光学泵浦-探测热反射技术，研究微纳尺度热输运机制与热物性测量。"
    }
  };

  const langToggle = document.getElementById("langToggle");

  function applyLang(lang) {
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    document.title = dict["_title"];
    const desc = document.querySelector('meta[name="description"]');
    if (desc && dict["_desc"]) desc.setAttribute("content", dict["_desc"]);
    themeToggle && themeToggle.setAttribute("aria-label", dict["a11y.theme"]);
    if (langToggle) {
      langToggle.textContent = lang === "zh" ? "EN" : "中文";
      langToggle.setAttribute("aria-label", lang === "zh" ? "Switch to English" : "切换到中文");
    }
    localStorage.setItem("lang", lang);
  }

  // init: URL ?lang= > localStorage > default en
  const urlLang = new URLSearchParams(location.search).get("lang");
  let lang = (urlLang === "zh" || urlLang === "en") ? urlLang
           : (localStorage.getItem("lang") === "zh" ? "zh" : "en");
  if (lang !== "en") applyLang(lang); else applyLang("en");

  langToggle && langToggle.addEventListener("click", function () {
    lang = lang === "zh" ? "en" : "zh";
    applyLang(lang);
  });

  /* ---------- year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- scroll progress + nav border ---------- */
  const progress = document.getElementById("scrollProgress");
  const nav = document.getElementById("nav");
  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
    if (nav) nav.classList.toggle("is-scrolled", h.scrollTop > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("navBurger");
  const links = document.querySelector(".nav__links");
  function closeMenu() {
    if (!links) return;
    links.classList.remove("is-open");
    burger && burger.setAttribute("aria-expanded", "false");
  }
  burger && burger.addEventListener("click", function () {
    const open = links.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links && links.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });
  document.addEventListener("click", function (e) {
    if (links && links.classList.contains("is-open") && !e.target.closest(".nav")) closeMenu();
  });

  /* ---------- active nav link ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("is-active"));
            const active = navLinks.find((l) => l.getAttribute("href") === "#" + e.target.id);
            active && active.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }

})();
