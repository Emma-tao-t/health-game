const routeCopy = {
  nick: {
    good: { title: "科学护理计划已建立", text: "你帮助 Nick 建立了基础护理习惯。今天的选择说明，体味管理不需要夸张手段，清洁、干爽、透气衣物和科学产品已经能解决很多日常问题。" },
    normal: { title: "护理方法正在成形", text: "Nick 已经掌握了一部分有效方法，但仍有临时遮盖或忽视护理的时刻。把正确选择变成稳定习惯，会比偶尔补救更可靠。" },
    bad: { title: "遮盖没有解决源头", text: "Nick 今天仍被香水、忍耐或临时处理牵着走。重新理解汗液、细菌和护理工具的作用，就能找到更稳定的办法。" },
  },
  emma: {
    good: { title: "健康信息辨别者", text: "你帮助 Emma 避开了网络偏方和夸张广告。健康信息不是看到就相信，而是需要判断来源、证据、机制和风险。" },
    normal: { title: "怀疑意识已经启动", text: "Emma 开始意识到“亲测有效”和“包治根治”并不等于可靠证据。下一步，是把查证来源变成每次健康决策的习惯。" },
    bad: { title: "被信息浪潮带偏", text: "Emma 今天多次被偏方和广告推动。好消息是，信息判断可以练习：先暂停，再查来源、机制、证据和风险。" },
  },
  mia: {
    good: { title: "从容不是假装没事", text: "你帮助 Mia 在公共空间中更从容地面对自己。体味管理不只是身体护理，也包括情绪支持、自我接纳和必要时主动求助。" },
    normal: { title: "给自己多一点空间", text: "Mia 已经尝试稳定情绪和表达需求，但焦虑仍会把她拉回回避或遮盖。护理身体与照顾情绪可以同时进行。" },
    bad: { title: "别让羞耻缩小生活", text: "Mia 今天被体味焦虑推向了回避和自我否定。体味不是道德问题，也不等于“不爱干净”；她值得获得科学护理和支持。" },
  },
};

export function getEnding(smellValue, confidenceValue, scienceValue, route) {
  const routeId = route?.id || "nick";
  const isGood =
    routeId === "nick"
      ? smellValue <= 45 && scienceValue >= 68
      : routeId === "emma"
        ? scienceValue >= 72 && confidenceValue >= 55
        : confidenceValue >= 68 && scienceValue >= 58;
  const isNormal =
    routeId === "nick"
      ? smellValue <= 70 && scienceValue >= 48
      : routeId === "emma"
        ? scienceValue >= 50 && confidenceValue >= 40
        : confidenceValue >= 45 && scienceValue >= 45;
  const id = isGood ? "good" : isNormal ? "normal" : "bad";

  return {
    id,
    label: id === "good" ? "Good End" : id === "normal" ? "Normal End" : "Try Again",
    imageMood: id === "good" ? "happy" : id === "normal" ? "normal" : "worried",
    ...routeCopy[routeId][id],
  };
}
