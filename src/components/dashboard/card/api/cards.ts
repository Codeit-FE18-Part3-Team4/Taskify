import axiosInstanceTest from "@/services/axios-instance";

export async function getCards({
  columnId,
  size,
}: {
  columnId: number;
  size?: number;
}) {
  try {
    const params = new URLSearchParams({
      columnId: columnId.toString(),
    });

    if (size) {
      params.append("size", size.toString());
    }

    const res = await axiosInstanceTest.get(`/cards?${params.toString()}`);
    return res.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
