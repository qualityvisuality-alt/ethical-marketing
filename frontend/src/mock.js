// Mock data (frontend-only). Bilingual UA/EN. Replace with backend later.

export const CONTACT_EMAIL = "qualityvisuality@gmail.com";

export const IMG = {
  water: "https://images.unsplash.com/photo-1675787995181-65b258d592ec?w=900&q=80&auto=format&fit=crop",
  wood: "https://images.unsplash.com/photo-1621840090029-08b00c831808?w=900&q=80&auto=format&fit=crop",
  fire: "https://images.unsplash.com/photo-1504470695779-75300268aa0e?w=900&q=80&auto=format&fit=crop",
  earth: "https://images.unsplash.com/photo-1526916027372-0c0852cef5d3?w=900&q=80&auto=format&fit=crop",
  metal: "https://images.unsplash.com/photo-1679395283817-39f56e249ea6?w=900&q=80&auto=format&fit=crop",
  cosmos: "https://images.unsplash.com/photo-1526565278154-ab23e27d998e?w=1400&q=80&auto=format&fit=crop",
};

// ---------------- ELEMENTS (interactive wheel) ----------------
export const ELEMENTS = {
  ua: [
    {
      id: "water", order: 1, name: "ВОДА", sound: "water",
      color: "#5aa9e6", essence: "Глибина, тиша, коріння, занурення",
      obraz: "глибина, тиша, коріння", image: IMG.water,
      points: ["Ідентичність бренду", "Цінності, місія", "Сенс продукту", "Історія та автентичність", "Внутрішнє бачення"],
      valueTitle: "Що ти отримуєш",
      value: "На першій зустрічі за чашкою китайського чаю ми занурюємось у твою ситуацію. Ти ясніше бачиш себе у всьому цьому, свій Human Design та ролі, які природно реалізуєш у бренді й продукті. Побачиш, як саме твій продукт впливає на людей, знайдеш свою «Північну зірку» і почнеш рухатися у спосіб, що відповідає твоїй енергії, практиці та обставинам.",
      deliver: ["Розбір Human Design та ролей", "Карта цінностей і місії", "Tone of voice і суть продукту", "Ясність «хто ти, куди йдеш»"],
    },
    {
      id: "wood", order: 2, name: "ДЕРЕВО", sound: "wood",
      color: "#7bc47f", essence: "Ріст туди, де є світло",
      obraz: "ріст туди, де є світло", image: IMG.wood,
      points: ["Аналіз аудиторії", "Дослідження ринку", "Конкуренти", "Позиціонування", "Можливості росту"],
      valueTitle: "Що ти отримуєш",
      value: "Ти отримуєш файли з докладними звітами: заміри та аналітика ринку, ніші, конкурентів і аудиторії з усіх джерел. Ми бачимо, де світло — і ростемо саме туди.",
      deliver: ["Звіт по ринку і ніші", "Метрики: CPM, CTR, CAC, LTV, охоплення, залученість", "Карта конкурентів", "Чітке позиціонування та точки росту"],
    },
    {
      id: "fire", order: 3, name: "ВОГОНЬ", sound: "fire",
      color: "#f0803c", essence: "Ясність, енергія, фокус",
      obraz: "ясність, енергія, фокус", image: IMG.fire,
      points: ["Стратегія просування", "Цілі та KPI", "Контент-напрямки", "План дій", "Комунікаційна карта", "Семантичне ядро", "Чек-поінти і вектор розвитку"],
      valueTitle: "Що ти отримуєш",
      value: "Робоча стратегія на роки: цілі, KPI, семантичне ядро, контент-напрямки та комунікаційна карта. Ясність, енергія і фокус — ти точно знаєш, куди йдеш і за якими чек-поінтами звіряєшся.",
      deliver: ["Маркетинг-стратегія на 1–3 роки", "KPI та воронки", "Семантичне ядро та контент-план", "Чек-поінти і вектор розвитку"],
    },
    {
      id: "earth", order: 4, name: "ЗЕМЛЯ", sound: "earth",
      color: "#d9a24a", essence: "Живлення, прийняття, спільнота",
      obraz: "живлення, прийняття, спільнота", image: IMG.earth,
      points: ["Семанта-контент", "Ком'юніті та діалог", "Історія бренду", "Довіра та взаємодія", "Клієнтський досвід", "Тривалість, lifetime value"],
      valueTitle: "Що ти отримуєш",
      value: "Будуємо живий бренд у діджитал-просторі: соцмережі, лендинг, продуктові карти й сценарії контенту під стратегію. Спільнота, довіра та діалог, що дають тривалі стосунки та lifetime value.",
      deliver: ["Архітектура соцмереж і сайт/лендинг", "Продуктові карти і сценарії контенту", "Комʼюніті та живий діалог", "Довгі стосунки і lifetime value"],
    },
    {
      id: "metal", order: 5, name: "МЕТАЛ", sound: "metal",
      color: "#aeb9cc", essence: "Структура, точність, майстерність",
      obraz: "структура, точність, майстерність", image: IMG.metal,
      points: ["Система", "Автоматизація", "Аналітика та дані", "Автоматизація процесів", "Етичний AI", "Масштабування"],
      valueTitle: "Що ти отримуєш",
      value: "Етично автоматизуємо процеси за допомогою штучного інтелекту — система, точність і майстерність. Аналітика, дані та масштабування, що покращують якість життя та ефективність бізнесу.",
      deliver: ["Система і автоматизація процесів", "Аналітика та дашборди даних", "Етичний AI у роботі", "Готовність до масштабування"],
    },
  ],
  en: [
    {
      id: "water", order: 1, name: "WATER", sound: "water",
      color: "#5aa9e6", essence: "Depth, silence, roots, immersion",
      obraz: "depth, silence, roots", image: IMG.water,
      points: ["Brand identity", "Values, mission", "Product meaning", "Story & authenticity", "Inner vision"],
      valueTitle: "What you get",
      value: "At our first session over a cup of Chinese tea we explore your situation. You see yourself more clearly within it, your Human Design and the roles you naturally embody in your brand and product. You see how your product affects people, find your North Star and begin moving in a way that fits your energy, practice and circumstances.",
      deliver: ["Human Design & roles breakdown", "Values & mission map", "Tone of voice & product essence", "Clarity: who you are, where you go"],
    },
    {
      id: "wood", order: 2, name: "WOOD", sound: "wood",
      color: "#7bc47f", essence: "Growth toward the light",
      obraz: "growth toward the light", image: IMG.wood,
      points: ["Audience analysis", "Market research", "Competitors", "Positioning", "Growth opportunities"],
      valueTitle: "What you get",
      value: "You receive detailed report files: measurements and analytics of the market, niche, competitors and audience from all sources. We see where the light is — and grow exactly there.",
      deliver: ["Market & niche report", "Metrics: CPM, CTR, CAC, LTV, reach, engagement", "Competitor map", "Clear positioning & growth points"],
    },
    {
      id: "fire", order: 3, name: "FIRE", sound: "fire",
      color: "#f0803c", essence: "Clarity, energy, focus",
      obraz: "clarity, energy, focus", image: IMG.fire,
      points: ["Promotion strategy", "Goals & KPIs", "Content directions", "Action plan", "Communication map", "Semantic core", "Checkpoints & vector"],
      valueTitle: "What you get",
      value: "A working strategy for years: goals, KPIs, semantic core, content directions and a communication map. Clarity, energy and focus — you know exactly where you're going and which checkpoints to measure by.",
      deliver: ["1–3 year marketing strategy", "KPIs & funnels", "Semantic core & content plan", "Checkpoints & development vector"],
    },
    {
      id: "earth", order: 4, name: "EARTH", sound: "earth",
      color: "#d9a24a", essence: "Nourishment, acceptance, community",
      obraz: "nourishment, acceptance, community", image: IMG.earth,
      points: ["Content", "Community & dialogue", "Brand story", "Trust & interaction", "Customer experience", "Longevity, lifetime value"],
      valueTitle: "What you get",
      value: "We build a living brand in the digital space: social media, landing, product cards and content scenarios aligned to strategy. Community, trust and dialogue that create lasting relationships and lifetime value.",
      deliver: ["Social architecture & site/landing", "Product cards & content scenarios", "Community & living dialogue", "Long relationships & lifetime value"],
    },
    {
      id: "metal", order: 5, name: "METAL", sound: "metal",
      color: "#aeb9cc", essence: "Structure, precision, mastery",
      obraz: "structure, precision, mastery", image: IMG.metal,
      points: ["System", "Automation", "Analytics & data", "Process automation", "Ethical AI", "Scaling"],
      valueTitle: "What you get",
      value: "We ethically automate processes with artificial intelligence — system, precision and mastery. Analytics, data and scaling that improve quality of life and business efficiency.",
      deliver: ["System & process automation", "Analytics & data dashboards", "Ethical AI in the workflow", "Ready to scale"],
    },
  ],
};

