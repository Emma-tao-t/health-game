export function getEnding(smellValue, confidenceValue, scienceValue, route) {
  const routeName = route?.character || "角色";

  if (smellValue <= 35 && confidenceValue >= 70 && scienceValue >= 70) {
    return {
      id: "good",
      title: "清爽自信的一天",
      label: "Good End",
      imageMood: "happy",
      text:
        `${routeName}学会了科学护理方法，也更坦然地面对自己的身体状态。体味问题并不可耻，正确认识和科学处理才是关键。`,
      summary: ["保持清洁", "使用科学止汗 / 除臭产品", "选择透气衣物", "运动后及时清洁", "严重影响生活时可以咨询正规医生"],
    };
  }

  if (smellValue <= 65 && confidenceValue >= 45 && scienceValue >= 45) {
    return {
      id: "normal",
      title: "有进步的一天",
      label: "Normal End",
      imageMood: "normal",
      text:
        `${routeName}有些地方做对了，也踩到了一些常见误区。体味管理不是一次完成的事情，而是日常护理习惯的积累。`,
      summary: ["香水不能替代清洁", "出汗后要及时处理", "保持干爽很重要", "科学护理比临时掩盖更有效"],
    };
  }

  return {
    id: "bad",
    title: "误区路线",
    label: "Try Again",
    imageMood: "worried",
    text:
      `${routeName}这一天有些慌乱，但这并不代表失败。体味问题可以通过科学方式改善，避开误区就是第一步。`,
    summary: ["不要依赖香水掩盖", "不要忽视出汗后的清洁", "不要过度焦虑或羞耻", "如果严重影响生活，应咨询正规医生"],
  };
}
