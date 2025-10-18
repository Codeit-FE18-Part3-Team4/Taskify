import { isAxiosError } from "axios";

export async function withThrowingAxiosError<T>(
  callback: () => Promise<T>
): Promise<T> {
  try {
    return await callback();
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw error;
  }
}