// ---------------- METHOD (center brand core) ----------------
export const METHOD = {
  ua: {
    id: "brand", order: "★", name: "ВАШ БРЕНД", sound: "brand",
    color: "#f6e7b0", essence: "як жива структура для живих людей",
    obraz: "квітка життя, цілісність, правда", image: IMG.cosmos,
    kicker: "ЕФІР · СВІДОМІСТЬ І ЄДНІСТЬ",
    points: [
      "Вода — сенс, коріння і чесність із собою",
      "Дерево — напрям росту туди, де світло",
      "Вогонь — ясність, енергія і фокус дії",
      "Земля — живлення, спільнота і довіра",
      "Метал — структура, система і майстерність",
    ],
    valueTitle: "Чому це працює разом",
    value: "Ефір — шоста, невидима стихія, що поєднує решту п'ять у єдине ціле. Це і є твій бренд: свідомість і єдність. П'ять стихій — це не етапи заради етапів, а живий цикл, у якому кожен елемент живить наступний: вода дає сенс, дерево — напрям, вогонь — дію, земля — стосунки, метал — систему. Разом вони утворюють цілісний організм бренду, а не набір розрізнених тактик. Цей метод працює у поєднанні з твоїм дизайном людини (Human Design): ми будуємо стратегію так, щоб вона відповідала твоїй природі, енергії та ролям — тоді дія стає легкою й ефективною. І головне: автентичність має сенс лише тоді, коли є щирість і правда — у першу чергу із самим собою. Бренд не можна зіграти. Коли ти чесний із собою, твоя цінність стає видимою, і люди відчувають її без слів.",
    deliver: [
      "Цілісний бренд, а не набір розрізнених тактик",
      "Стратегія у гармонії з твоїм Human Design",
      "Автентичність, що базується на правді із собою",
      "Живий організм, що росте разом з тобою",
    ],
  },
  en: {
    id: "brand", order: "★", name: "YOUR BRAND", sound: "brand",
    color: "#f6e7b0", essence: "a living structure for living people",
    obraz: "flower of life, wholeness, truth", image: IMG.cosmos,
    kicker: "ETHER · CONSCIOUSNESS & UNITY",
    points: [
      "Water — meaning, roots and honesty with yourself",
      "Wood — the direction of growth toward the light",
      "Fire — clarity, energy and focus of action",
      "Earth — nourishment, community and trust",
      "Metal — structure, system and mastery",
    ],
    valueTitle: "Why it works together",
    value: "Ether is the sixth, invisible element that unites the other five into one whole. This is your brand: consciousness and unity. The five elements are not stages for the sake of stages, but a living cycle where each element feeds the next: water gives meaning, wood gives direction, fire gives action, earth gives relationships, metal gives the system. Together they form a whole brand organism, not a set of scattered tactics. This method works in combination with your Human Design: we build the strategy to match your nature, energy and roles — then action becomes light and effective. And most importantly: authenticity only makes sense when there is sincerity and truth — first of all with yourself. A brand cannot be faked. When you are honest with yourself, your value becomes visible, and people feel it without words.",
    deliver: [
      "A whole brand, not scattered tactics",
      "Strategy in harmony with your Human Design",
      "Authenticity based on truth with yourself",
      "A living organism that grows with you",
    ],
  },
};

