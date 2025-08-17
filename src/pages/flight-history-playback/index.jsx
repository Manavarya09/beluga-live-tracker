import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import TimelineControl from './components/TimelineControl';
import PlaybackControlPanel from './components/PlaybackControlPanel';
import HistoricalMap from './components/HistoricalMap';
import FlightSearchOverlay from './components/FlightSearchOverlay';
import FlightStatistics from './components/FlightStatistics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FlightHistoryPlayback = () => {
  const [selectedDate, setSelectedDate] = useState('2025-08-17');
  const [selectedAircraft, setSelectedAircraft] = useState('all');
  const [currentTime, setCurrentTime] = useState(28800); // 08:00 UTC in seconds
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Navigation handler
  const handleNavigation = (path) => {
    // In a real app, this would use React Router
    console.log('Navigate to:', path);
  };

  // Playback control handlers
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
  };

  const handleTimeChange = (time) => {
    setCurrentTime(time);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentTime(28800); // Reset to 08:00
    setIsPlaying(false);
  };

  const handleAircraftFilter = (aircraftId) => {
    setSelectedAircraft(aircraftId);
  };

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight);
    // Set time to flight start time
    if (flight?.path && flight?.path?.length > 0) {
      setCurrentTime(flight?.path?.[0]?.time);
    }
  };

  const handleExportData = () => {
    // Mock export functionality
    const exportData = {
      date: selectedDate,
      aircraft: selectedAircraft,
      timeRange: `${Math.floor(currentTime / 3600)}:${Math.floor((currentTime % 3600) / 60)?.toString()?.padStart(2, '0')}`,
      flights: selectedFlight ? [selectedFlight] : 'all'
    };
    
    console.log('Exporting flight data:', exportData);
    
    // Create and download mock CSV
    const csvContent = `data:text/csv;charset=utf-8,Date,Flight,Aircraft,Route,Departure,Arrival\n${selectedDate},BGA001,F-GSTA,TLS-HAM,08:00,10:40`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link?.setAttribute('href', encodedUri);
    link?.setAttribute('download', `beluga-flights-${selectedDate}.csv`);
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + (playbackSpeed * 60); // Advance by speed * 1 minute
          if (newTime >= 86400) { // 24 hours
            setIsPlaying(false);
            return 86400;
          }
          return newTime;
        });
      }, 1000); // Update every second
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch (e?.key) {
        case ' ':
          e?.preventDefault();
          handlePlayPause();
          break;
        case 'Escape':
          setIsSearchOpen(false);
          break;
        case 'f':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            setIsSearchOpen(true);
          }
          break;
        case 'ArrowLeft':
          setCurrentTime(prev => Math.max(0, prev - 300)); // -5 minutes
          break;
        case 'ArrowRight':
          setCurrentTime(prev => Math.min(86400, prev + 300)); // +5 minutes
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Mock flight count for current filters
  const getFlightCount = () => {
    if (selectedAircraft === 'all') return 12;
    return Math.floor(Math.random() * 5) + 1;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onNavigate={handleNavigation}
        currentView="flight-history-playback"
        connectionStatus={connectionStatus}
      />
      {/* Timeline Control */}
      <div className="pt-16">
        <TimelineControl
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          playbackSpeed={playbackSpeed}
          onSpeedChange={handleSpeedChange}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          currentTime={currentTime}
          onTimeChange={handleTimeChange}
        />
      </div>
      {/* Main Content */}
      <div className="relative">
        {/* Map Container */}
        <div className="h-[calc(100vh-140px)] lg:h-[calc(100vh-120px)]">
          <HistoricalMap
            selectedDate={selectedDate}
            selectedAircraft={selectedAircraft}
            currentTime={currentTime}
            isPlaying={isPlaying}
            playbackSpeed={playbackSpeed}
            onFlightSelect={handleFlightSelect}
          />
        </div>

        {/* Search Button - Mobile */}
        <div className="lg:hidden fixed top-20 right-4 z-30">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            iconName="Search"
            iconSize={20}
            className="shadow-lg"
          />
        </div>

        {/* Search Button - Desktop */}
        <div className="hidden lg:block fixed top-20 left-4 z-30">
          <Button
            variant="secondary"
            onClick={() => setIsSearchOpen(true)}
            iconName="Search"
            iconPosition="left"
            iconSize={16}
            className="shadow-lg"
          >
            Search Flights
          </Button>
        </div>

        {/* Control Panels */}
        <PlaybackControlPanel
          selectedAircraft={selectedAircraft}
          onAircraftFilter={handleAircraftFilter}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
          playbackSpeed={playbackSpeed}
          onSpeedChange={handleSpeedChange}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onExportData={handleExportData}
          flightCount={getFlightCount()}
        />

        <FlightStatistics
          selectedDate={selectedDate}
          selectedAircraft={selectedAircraft}
          flightData={selectedFlight}
        />

        {/* Search Overlay */}
        <FlightSearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onFlightSelect={handleFlightSelect}
        />

        {/* Loading State */}
        {connectionStatus === 'reconnecting' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-warning/90 backdrop-blur-sm text-warning-foreground px-4 py-2 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Loader2" size={16} className="animate-spin" />
              <span className="text-sm font-medium">Loading historical data...</span>
            </div>
          </motion.div>
        )}

        {/* Keyboard Shortcuts Help */}
        <div className="hidden lg:block fixed bottom-4 left-4 z-20 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <div className="text-xs text-muted-foreground space-y-1">
            <div>Space: Play/Pause</div>
            <div>Ctrl+F: Search</div>
            <div>←/→: Skip 5min</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightHistoryPlayback;