import { type Card } from "@/types/card";
import CardMock from "./card-mock.json";

export async function getCard(): Promise<Card> {
  return CardMock;
}
