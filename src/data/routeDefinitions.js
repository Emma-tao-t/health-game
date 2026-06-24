import { assetPath } from "../utils/assetPath.js";

const bedroom = assetPath("/assets/backgrounds/bedroom.jpg");
const classroom = assetPath("/assets/backgrounds/classroom.jpg");
const sportsGround = assetPath("/assets/backgrounds/sports-ground.jpg");

function choice(text, next, effects, knowledgeId, consequence, feedback, tone = "good") {
  return { text, next, effects, knowledgeId, consequence, feedback, tone };
}

const choiceIndexes = {
  nick_ch1: [0, 1, 3],
  nick_ch2: [0, 1, 3],
  nick_ch3: [0, 1, 3],
  nick_ch4: [0, 1, 3],
  emma_ch1: [0, 2, 3],
  emma_ch2: [0, 2, 3],
  emma_ch3: [0, 2, 3],
  emma_ch4: [0, 1, 3],
  mia_ch1: [0, 1, 3],
  mia_ch2: [0, 1, 2],
  mia_ch3: [0, 1, 3],
  mia_ch4: [0, 2, 3],
};

function scene(id, background, speaker, text, characters, choices, next) {
  const selectedChoices = choiceIndexes[id]
    ? choiceIndexes[id].map((index) => choices[index])
    : choices;
  return {
    id,
    background,
    speaker: speaker.replace(/^CH\d+\s*·\s*/, ""),
    text,
    characters,
    choices: selectedChoices,
    next,
  };
}

