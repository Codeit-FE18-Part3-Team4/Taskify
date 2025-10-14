import mockData from "../mock/card.json";

export async function getCards(param: { columnId: number }) {
  return Promise.resolve(mockData);
}
