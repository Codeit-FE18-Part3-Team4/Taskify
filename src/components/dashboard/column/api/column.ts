import mockData from "../mock/column.json";

export async function getColumn(param: { dashboardId: number }) {
  return Promise.resolve(mockData);
}
