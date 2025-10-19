import { Column } from "@/types";
import columnsMock from "./column.json";

export async function getColumn(): Promise<Column[]> {
  return columnsMock.data;
}
