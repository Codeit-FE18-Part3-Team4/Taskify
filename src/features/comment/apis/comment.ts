import { type Comment } from "@/types/comment";
import CommentsMock from "./comments-mock.json";

export async function getComments(): Promise<Comment[]> {
  const comments = CommentsMock.comments;
  return comments;
}