// ---------------- ENRICH (creatures, cases, deeper value) ----------------
export const ENRICH = {
  ua: {
    water: {
      creatures: "Дельфіни, кити та затонула Атлантида — глибина, де народжується сенс.",
      value: "Перша зустріч за чашкою китайського чаю — це радше коучингова сесія, ніж брифінг. Через питання і дизайн людини (Human Design) ти усвідомлюєш, хто ти, свої ролі та справжній сенс продукту. З перспективи етичного маркетингу ми не «продаємо маску», а знаходимо твою правду — і будуємо комунікацію, що не виснажує, а живить. Ти знаходиш «Північну зірку» і починаєш рухатись із найвищим ККД.",
      cases: [
        "Кейс: підприємиця вигоріла, женучись за трендами. Після занурення знайшли справжній сенс продукту — контент почав резонувати без насилля над собою, продажі стали природними.",
        "Кейс: коуч не міг сформулювати оффер. Розбір ролей за Human Design показав його силу — позиціонування склалося за одну сесію.",
      ],
    },
    wood: {
      creatures: "Зелені ельфи серед велетенських секвой — ріст туди, де є світло.",
      cases: [
        "Кейс: бренд «стріляв наосліп». Аналіз ніші й конкурентів показав вільну нішу — зайшли туди, де світло, і охоплення зросло без збільшення бюджету.",
        "Кейс: незрозуміло, хто аудиторія. Замір метрик і сегментація виявили платоспроможний сегмент, який раніше ігнорували.",
      ],
    },
    fire: {
      creatures: "Божі іскри — жива енергія, що дає ясність і фокус.",
      cases: [
        "Кейс: багато хаотичних дій без результату. Стратегія з KPI і чек-поінтами дала фокус — команда нарешті знала, що і навіщо робить.",
        "Кейс: контент «ні про що». Семантичне ядро та комунікаційна карта перетворили стрічку на послідовну історію бренду.",
      ],
    },
    earth: {
      creatures: "Гноми з ліхтарями у кришталевих печерах — коріння, спільнота й довіра.",
      cases: [
        "Кейс: підписники є, продажів нема. Побудували живе ком'юніті та діалог — довіра зросла, а з нею й LTV.",
        "Кейс: розрізнені акаунти. Єдина архітектура соцмереж і лендинг зробили шлях клієнта цілісним.",
      ],
    },
    metal: {
      creatures: "Механізми, шестерні та священна геометрія — точність автоматизованих систем.",
      value: "Етично автоматизуємо процеси за допомогою ШІ — так, щоб технології служили людині, а не навпаки. Налаштовуємо автоматизацію контенту й розсилок, авто-воронки та чат-ботів, збір і аналітику даних у дашбордах, автоматичні звіти та повторювані рутини. Система, точність і майстерність вивільняють твій час на творчість і масштабування.",
      cases: [
        "Кейс: власник тонув у рутині. Автоматизували розсилки, звіти та обробку заявок — звільнили ~15 годин на тиждень.",
        "Кейс: дані розкидані. Єдиний дашборд з авто-аналітикою дав рішення на фактах, а не на відчуттях.",
        "Кейс: ручні відповіді 24/7. Етичний AI-бот узяв першу лінію підтримки, зберігши людяність тону.",
      ],
    },
    brand: {
      creatures: "Янголи та світло цілісності — квітка життя, що поєднує всі стихії.",
      cases: [
        "Кейс: сильні окремі активності, але бренд «розсипався». Поєднання 5 стихій у єдину структуру зробило його цілісним і впізнаваним.",
        "Кейс: маркетинг конфліктував із природою власника. Узгодження з Human Design зробило роботу легкою та щирою.",
      ],
    },
  },
  en: {
    water: {
      creatures: "Dolphins, whales and a sunken Atlantis — the depth where meaning is born.",
      value: "The first meeting over a cup of Chinese tea is a coaching session rather than a briefing. Through questions and Human Design you realize who you are, your roles and the true meaning of your product. From an ethical-marketing perspective we don't 'sell a mask' — we find your truth and build communication that nourishes instead of draining. You find your North Star and start moving at the highest efficiency.",
      cases: [
        "Case: an entrepreneur burned out chasing trends. After the immersion we found the real product meaning — content resonated without forcing herself, and sales became natural.",
        "Case: a coach couldn't formulate an offer. A Human Design role breakdown revealed his strength — positioning came together in one session.",
      ],
    },
    wood: {
      creatures: "Green elves among giant sequoias — growth toward the light.",
      cases: [
        "Case: the brand was 'shooting blind'. Niche and competitor analysis found an open niche — we grew where the light was, reach rose without more budget.",
        "Case: the audience was unclear. Metrics and segmentation revealed a paying segment that had been ignored.",
      ],
    },
    fire: {
      creatures: "Divine sparks — living energy that gives clarity and focus.",
      cases: [
        "Case: many chaotic actions, no result. A strategy with KPIs and checkpoints gave focus — the team finally knew what and why.",
        "Case: content 'about nothing'. A semantic core and communication map turned the feed into a coherent brand story.",
      ],
    },
    earth: {
      creatures: "Gnomes with lanterns in crystal caves — roots, community and trust.",
      cases: [
        "Case: followers but no sales. We built a living community and dialogue — trust grew, and with it LTV.",
        "Case: scattered accounts. A single social architecture and landing made the customer journey whole.",
      ],
    },
    metal: {
      creatures: "Mechanisms, gears and sacred geometry — the precision of automated systems.",
      value: "We ethically automate processes with AI — so technology serves the human, not the other way around. We set up content and email automation, auto-funnels and chatbots, data collection and analytics dashboards, automatic reports and repetitive routines. System, precision and mastery free your time for creativity and scaling.",
      cases: [
        "Case: the owner was drowning in routine. We automated emails, reports and lead handling — freeing ~15 hours a week.",
        "Case: data was scattered. A single dashboard with auto-analytics enabled decisions based on facts, not feelings.",
        "Case: manual replies 24/7. An ethical AI bot took the first support line while keeping a human tone.",
      ],
    },
    brand: {
      creatures: "Angels and the light of wholeness — the flower of life that unites all elements.",
      cases: [
        "Case: strong separate activities, but the brand 'fell apart'. Uniting the 5 elements into one structure made it whole and recognizable.",
        "Case: marketing conflicted with the owner's nature. Alignment with Human Design made the work light and sincere.",
      ],
    },
  },
};

