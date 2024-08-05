export const sentryCaptureError = <TError>(error: TError) => {
  console.error("sentry-error", error);
};
