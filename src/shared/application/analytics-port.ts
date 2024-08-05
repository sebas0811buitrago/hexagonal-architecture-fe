export type AnalyticsTrackPort = <TData extends Record<string, unknown>>({
  data,
  title,
}: {
  title: string;
  data?: TData;
}) => void;

export interface Analytics {
  trackEvent: AnalyticsTrackPort;
}
