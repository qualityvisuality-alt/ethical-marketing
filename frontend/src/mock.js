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
      value: "На першій зустрічі за чашкою китайського чаю ми занурюємось у тебе. Ти дізнаєшся, хто ти у всьому цьому, свій Human Design та ролі, які найкраще реалізуєш у своєму бренді й продукті. Побачиш, як саме твій продукт впливає на людей, знайдеш свою «Північну зірку» і почнеш бачити, як рухатись з найвищим ККД — так, щоб було найкраще саме для тебе.",
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
      value: "At our first session over a cup of Chinese tea we dive into you. You discover who you are within all of this, your Human Design and the roles you realize best in your brand and product. You see how your product truly affects people, find your North Star, and start to move with the highest efficiency — the way that is best for you.",
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
    { n: "01", title: "ПІДГОТОВКА ТА ПРОСУВАННЯ", text: "Сесія зі мною за чашкою китайського чаю, аби зануритись у вашу історію та створити розуміння і ясність: хто ви, де ви, куди йдете, як можете приносити користь світу.", element: "water" },
    { n: "02", title: "АНАЛІЗ", text: "Далі переходимо до аналізу саме вашого ринку, вашої аудиторії, сусідів у вашій ніші, аналіз продукту і вже створеного бренду. Виявляємо сильні сторони, ризики та можливості.", element: "wood" },
    { n: "03", title: "СТРАТЕГІЯ", text: "Розробляємо робочу стратегію, встановлюємо цілі, KPI, позиціонування, контент-план, воронки та план маркетингу на декілька років і встановлюємо checkpoints, за якими рухаємось.", element: "fire" },
    { n: "04", title: "SMM І КОМУНІКАЦІЯ — БУДУЄМО БРЕНД КОМПЛЕКСНО", text: "Створення архітектури соціальних мереж, сайту, лендингу та прояв вашої цінності у діджитал-просторі. Продуктові карти й сценарії форматам створення, підпорядковані під стратегію та семантичне ядро.", element: "earth" },
    { n: "05", title: "АВТОМАТИЗАЦІЯ ТА МАСШТАБУВАННЯ", text: "Етично автоматизуємо процеси за допомогою штучного інтелекту для покращення якості життя та ефективності бізнесу.", element: "metal" },
  ],
  en: [
    { n: "01", title: "PREPARATION & PROMOTION", text: "A session with me over a cup of Chinese tea, to dive into your story and create understanding and clarity: who you are, where you are, where you're going, how you can bring value to the world.", element: "water" },
    { n: "02", title: "ANALYSIS", text: "Next we move to the analysis of your market, your audience, the neighbors in your niche, analysis of the product and the existing brand. We reveal strengths, risks and opportunities.", element: "wood" },
    { n: "03", title: "STRATEGY", text: "We develop a working strategy, set goals, KPIs, positioning, content plan, funnels and a marketing plan for several years, and set checkpoints to move by.", element: "fire" },
    { n: "04", title: "SMM & COMMUNICATION — BUILD THE BRAND", text: "Creating the architecture of social networks, website, landing and the manifestation of your value in the digital space. Product cards and content scenarios aligned to the strategy and semantic core.", element: "earth" },
    { n: "05", title: "AUTOMATION & SCALING", text: "We ethically automate processes with artificial intelligence to improve quality of life and business efficiency.", element: "metal" },
  ],
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
    wheelHint: "Наведи, щоб оживити стихії · натисни, щоб відкрити",
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
    wheelHint: "Hover to bring the elements alive · tap to open",
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
