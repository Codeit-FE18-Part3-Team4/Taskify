import { useState, useCallback, useRef } from "react";
import axios, { AxiosError } from "axios";

interface UseMutationOptions<TData, TVariables> {
  onSuccess?: (data: TData) => void;
  onError?: (error: AxiosError | Error) => void;
  onSettled?: () => void;
}

export function useMutation<TData = unknown, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TVariables>,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const mutate = useCallback(
    async (variables: TVariables) => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        optionsRef.current?.onSuccess?.(result);
        return result;
      } catch (err) {
        const axiosError = axios.isAxiosError(err) ? err : (err as Error);
        setError(axiosError);
        optionsRef.current?.onError?.(axiosError);
        throw axiosError;
      } finally {
        setIsLoading(false);
        optionsRef.current?.onSettled?.();
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    mutate,
    isLoading,
    error,
    data,
    reset,
  };
}
