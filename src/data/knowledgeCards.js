export const knowledgeCategories = [
  { id: "mechanism", title: "发病机制", index: "01", tone: "yellow" },
  { id: "care", title: "科学护理", index: "02", tone: "green" },
  { id: "myths", title: "常见误区", index: "03", tone: "red" },
  { id: "advanced", title: "进阶知识", index: "04", tone: "blue" },
];

export const knowledgeCards = {
  "odor-not-sweat": { id: "odor-not-sweat", category: "mechanism", title: "气味不是汗本身发出来的", summary: "汗液本身通常没有明显气味，特殊异味主要来自皮肤细菌对分泌物的分解。", text: "腋臭的气味并不是汗液一流出来就有的。腋下汗腺分泌物本身通常没有明显气味，但当它被皮肤表面的细菌分解后，就会产生特殊异味。" },
  "apocrine-glands": { id: "apocrine-glands", category: "mechanism", title: "顶泌汗腺是关键来源", summary: "顶泌汗腺分泌物含有脂质、蛋白质等成分，更容易被细菌分解出气味。", text: "腋臭主要和腋下的顶泌汗腺有关。顶泌汗腺分泌物含有脂质、蛋白质等成分，更容易被细菌分解出气味。" },
  "bacteria-factory": { id: "bacteria-factory", category: "mechanism", title: "细菌是“气味加工厂”", summary: "温暖潮湿的腋下有利于细菌繁殖，保持清洁和干爽能减少气味形成。", text: "腋下温暖、潮湿，容易让细菌繁殖。细菌会分解汗液中的成分，产生带有气味的物质。" },
  "sweat-not-severity": { id: "sweat-not-severity", category: "mechanism", title: "出汗多不等于狐臭重", summary: "出汗量不是唯一标准，关键是分泌物是否被细菌分解出特殊气味。", text: "出汗量大不一定代表狐臭严重。关键不只是出了多少汗，而是汗液成分是否被细菌分解出了特殊气味。" },
  puberty: { id: "puberty", category: "mechanism", title: "青春期后更容易明显", summary: "青春期后汗腺逐渐活跃，分泌增加，体味也更容易被察觉。", text: "很多人的腋臭会在青春期后变明显，是因为这一阶段汗腺逐渐活跃，分泌增加，体味也更容易被察觉。" },
  antiperspirant: { id: "antiperspirant", category: "care", title: "止汗剂可以减少汗液分泌", summary: "止汗剂不是香水，它通过减少汗液排出，降低细菌分解产生异味的机会。", text: "止汗剂不是单纯盖住气味，而是减少汗液排出，从源头降低细菌分解产生异味的机会。" },
  deodorant: { id: "deodorant", category: "care", title: "除臭剂可以帮助抑制细菌", summary: "除臭剂主要通过抑制腋下细菌减少气味形成，不只是用香味遮盖。", text: "除臭剂主要通过抑制腋下细菌，减少气味形成。它和香水不同，不只是用香味遮盖异味。" },
  "gentle-cleaning": { id: "gentle-cleaning", category: "care", title: "适度清洁比过度清洁更重要", summary: "温和清洁能减少残留，反复强力搓洗却可能破坏皮肤屏障。", text: "温和清洁可以减少汗液和细菌残留，但反复用强力清洁产品搓洗，可能破坏皮肤屏障。" },
  "breathable-clothes": { id: "breathable-clothes", category: "care", title: "透气衣物能减少闷热环境", summary: "透气、吸汗的衣物能帮助腋下保持干爽，减少汗液被闷在皮肤和衣物上。", text: "纯棉、透气、吸汗的衣物可以帮助腋下保持干爽。紧身、不透气的衣物容易闷住汗液。" },
  "post-workout-care": { id: "post-workout-care", category: "care", title: "运动后及时清洁和换衣", summary: "运动后及时清洁并换上干爽衣物，比临时喷香水更有效。", text: "运动后汗液增加，腋下更容易潮湿。及时清洁、换上干爽透气的衣物，比临时喷香水更有效。" },
  "seek-doctor": { id: "seek-doctor", category: "care", title: "严重影响生活时可以求助医生", summary: "当体味影响学习、工作、社交或情绪时，可以咨询正规医生。", text: "如果体味已经明显影响学习、工作、社交或情绪，可以咨询正规医生，了解适合自己的处理方式。" },
  "perfume-not-cure": { id: "perfume-not-cure", category: "myths", title: "香水不能根治狐臭", summary: "香水只能暂时遮盖气味，不能减少汗液，也不能抑制产味细菌。", text: "香水只能暂时掩盖气味，不能减少汗液，也不能抑制产生异味的细菌。" },
  "fabric-spray": { id: "fabric-spray", category: "myths", title: "衣物清新喷雾不能解决源头", summary: "衣物喷雾只作用在衣服表面，不能处理腋下汗液和细菌问题。", text: "衣物喷雾只能作用在衣服表面，不能处理腋下汗液和细菌问题。" },
  "folk-remedy": { id: "folk-remedy", category: "myths", title: "生姜、大蒜偏方不可靠", summary: "生姜、大蒜没有可靠改善证据，还可能刺激腋下皮肤。", text: "生姜、大蒜等偏方没有可靠证据能改善狐臭，还可能刺激腋下皮肤。" },
  "alcohol-risk": { id: "alcohol-risk", category: "myths", title: "高浓度酒精不适合长期使用", summary: "高浓度酒精会刺激腋下皮肤、破坏屏障，不适合作为长期除臭方法。", text: "高浓度酒精会刺激腋下皮肤，破坏皮肤屏障，不适合作为长期除臭方法。" },
  "harsh-soap": { id: "harsh-soap", category: "myths", title: "强力皂反复清洗可能适得其反", summary: "强力磨砂或去油产品可能破坏皮肤屏障和菌群平衡。", text: "强力磨砂皂、去油皂可能破坏皮肤屏障和菌群平衡，让皮肤更敏感。" },
  "miracle-cure": { id: "miracle-cure", category: "myths", title: "“一次根治”的广告要警惕", summary: "体味受汗腺、细菌、环境和遗传等因素影响，没有适合所有人的神奇方法。", text: "体味问题和汗腺、细菌、环境、遗传等因素有关，不存在适合所有人的神奇方法。" },
  abcc11: { id: "abcc11", category: "advanced", title: "ABCC11 基因与腋臭有关", summary: "体味差异可能与遗传有关，不应被简单理解成“不爱干净”。", text: "ABCC11 基因与腋臭表现和耳垢类型存在相关性。体味差异可能和遗传有关，不应被简单理解成“不爱干净”。" },
  "wet-earwax": { id: "wet-earwax", category: "advanced", title: "湿耳朵和腋臭可能有关", summary: "部分腋臭人群同时伴有湿性耵聍，也就是俗称的“油耳”。", text: "部分腋臭人群同时伴有湿性耵聍，也就是俗称的“油耳”。" },
  "severity-levels": { id: "severity-levels", category: "advanced", title: "腋臭有轻重程度差异", summary: "轻度常在大量出汗后明显，中重度可能进一步影响社交、情绪与生活质量。", text: "轻度腋臭通常只在大量出汗后明显；中度可能影响近距离社交；重度可能影响心理状态和生活质量。" },
  "hyperhidrosis-different": { id: "hyperhidrosis-different", category: "advanced", title: "多汗和腋臭不是同一件事", summary: "多汗关注出汗量，腋臭关注分泌物被细菌分解后形成的特殊气味。", text: "多汗主要是出汗量多，而腋臭的核心是汗腺分泌物被细菌分解后产生特殊气味。" },
  "stress-body-odor": { id: "stress-body-odor", category: "advanced", title: "情绪压力会影响体味", summary: "紧张焦虑可能增加出汗，让腋下更潮湿，也会放大对体味的担忧。", text: "紧张、焦虑时，身体可能分泌更多汗液，让腋下更潮湿，体味也可能在短时间内变明显。" },
  "clinical-assessment": { id: "clinical-assessment", category: "advanced", title: "临床判断不只看有没有味道", summary: "医生会综合气味、出汗、皮肤状态和对生活的影响进行判断。", text: "医生判断腋臭时，会综合气味程度、出汗情况、是否影响学习工作和社交、皮肤状态，以及过去使用过哪些处理方法。" },
  "self-acceptance": { id: "self-acceptance", category: "advanced", title: "科学护理也包括自我接纳", summary: "体味管理也包括减少羞耻感、理解身体，并在需要时主动求助。", text: "体味管理不只是让身体更清爽，也包括减少羞耻感。了解身体、科学护理、必要时求助，才是更健康的处理方式。" },
};

export const knowledgeList = Object.values(knowledgeCards);

export function getKnowledgeByCategory(categoryId) {
  return knowledgeList.filter((card) => card.category === categoryId);
}
