export function truncateText(text: string, maxLength: number): string {
  let result = '';
  let count = 0;

  for (const char of text) {
    if (char !== ' ') {
      count += 1;
    }

    result += char;

    if (count >= maxLength) {
      return result.trimEnd() + '..';
    }
  }

  return result;
}
