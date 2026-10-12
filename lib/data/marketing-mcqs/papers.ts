import type { PredictedPaper } from "@/lib/exam-prep/types";

/**
 * Two full predicted papers. Part A ids were picked to follow the unit
 * blueprint (UNITS[].expected), about 40% easy / 40% medium / 20% hard,
 * with a scenario question in most units and no overlap between papers.
 */
export const PAPERS: PredictedPaper[] = [
  {
    id: "paper-1",
    title: "Predicted Paper 1",
    partA: ["u1-83","u1-40","u1-65","u1-76","u1-36","u2-75","u2-55","u2-17","u2-2","u3-106","u3-24","u3-54","u3-29","u3-67","u4-87","u4-21","u4-80","u4-31","u4-53","u5-141","u5-128","u5-82","u5-9","u5-120","u5-13","u5-78","u5-35","u5-73","u6-41","u6-20"],
    partB: ["npd","market-intelligence","digital-ai-stp","buying-decision-process","pricing"],
  },
  {
    id: "paper-2",
    title: "Predicted Paper 2",
    partA: ["u1-85","u1-74","u1-63","u1-13","u1-53","u2-77","u2-50","u2-60","u2-35","u3-107","u3-66","u3-9","u3-62","u3-31","u4-83","u4-22","u4-50","u4-33","u4-4","u5-132","u5-42","u5-77","u5-123","u5-31","u5-45","u5-61","u5-1","u5-81","u6-3","u6-38"],
    partB: ["plc-indian-brands","stp-positioning","consumer-behaviour-factors","sales-channel-criteria","launch-marketing-mix"],
  },
];
