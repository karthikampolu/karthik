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
    partA: ["u1-87","u1-26","u1-46","u1-29","u1-5","u2-59","u2-42","u2-51","u3-103","u3-20","u3-43","u3-58","u3-12","u3-56","u4-117","u4-39","u4-51","u4-75","u4-93","u4-7","u4-69","u5-68","u5-61","u5-62","u5-4","u6-83","u6-61","u6-42","u6-34","u6-32"],
    partB: ["ob-art-science","learning-ob-mod","mbo-goal-setting","vanessa-tom-case","structure-digital"],
  },
  {
    id: "paper-2",
    title: "Predicted Paper 2",
    partA: ["u1-88","u1-73","u1-60","u1-41","u1-81","u2-58","u2-44","u2-37","u3-101","u3-44","u3-6","u3-89","u3-96","u3-30","u4-115","u4-53","u4-31","u4-17","u4-48","u4-8","u4-11","u5-69","u5-67","u5-1","u5-3","u6-79","u6-45","u6-10","u6-13","u6-57"],
    partB: ["management-thought-ai","personality-ta-johari","leadership-theories","motivation-case","conflict-styles"],
  },
];
