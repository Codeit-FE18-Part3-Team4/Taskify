import { type Card } from "@/types/card";
import cardMock from "./card-mock.json";

export async function getCard(): Promise<Card> {
  return cardMock;
}
