import { Column } from "@/types";
import columnsMock from "./column.json";

export async function getColumn({
  dashboardId,
}: {
  dashboardId: number;
}): Promise<Column[]> {
  return columnsMock.data;
}
