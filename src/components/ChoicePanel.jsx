import React from "react";
import { assetPath } from "../utils/assetPath.js";

const toolChoices = [
  { keywords: ["止汗剂", "止汗产品"], label: "止汗剂", image: "/assets/tools-cutout/止汗剂-fit.png" },
  { keywords: ["香水"], label: "香水", image: "/assets/tools-cutout/香水-fit.png" },
  { keywords: ["透气衣", "透气衣物", "衣服", "衣物"], label: "透气衣物", image: "/assets/tools-cutout/纯棉透气衣物-fit.png" },
  { keywords: ["清洁", "洗澡", "湿巾"], label: "清洁护理", image: "/assets/tools-cutout/抑制型沐浴露-fit.png" },
  { keywords: ["医学", "医院", "医生", "治疗", "咨询"], label: "医学咨询", image: "/assets/tools-cutout/正规医学治疗-fit.png" },
  { keywords: ["酒精"], label: "酒精喷雾", image: "/assets/tools-cutout/高浓度酒精喷雾-fit.png" },
  { keywords: ["生姜", "大蒜", "偏方"], label: "偏方", image: "/assets/tools-cutout/生姜大蒜-fit.png" },
  { keywords: ["神药", "广告"], label: "神药广告", image: "/assets/tools-cutout/魔法除臭小精灵-fit.png" },
  { keywords: ["饮食"], label: "清淡饮食", image: "/assets/tools-cutout/清淡饮食-fit.png" },
];

function getToolChoice(text) {
  return toolChoices.find((tool) => tool.keywords.some((keyword) => text.includes(keyword)));
}

function shortText(text, tool) {
  if (text.includes("过度紧张") || text.includes("回避交流")) return "回避交流";
  if (text.includes("立刻逃开") || text.includes("逃避见面")) return "暂时离开";
  if (text.includes("完全放弃社交")) return "放弃社交";
  if (text.includes("自然回应")) return "先整理一下";
  if (text.includes("坦然说")) return "坦然整理";
  if (text.includes("玩笑带过")) return "轻松说明 + 整理";
  if (text.includes("查询正规科普")) return "查证科普";
  if (text.includes("因为紧张")) return "紧张躲开";
  if (text.includes("找通风位置")) return "通风 + 补水";
  if (text.includes("正常相处")) return "自信相处";
  if (!tool) return text;
  if (text.includes("洗澡") && text.includes("止汗剂")) return "清洁 + 止汗剂";
  if (text.includes("透气") && text.includes("湿巾")) return "透气衣物 + 湿巾";
  if (text.includes("穿透气衣物") && text.includes("止汗剂")) return "透气衣物 + 止汗剂";
  if (text.includes("备用衣物") && text.includes("湿巾")) return "备用衣物 + 湿巾";
  if (text.includes("清洁") && text.includes("换")) return "清洁 + 换衣物";
  if (text.includes("止汗") && text.includes("通风")) return "补用止汗 + 通风";
  if (text.includes("高浓度酒精")) return "酒精反复消毒";
  if (text.includes("生姜") || text.includes("大蒜")) return "生姜 / 大蒜偏方";
  if (text.includes("香水")) return "喷香水遮盖";
  if (text.includes("了解正规医学治疗方式")) return "了解医学治疗";
  if (text.includes("医学治疗") || text.includes("正规医学")) return "正规医学治疗";
  if (text.includes("日常护理") && text.includes("咨询")) return "护理 + 医学咨询";
  if (text.includes("预约正规咨询")) return "预约正规咨询";
  if (text.includes("医学") || text.includes("医院") || text.includes("医生") || text.includes("咨询")) return "医学咨询";
  return tool.label;
}

export default function ChoicePanel({ choices, onChoose }) {
  if (!choices?.length) return null;
  const enrichedChoices = choices.map((choice) => ({ ...choice, tool: getToolChoice(choice.text) }));
  const hasToolChoices = enrichedChoices.some((choice) => choice.tool);

  return (
    <div className={`vn-choice-panel ${hasToolChoices ? "vn-choice-panel-tools" : ""}`}>
      {enrichedChoices.map((choice, index) => (
        <button
          key={choice.text}
          type="button"
          className={`vn-choice ${hasToolChoices ? "vn-choice-tool" : ""} ${hasToolChoices && !choice.tool ? "vn-choice-text-only" : ""}`}
          style={{ animationDelay: `${index * 70}ms` }}
          onClick={() => onChoose(choice)}
        >
          <span className="vn-choice-letter">{String.fromCharCode(65 + index)}</span>
          {choice.tool ? (
            <>
              <img
                className="vn-choice-icon"
                src={assetPath(choice.tool.image)}
                alt=""
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <strong>{shortText(choice.text, choice.tool)}</strong>
            </>
          ) : (
            <>
              <strong>{shortText(choice.text, choice.tool)}</strong>
            </>
          )}
        </button>
      ))}
    </div>
  );
}
