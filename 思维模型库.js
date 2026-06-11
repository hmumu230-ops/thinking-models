/* =====================================================================
 *  思维模型库 · 单一真相源 (Single Source of Truth)
 *  --------------------------------------------------------------------
 *  每日迭代只改这个文件，HTML 自动重绘，无需动界面代码。
 *
 *  ▸ 新增一个模型 = 往 models 数组末尾追加一个对象。
 *  ▸ 字段说明：
 *      id        唯一编号（m=种子库；c=每日代理收录，升核心后仍保留 c 前缀以示来源）
 *      cat       所属大类（必须等于 categories 里的某个 cat）
 *      cn / en   中 / 英文名
 *      principle 核心原理（一句话）
 *      scope     适用范围
 *      use       用途（怎么用）
 *      src       学术/思想出处
 *      disc      学科坐标（必须是 disciplines 之一）——覆盖度地图的行
 *      func      功能坐标（必须是 functions 之一）——覆盖度地图的列
 *      general   泛化度 1–5（能迁移到几个领域；严选制要求 ≥3 才入核心库）
 *      added     收录日期 YYYY-MM-DD
 *      status    "core"=已入库 / "candidate"=待审外环（防过拟合缓冲）
 *
 *  ▸ 防过拟合三条铁律（详见《收录与剪枝标准.md》）：
 *      1. 泛化：general ≥ 3 才能进核心库，否则留待审或丢弃。
 *      2. 正交：与现有模型实质不同；是某模型的特例 → 当子注，不开新节点。
 *      3. 可溯源：有真实学术/思想出处，不是当周热词。
 *
 *  ▸ 防伪通用化机制 v1（默认特例·通用靠挣，详见 automation/机制说明.md）：
 *      scope_type     "特例" | "领域" | "通用" —— 入库一律默认"特例"，scope 写清"仅适用于X"；
 *                     通用性不是入库声称的标签，而是被独立使用证明出来的后验。
 *      proven_domains 你真实用过它的"互相独立情境"清单；≥3 且跨域 → 够格升"通用"。
 *      general        仅为"入库先验提示"，不等于已验证的通用性。
 *      （下方 52 个种子模型为既有跨学科文献验证过的经典，grandfather 视作"通用"；
 *        缺省 scope_type 即按"通用"处理。新入库者必须显式标"特例"。）
 *      升级=使用证明+你点头；降级与升级一样容易（判错要便宜可逆）。
 * ===================================================================== */