const nick = {
  id: "nick",
  character: "Nick",
  title: "Nick 的一天",
  label: "工具选择线 · 学会科学护理",
  description: "在炎热的校园日常中，把清洁、干爽、透气和科学产品变成真正可执行的护理习惯。",
  communicationGoal: "行为改变：学会在具体场景中选择科学护理工具，并建立稳定的日常护理习惯。",
  accent: "#69B7FF",
  initialStats: { smellValue: 55, confidenceValue: 55, scienceValue: 30 },
  startNode: "nick_start",
  keyKnowledge: ["antiperspirant", "post-workout-care", "perfume-not-cure"],
  nodes: {
    nick_start: scene("nick_start", bedroom, "旁白", "天气预报显示今天持续高温。Nick 要上课、参加小组讨论，还要面对一节体育课。他决定不再靠临时遮盖，而是认真安排一天的护理。", [{ name: "Nick", expression: "normal", position: "center", active: true }], null, "nick_ch1"),
    nick_ch1: scene("nick_ch1", bedroom, "CH1 · 早晨准备", "洗漱完后，Nick 站在衣柜和护理用品前。怎样准备更适合炎热的一天？", [{ name: "Nick", expression: "worried", position: "center", active: true }], [
      choice("洗澡后擦干皮肤，再使用止汗剂", "nick_ch2", { smell: -18, confidence: 8, science: 16 }, "antiperspirant", "Nick 的腋下保持得更干爽，出门时心里也更有底。", "止汗剂不是香水，它的作用是减少汗液排出；在清洁、干燥的皮肤上按说明使用更合适。"),
      choice("只喷很多香水，希望把气味完全盖住", "nick_ch2", { smell: 10, confidence: -6, science: -8 }, "perfume-not-cure", "香味一开始很明显，但天气变热后，混合气味反而让 Nick 更不安。", "香水只能临时遮盖，不能减少汗液或抑制产味细菌，掩盖不等于解决。", "bad"),
      choice("什么都不做，赶时间直接出门", "nick_ch2", { smell: 12, confidence: -8, science: -3 }, "bacteria-factory", "刚到学校，闷热和汗液残留就让 Nick 感到黏腻。", "腋下温暖潮湿时，细菌更容易繁殖并分解分泌物；保持干爽是基础步骤。", "bad"),
      choice("穿透气衣物，并带上湿巾和备用上衣", "nick_ch2", { smell: -12, confidence: 10, science: 12 }, "breathable-clothes", "轻薄衣物让热气更容易散开，备用物品也给了 Nick 安全感。", "透气、吸汗的衣物能减少闷热环境，衣服确实会影响体味管理。"),
    ]),
    nick_ch2: scene("nick_ch2", classroom, "CH2 · 教室互动", "小组讨论前，Emma 发现 Nick 有点紧张，温和地问：“你是不是太热了？要不要休息一下？”", [{ name: "Nick", expression: "worried", position: "left", active: false }, { name: "Emma", expression: "gentle", position: "right", active: true }], [
      choice("自然回应，并去洗手间简单清洁、擦干", "nick_ch3", { smell: -12, confidence: 14, science: 12 }, "odor-not-sweat", "简单整理后，Nick 回到座位，注意力重新回到讨论上。", "气味并不是汗液一流出来就有；减少汗液残留、保持干爽，可以降低细菌分解产生异味的机会。"),
      choice("因为尴尬而回避 Emma，也不参加讨论", "nick_ch3", { smell: 3, confidence: -16, science: 1 }, "stress-body-odor", "Nick 没有处理身体状态，紧张感还让他更关注自己的每一个动作。", "紧张可能增加出汗，也会放大对气味的担忧；先稳定情绪再处理，比一味回避更有效。", "bad"),
      choice("偷偷喷很多香水，再马上回到座位", "nick_ch3", { smell: 9, confidence: -8, science: -7 }, "perfume-not-cure", "浓香在教室里格外明显，Nick 反而担心同学注意到异常。", "香水不能代替清洁和干爽，在密闭空间大量使用还可能给他人造成不适。", "bad"),
      choice("继续忍着，觉得出汗多就一定是狐臭严重", "nick_ch3", { smell: 8, confidence: -11, science: -5 }, "sweat-not-severity", "Nick 把普通出汗理解成严重问题，焦虑比实际情况增长得更快。", "出汗多不等于狐臭重，判断重点不只是汗量，而是是否形成特殊气味以及对生活的影响。", "bad"),
    ]),
    nick_ch3: scene("nick_ch3", sportsGround, "CH3 · 体育课后", "体育课结束，Nick 的衣服已经被汗浸湿。下一节课很快就要开始，他需要做一个实际决定。", [{ name: "Nick", expression: "worried", position: "center", active: true }], [
      choice("简单清洁，并换上干爽透气的备用衣物", "nick_ch4", { smell: -22, confidence: 16, science: 16 }, "post-workout-care", "换好衣服后，Nick 清爽许多，也能从容回到教室。", "运动后及时清洁、换衣能减少潮湿和残留，比临时遮盖更有效。"),
      choice("直接穿着湿衣服回教室", "nick_ch4", { smell: 17, confidence: -12, science: -4 }, "bacteria-factory", "湿衣服持续贴着皮肤，闷热感和气味都越来越明显。", "潮湿环境有利于细菌繁殖，运动后的汗液和衣物残留需要及时处理。", "bad"),
      choice("喷香水遮掩，不处理汗湿衣物", "nick_ch4", { smell: 12, confidence: -9, science: -8 }, "perfume-not-cure", "香味和汗湿衣物的气味混在一起，Nick 依旧不自在。", "掩盖不等于解决；香水不能替代运动后的清洁和换衣。", "bad"),
      choice("先擦干，在通风处休息，再按说明补用止汗产品", "nick_ch4", { smell: -15, confidence: 12, science: 14 }, "antiperspirant", "身体降温、皮肤干爽后，Nick 再次做好了后续护理。", "止汗产品应按说明使用，先擦干并保持通风，比在汗湿皮肤上反复叠加更合理。"),
    ]),
    nick_ch4: scene("nick_ch4", bedroom, "CH4 · 放学复盘", "回到家，Nick 发现真正有效的选择都有共同点：不是临时遮盖，而是减少潮湿和残留。他准备决定今后的做法。", [{ name: "Nick", expression: "normal", position: "center", active: true }], [
      choice("制定“温和清洁—擦干—止汗—透气衣物”的日常计划", "ending", { smell: -14, confidence: 12, science: 18 }, "gentle-cleaning", "Nick 把今天有效的做法写成了简单、可坚持的清单。", "体味管理是日常习惯；适度清洁和稳定护理比一次用力过猛更可靠。"),
      choice("以后继续只依赖香水", "ending", { smell: 9, confidence: -8, science: -9 }, "perfume-not-cure", "Nick 暂时选择了熟悉的遮盖方式，但问题的源头仍没有被处理。", "香水不能根治狐臭，科学护理比临时遮盖更有效。", "bad"),
      choice("忽视问题，也不再准备任何护理用品", "ending", { smell: 11, confidence: -10, science: -5 }, "fabric-spray", "没有计划让 Nick 下次遇到高温或运动时仍然手忙脚乱。", "只处理衣物表面或完全忽视，都不能替代对汗液、皮肤和潮湿环境的管理。", "bad"),
      choice("主动查看清爽知识图鉴，补全自己的护理知识", "ending", { smell: -5, confidence: 9, science: 20 }, "deodorant", "Nick 开始区分止汗、除臭与香味遮盖，护理思路变得更清楚。", "除臭剂主要帮助抑制细菌，止汗剂主要减少汗液；理解工具差异才能科学选择。"),
    ]),
  },
};

