export type MonitoringPort = <
  TError extends unknown,
  TData extends Record<string, unknown>,
>({
  error,
  message,
  data,
}: {
  error: TError;
  message?: string;
  data?: TData;
}) => void;

export interface Monitoring {
  monitoring: MonitoringPort;
}
