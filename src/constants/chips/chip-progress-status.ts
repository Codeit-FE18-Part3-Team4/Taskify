export const PROGRESS_STATUS = {
  TODO: "To Do",
  ON_PROGRESS: "On Progress",
  DONE: "Done",
} as const;

export type StatusType = (typeof PROGRESS_STATUS)[keyof typeof PROGRESS_STATUS];
