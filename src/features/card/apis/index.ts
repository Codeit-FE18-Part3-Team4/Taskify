import axiosInstance from "@/services/axios-instance";
import { withThrowingAxiosError } from "@/services/with-throwing-axios-error";
import { Card } from "@/types/card";

export interface CardParams {
  columnId?: number;
  assigneeUserId?: number;
  title: string;
  description: string;
  // dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface CreateCardParams extends CardParams {
  dashboardId: number;
}

/**
 * 임시 더미 날짜 생성 함수
 * YYYY-MM-DD HH:mm 형식의 문자열 사용
 * Card 생성/수정 시 due date를 입력하는 input을 개발하면 삭제해야 함
 */
const dummyDate = () => {
  const numberWithZeroPadding = (num: number) => String(num).padStart(2, "0");

  const date = new Date();
  const year = date.getFullYear();
  const month = numberWithZeroPadding(date.getMonth() + 1);
  const day = numberWithZeroPadding(date.getDate());
  const hours = numberWithZeroPadding(date.getHours());
  const minutes = numberWithZeroPadding(date.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export async function getCard({ cardId }: { cardId: number }) {
  return withThrowingAxiosError<Card>(async () => {
    const response = await axiosInstance.get<Card>(`/cards/${cardId}`);
    return response.data;
  });
}

export async function createCard({ params }: { params: CreateCardParams }) {
  return withThrowingAxiosError<Card>(async () => {
    const response = await axiosInstance.post<Card>(`/cards`, {
      ...params,
      dueDate: dummyDate(),
    });
    return response.data;
  });
}

export async function updateCard({
  cardId,
  params,
}: {
  cardId: number;
  params: CardParams;
}) {
  return withThrowingAxiosError<Card>(async () => {
    const response = await axiosInstance.put<Card>(`/cards/${cardId}`, {
      ...params,
      dueDate: dummyDate(),
    });
    return response.data;
  });
}

export async function deleteCard({ cardId }: { cardId: number }) {
  return withThrowingAxiosError<void>(async () => {
    const response = await axiosInstance.delete(`/cards/${cardId}`);
    return response.data;
  });
}