// ---------------- STAGES ----------------
export const STAGES = {
  ua: [
    {
      n: "01", element: "water", short: "ВОДА", phase: "ЗАГЛИБЛЕННЯ / ПІЗНАННЯ", question: "ХТО МИ?", output: "ЯСНІСТЬ",
      title: "ВОДА — ЗАГЛИБЛЕННЯ / ПІЗНАННЯ",
      intro: "Вода — це ще не просування. Це занурення. Як у природі вода йде вглиб, так маркетолог спочатку має піти під поверхню бренду та людини. Не «що ми будемо постити?», а «хто перед нами і що насправді тут відбувається?»",
      includesTitle: "Що входить:",
      includes: ["знайомство з людиною / засновником", "історія", "досвід", "цінності", "мотивація", "бачення", "місія", "сильні сторони", "внутрішні ресурси", "продукт як прояв людини/команди", "психологія", "потреби", "реальні проблеми", "контекст", "цифрові знання для розуміння системи", "визначення вихідної точки та бажаного стану"],
      format: "Сесія зі мною за чашкою китайського чаю, аби зануритися у вашу історію та побачити те, що знаходиться під поверхнею: хто ви, де ви зараз, куди рухаєтесь і яку цінність можете створювати для світу.",
    },
    {
      n: "02", element: "wood", short: "ДЕРЕВО", phase: "АНАЛІЗ / НАПРЯМОК", question: "ДЕ МИ?", output: "НАПРЯМОК",
      title: "ДЕРЕВО — АНАЛІЗ / НАПРЯМОК",
      intro: "Вода дала нам глибину. Тепер Дерево має знайти напрямок росту. Дерево в У-Сін — це весна, народження, проростання, розгалуження, пошук світла. Тому тут ми виходимо із внутрішнього світу назовні.",
      includesTitle: "Що аналізуємо:",
      includes: ["ринок", "нішу", "конкурентів", "аудиторії", "сегменти", "потреби", "поведінку", "попит", "тренди", "позиції конкурентів", "продукти", "ціни", "канали", "Customer Journey", "пошукову поведінку", "семантичне ядро"],
      extra: ["Семантичне ядро — це не SEO. Це карта того, якими словами живе ринок. SEO прийде пізніше.", "Ми вже знаємо: де є можливість росту і для кого цей бренд має значення."],
    },
    {
      n: "03", element: "fire", short: "ВОГОНЬ", phase: "СТРАТЕГІЯ / ПРОЯВ", question: "ЩО РОБИМО?", output: "СТРАТЕГІЯ",
      title: "ВОГОНЬ — СТРАТЕГІЯ / ПРОЯВ",
      intro: "Тепер є: Ясність → Напрямок. Із цього народжується Вогонь. Вогонь — це не просто «реклама». Його сутність — світити, проявляти, робити невидиме видимим.",
      includesTitle: "Тут ми формулюємо:",
      includes: ["позиціонування", "ціннісну пропозицію", "офер", "бренд-архітектуру", "комунікаційну стратегію", "маркетингові цілі", "KPI", "продуктові лінійки", "Customer Journey", "маркетингові воронки", "контентну стратегію", "канали просування", "бюджет", "пріоритети", "checkpoints", "план розвитку"],
      extra: ["Стратегія перетворює «Я знаю, хто я» на «Я знаю, що саме я хочу проявити у світі»."],
    },
    {
      n: "04", element: "earth", short: "ЗЕМЛЯ", phase: "ВТІЛЕННЯ / КОМУНІКАЦІЯ", question: "ЯК ЦЕ ПОКАЖЕМО?", output: "ПРИСУТНІСТЬ",
      title: "ЗЕМЛЯ — ВТІЛЕННЯ / КОМУНІКАЦІЯ",
      intro: "Тут ідея стає матеріальною. Вогонь світить — Земля дає цьому форму. Тому тут ми створюємо всю цифрову присутність бренду.",
      groups: [
        { label: "SMM — система присутності", items: ["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads", "Pinterest", "Telegram", "інші платформи"] },
        { label: "Контент", items: ["контент-маркетинг", "копірайтинг", "сторітелінг", "освітній", "продуктовий", "експертний"] },
        { label: "Візуальна комунікація", items: ["фотографія", "графічний дизайн", "візуальна система", "відео", "Reels", "Shorts"] },
        { label: "Платформи", items: ["YouTube", "сайт", "лендинги", "блог"] },
        { label: "Архітектура", items: ["структура соцмереж", "структура сайту", "продуктові карти", "контентні формати", "сценарії", "рубрики", "touchpoints"] },
      ],
      extra: ["SMM тут вже не «вести Instagram» — він підпорядкований стратегії + семантиці + позиціонуванню.", "Те, що було стратегією, тепер можна побачити, почути й відчути."],
    },
    {
      n: "05", element: "metal", short: "МЕТАЛ", phase: "СИСТЕМА / ОПТИМІЗАЦІЯ", question: "ЯК ЦЕ ПРАЦЮЄ?", output: "ЕФЕКТИВНІСТЬ",
      title: "МЕТАЛ — СИСТЕМА / ОПТИМІЗАЦІЯ / МАСШТАБУВАННЯ",
      intro: "Не просто «автоматизація та масштабування», а СИСТЕМА — бо автоматизація лише один із проявів Металу. Сутність Металу: зібрати → структурувати → виміряти → відсікти зайве → зробити точнішим → повторити.",
      groups: [
        { label: "Пошукова система", items: ["SEO", "технічне SEO", "On-page SEO", "семантична оптимізація", "структура сайту"] },
        { label: "Performance", items: ["Google Ads", "таргетована реклама", "ремаркетинг", "платний трафік"] },
        { label: "CRM-комунікація", items: ["Email-маркетинг", "Push", "автоматичні сценарії", "retention"] },
        { label: "Аналітика", items: ["Web-аналітика", "GA4", "GTM", "рекламна аналітика", "KPI", "CAC", "LTV", "ROAS", "ROI"] },
        { label: "Оптимізація", items: ["CRO", "A/B-тестування", "UX", "оптимізація воронок", "оптимізація конверсії"] },
        { label: "AI", items: ["автоматизація", "AI-агенти", "персоналізація", "систематизація", "обробка даних", "масштабування"] },
      ],
      extra: ["AI не лише в Металі — він проходить через усі п'ять елементів. Але в Металі переходить на рівень систем."],
    },
  ],
  en: [
    {
      n: "01", element: "water", short: "WATER", phase: "IMMERSION / KNOWING", question: "WHO ARE WE?", output: "CLARITY",
      title: "WATER — IMMERSION / KNOWING",
      intro: "Water is not promotion yet. It is immersion. As water goes deep in nature, the marketer must first go beneath the surface of the brand and the person. Not «what will we post?», but «who is in front of us and what is really happening here?»",
      includesTitle: "What's included:",
      includes: ["meeting the person / founder", "story", "experience", "values", "motivation", "vision", "mission", "strengths", "inner resources", "product as an expression of the person/team", "psychology", "needs", "real problems", "context", "starting point & desired state"],
      format: "A session with me over a cup of Chinese tea, to dive into your story and see what lies beneath the surface: who you are, where you are now, where you're heading and what value you can create for the world.",
    },
    {
      n: "02", element: "wood", short: "WOOD", phase: "ANALYSIS / DIRECTION", question: "WHERE ARE WE?", output: "DIRECTION",
      title: "WOOD — ANALYSIS / DIRECTION",
      intro: "Water gave us depth. Now Wood must find the direction of growth. Wood in Wu Xing is spring, birth, sprouting, branching, seeking the light. So here we move from the inner world outward.",
      includesTitle: "What we analyze:",
      includes: ["market", "niche", "competitors", "audiences", "segments", "needs", "behavior", "demand", "trends", "competitor positions", "products", "prices", "channels", "Customer Journey", "search behavior", "semantic core"],
      extra: ["The semantic core is not SEO. It's a map of the words the market lives by. SEO comes later.", "We now know: where the growth opportunity is and for whom this brand matters."],
    },
    {
      n: "03", element: "fire", short: "FIRE", phase: "STRATEGY / MANIFESTATION", question: "WHAT DO WE DO?", output: "STRATEGY",
      title: "FIRE — STRATEGY / MANIFESTATION",
      intro: "Now there is: Clarity → Direction. From this Fire is born. Fire is not just «advertising». Its essence is to shine, to manifest, to make the invisible visible.",
      includesTitle: "Here we formulate:",
      includes: ["positioning", "value proposition", "offer", "brand architecture", "communication strategy", "marketing goals", "KPIs", "product lines", "Customer Journey", "funnels", "content strategy", "channels", "budget", "priorities", "checkpoints", "development plan"],
      extra: ["Strategy turns «I know who I am» into «I know what exactly I want to manifest in the world»."],
    },
    {
      n: "04", element: "earth", short: "EARTH", phase: "EMBODIMENT / COMMUNICATION", question: "HOW DO WE SHOW IT?", output: "PRESENCE",
      title: "EARTH — EMBODIMENT / COMMUNICATION",
      intro: "Here the idea becomes material. Fire shines — Earth gives it form. So here we create the entire digital presence of the brand.",
      groups: [
        { label: "SMM — presence system", items: ["Instagram", "Facebook", "TikTok", "LinkedIn", "Threads", "Pinterest", "Telegram", "other platforms"] },
        { label: "Content", items: ["content marketing", "copywriting", "storytelling", "educational", "product", "expert"] },
        { label: "Visual communication", items: ["photography", "graphic design", "visual system", "video", "Reels", "Shorts"] },
        { label: "Platforms", items: ["YouTube", "website", "landing pages", "blog"] },
        { label: "Architecture", items: ["social structure", "site structure", "product cards", "content formats", "scenarios", "rubrics", "touchpoints"] },
      ],
      extra: ["SMM here is no longer «running Instagram» — it is subordinate to strategy + semantics + positioning.", "What was strategy can now be seen, heard and felt."],
    },
    {
      n: "05", element: "metal", short: "METAL", phase: "SYSTEM / OPTIMIZATION", question: "HOW DOES IT WORK?", output: "EFFICIENCY",
      title: "METAL — SYSTEM / OPTIMIZATION / SCALING",
      intro: "Not just «automation and scaling», but SYSTEM — because automation is only one manifestation of Metal. The essence of Metal: gather → structure → measure → cut the excess → make it more precise → repeat.",
      groups: [
        { label: "Search system", items: ["SEO", "technical SEO", "On-page SEO", "semantic optimization", "site structure"] },
        { label: "Performance", items: ["Google Ads", "targeted ads", "remarketing", "paid traffic"] },
        { label: "CRM communication", items: ["Email marketing", "Push", "automatic scenarios", "retention"] },
        { label: "Analytics", items: ["Web analytics", "GA4", "GTM", "ad analytics", "KPI", "CAC", "LTV", "ROAS", "ROI"] },
        { label: "Optimization", items: ["CRO", "A/B testing", "UX", "funnel optimization", "conversion optimization"] },
        { label: "AI", items: ["automation", "AI agents", "personalization", "systematization", "data processing", "scaling"] },
      ],
      extra: ["AI is not only in Metal — it runs through all five elements. But in Metal it rises to the level of systems."],
    },
  ],
};

export const FLOW = {
  ua: { dao: "ДАО · СЕНС / НАМІР", loop: "НОВІ ДАНІ" },
  en: { dao: "DAO · MEANING / INTENT", loop: "NEW DATA" },
};

// ---------------- TOOLS ----------------
export const TOOLS = {
  ua: ["Створення контенту", "Воронки", "Conversion Rate Optimization", "Сайти та лендинги", "SEO оптимізація", "Веб-аналітика", "Email-маркетинг & Push", "Google Ads", "Реклама в Instagram & Facebook", "Ведення YouTube", "SMM & Community", "AI етична автоматизація"],
  en: ["Content creation", "Funnels", "Conversion Rate Optimization", "Sites & landing pages", "SEO optimization", "Web analytics", "Email marketing & Push", "Google Ads", "Instagram & Facebook Ads", "YouTube management", "SMM & Community", "AI ethical automation"],
};

// ---------------- ABOUT ----------------
export const ABOUT = {
  ua: [
    { icon: "GraduationCap", text: "Готуюсь до виходу на орбіту в маркетингу. І бачу свій розвиток у цьому векторі на подальші роки." },
    { icon: "Briefcase", text: "Я маркетолог, дослідник сенсів і систем. Допомагаю брендам та проєктам знаходити свою північну зірку та створювати етичний маркетинг — вибудовуючи довіру і створюючи продукт." },
    { icon: "Brain", text: "Я навчався в Київському університеті культури і мистецтв на оператора кіно." },
    { icon: "Film", text: "Працював з першого курсу і створював відео для брендів, івентів, рекламні ролики, а також працював у рекламній агенції ZLODEITEAM, де ми створювали рекламу і контент для блогерів у сфері кіберспорту України." },
    { icon: "Sparkles", text: "Зараз поглиблююсь у психологію, Human Design, NLP, філософію. Навчався медитації і продовжую навчатись далі." },
    { icon: "PersonStanding", text: "Я сучасний йог, який допомагає у сфері маркетингу." },
    { icon: "Headphones", text: "Нещодавно працював у customer support в астрологічному додатку Nebula." },
    { icon: "Award", text: "Навчався на комплексному курсі з маркетингу в School PARA." },
  ],
  en: [
    { icon: "GraduationCap", text: "I'm preparing to launch into orbit in marketing. And I see my growth in this vector for the years ahead." },
    { icon: "Briefcase", text: "I'm a marketer, a researcher of meanings and systems. I help brands and projects find their North Star and create ethical marketing — building trust and creating product." },
    { icon: "Brain", text: "I studied at the Kyiv University of Culture and Arts as a film operator." },
    { icon: "Film", text: "From my first year I created videos for brands, events, commercials, and worked at the ZLODEITEAM ad agency, where we created ads and content for bloggers in Ukraine's esports scene." },
    { icon: "Sparkles", text: "Now I'm deepening into psychology, Human Design, NLP, philosophy. I studied meditation and keep learning further." },
    { icon: "PersonStanding", text: "I'm a modern yogi who helps in the field of marketing." },
    { icon: "Headphones", text: "Recently I worked in customer support at the Nebula astrology app." },
    { icon: "Award", text: "Studied on a complex marketing course at School PARA." },
  ],
};

