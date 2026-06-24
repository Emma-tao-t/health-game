import { assetPath } from "../utils/assetPath.js";
const bedroom = assetPath("/assets/backgrounds/bedroom.jpg");
const classroom = assetPath("/assets/backgrounds/classroom.jpg");
const sportsGround = assetPath("/assets/backgrounds/sports-ground.jpg");

function chars(list) {
  return list;
}

function choice(text, next, effects, knowledgeId, knowledge, tone = "good") {
  return { text, next, effects, knowledgeId, knowledge, tone };
}

const legacyRoutes = {
  nick: {
    id: "nick",
    title: "Nick 的一天",
    label: "校园基础护理线",
    description: "从上学、教室到体育课后，学习最基础的体味管理方法。",
    accent: "#69B7FF",
    character: "Nick",
    startNode: "nick_start",
    initialStats: { smellValue: 45, confidenceValue: 55, scienceValue: 30 },
    nodes: {
      nick_start: {
        id: "nick_start",
        background: bedroom,
        speaker: "旁白",
        text: "早晨的阳光照进房间。Nick准备出门上学，今天会有教室小组讨论和体育课。",
        characters: chars([{ name: "Nick", expression: "normal", position: "center", active: true }]),
        next: "nick_ch1",
      },
      nick_ch1: {
        id: "nick_ch1",
        background: bedroom,
        speaker: "旁白",
        text: "早晨上学前，Nick需要做出准备。",
        characters: chars([{ name: "Nick", expression: "worried", position: "center", active: true }]),
        choices: [
          choice("洗澡后在干爽皮肤上使用止汗剂", "nick_ch1_good", { smell: -20, confidence: 10, science: 16 }, "antiperspirant", "止汗剂的重点是减少汗液分泌，配合清洁能从源头降低汗液被细菌分解产生的气味。"),
          choice("只喷香水，觉得香味能盖住一切", "nick_ch1_bad", { smell: 12, confidence: -6, science: -5 }, "perfume", "香水不能减少汗液或细菌作用，和原本体味混在一起时可能更复杂。", "bad"),
          choice("穿透气衣服，并带湿巾备用", "nick_ch1_good", { smell: -12, confidence: 8, science: 12 }, "breathable", "透气衣物和备用清洁用品能减少闷热潮湿环境，让临时整理更从容。"),
        ],
      },
      nick_ch1_good: {
        id: "nick_ch1_good",
        background: bedroom,
        speaker: "Nick",
        text: "这样准备好像更安心了。今天就慢慢来。",
        characters: chars([{ name: "Nick", expression: "happy", position: "center", active: true }]),
        next: "nick_ch2",
      },
      nick_ch1_bad: {
        id: "nick_ch1_bad",
        background: bedroom,
        speaker: "Nick",
        text: "香味很明显，但我心里还是有点没底。",
        characters: chars([{ name: "Nick", expression: "embarrassed", position: "center", active: true }]),
        next: "nick_ch2",
      },
      nick_ch2: {
        id: "nick_ch2",
        background: classroom,
        speaker: "Emma",
        text: "教室里，Emma温和地问：“你今天是不是有点热？”",
        characters: chars([
          { name: "Nick", expression: "worried", position: "left", active: false },
          { name: "Emma", expression: "gentle", position: "right", active: true },
        ]),
        choices: [
          choice("自然回应，并说自己去简单整理一下", "nick_ch2_good", { smell: -12, confidence: 14, science: 10 }, "bacteria", "出汗不等于狐臭。及时清洁、保持干爽，可以减少细菌分解汗液带来的异味。"),
          choice("过度紧张，开始回避交流", "nick_ch2_bad", { smell: 4, confidence: -16, science: 0 }, "stress", "紧张会影响汗腺分泌，也会放大自我感受。温和处理比回避更有帮助。", "bad"),
          choice("趁课间喷很多香水", "nick_ch2_bad", { smell: 10, confidence: -8, science: -6 }, "perfume", "大量香水不能代替护理，还可能让周围更容易注意到气味变化。", "bad"),
        ],
      },
      nick_ch2_good: {
        id: "nick_ch2_good",
        background: classroom,
        speaker: "Emma",
        text: "“没关系，天气热的时候大家都会这样。”Nick松了一口气。",
        characters: chars([
          { name: "Nick", expression: "happy", position: "left", active: true },
          { name: "Emma", expression: "gentle", position: "right", active: false },
        ]),
        next: "nick_ch3",
      },
      nick_ch2_bad: {
        id: "nick_ch2_bad",
        background: classroom,
        speaker: "旁白",
        text: "Nick越想越紧张，注意力反而被体味问题牵走。",
        characters: chars([{ name: "Nick", expression: "worried", position: "center", active: true }]),
        next: "nick_ch3",
      },
      nick_ch3: {
        id: "nick_ch3",
        background: sportsGround,
        speaker: "Mia",
        text: "体育课后，Mia跑过来：“要不要一起去吃饭？”",
        characters: chars([
          { name: "Nick", expression: "worried", position: "left", active: false },
          { name: "Mia", expression: "cheerful", position: "right", active: true },
        ]),
        choices: [
          choice("先清洁并换透气衣物，再去吃饭", "nick_ch3_good", { smell: -22, confidence: 18, science: 14 }, "sportClean", "运动后汗液更多，及时清洁和更换衣物能减少汗液残留与细菌繁殖。"),
          choice("直接回教室，不做处理", "nick_ch3_bad", { smell: 16, confidence: -12, science: -2 }, "sportClean", "运动后汗液停留在皮肤和衣物上，会让异味更容易出现。", "bad"),
          choice("补用止汗产品，并找通风处休息", "nick_ch3_good", { smell: -15, confidence: 12, science: 12 }, "antiperspirant", "干爽时补用止汗产品并保持通风，有助于减少之后继续出汗带来的困扰。"),
        ],
      },
      nick_ch3_good: {
        id: "nick_ch3_good",
        background: sportsGround,
        speaker: "Mia",
        text: "“好呀，我等你。”Nick整理后更自在地加入了午餐邀约。",
        characters: chars([
          { name: "Nick", expression: "happy", position: "left", active: true },
          { name: "Mia", expression: "cheerful", position: "right", active: false },
        ]),
        next: "nick_ch4",
      },
      nick_ch3_bad: {
        id: "nick_ch3_bad",
        background: sportsGround,
        speaker: "旁白",
        text: "Nick虽然跟上了大家，但心里一直不太踏实。",
        characters: chars([{ name: "Nick", expression: "embarrassed", position: "center", active: true }]),
        next: "nick_ch4",
      },
      nick_ch4: {
        id: "nick_ch4",
        background: bedroom,
        speaker: "旁白",
        text: "放学后，Nick开始复盘今天的护理选择。",
        characters: chars([{ name: "Nick", expression: "normal", position: "center", active: true }]),
        choices: [
          choice("制定日常护理计划：清洁、止汗、透气衣物", "ending", { smell: -12, confidence: 12, science: 16 }, "bacteria", "日常护理不是一次性任务。稳定习惯能更可靠地减少异味困扰。"),
          choice("继续只依赖香水", "ending", { smell: 10, confidence: -8, science: -8 }, "perfume", "只依赖香水容易忽视真正有效的清洁、干爽和科学护理。", "bad"),
          choice("了解更多科学护理知识", "ending", { smell: -6, confidence: 8, science: 18 }, "doctor", "主动学习能减少误区。如果问题严重影响生活，也可以向正规医生咨询。"),
        ],
      },
    },
  },

  emma: {
    id: "emma",
    title: "Emma 的一天",
    label: "社交与专业护理线",
    description: "在聚会、朋友提醒和护理咨询中，认识偏方误区与正规处理方式。",
    accent: "#FF7C8A",
    character: "Emma",
    startNode: "emma_start",
    initialStats: { smellValue: 60, confidenceValue: 50, scienceValue: 40 },
    nodes: {
      emma_start: {
        id: "emma_start",
        background: bedroom,
        speaker: "旁白",
        text: "Emma今天要去朋友聚会。她想打扮得舒服，也不想被体味焦虑牵着走。",
        characters: chars([{ name: "Emma", expression: "normal", position: "center", active: true }]),
        next: "emma_ch1",
      },
      emma_ch1: {
        id: "emma_ch1",
        background: bedroom,
        speaker: "旁白",
        text: "聚会前准备，Emma正在挑衣服和护理用品。",
        characters: chars([{ name: "Emma", expression: "gentle", position: "center", active: true }]),
        choices: [
          choice("穿透气衣物，并提前使用止汗剂", "emma_ch1_good", { smell: -20, confidence: 12, science: 14 }, "antiperspirant", "止汗剂和透气衣物可以同时减少汗液与闷热环境，适合聚会前准备。"),
          choice("穿厚衣服遮掩，再喷很多香水", "emma_ch1_bad", { smell: 14, confidence: -10, science: -6 }, "perfume", "厚衣服会增加闷热，香水也不能解决汗液与细菌作用。", "bad"),
          choice("带备用衣物和湿巾，给自己留余地", "emma_ch1_good", { smell: -12, confidence: 14, science: 10 }, "breathable", "备用衣物和湿巾能帮助临时整理，减少社交场景里的焦虑。"),
        ],
      },
      emma_ch1_good: {
        id: "emma_ch1_good",
        background: bedroom,
        speaker: "Emma",
        text: "准备得舒服一点，我也能更自然地出门。",
        characters: chars([{ name: "Emma", expression: "gentle", position: "center", active: true }]),
        next: "emma_ch2",
      },
      emma_ch1_bad: {
        id: "emma_ch1_bad",
        background: bedroom,
        speaker: "Emma",
        text: "好像遮住了，但又更闷了。",
        characters: chars([{ name: "Emma", expression: "concerned", position: "center", active: true }]),
        next: "emma_ch2",
      },
      emma_ch2: {
        id: "emma_ch2",
        background: classroom,
        speaker: "Mia",
        text: "聚会上，Mia轻声说：“你要不要去整理一下？我陪你。”",
        characters: chars([
          { name: "Emma", expression: "concerned", position: "left", active: false },
          { name: "Mia", expression: "normal", position: "right", active: true },
        ]),
        choices: [
          choice("坦然说自己想整理一下", "emma_ch2_good", { smell: -10, confidence: 18, science: 8 }, "stress", "坦然回应能降低焦虑。体味问题可以被温和处理，不需要自我否定。"),
          choice("立刻逃开，不再参与聚会", "emma_ch2_bad", { smell: 2, confidence: -18, science: 0 }, "stress", "回避会让焦虑更强，温和整理和正常社交通常更有帮助。", "bad"),
          choice("用玩笑带过，并去洗手间整理", "emma_ch2_good", { smell: -8, confidence: 12, science: 8 }, "bacteria", "简单清洁和保持干爽是社交场景里很实际的处理方式。"),
        ],
      },
      emma_ch2_good: {
        id: "emma_ch2_good",
        background: classroom,
        speaker: "Mia",
        text: "“没问题，大家都需要整理自己的状态。”Emma感觉轻松了一些。",
        characters: chars([
          { name: "Emma", expression: "gentle", position: "left", active: true },
          { name: "Mia", expression: "cheerful", position: "right", active: false },
        ]),
        next: "emma_ch3",
      },
      emma_ch2_bad: {
        id: "emma_ch2_bad",
        background: classroom,
        speaker: "旁白",
        text: "Emma离开了聚会，但她知道自己其实不是不想见朋友。",
        characters: chars([{ name: "Emma", expression: "concerned", position: "center", active: true }]),
        next: "emma_ch3",
      },
      emma_ch3: {
        id: "emma_ch3",
        background: bedroom,
        speaker: "旁白",
        text: "回家路上，Emma刷到一个“偏方去味”的短视频。",
        characters: chars([{ name: "Emma", expression: "concerned", position: "center", active: true }]),
        choices: [
          choice("尝试生姜或大蒜涂抹", "emma_ch3_bad", { smell: 8, confidence: -8, science: -10 }, "folkRemedy", "刺激性偏方可能伤害皮肤屏障，也没有可靠证据证明能科学处理体味。", "bad"),
          choice("用高浓度酒精反复消毒", "emma_ch3_bad", { smell: 6, confidence: -6, science: -10 }, "alcohol", "高浓度酒精可能刺激腋下皮肤，破坏屏障，并不适合作为日常护理。", "bad"),
          choice("查询正规科普，再判断是否可信", "emma_ch3_good", { smell: -4, confidence: 8, science: 18 }, "folkRemedy", "遇到偏方时先查证来源，是避免误区的重要一步。"),
        ],
      },
      emma_ch3_good: {
        id: "emma_ch3_good",
        background: bedroom,
        speaker: "Emma",
        text: "我还是先看可靠信息吧，不拿皮肤冒险。",
        characters: chars([{ name: "Emma", expression: "gentle", position: "center", active: true }]),
        next: "emma_ch4",
      },
      emma_ch3_bad: {
        id: "emma_ch3_bad",
        background: bedroom,
        speaker: "旁白",
        text: "Emma意识到，越急着找捷径，越容易被没有依据的方法带偏。",
        characters: chars([{ name: "Emma", expression: "concerned", position: "center", active: true }]),
        next: "emma_ch4",
      },
      emma_ch4: {
        id: "emma_ch4",
        background: classroom,
        speaker: "旁白",
        text: "第二天，Emma来到护理咨询处，想了解更专业的方向。",
        characters: chars([{ name: "Emma", expression: "normal", position: "center", active: true }]),
        choices: [
          choice("了解正规医学治疗方式，但不盲目跟风", "ending", { smell: -16, confidence: 14, science: 20 }, "treatment", "重度影响生活时，可了解肉毒素注射、微创汗腺处理等正规方式，但需由医生评估。"),
          choice("相信“神药广告”立刻下单", "ending", { smell: 10, confidence: -10, science: -12 }, "doctor", "夸大宣传不等于科学证据，健康问题应优先咨询正规渠道。", "bad"),
          choice("结合日常护理，并预约正规咨询", "ending", { smell: -12, confidence: 16, science: 18 }, "doctor", "日常护理与专业咨询并不冲突，严重影响生活时寻求帮助是积极选择。"),
        ],
      },
    },
  },

  mia: {
    id: "mia",
    title: "Mia 的一天",
    label: "公共空间与压力管理线",
    description: "在地铁、高温和社交压力中，学习如何面对体味焦虑与重度护理问题。",
    accent: "#63C46C",
    character: "Mia",
    startNode: "mia_start",
    initialStats: { smellValue: 75, confidenceValue: 45, scienceValue: 35 },
    nodes: {
      mia_start: {
        id: "mia_start",
        background: bedroom,
        speaker: "旁白",
        text: "Mia今天要通勤去参加活动。天气闷热，她最担心密闭空间里的体味压力。",
        characters: chars([{ name: "Mia", expression: "normal", position: "center", active: true }]),
        next: "mia_ch1",
      },
      mia_ch1: {
        id: "mia_ch1",
        background: classroom,
        speaker: "旁白",
        text: "赶地铁前，Mia需要做公共空间应对。",
        characters: chars([{ name: "Mia", expression: "normal", position: "center", active: true }]),
        choices: [
          choice("穿透气衣物，并提前使用止汗剂", "mia_ch1_good", { smell: -22, confidence: 12, science: 16 }, "breathable", "密闭空间里体味更容易被感知，提前保持干爽和透气能减少压力。"),
          choice("因为紧张一直缩在角落", "mia_ch1_bad", { smell: 4, confidence: -18, science: 0 }, "stress", "紧张会影响汗腺分泌，也会让自己更难从容应对。", "bad"),
          choice("在车厢里喷香水", "mia_ch1_bad", { smell: 12, confidence: -10, science: -8 }, "perfume", "密闭空间里喷香水可能影响他人，也不能解决体味来源。", "bad"),
        ],
      },
      mia_ch1_good: {
        id: "mia_ch1_good",
        background: classroom,
        speaker: "Mia",
        text: "提前准备好，我就不用一路担心了。",
        characters: chars([{ name: "Mia", expression: "cheerful", position: "center", active: true }]),
        next: "mia_ch2",
      },
      mia_ch1_bad: {
        id: "mia_ch1_bad",
        background: classroom,
        speaker: "旁白",
        text: "Mia感觉越来越紧张，身体也更热了。",
        characters: chars([{ name: "Mia", expression: "surprised", position: "center", active: true }]),
        next: "mia_ch2",
      },
      mia_ch2: {
        id: "mia_ch2",
        background: sportsGround,
        speaker: "旁白",
        text: "高温排队时，人群慢慢靠近，空气有些闷。",
        characters: chars([{ name: "Mia", expression: "normal", position: "center", active: true }]),
        choices: [
          choice("找通风位置并补水", "mia_ch2_good", { smell: -10, confidence: 10, science: 10 }, "stress", "高温和拥挤会增加出汗，通风、补水和放松能帮助身体保持稳定。"),
          choice("穿不透气外套强行遮掩", "mia_ch2_bad", { smell: 14, confidence: -8, science: -4 }, "breathable", "不透气外套会让汗液更难蒸发，反而可能让体味更明显。", "bad"),
          choice("用湿巾做简单清洁", "mia_ch2_good", { smell: -14, confidence: 12, science: 8 }, "sportClean", "临时清洁能减少汗液和皮肤残留，是高温场景下很实际的处理方式。"),
        ],
      },
      mia_ch2_good: {
        id: "mia_ch2_good",
        background: sportsGround,
        speaker: "Mia",
        text: "找到通风的位置后，身体和心情都轻松了一点。",
        characters: chars([{ name: "Mia", expression: "cheerful", position: "center", active: true }]),
        next: "mia_ch3",
      },
      mia_ch2_bad: {
        id: "mia_ch2_bad",
        background: sportsGround,
        speaker: "旁白",
        text: "外套让Mia更闷，她开始反复确认自己的气味。",
        characters: chars([{ name: "Mia", expression: "surprised", position: "center", active: true }]),
        next: "mia_ch3",
      },
      mia_ch3: {
        id: "mia_ch3",
        background: classroom,
        speaker: "Nick",
        text: "同伴见面时，Nick笑着打招呼：“你来啦！”",
        characters: chars([
          { name: "Mia", expression: "normal", position: "left", active: false },
          { name: "Nick", expression: "happy", position: "right", active: true },
        ]),
        choices: [
          choice("自然说明天气太热，先整理一下", "mia_ch3_good", { smell: -10, confidence: 16, science: 8 }, "stress", "温和说明需求能降低社交压力，也让自己更从容。"),
          choice("逃避见面，说自己突然有事", "mia_ch3_bad", { smell: 0, confidence: -20, science: 0 }, "stress", "体味焦虑不应该把人从生活里推开。先照顾自己，再继续社交也可以。", "bad"),
          choice("正常相处，并保持自信和舒适距离", "mia_ch3_good", { smell: -4, confidence: 18, science: 6 }, "doctor", "不因体味问题自我羞辱，是长期管理里很重要的一部分。"),
        ],
      },
      mia_ch3_good: {
        id: "mia_ch3_good",
        background: classroom,
        speaker: "Nick",
        text: "“当然可以，我们等你。”Mia发现同伴并没有责备她。",
        characters: chars([
          { name: "Mia", expression: "cheerful", position: "left", active: true },
          { name: "Nick", expression: "happy", position: "right", active: false },
        ]),
        next: "mia_ch4",
      },
      mia_ch3_bad: {
        id: "mia_ch3_bad",
        background: classroom,
        speaker: "旁白",
        text: "Mia暂时躲开了场景，但她也想找到更长期的办法。",
        characters: chars([{ name: "Mia", expression: "surprised", position: "center", active: true }]),
        next: "mia_ch4",
      },
      mia_ch4: {
        id: "mia_ch4",
        background: bedroom,
        speaker: "旁白",
        text: "晚上，Mia打开手账，写下明天的护理计划。",
        characters: chars([{ name: "Mia", expression: "normal", position: "center", active: true }]),
        choices: [
          choice("制定日常护理计划", "ending", { smell: -14, confidence: 12, science: 16 }, "bacteria", "稳定护理习惯能帮助减少反复焦虑，也让应对公共空间更有底气。"),
          choice("如果严重影响生活，预约正规医院咨询", "ending", { smell: -18, confidence: 16, science: 20 }, "treatment", "重度影响生活时，正规医学咨询可以帮助评估适合的处理方向。"),
          choice("完全放弃社交", "ending", { smell: 0, confidence: -24, science: -4 }, "stress", "体味问题不该变成自我隔离。科学护理和支持系统都能帮助继续生活。", "bad"),
        ],
      },
    },
  },
};

const legacyRouteList = Object.values(legacyRoutes);

export { routes, routeList } from "./routeDefinitions.js";
