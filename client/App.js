import { useEffect } from 'react';

import Navigation from './navigation/Navigation';
import ReportService from './services/ReportService';
import NotificationService from './services/NotificationService';

export default function App() {

  // once per 24hours the notifications get "cleared" -> set to non-active
  useEffect (() => {
    async function updateNotifications() {
      const reports = await ReportService.fetchActiveReports();
      reports.forEach(async (report) => {
        ReportService.updateActiveReportToNonActive(report.id);
        NotificationService.clearReportHistory();
      });
    }
    const interval = setInterval(() => {
      updateNotifications();
    }, 86400000); // 86400000 = 24 hours in milliseconds
    return () => clearInterval(interval);
  })

  return (
    <Navigation />
  );
}