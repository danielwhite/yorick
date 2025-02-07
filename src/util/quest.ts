import { get, propertyTypes } from "libram";

export enum Step {
  UNSTARTED = -1,
  STARTED = 0,
  FINISHED = 999,
}

function questValueToNumber(value: string | number) {
  if (typeof value === "number") return value;

  const match = value.match(/^step([0-9]+)$/);
  if (match) {
    return parseInt(match[1]);
  }
  switch (value) {
    case "finished":
      return Step.FINISHED;
    case "started":
      return Step.STARTED;
    case "unstarted":
    default:
      return Step.UNSTARTED;
  }
}

export function atStep<T>(current: number, steps: [number, T][]) {
  // Sort in descending order.
  const stepsSorted = [...steps].sort(([stepX], [stepY]) => -(stepX - stepY));
  for (const [step, value] of stepsSorted) {
    if (current >= step) return value;
  }
}

export function testQuest(
  property: propertyTypes.StringProperty,
  operator: "<" | "<=" | "=" | ">=" | ">",
  threshold: "unstarted" | "started" | "finished" | number,
): boolean {
  const value = get(property, "unstarted");
  const valueNumber = questValueToNumber(value);
  const thresholdNumber = questValueToNumber(threshold);
  switch (operator) {
    case "<":
      return valueNumber < thresholdNumber;
    case "<=":
      return valueNumber <= thresholdNumber;
    case "=":
      return valueNumber === thresholdNumber;
    case ">=":
      return valueNumber >= thresholdNumber;
    case ">":
      return valueNumber > thresholdNumber;
  }
}

/**
 * Returns true if you have started this quest.
 * @param property Quest property.
 */
export function questStarted(property: propertyTypes.StringProperty): boolean {
  return testQuest(property, ">=", "started");
}

/**
 * Returns true if you are at or past this step.
 * @param property Quest property.
 */
export function questPastStep(
  property: propertyTypes.StringProperty,
  step: number,
): boolean {
  return testQuest(property, ">=", step);
}

/**
 * Returns true if you have finished this quest.
 * @param property Quest property.
 */
export function questFinished(property: propertyTypes.StringProperty): boolean {
  return testQuest(property, ">=", "finished");
}

export function inRun(): boolean {
  return !get("kingLiberated");
}
