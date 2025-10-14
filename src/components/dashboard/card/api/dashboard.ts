import mockData from "../mock/card.json";

export async function getCards() {
  return Promise.resolve(mockData);
}
