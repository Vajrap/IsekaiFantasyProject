export function getLast<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

export function shuffle(cards: any[]) {
  return cards.sort(() => Math.random() - 0.5);
}
