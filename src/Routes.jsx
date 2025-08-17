import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MainAircraftTrackingDashboard from './pages/main-aircraft-tracking-dashboard';
import SearchFilterInterface from './pages/search-filter-interface';
import UserSettingsPreferences from './pages/user-settings-preferences';
import AircraftDetailModal from './pages/aircraft-detail-modal';
import FlightHistoryPlayback from './pages/flight-history-playback';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AircraftDetailModal />} />
        <Route path="/main-aircraft-tracking-dashboard" element={<MainAircraftTrackingDashboard />} />
        <Route path="/search-filter-interface" element={<SearchFilterInterface />} />
        <Route path="/user-settings-preferences" element={<UserSettingsPreferences />} />
        <Route path="/aircraft-detail-modal" element={<AircraftDetailModal />} />
        <Route path="/flight-history-playback" element={<FlightHistoryPlayback />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
