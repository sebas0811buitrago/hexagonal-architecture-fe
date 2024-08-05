import { AnalyticsTrackPort } from "@shared/application/analytics-port";
import { mixpanel } from "@test/mocks/handlers/mixpanel";

export const trackingEvent: AnalyticsTrackPort = ({ title, data }) => {
  mixpanel(title, data);
};
