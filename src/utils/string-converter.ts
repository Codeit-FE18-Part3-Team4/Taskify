export function calculateString(str: string): number {
  return str.split("").reduce((acc, char, index) => {
    return acc + char.charCodeAt(0) * (index + 1);
  }, 0);
}

export function getColorIndex(str: string, arrayLength: number): number {
  return calculateString(str) % arrayLength;
}

export function getVisualLength(str: string): number {
  const KOREAN_LETTER_START = 0xac00;
  const KOREAN_LETTER_END = 0xd7af;

  return str.split("").reduce((acc, char) => {
    const code = char.charCodeAt(0);
    if (code >= KOREAN_LETTER_START && code <= KOREAN_LETTER_END) {
      return acc + 2;
    }
    return acc + 1;
  }, 0);
}
