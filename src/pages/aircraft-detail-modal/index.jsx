import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LiveDataTab from './components/LiveDataTab';
import FlightInfoTab from './components/FlightInfoTab';
import HistoryTab from './components/HistoryTab';
import MiniMap from './components/MiniMap';
import AltitudeSpeedChart from './components/AltitudeSpeedChart';
import ActionButtons from './components/ActionButtons';

const AircraftDetailModal = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('live');
  const [isVisible, setIsVisible] = useState(true);

  // Mock aircraft data
  const aircraft = {
    callsign: "BGA4522",
    flightNumber: "BGA4522",
    registration: "F-GSTB",
    icao24: "39AC45",
    origin: "TLS",
    destination: "HAM",
    altitude: 25000,
    speed: 520,
    heading: 45,
    verticalSpeed: 150,
    position: {
      lat: 49.2827,
      lng: 8.9451
    },
    status: "En Route",
    squawk: "2000"
  };

  const tabs = [
    {
      id: 'live',
      label: 'Live Data',
      icon: 'Activity',
      component: LiveDataTab
    },
    {
      id: 'info',
      label: 'Flight Info',
      icon: 'Info',
      component: FlightInfoTab
    },
    {
      id: 'history',
      label: 'History',
      icon: 'History',
      component: HistoryTab
    }
  ];

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('/main-aircraft-tracking-dashboard');
      }
    }, 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'en route':
        return 'text-accent bg-accent/20';
      case 'landed':
        return 'text-success bg-success/20';
      case 'departed':
        return 'text-warning bg-warning/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            initial={{ 
              opacity: 0, 
              y: window.innerWidth < 640 ? '100%' : 20,
              scale: window.innerWidth < 640 ? 1 : 0.95
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0, 
              y: window.innerWidth < 640 ? '100%' : 20,
              scale: window.innerWidth < 640 ? 1 : 0.95
            }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[85vh] bg-background border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Plane" size={24} className="text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-xl font-semibold text-foreground">{aircraft.callsign}</h1>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(aircraft.status)}`}>
                        {aircraft.status}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{aircraft.registration}</span>
                      <span>•</span>
                      <span>{aircraft.origin} → {aircraft.destination}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  iconName="X"
                  iconSize={20}
                  className="shrink-0"
                />
              </div>

              {/* Tab Navigation */}
              <div className="flex items-center space-x-1 mt-4 bg-muted/30 rounded-lg p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    <Icon name={tab.icon} size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] sm:max-h-[calc(85vh-140px)]">
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                      >
                        {ActiveTabComponent && <ActiveTabComponent aircraft={aircraft} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Mini Map */}
                    <MiniMap aircraft={aircraft} />

                    {/* Altitude & Speed Chart */}
                    {activeTab === 'live' && (
                      <AltitudeSpeedChart aircraft={aircraft} />
                    )}

                    {/* Action Buttons */}
                    <ActionButtons aircraft={aircraft} onClose={handleClose} />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Handle */}
            <div className="sm:hidden absolute top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-1 bg-muted-foreground/30 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AircraftDetailModal;