const emma = {
  id: "emma", character: "Emma", title: "Emma 的一天", label: "信息辨别线 · 判断健康信息真假",
  description: "面对短视频偏方、夸张广告和就医信息，练习判断来源、证据、机制与风险。",
  communicationGoal: "健康信息素养：识别偏方、广告和夸张承诺，学会查证来源并选择可靠帮助。",
  accent: "#FF7C8A", initialStats: { smellValue: 55, confidenceValue: 50, scienceValue: 35 }, startNode: "emma_start",
  keyKnowledge: ["folk-remedy", "miracle-cure", "clinical-assessment"],
  nodes: {
    emma_start: scene("emma_start", bedroom, "旁白", "Emma 正在准备周末聚会，手机却不断推送“快速去味”的短视频和广告。她决定把今天当成一次健康信息辨别练习。", [{ name: "Emma", expression: "normal", position: "center", active: true }], null, "emma_ch1"),
    emma_ch1: scene("emma_ch1", bedroom, "CH1 · 短视频偏方", "视频主播把生姜切片涂在腋下，字幕写着：“三天根治狐臭，亲测有效！”评论区有人叫好，也有人说皮肤被刺激。", [{ name: "Emma", expression: "concerned", position: "center", active: true }], [
      choice("马上照着视频尝试", "emma_ch2", { smell: 5, confidence: -8, science: -14 }, "folk-remedy", "Emma 刚涂上就觉得刺痛，只能赶紧清洗。", "生姜、大蒜没有可靠改善证据，还可能刺激腋下皮肤；个人体验不能替代科学证据。", "bad"),
      choice("先收藏，觉得以后总会用得上", "emma_ch2", { smell: 1, confidence: -2, science: -5 }, "folk-remedy", "Emma 没有立刻受伤，但把未经查证的信息留在了自己的“备选方案”里。", "面对偏方，暂停尝试是第一步，继续查证证据与风险才算完成判断。", "bad"),
      choice("查询医院、专业机构或正规科普来源", "emma_ch2", { smell: -2, confidence: 9, science: 20 }, "gentle-cleaning", "Emma 找到可靠资料，确认刺激皮肤并不是“有效的证明”。", "皮肤屏障不能随便刺激；正规来源通常会说明适用条件、风险和证据，而不是只展示夸张效果。"),
      choice("和朋友讨论，但明确表示自己仍然保持怀疑", "emma_ch2", { smell: 0, confidence: 8, science: 13 }, "miracle-cure", "讨论帮助 Emma 看见视频里的漏洞：没有可靠来源，也没有适用范围。", "“亲测”“三天根治”是常见夸张话术，保持怀疑并追问证据是健康信息素养的一部分。"),
    ]),
    emma_ch2: scene("emma_ch2", bedroom, "CH2 · 广告推送", "下一条广告声称：“香体丸，从内到外改变体香，吃一颗就让身体自带花香。”", [{ name: "Emma", expression: "concerned", position: "center", active: true }], [
      choice("被前后对比图打动，直接购买", "emma_ch3", { smell: 5, confidence: -7, science: -12 }, "miracle-cure", "下单后 Emma 才发现广告没有解释成分如何影响腋下气味。", "口服产品“让腋下变香”缺乏可靠机制；漂亮的对比图不能代替证据。", "bad"),
      choice("只看好评数量和网红推荐", "emma_ch3", { smell: 2, confidence: -3, science: -7 }, "miracle-cure", "大量重复文案让 Emma 更难分辨哪些是真实体验、哪些是营销内容。", "评价和推荐可能被营销影响，判断健康产品还要看成分、机制、风险与可靠来源。", "bad"),
      choice("查看成分，并查询是否存在可信的科学机制", "emma_ch3", { smell: -2, confidence: 10, science: 19 }, "apocrine-glands", "Emma 发现腋臭形成与汗腺分泌物和细菌有关，广告却没有提供对应机制。", "了解气味形成机制，有助于识别“吃颗糖就改变腋下气味”这类不合理承诺。"),
      choice("关闭广告，不让夸张宣传替自己做决定", "emma_ch3", { smell: 0, confidence: 8, science: 12 }, "miracle-cure", "Emma 没有继续被倒计时和“最后十单”催促。", "夸张广告常用稀缺感推动冲动购买；没有足够证据时，关闭广告是合理选择。"),
    ]),
    emma_ch3: scene("emma_ch3", classroom, "CH3 · 聚会前的信息落地", "聚会快开始了。Emma 需要把查到的知识变成实际准备，同时避免让焦虑替自己做决定。", [{ name: "Emma", expression: "normal", position: "center", active: true }], [
      choice("穿透气衣物，并按说明使用止汗剂", "emma_ch4", { smell: -18, confidence: 13, science: 14 }, "breathable-clothes", "Emma 感到准备充分，能把注意力放回朋友和聚会本身。", "透气衣物减少闷热，止汗剂减少汗液；这是有明确作用方向的组合。"),
      choice("穿厚衣服遮掩，再喷很多香水", "emma_ch4", { smell: 13, confidence: -10, science: -8 }, "perfume-not-cure", "厚衣服让 Emma 更热，浓香也没有消除她对气味的担忧。", "香水不能根治狐臭，厚重不透气的衣物还会让潮湿环境更明显。", "bad"),
      choice("因为担心被注意而取消聚会", "emma_ch4", { smell: 0, confidence: -18, science: 1 }, "self-acceptance", "Emma 暂时避开了场景，却也错过了原本期待的见面。", "体味焦虑是真实的，但不应让羞耻感不断缩小生活；护理也包括自我接纳和获得支持。", "bad"),
      choice("带湿巾和备用衣物，做好准备后正常赴约", "emma_ch4", { smell: -12, confidence: 16, science: 12 }, "post-workout-care", "有了备用方案，Emma 不再反复想象最坏情况。", "及时清洁和更换干爽衣物是实际可行的应对方式，准备感也能降低焦虑。"),
    ]),
    emma_ch4: scene("emma_ch4", classroom, "CH4 · 正规咨询", "聚会后，Emma 想进一步判断自己的情况是否需要专业帮助。搜索结果里既有医院信息，也有“包治根治”的广告。", [{ name: "Emma", expression: "gentle", position: "center", active: true }], [
      choice("选择正规医疗机构，向医生说明具体影响", "ending", { smell: -12, confidence: 16, science: 20 }, "clinical-assessment", "Emma 整理好症状、持续时间和对生活的影响，准备进行正规咨询。", "医生不会只看“有没有味道”，还会综合出汗、皮肤状态和对学习、社交、情绪的影响。"),
      choice("相信“包治根治、一次见效”的广告", "ending", { smell: 10, confidence: -10, science: -15 }, "miracle-cure", "夸张承诺让 Emma 一时心动，却没有提供适用条件和风险说明。", "不存在适合所有人的神奇方法；越是承诺绝对、快速、无风险，越需要警惕。", "bad"),
      choice("继续只靠香水，不再了解其他方案", "ending", { smell: 8, confidence: -7, science: -8 }, "perfume-not-cure", "Emma 暂时回到了熟悉的遮盖方法，但仍不知道自己的实际情况。", "香水不能替代判断与护理，也不能回答是否需要专业帮助。", "bad"),
      choice("先记录症状、诱因和影响，再阅读正规资料", "ending", { smell: -5, confidence: 11, science: 18 }, "seek-doctor", "记录让 Emma 的担忧变得更具体，也帮助她决定是否预约医生。", "当体味明显影响生活或情绪时，可以求助医生；游戏科普不能替代医疗诊断。"),
    ]),
  },
};

