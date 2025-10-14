import axios from "axios";

export function getApiErrorMessage(
  error: unknown,
  fallback = "요청에 실패했습니다."
) {
  if (axios.isAxiosError(error)) {
    const errorMessage = (
      error.response?.data as { message?: string } | undefined
    )?.message;
    if (typeof errorMessage === "string" && errorMessage.trim().length > 0)
      return errorMessage;
  }
  return fallback;
}