window.MM = {
  updated: "2026-06-04",

  /* 覆盖度地图的两个维度（8×8=64 格）。扩展边界 = 给这两个数组加新维度。 */
  disciplines: ["认知与心理","行为与决策","经济与博弈","复杂系统与网络","概率与统计","学习与教育","哲学与方法论","物理与自然科学"],
  functions:   ["看清本质","做决策","评估/预测","避坑/纠偏","学习/精进","驱动行为","看懂系统","策略/博弈"],

  categories: [
    {cat:"判断与决策",        en:"Judgment & Decision-Making",     color:"#e0533d"},
    {cat:"认知偏差",          en:"Cognitive Biases",               color:"#e08a2e"},
    {cat:"学习与认知科学",    en:"Learning & Cognitive Science",   color:"#3fae6a"},
    {cat:"动机与行为",        en:"Motivation & Behavior",          color:"#c2417a"},
    {cat:"概率与不确定性",    en:"Probability & Uncertainty",      color:"#2f9fb8"},
    {cat:"复杂系统与网络",    en:"Complex Systems & Networks",     color:"#6a63d6"},
    {cat:"经济博弈与策略",    en:"Economics & Game Theory",        color:"#b3902f"},
    {cat:"推理方法与科学思维",en:"Reasoning & Scientific Thinking",color:"#3a7bd5"},
  ],

  models: [
    /* ---------------- 判断与决策 ---------------- */
    {id:"m01",cat:"判断与决策",cn:"双系统理论",en:"Dual-Process Theory",principle:"大脑有两套系统：系统1快而直觉，系统2慢而理性。",scope:"重要判断、易冲动或被直觉误导的场景。",use:"重大决策时刻意切换到系统2，慢思考、查核直觉。",src:"Stanovich & West (2000), Behavioral and Brain Sciences；Kahneman (2011)",disc:"认知与心理",func:"做决策",general:5,example:"「球与球棒共1.1元、球棒贵1元」直觉脱口“球0.1元”（错），系统2一算才知是0.05元。→ 重要判断先怀疑第一直觉。",added:"2026-06-04",status:"core"},
    {id:"m02",cat:"判断与决策",cn:"前景理论",en:"Prospect Theory",principle:"对损失的痛苦约为等量收益快乐的2倍，以参照点而非绝对值判断。",scope:"风险决策、定价、谈判、投资心理。",use:"识别损失厌恶，设计选项的得失框架。",src:"Kahneman & Tversky (1979), Econometrica 47(2)（2002诺奖）",disc:"行为与决策",func:"做决策",general:5,example:"「丢100的痛，要捡到约200才补得回」同额损失的痛约是收益快乐的两倍。→ 把诉求包装成“避免损失”更有力。",added:"2026-06-04",status:"core"},
    {id:"m03",cat:"判断与决策",cn:"有限理性",en:"Bounded Rationality",principle:"人无法穷尽信息，只能在认知与时间约束下满意即止。",scope:"信息过载、复杂选择、组织决策。",use:"设定足够好的停止标准，避免分析瘫痪。",src:"Simon (1955), Quarterly Journal of Economics 69(1)（1978诺奖）",disc:"行为与决策",func:"做决策",general:5,example:"「西蒙找餐厅」不可能比遍全城，找到一家“够好”就坐下。→ 给决策设“满意即止”线，别分析到瘫痪。",added:"2026-06-04",status:"core"},
    {id:"m04",cat:"判断与决策",cn:"启发式与偏差",en:"Heuristics & Biases",principle:"人靠代表性、可得性、锚定等心理捷径判断，但系统性出错。",scope:"概率估计、风险评估、日常快速判断。",use:"识别捷径触发点，用数据与基率校正直觉。",src:"Tversky & Kahneman (1974), Science 185:1124–1131",disc:"认知与心理",func:"做决策",general:5,example:"「琳达问题」描述一个关心歧视的女子，多数人觉得“她是出纳且女权主义者”比“她是出纳”更可能——违反概率。→ 用基率校正“听着很像”。",added:"2026-06-04",status:"core"},
    {id:"m05",cat:"判断与决策",cn:"期望效用理论",en:"Expected Utility",principle:"理性选择应最大化概率×效用的加权和，而非单看金额。",scope:"不确定性下的押注、保险、投资。",use:"用期望值排序选项，区分概率与后果严重度。",src:"von Neumann & Morgenstern (1944),《博弈论与经济行为》",disc:"概率与统计",func:"做决策",general:4,example:"「圣彼得堡赌局」期望收益无穷大的赌局却没人肯出大价钱——人看效用不看期望金额。→ 排序时算“概率×对你的效用”。",added:"2026-06-04",status:"core"},
    {id:"m06",cat:"判断与决策",cn:"框架效应",en:"Framing Effect",principle:"同一事实换种表述（获益vs损失），会逆转选择。",scope:"沟通、营销、政策、自我说服。",use:"重要决策时把问题正反两面各表述一遍再判断。",src:"Tversky & Kahneman (1981), Science 211:453–458",disc:"认知与心理",func:"避坑/纠偏",general:4,example:"「亚洲疾病问题」同方案说“救活200人”被接受，说“400人会死”被拒。→ 同一事实正反各说一遍再定。",added:"2026-06-04",status:"core"},

    /* ---------------- 认知偏差 ---------------- */
    {id:"m07",cat:"认知偏差",cn:"确认偏误",en:"Confirmation Bias",principle:"人只搜集支持已有观点的证据，忽略反证。",scope:"信念检验、研究、投资、争论。",use:"主动写下我可能错在哪，刻意寻找反例。",src:"Wason (1960), Quarterly Journal of Experimental Psychology 12(3)",disc:"认知与心理",func:"避坑/纠偏",general:5,example:"「华生2-4-6实验」人只举支持自己猜想的例子，从不试反例。→ 主动找“能证明我错”的证据。",added:"2026-06-04",status:"core"},
    {id:"m08",cat:"认知偏差",cn:"锚定效应",en:"Anchoring Effect",principle:"第一个出现的数字会锚住后续所有判断。",scope:"谈判、定价、估值、薪资。",use:"先独立估值再看对方报价；谈判主动设锚。",src:"Tversky & Kahneman (1974), Science 185:1124–1131",disc:"认知与心理",func:"避坑/纠偏",general:4,example:"「转盘实验」先转到大数字的人，估非洲国家占比也更高——无关数字也锚住判断。→ 先独立估值，再看对方报价。",added:"2026-06-04",status:"core"},
    {id:"m09",cat:"认知偏差",cn:"可得性偏差",en:"Availability Heuristic",principle:"越容易想起的事，越被高估其发生概率。",scope:"风险感知、新闻影响、安全决策。",use:"用真实基率/统计数据替代印象中的频率。",src:"Tversky & Kahneman (1973), Cognitive Psychology 5(2)",disc:"认知与心理",func:"评估/预测",general:4,example:"「空难上头条」于是高估坐飞机的危险，其实远比开车安全。→ 用统计基率替代“印象中的频率”。",added:"2026-06-04",status:"core"},
    {id:"m10",cat:"认知偏差",cn:"邓宁-克鲁格效应",en:"Dunning–Kruger Effect",principle:"能力越低越高估自己，能力越高越谦逊。",scope:"自我评估、招聘、学习阶段判断。",use:"陌生领域刻意调低自信，主动求外部反馈。",src:"Kruger & Dunning (1999), J. of Personality and Social Psychology 77(6)",disc:"认知与心理",func:"避坑/纠偏",general:4,example:"「抹柠檬汁的劫匪」以为柠檬汁能隐形去抢银行——越无知越不知自己无知。→ 陌生领域先调低自信、求反馈。",added:"2026-06-04",status:"core"},
    {id:"m11",cat:"认知偏差",cn:"沉没成本谬误",en:"Sunk Cost Fallacy",principle:"已付出且无法收回的成本，不应再影响当前决策。",scope:"投资止损、项目放弃、感情/职业选择。",use:"只问从现在起哪个选项最优，忽略已花费。",src:"Arkes & Blumer (1985), Org. Behavior and Human Decision Processes 35(1)",disc:"行为与决策",func:"做决策",general:5,example:"「协和客机」明知巨亏，因已投入太多而硬撑到底。→ 只问“从现在起哪个选项最好”。",added:"2026-06-04",status:"core"},
    {id:"m12",cat:"认知偏差",cn:"基本归因错误",en:"Fundamental Attribution Error",principle:"解释他人行为时高估人品、低估情境；对自己则相反。",scope:"人际判断、管理、冲突归因。",use:"评价他人前先问换我在那个情境会怎样。",src:"Ross (1977), Advances in Experimental Social Psychology Vol.10",disc:"认知与心理",func:"避坑/纠偏",general:4,example:"「被加塞就骂没素质，自己加塞是赶时间」评人看人品、评己看处境。→ 评人前先问“换我在那情境会怎样”。",added:"2026-06-04",status:"core"},
    {id:"m13",cat:"认知偏差",cn:"幸存者偏差",en:"Survivorship Bias",principle:"只看到幸存/成功样本，忽略沉默的失败者。",scope:"成功学、数据分析、策略复盘。",use:"主动找消失的样本，把失败案例纳入分母。",src:"Wald (1943) 飞机弹孔分析，Statistical Research Group",disc:"概率与统计",func:"避坑/纠偏",general:4,example:"「沃德的轰炸机」该给没弹孔的发动机加装甲——中弹那里的飞机没飞回来。→ 永远问“哪架飞机没飞回来”。",added:"2026-06-04",status:"core"},

    /* ---------------- 学习与认知科学 ---------------- */
    {id:"m14",cat:"学习与认知科学",cn:"认知负荷理论",en:"Cognitive Load Theory",principle:"工作记忆容量有限，超载则学习效率骤降。",scope:"学习、教学、界面/说明书设计。",use:"分块呈现信息、减少无关干扰、给足练习。",src:"Sweller (1988), Cognitive Science 12(2):257–285",disc:"学习与教育",func:"学习/精进",general:4,example:"「13912345678 改成 139-1234-5678」分段就好记——降低工作记忆负担。→ 信息分块、去无关干扰。",added:"2026-06-04",status:"core"},
    {id:"m15",cat:"学习与认知科学",cn:"神奇的数字7",en:"The Magical Number Seven",principle:"工作记忆一次只能保持约7±2个信息块。",scope:"记忆、信息架构、菜单/号码分组。",use:"把信息组块化，每组控制在4–7项。",src:"Miller (1956), Psychological Review 63(2):81–97",disc:"认知与心理",func:"学习/精进",general:3,example:"「记忆高手」常人只记7±2项，高手靠把零散信息打包成“组块”突破极限。→ 编成4-7个有意义的组块。",added:"2026-06-04",status:"core"},
    {id:"m16",cat:"学习与认知科学",cn:"刻意练习",en:"Deliberate Practice",principle:"专家水平靠目标明确+即时反馈+持续挑战极限，而非天赋。",scope:"技能精进、专业成长、训练设计。",use:"在舒适区边缘练习，配反馈与反思迭代。",src:"Ericsson, Krampe & Tesch-Römer (1993), Psychological Review 100(3)",disc:"学习与教育",func:"学习/精进",general:5,example:"「莫扎特并非天生神童」其父自幼高强度针对性训练造就。→ 在能力边缘练、配即时反馈、专攻弱点。",added:"2026-06-04",status:"core"},
    {id:"m17",cat:"学习与认知科学",cn:"间隔与测试效应",en:"Spacing & Testing Effect",principle:"分散复习+主动回忆，比集中死记长期记得更牢。",scope:"备考、技能记忆、知识留存。",use:"用间隔重复+自测（而非反复阅读）来学习。",src:"Roediger & Karpicke (2006), Psychological Science 17(3)；Ebbinghaus (1885)",disc:"学习与教育",func:"学习/精进",general:4,example:"「艾宾浩斯遗忘曲线」学完即忘，但在快忘时复习一次，记忆陡然延长。→ 间隔重复+主动自测，别反复阅读。",added:"2026-06-04",status:"core"},
    {id:"m18",cat:"学习与认知科学",cn:"成长型思维",en:"Growth Mindset",principle:"相信能力可通过努力改变的人，更能从挫折中成长。",scope:"教育、自我激励、团队文化。",use:"把我不会改成我暂时还不会，奖励过程。",src:"Blackwell, Trzesniewski & Dweck (2007), Child Development 78(1)",disc:"学习与教育",func:"学习/精进",general:4,example:"「德韦克的‘还没有’」把“我做不到”改成“我还没做到”，孩子面对难题更不放弃。→ 把失败当信息，奖励过程。",added:"2026-06-04",status:"core"},
    {id:"m19",cat:"学习与认知科学",cn:"心流",en:"Flow",principle:"技能与挑战高度匹配时，进入专注忘我、高产又愉悦的状态。",scope:"工作设计、学习、创造性产出。",use:"调难度匹配能力、屏蔽干扰、设清晰目标与反馈。",src:"Csikszentmihalyi (1990)《Flow》；(1975) 学术原型",disc:"认知与心理",func:"学习/精进",general:4,example:"「攀岩者忘我」难度与能力恰好匹配时，进入忘记时间的高度专注。→ 调难度匹配、屏蔽干扰、设清晰目标。",added:"2026-06-04",status:"core"},
    {id:"m20",cat:"学习与认知科学",cn:"元认知",en:"Metacognition",principle:"对思考的思考——能监控和调节自己的认知过程。",scope:"学习、决策复盘、自我觉察。",use:"定期自问我怎么知道、我哪里可能错。",src:"Flavell (1979), American Psychologist 34(10)",disc:"学习与教育",func:"学习/精进",general:5,example:"「学霸的错题本」不只做题，更监控“我哪没懂、为何错”。→ 常问“我怎么知道我真懂了”。",added:"2026-06-04",status:"core"},

    /* ---------------- 动机与行为 ---------------- */
    {id:"m21",cat:"动机与行为",cn:"自我决定论",en:"Self-Determination Theory",principle:"自主、胜任、联结三种需求被满足时，内在动机最强。",scope:"激励、管理、教育、习惯养成。",use:"给选择权(自主)、设可达挑战(胜任)、建关系(联结)。",src:"Ryan & Deci (2000), American Psychologist 55:68–78",disc:"认知与心理",func:"驱动行为",general:5,example:"「开源贡献者」没工资却熬夜写代码——自主、胜任、联结被满足时内驱最强。→ 给选择权、可达挑战、归属感。",added:"2026-06-04",status:"core"},
    {id:"m22",cat:"动机与行为",cn:"需求层次",en:"Maslow's Hierarchy",principle:"需求从生理、安全到归属、尊重、自我实现层层递进。",scope:"动机分析、产品定位、管理。",use:"先满足低层需求，再诉求高层意义。",src:"Maslow (1943), Psychological Review 50(4):370–396",disc:"认知与心理",func:"驱动行为",general:4,example:"「饥荒中无人谈理想」吃不饱时谈自我实现是空话，需求逐层递进。→ 先满足低层需求，再诉诸高层意义。",added:"2026-06-04",status:"core"},
    {id:"m23",cat:"动机与行为",cn:"认知失调",en:"Cognitive Dissonance",principle:"信念与行为冲突会产生不适，人会改变态度以求一致。",scope:"态度改变、说服、习惯、营销。",use:"让人先做小承诺/行动，态度会随之转变。",src:"Festinger (1957),《A Theory of Cognitive Dissonance》",disc:"认知与心理",func:"驱动行为",general:4,example:"「酸葡萄」够不到就说它酸，用改变态度消解“想要却得不到”的不适。→ 让人先做小行动，态度会跟上。",added:"2026-06-04",status:"core"},
    {id:"m24",cat:"动机与行为",cn:"计划行为理论",en:"Theory of Planned Behavior",principle:"行为由意图决定，意图由态度、主观规范、感知控制驱动。",scope:"行为预测、健康干预、营销。",use:"改变行为要同时调三杠杆：态度、社会压力、自我效能。",src:"Ajzen (1991), Org. Behavior and Human Decision Processes 50(2)",disc:"行为与决策",func:"驱动行为",general:4,example:"「戒烟为何难」光有意图不够，还要改态度、周围人看法、和“我能戒”的自我效能。→ 同时撬动这三根杠杆。",added:"2026-06-04",status:"core"},
    {id:"m25",cat:"动机与行为",cn:"延迟满足",en:"Delayed Gratification",principle:"能为更大长期回报抑制即时诱惑的人，长期表现更好。",scope:"自控、储蓄、健康、长期目标。",use:"用环境设计（移走诱惑、预先承诺）替代意志力。",src:"Mischel, Ebbesen & Zeiss (1972), J. of Personality and Social Psychology 21(2)",disc:"认知与心理",func:"驱动行为",general:4,example:"「棉花糖实验」忍住眼前一颗、等15分钟得两颗的孩子，长期表现更好。→ 用环境设计移走诱惑，别硬扛意志力。",added:"2026-06-04",status:"core"},
    {id:"m26",cat:"动机与行为",cn:"双曲贴现",en:"Hyperbolic Discounting",principle:"人对近在眼前的奖励极度偏好，对未来非理性大打折扣。",scope:"拖延、消费、储蓄、成瘾。",use:"把长期收益前置可见，给当下设小奖励。",src:"Ainslie (1975), Psychological Bulletin 82(4)",disc:"行为与决策",func:"做决策",general:4,example:"「明天再减肥」眼前蛋糕赢过未来健康——对当下奖励极度偏好。→ 把长期收益前置可见，当下设小奖励。",added:"2026-06-04",status:"core"},

    /* ---------------- 概率与不确定性 ---------------- */
    {id:"m27",cat:"概率与不确定性",cn:"贝叶斯定理",en:"Bayes' Theorem",principle:"用新证据按比例更新先验信念：旧信念+新证据=新信念。",scope:"推断、诊断、预测、持续学习。",use:"新信息出现时，问它该让我把概率调多少。",src:"Bayes (1763), Philosophical Transactions of the Royal Society",disc:"概率与统计",func:"评估/预测",general:5,example:"「罕见病假阳性」发病率万分之一、检测99%准，阳性者也大多没病——先验决定一切。→ 新证据出现就问“该把概率调多少”。",added:"2026-06-04",status:"core"},
    {id:"m28",cat:"概率与不确定性",cn:"凯利公式",en:"Kelly Criterion",principle:"有优势的重复押注中，最优下注比例=优势/赔率，最大化长期复利。",scope:"投资仓位、资源分配、重复博弈。",use:"按胜率与赔率定注码，永不全押、留余地。",src:"Kelly (1956), Bell System Technical Journal 35(4)",disc:"概率与统计",func:"做决策",general:4,example:"「21点算牌」有胜算时按优势比例下注，赢面越大注越重，但绝不全押。→ 按胜率与赔率定仓位，永留余地。",added:"2026-06-04",status:"core"},
    {id:"m29",cat:"概率与不确定性",cn:"回归均值",en:"Regression to the Mean",principle:"极端表现后，下一次大概率回归平均，未必是干预的功劳。",scope:"绩效评估、医疗、体育、教育。",use:"别把惩罚后变好/奖励后变差误当因果。",src:"Galton (1886), J. of the Anthropological Institute 15",disc:"概率与统计",func:"评估/预测",general:4,example:"「飞行教官的错觉」骂完飞差的下次变好、夸完飞好的下次变差——只是回归均值，不是骂有用。→ 别把自然回归当因果。",added:"2026-06-04",status:"core"},
    {id:"m30",cat:"概率与不确定性",cn:"黑天鹅",en:"Black Swan",principle:"极小概率、极大冲击、事后才被合理化的事件主导历史。",scope:"风险管理、金融、长期战略。",use:"别依赖预测，留冗余、限下行、保留可选性。",src:"Taleb (2007),《The Black Swan》",disc:"概率与统计",func:"做决策",general:5,example:"「火鸡的第1000天」天天被喂让火鸡确信人类友善，直到感恩节。→ 别靠归纳预测，留冗余、限下行。",added:"2026-06-04",status:"core"},
    {id:"m31",cat:"概率与不确定性",cn:"反脆弱",en:"Antifragility",principle:"有些系统在波动与压力中不仅不受损，反而变强。",scope:"风险设计、个人成长、组织韧性。",use:"减少脆弱暴露，增加小亏大赚的非对称机会。",src:"Taleb (2012),《Antifragile》",disc:"概率与统计",func:"看懂系统",general:5,example:"「九头蛇」砍掉一个头长出两个——有些系统在打击中反而变强。→ 减少脆弱暴露，多押“小亏大赚”。",added:"2026-06-04",status:"core"},
    {id:"m32",cat:"概率与不确定性",cn:"安全边际",en:"Margin of Safety",principle:"在估值/判断之外预留缓冲，以容错和应对未知。",scope:"投资、工程、项目计划。",use:"只在价格远低于价值时行动，留足误差空间。",src:"Graham (1949),《The Intelligent Investor》",disc:"概率与统计",func:"做决策",general:4,example:"「造桥承重」预计载重30吨，按能扛100吨来造，留缓冲应对未知。→ 只在价远低于值时行动，留足误差。",added:"2026-06-04",status:"core"},

    /* ---------------- 复杂系统与网络 ---------------- */
    {id:"m33",cat:"复杂系统与网络",cn:"熵增定律",en:"Entropy / 2nd Law",principle:"封闭系统必然走向无序，维持有序需持续输入能量与做功。",scope:"个人成长、组织、关系、产品维护。",use:"凡放任就会变糟的系统，都要主动注入秩序。",src:"Clausius (1865) 热力学第二定律；Boltzmann 统计诠释",disc:"物理与自然科学",func:"看懂系统",general:5,example:"「房间会自己变乱」不主动收拾就自发走向无序，维序要持续耗能。→ 凡“放任就变糟”的系统都要主动注入秩序。",added:"2026-06-04",status:"core"},
    {id:"m34",cat:"复杂系统与网络",cn:"无标度网络/幂律",en:"Scale-Free Networks",principle:"大型网络靠优先连接自组织出少数超级枢纽（幂律分布）。",scope:"互联网、社交、传播、影响力分布。",use:"找到并连接枢纽节点，理解为何赢家通吃。",src:"Barabási & Albert (1999), Science 286:509–512",disc:"复杂系统与网络",func:"看懂系统",general:4,example:"「枢纽机场」少数枢纽连起绝大多数航线，网络靠“优先连接”长成赢家通吃。→ 找到并连上枢纽节点。",added:"2026-06-04",status:"core"},
    {id:"m35",cat:"复杂系统与网络",cn:"网络效应",en:"Network Effects",principle:"用户越多，产品对每个用户越有价值，形成指数级护城河。",scope:"平台、社交、市场、标准之争。",use:"早期不计成本抢用户密度，跨过临界规模。",src:"Katz & Shapiro (1985), American Economic Review 75(3)",disc:"复杂系统与网络",func:"策略/博弈",general:4,example:"「第一台传真机」独此一台毫无用处，用的人越多每台越值钱。→ 早期抢用户密度，越过临界规模。",added:"2026-06-04",status:"core"},
    {id:"m36",cat:"复杂系统与网络",cn:"涌现",en:"Emergence",principle:"整体会呈现部分所不具备的新性质——多者异也。",scope:"团队、组织、生态、AI、城市。",use:"别只优化个体，关注互动规则与整体结构。",src:"Anderson (1972), Science 177:393–396",disc:"复杂系统与网络",func:"看懂系统",general:5,example:"「蚁群造桥」单只蚂蚁很蠢，成千上万却能搭桥筑巢——整体涌现出个体没有的智能。→ 优化互动规则而非单个个体。",added:"2026-06-04",status:"core"},
    {id:"m37",cat:"复杂系统与网络",cn:"反馈回路",en:"Feedback Loops",principle:"正反馈放大(滚雪球)、负反馈收敛(自稳)，回路决定系统行为。",scope:"增长、管理、自控、生态、经济。",use:"找出隐藏回路，强化良性、阻断恶性循环。",src:"Wiener (1948)《Cybernetics》；Forrester (1961) 系统动力学",disc:"复杂系统与网络",func:"看懂系统",general:5,example:"「话筒啸叫」音箱声被话筒再放大，正反馈瞬间失控尖叫。→ 找出隐藏回路，强化良性、掐断恶性。",added:"2026-06-04",status:"core"},
    {id:"m38",cat:"复杂系统与网络",cn:"临界点/阈值模型",en:"Tipping Point",principle:"个体行为有触发阈值，跨过临界点后集体行为骤变(相变)。",scope:"流行扩散、舆论、社会运动、市场。",use:"识别临界规模，集中资源推过引爆点。",src:"Granovetter (1978), American Journal of Sociology 83(6)",disc:"复杂系统与网络",func:"看懂系统",general:4,example:"「最后一片雪花压垮雪坡」量变累积到临界点，引发雪崩式相变。→ 识别临界规模，集中资源推过引爆点。",added:"2026-06-04",status:"core"},
    {id:"m39",cat:"复杂系统与网络",cn:"蝴蝶效应/混沌",en:"Butterfly Effect / Chaos",principle:"确定性系统中，初始条件的微小差异被指数放大，长期不可预测。",scope:"天气、复杂系统、长期规划、起点选择。",use:"重视起点与早期选择；长期预测保持谦逊。",src:"Lorenz (1963), J. of the Atmospheric Sciences 20(2)",disc:"物理与自然科学",func:"看懂系统",general:4,example:"「洛伦茨的天气」初值差0.000001，几周后模拟天气面目全非。→ 重视起点与早期选择，长期预测保持谦逊。",added:"2026-06-04",status:"core"},

    /* ---------------- 经济博弈与策略 ---------------- */
    {id:"m40",cat:"经济博弈与策略",cn:"纳什均衡",en:"Nash Equilibrium",principle:"各方都选了对方不变时自己的最优，无人愿单方面改变。",scope:"竞争、谈判、定价、博弈分析。",use:"预测对手稳定策略，寻找改变规则的杠杆。",src:"Nash (1950), PNAS 36(1):48–49（1994诺奖）",disc:"经济与博弈",func:"策略/博弈",general:5,example:"「两家加油站」都开在路口对角，谁先搬走谁吃亏，于是僵在原地。→ 预测对手稳定策略，找改规则的杠杆。",added:"2026-06-04",status:"core"},
    {id:"m41",cat:"经济博弈与策略",cn:"囚徒困境",en:"Prisoner's Dilemma",principle:"个体理性追求自利，反而导致集体更差的结果。",scope:"合作、信任、价格战、公共问题。",use:"用重复博弈、沟通、契约把背叛变合作。",src:"Flood & Dresher (1950)；Axelrod (1984)《合作的进化》",disc:"经济与博弈",func:"策略/博弈",general:5,example:"「两嫌犯分开审」各自为自保而招供，结果都比都沉默更惨。→ 用重复博弈/契约把背叛变合作。",added:"2026-06-04",status:"core"},
    {id:"m42",cat:"经济博弈与策略",cn:"比较优势",en:"Comparative Advantage",principle:"即便样样更强，分工做相对最擅长的事，整体产出更高。",scope:"分工、外包、团队配置、贸易。",use:"聚焦相对优势，把其余的交易/委托出去。",src:"Ricardo (1817),《政治经济学及赋税原理》",disc:"经济与博弈",func:"策略/博弈",general:4,example:"「律师与秘书」律师打字也更快，仍该请秘书打字、自己出庭——做相对最擅长的事。→ 聚焦相对优势，其余外包。",added:"2026-06-04",status:"core"},
    {id:"m43",cat:"经济博弈与策略",cn:"公地悲剧",en:"Tragedy of the Commons",principle:"公共资源无人担责，个体理性使用导致集体过度耗竭。",scope:"环境、公共资源、组织协作。",use:"用产权、规则或治理把外部成本内部化。",src:"Hardin (1968), Science 162:1243–1248",disc:"经济与博弈",func:"策略/博弈",general:4,example:"「公共草地」人人多养一只羊都理性，合起来把草场啃光。→ 用产权/规则把外部成本内部化。",added:"2026-06-04",status:"core"},
    {id:"m44",cat:"经济博弈与策略",cn:"帕累托/二八法则",en:"Pareto Principle",principle:"约80%的结果来自20%的原因，分布高度不均。",scope:"时间管理、优先级、客户/质量分析。",use:"找出关键的20%，集中资源，砍掉长尾。",src:"Pareto (1896) 收入分布；Juran 推广",disc:"概率与统计",func:"看清本质",general:5,example:"「20%客户贡献80%利润」分布极不均，关键永远在少数。→ 找出关键20%，集中火力，砍掉长尾。",added:"2026-06-04",status:"core"},
    {id:"m45",cat:"经济博弈与策略",cn:"机会成本",en:"Opportunity Cost",principle:"做一件事的真实代价，是你因此放弃的最优替代选项。",scope:"时间、资金、职业、资源分配。",use:"每个要做都问它挤掉了什么更好的。",src:"Wieser (1914) 奥地利学派；经济学核心概念",disc:"经济与博弈",func:"做决策",general:5,example:"「上大学的代价」学费之外，真正代价是你少赚的四年工资。→ 每个“要做”都问“它挤掉了什么更好的”。",added:"2026-06-04",status:"core"},
    {id:"m46",cat:"经济博弈与策略",cn:"委托代理问题",en:"Principal–Agent Problem",principle:"代理人与委托人利益不一致+信息不对称，产生道德风险。",scope:"公司治理、激励设计、合同、管理。",use:"用激励对齐、监督、信息披露缩小代理成本。",src:"Jensen & Meckling (1976), J. of Financial Economics 3(4)",disc:"经济与博弈",func:"策略/博弈",general:4,example:"「基金经理拿你的钱赌」赢了抽成、输了算你的——利益不一致+信息不对称。→ 用激励对齐与披露压缩代理成本。",added:"2026-06-04",status:"core"},

    /* ---------------- 推理方法与科学思维 ---------------- */
    {id:"m47",cat:"推理方法与科学思维",cn:"第一性原理",en:"First Principles",principle:"把事物拆解到不可再分的基本事实，从根上重新推演。",scope:"创新、复杂难题、打破惯例。",use:"抛开一向如此，从最底层事实重建方案。",src:"亚里士多德《形而上学》；笛卡尔《方法论》(1637)",disc:"哲学与方法论",func:"看清本质",general:5,example:"「马斯克拆电池」别人说电池就这么贵，他拆到原材料成本，发现能便宜十倍。→ 抛开“一向如此”，从底层事实重建。",added:"2026-06-04",status:"core"},
    {id:"m48",cat:"推理方法与科学思维",cn:"奥卡姆剃刀",en:"Occam's Razor",principle:"如无必要，勿增实体——能用简单解释就别用复杂的。",scope:"假设取舍、诊断、设计、调试。",use:"多个解释并存时，先选假设最少的那个。",src:"奥卡姆的威廉（14世纪）；科学方法基石",disc:"哲学与方法论",func:"看清本质",general:5,example:"「草地湿了」是下过雨，还是有人半夜浇水？先信假设最少的那个。→ 多解并存，选假设最少那个。",added:"2026-06-04",status:"core"},
    {id:"m49",cat:"推理方法与科学思维",cn:"可证伪性",en:"Falsifiability",principle:"科学命题必须能被证据推翻；不可证伪的不算科学。",scope:"辨别科学与伪科学、检验观点、研究设计。",use:"对任何主张问什么证据能证明它是错的。",src:"Popper (1959),《科学发现的逻辑》",disc:"哲学与方法论",func:"看清本质",general:4,example:"「天鹅都是白的」再多白天鹅也证明不了，一只黑天鹅就推翻。→ 对任何主张问“什么证据能证明它错”。",added:"2026-06-04",status:"core"},
    {id:"m50",cat:"推理方法与科学思维",cn:"逆向思维",en:"Inversion",principle:"与其想怎么成功，不如想怎么必然失败，然后避开。",scope:"风险规避、问题求解、目标规划。",use:"列出导致失败的所有做法，逐一排除。",src:"Jacobi 反过来想；Munger 推广",disc:"哲学与方法论",func:"做决策",general:5,example:"「芒格：我只想知道我会死在哪，好永远不去那」用反向规避失败。→ 列出“导致失败的做法”，逐一排除。",added:"2026-06-04",status:"core"},
    {id:"m51",cat:"推理方法与科学思维",cn:"二阶思维",en:"Second-Order Thinking",principle:"不止想直接结果，更想结果之后的结果。",scope:"投资、政策、战略、长期决策。",use:"每个决定都追问然后呢？再然后呢？",src:"系统动力学；Howard Marks《投资最重要的事》",disc:"哲学与方法论",func:"看懂系统",general:5,example:"「租金管制」一阶限租护租客，二阶开发商不再建房→房荒。→ 每个决定追问“然后呢？再然后呢？”。",added:"2026-06-04",status:"core"},
    {id:"m52",cat:"推理方法与科学思维",cn:"能力圈",en:"Circle of Competence",principle:"只在自己真正理解的范围内行动，清楚边界比圈大更重要。",scope:"投资、职业、合作、决策。",use:"明确我懂/不懂的边界，圈外保持谦逊或回避。",src:"Buffett & Munger，伯克希尔股东信",disc:"哲学与方法论",func:"做决策",general:4,example:"「巴菲特长期不碰科技股」只在自己真懂的圈里出手，边界比圈大更重要。→ 划清“我懂/不懂”，圈外回避。",added:"2026-06-04",status:"core"},
    {id:"m53",cat:"推理方法与科学思维",cn:"Cynefin决策框架",en:"Cynefin Framework",principle:"把情境分为简单、繁杂、复杂、混乱四类，各用不同决策方式。",scope:"管理、危机应对、复杂项目。",use:"先判断问题属于哪类，再选匹配的行动策略。",src:"Snowden & Boone (2007), Harvard Business Review",disc:"复杂系统与网络",func:"做决策",general:4,example:"「救火 vs 做手术」混乱场景先行动止血，繁杂场景请专家慢分析——先判断情境类型。→ 先判断问题属哪类，再选打法。",added:"2026-06-04",status:"core"},

    /* ============== 待审外环 (candidates) ==============
       示例：演示每日代理如何把候选丢进缓冲区，等通过《收录标准》再升核心。
       升核心：把 status 改成 "core" 即可；剪掉：删除该行。 */
    {id:"c01",cat:"概率与不确定性",cn:"林迪效应",en:"Lindy Effect",principle:"非易逝事物（书、技术、观念）每多存在一天，其预期剩余寿命反而更长。",scope:"仅适用于：判断'非易逝品'（书/技术/观念）的存续，不适用于有寿命上限的生命体或物理过程。",use:"优先押注已被时间检验过的事物，慎追新潮。",src:"Mandelbrot (1982)；Taleb (2012) 推广",disc:"概率与统计",func:"评估/预测",general:3,scope_type:"特例",proven_domains:[],example:"「《几何原本》两千年还在印」非易逝品活得越久，预期还能再活越久。→ 优先押注经时间检验之物。",added:"2026-06-04",status:"core"},
    {id:"c02",cat:"动机与行为",cn:"尤利西斯契约",en:"Ulysses Pact",principle:"在理智清醒时预先自缚，锁死未来意志薄弱时的选项。",scope:"仅适用于：可预见的'未来自己会意志薄弱'且能预设硬约束的场景，不适用于需保留灵活性的决策。",use:"提前设不可逆的约束（自动转账、删App、公开承诺）。",src:"Elster (1979),《Ulysses and the Sirens》",disc:"行为与决策",func:"驱动行为",general:3,scope_type:"特例",proven_domains:[],example:"「奥德修斯绑桅杆」明知塞壬歌声会害死自己，提前让水手把他绑住、塞住耳朵。→ 趁清醒预设硬约束，锁死未来的软弱。",added:"2026-06-04",status:"core"},
    {id:"c03",cat:"经济博弈与策略",cn:"古德哈特定律",en:"Goodhart's Law",principle:"当一个指标成为目标，它就不再是个好指标——人会去优化指标本身，而非它本应代表的东西。",scope:"仅适用于：用量化指标考核或激励人的场景；不适用于无人会去博弈的纯描述性测量。",use:"设考核指标前先预想『它会被怎么刷』，用多元指标+质量校验+不预告的抽查来防博弈。",src:"Goodhart (1975) 货币政策论文；Strathern (1997) 经典表述",disc:"经济与博弈",func:"看懂系统",general:4,scope_type:"特例",proven_domains:[],example:"「河内灭鼠悬赏」1902年殖民政府按老鼠尾巴数发赏，结果有人剪尾放生、甚至专门养鼠——指标（鼠尾）一成目标，就和目标（灭鼠）脱了钩。→ 设指标先想『它会被怎么刷』。",added:"2026-06-07",status:"core"},
    {id:"c04",cat:"认知偏差",cn:"峰终定律",en:"Peak-End Rule",principle:"人对一段体验的记忆，几乎只由情绪最高峰和结尾两个时刻决定，而忽略它持续了多久（时长忽视）。",scope:"仅适用于：人对体验的事后回忆与评价（设计或复盘体验）；不适用于逐刻的客观度量。",use:"设计任何体验（产品/服务/活动/课程）时，刻意营造一个情绪高峰+一个好结尾；评估过往时，警惕记忆被峰终扭曲。",src:"Kahneman, Fredrickson, Schreiber & Redelmeier (1993), Psychological Science；Redelmeier & Kahneman (1996), Pain 66(1)",disc:"认知与心理",func:"驱动行为",general:4,scope_type:"特例",proven_domains:[],example:"「肠镜实验」更长、但结尾更轻柔的肠镜，被病人记成比短而在剧痛中结束的更不痛苦——记忆只认峰值和结尾、无视时长。→ 把资源砸在高峰和收尾。",added:"2026-06-08",status:"core"},
    {id:"c05",cat:"判断与决策",cn:"心理账户",en:"Mental Accounting",principle:"人会把钱按来源或用途分进不同的“心理账户”区别对待，违背了“钱是可替代的”这一经济学常识。",scope:"仅适用于：涉及金钱的决策与消费心理；不适用于非货币情境、或确需专款专用的硬预算约束。",use:"财务决策时提醒自己“钱是可替代的”——赌赢的钱和工资一样是钱；别因心理分账而乱花或错失。",src:"Thaler (1985), Marketing Science；Thaler (1999), J. of Behavioral Decision Making；丢票实验 Kahneman & Tversky (1984)",disc:"行为与决策",func:"避坑/纠偏",general:4,scope_type:"特例",proven_domains:[],example:"「丢票实验」丢了价值10元的戏票，仅46%的人愿再花10元买；可若丢的是10元现金，88%照样买票——同样损失10元，分进不同心理账户就有不同决定。→ 提醒自己“钱是可替代的”。",added:"2026-06-09",status:"core"},
    {id:"c06",cat:"动机与行为",cn:"习得性无助",en:"Learned Helplessness",principle:"反复经历“努力也改变不了结果”之后，人或动物会彻底放弃尝试——哪怕后来能逃脱、也不再行动。",scope:"仅适用于：经历过“不可控的反复失败”后产生的消极放弃；不适用于因理性判断而做的合理放弃。",use:"识别自己/他人是否陷入“反正没用”的瘫痪；用一次“可控的小成功”重建掌控感来打破它。",src:"Seligman & Maier (1967), J. of Experimental Psychology 74(1)；Maier & Seligman (1976) 综述",disc:"认知与心理",func:"驱动行为",general:4,scope_type:"特例",proven_domains:[],example:"「塞利格曼的狗」被关在无法逃避电击的笼里一阵后，即便打开逃生门、狗也只是趴着哀鸣、不再尝试逃——它“学会了”无助。→ 给一次能赢的小胜，重建“我能影响结果”。",added:"2026-06-10",status:"core"},
    {id:"c07",cat:"概率与不确定性",cn:"复利效应",en:"Compound Interest / Exponential Growth",principle:"增长按当前总量的固定比例反复叠加时，回报随时间指数级累积——前期慢得让人想放弃，后期快得超乎想象。",scope:"仅适用于：收益能“利滚利”反复叠加回本金的过程（资金、知识、习惯、关系）；不适用于一次性或线性累加的事。",use:"尽早开始、长期不中断；别小看微小但持续的增长，也别低估长期复利的破坏力（债务、坏习惯）。",src:"棋盘麦粒问题（Ibn Khallikan 记于1256）；Pacioli《Summa》(1494)「72法则」；指数增长经典数学",disc:"概率与统计",func:"做决策",general:5,scope_type:"特例",proven_domains:[],example:"「棋盘麦粒」棋的发明者只求第1格1粒米、每格翻倍，国王嫌少便欣然答应——到第64格已是 2^64-1 粒（约1.2万亿吨、超全球千年产量）。→ 别用线性直觉去判断指数过程。",added:"2026-06-11",status:"core"},
    // === DAILY-AGENT-INSERT-ABOVE ===  每日代理仅在本行上方追加新的 candidate 对象；勿修改或删除其它任何行
  ],
};