const mia = {
  id: "mia", character: "Mia", title: "Mia 的一天", label: "社交心理线 · 面对焦虑与污名",
  description: "在地铁、排队和朋友见面等公共情境中，练习稳定情绪、表达需求并减少体味羞耻。",
  communicationGoal: "去污名化与心理支持：理解体味不是道德问题，在科学护理之外保留社交、自尊与求助能力。",
  accent: "#63C46C", initialStats: { smellValue: 60, confidenceValue: 42, scienceValue: 35 }, startNode: "mia_start",
  keyKnowledge: ["stress-body-odor", "self-acceptance", "severity-levels"],
  nodes: {
    mia_start: scene("mia_start", bedroom, "旁白", "Mia 要乘地铁去参加朋友活动。高温、拥挤和对他人目光的担忧，让这趟普通通勤变成了一次社交心理挑战。", [{ name: "Mia", expression: "normal", position: "center", active: true }], null, "mia_ch1"),
    mia_ch1: scene("mia_ch1", classroom, "CH1 · 地铁通勤", "车厢很拥挤，Mia 感觉自己开始出汗。她立刻担心周围的人是不是已经闻到了。", [{ name: "Mia", expression: "surprised", position: "center", active: true }], [
      choice("一直缩在角落，反复观察别人的表情", "mia_ch2", { smell: 5, confidence: -18, science: 1 }, "stress-body-odor", "Mia 越观察越觉得每个动作都和自己有关，身体也更紧绷。", "紧张可能增加出汗，也会放大自我关注；他人的普通反应不等于在评价你。", "bad"),
      choice("到站后找洗手间简单整理，再继续行程", "mia_ch2", { smell: -12, confidence: 12, science: 11 }, "gentle-cleaning", "Mia 给自己留出几分钟，整理后重新回到行程。", "温和清洁、擦干和换气是实际应对，不需要通过羞辱自己来推动护理。"),
      choice("在车厢里喷大量香水", "mia_ch2", { smell: 10, confidence: -9, science: -8 }, "perfume-not-cure", "浓香迅速扩散，附近乘客的不适让 Mia 更加紧张。", "公共密闭空间不适合喷浓香，香水也不能处理汗液和细菌形成气味的源头。", "bad"),
      choice("先深呼吸稳定情绪，告诉自己下车后再处理", "mia_ch2", { smell: -3, confidence: 16, science: 13 }, "self-acceptance", "Mia 的呼吸慢下来，没有让一瞬间的担忧控制整段通勤。", "科学护理也包括自我接纳：先稳定情绪、再做可行处理，不等于忽视问题。"),
    ]),
    mia_ch2: scene("mia_ch2", sportsGround, "CH2 · 高温排队", "活动入口排起长队，阳光很强。Mia 明显出汗，开始担心自己会给别人留下“不爱干净”的印象。", [{ name: "Mia", expression: "normal", position: "center", active: true }], [
      choice("移到通风位置，补水并让身体降温", "mia_ch3", { smell: -8, confidence: 12, science: 12 }, "sweat-not-severity", "身体降温后，Mia 的出汗逐渐缓和，也不再把高温出汗等同于严重体味。", "高温会增加出汗，但出汗多不等于狐臭重；先改善环境和身体状态很重要。"),
      choice("穿上厚外套，强行把身体遮住", "mia_ch3", { smell: 15, confidence: -9, science: -6 }, "breathable-clothes", "厚外套让热量更难散出，Mia 反而更湿、更不舒服。", "不透气衣物会闷住汗液；遮住身体不等于减少气味。", "bad"),
      choice("用湿巾简单清洁并擦干", "mia_ch3", { smell: -14, confidence: 11, science: 10 }, "bacteria-factory", "简单处理减少了黏腻感，Mia 也更愿意把注意力放回活动。", "保持干爽能减少细菌分解汗液的机会，是高温场景中的基础处理。"),
      choice("反复闻自己的衣服，越来越确信别人都注意到了", "mia_ch3", { smell: 3, confidence: -20, science: 0 }, "stress-body-odor", "反复确认没有带来确定感，反而让 Mia 的焦虑不断升级。", "过度检查会强化焦虑感受；先停止反复确认，再根据实际情况处理更有帮助。", "bad"),
    ]),
    mia_ch3: scene("mia_ch3", classroom, "CH3 · 朋友见面", "朋友朝 Mia 走来。她担心对方闻到气味，下意识想后退，甚至想找借口离开。", [{ name: "Mia", expression: "surprised", position: "left", active: true }, { name: "Nick", expression: "happy", position: "right", active: false }], [
      choice("自然说明天气太热，先去整理一下", "mia_ch4", { smell: -10, confidence: 17, science: 10 }, "self-acceptance", "朋友自然地答应等她，Mia 发现表达需求并没有破坏关系。", "体味问题不应该被羞辱；坦然表达、照顾自己，是健康社交的一部分。"),
      choice("直接逃避见面，假装临时有事", "mia_ch4", { smell: 0, confidence: -22, science: -1 }, "severity-levels", "Mia 离开后并没有轻松，反而开始担心下一次见面。", "当体味焦虑持续影响社交和生活质量时，它本身就值得被认真对待和求助。", "bad"),
      choice("用浓香掩盖后立刻靠近朋友", "mia_ch4", { smell: 9, confidence: -8, science: -7 }, "perfume-not-cure", "浓香没有消除 Mia 的担忧，还让她不断猜测朋友是否察觉。", "香水不能根治狐臭，也不能解决羞耻和焦虑；遮盖不是唯一的社交策略。", "bad"),
      choice("正常相处，不把自己定义成“有问题的人”", "mia_ch4", { smell: -2, confidence: 20, science: 13 }, "abcc11", "Mia 渐渐投入聊天，发现自己不需要把全部注意力都放在体味上。", "体味差异可能与遗传和生理因素有关，不应被理解成“不爱干净”，更不该成为羞辱标签。"),
    ]),
    mia_ch4: scene("mia_ch4", bedroom, "CH4 · 晚上长期计划", "回家后，Mia 想为身体护理和情绪压力一起制定长期计划，而不是让每次出门都变成考验。", [{ name: "Mia", expression: "normal", position: "center", active: true }], [
      choice("制定可坚持的日常护理计划，也保留正常社交", "ending", { smell: -14, confidence: 16, science: 16 }, "self-acceptance", "Mia 把护理安排写得简单具体，也写下“体味不等于我的全部”。", "体味管理既包括清洁、干爽等行为，也包括减少羞耻感和维持正常生活。"),
      choice("继续只靠香水，把焦虑暂时压下去", "ending", { smell: 9, confidence: -10, science: -8 }, "perfume-not-cure", "熟悉的遮盖方式没有给 Mia 带来真正的安全感。", "香水不能解决源头，也不能替代情绪支持和长期护理。", "bad"),
      choice("如果持续影响生活，预约正规医院咨询", "ending", { smell: -10, confidence: 18, science: 20 }, "clinical-assessment", "Mia 决定把实际症状和心理影响都告诉医生，而不是独自硬撑。", "医学评估会综合严重程度、皮肤状态和生活影响；必要时求助是负责任的选择。"),
      choice("完全放弃社交，尽量不再出门", "ending", { smell: 0, confidence: -25, science: -5 }, "seek-doctor", "回避让 Mia 的生活范围越来越小，问题却没有真正得到处理。", "如果体味或焦虑已经明显影响社交和情绪，应寻求正规医疗或心理支持，而不是独自隔离。", "bad"),
    ]),
  },
};

export const routes = { nick, emma, mia };
export const routeList = Object.values(routes);