// ---------------- HELP ----------------
export const HELP = {
  ua: [
    "Бути корисним зараз людям, які вже мають бізнес в етичних сферах і хочуть покращувати свої метрики і результати.",
    "Допомогти створити бренд з повного нуля новачкам, які тільки стартують.",
    "Допомогти створити сайт або лендинг.",
    "Допомогти окремі процеси робити так, і в цілому — комплексний підхід.",
    "Бренд і праця зі мною — це про комплексний підхід.",
  ],
  en: [
    "Be useful right now to people who already have a business in ethical fields and want to improve their metrics and results.",
    "Help create a brand from scratch for beginners who are just starting.",
    "Help create a website or landing page.",
    "Help make individual processes work — and, overall, a complex approach.",
    "A brand and working with me — it's about a complex approach.",
  ],
};

// ---------------- UI STRINGS ----------------
export const UI = {
  ua: {
    brand: "ВАШ БРЕНД",
    brandSub: "як жива структура для живих людей",
    navElements: "Стихії", navStages: "Етапи", navTools: "Інструменти", navAbout: "Про мене", navContact: "Контакт",
    heroKicker: "ЕТИЧНИЙ КОМПЛЕКСНИЙ",
    heroTitle: "МАРКЕТИНГ",
    heroSub: "для людей, які створюють цінність людям",
    wheelHint: "А яка стихія сьогодні кличе тебе? Натисни на першоелемент, аби познайомитись із енергією глибше",
    stagesTitle: "ЕТАПИ КОМПЛЕКСНОГО МАРКЕТИНГУ",
    toolsTitle: "ІНСТРУМЕНТИ ТА НАПРЯМИ",
    aboutTitle: "ПРО МЕНЕ",
    helpTitle: "Я МОЖУ ДОПОМОГТИ",
    northStar: "Працюю з людьми та брендами, що несуть цінність. Допомагаю знаходити ПІВНІЧНУ ЗІРКУ та рухатися впевнено до результату.",
    neighborsTitle: "СУСІДИ У ВАШІЙ НІШІ",
    neighbors: "співпраця, розвиток, взаємний ріст і створення цінності разом.",
    ctaTitle: "ЯКЩО ВІДЧУВАЄТЕ, ЩО НАМ ПО ДОРОЗІ —",
    ctaText: "напишіть у приватні повідомлення",
    footer: ["ЕТИКА У КОЖНОМУ РІШЕННІ", "ГАРМОНІЯ У ПРОЦЕСІ", "ЦІННІСТЬ У РЕЗУЛЬТАТІ"],
    obraz: "Образ",
    whatIncludes: "Що включає етап",
    casesTitle: "Кейси · що вирішує цей етап",
    soundOn: "Звук", tap: "Натисни",
    writeMe: "Написати мені",
    startBtn: "Почати з чашки чаю",
    exploreBtn: "Дослідити стихії",
  },
  en: {
    brand: "YOUR BRAND",
    brandSub: "as a living structure for living people",
    navElements: "Elements", navStages: "Stages", navTools: "Tools", navAbout: "About", navContact: "Contact",
    heroKicker: "ETHICAL COMPLEX",
    heroTitle: "MARKETING",
    heroSub: "for people who create value for people",
    wheelHint: "Which element calls you today? Tap an element to get to know its energy deeper",
    stagesTitle: "STAGES OF COMPLEX MARKETING",
    toolsTitle: "TOOLS & DIRECTIONS",
    aboutTitle: "ABOUT ME",
    helpTitle: "I CAN HELP",
    northStar: "I work with people and brands that carry value. I help find the NORTH STAR and move confidently toward the result.",
    neighborsTitle: "NEIGHBORS IN YOUR NICHE",
    neighbors: "cooperation, growth, mutual rise and creating value together.",
    ctaTitle: "IF YOU FEEL WE'RE ON THE SAME PATH —",
    ctaText: "write me a direct message",
    footer: ["ETHICS IN EVERY DECISION", "HARMONY IN THE PROCESS", "VALUE IN THE RESULT"],
    obraz: "Image",
    whatIncludes: "What the stage includes",
    casesTitle: "Cases · what this stage solves",
    soundOn: "Sound", tap: "Tap",
    writeMe: "Write to me",
    startBtn: "Start with a cup of tea",
    exploreBtn: "Explore the elements",
  },
};
