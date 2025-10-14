import { LETTER_RANGES } from "@/types/locale";

export function colorFromString<T>(str: string, colorSet: T[]): T {
  if (colorSet.length === 0) {
    return "#000000" as T;
  }

  const code = str.split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
  const index = code % colorSet.length;
  return colorSet[index];
}

export function localeLengthKR(str: string): number {
  return str.split("").reduce((acc, char) => {
    const code = char.charCodeAt(0);
    if (
      code >= LETTER_RANGES.KOREAN.start &&
      code <= LETTER_RANGES.KOREAN.end
    ) {
      return acc + 2;
    }
    return acc + 1;
  }, 0);
}
