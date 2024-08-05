import { MonitoringPort } from "@shared/application/monitoring-port";
import { sentryCaptureError } from "@test/mocks/handlers/sentry";

export const monitoringErrors: MonitoringPort = ({ error }) => {
  sentryCaptureError(error);
};
