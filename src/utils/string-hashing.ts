import { LETTER_RANGES } from "@/types/locale";

export function colorFromString(str: string, arrayLength: number): number {
  return (
    str.split("").reduce((acc, char, index) => {
      return acc + char.charCodeAt(0) * (index + 1);
    }, 0) % arrayLength
  );
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
