export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface FetchCommentsResponse {
  comments: Comment[];
  cursorId: string | null;
}
