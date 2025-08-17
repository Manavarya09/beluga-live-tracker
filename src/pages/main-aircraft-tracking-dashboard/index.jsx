import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AircraftListPanel from './components/AircraftListPanel';
import MapControls from './components/MapControls';
import AircraftPopup from './components/AircraftPopup';
import FilterChips from './components/FilterChips';
import ConnectionStatus from './components/ConnectionStatus';
import InteractiveMap from './components/InteractiveMap';

const MainAircraftTrackingDashboard = () => {
  const navigate = useNavigate();
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [isListPanelOpen, setIsListPanelOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [mapLayer, setMapLayer] = useState('satellite');
  const [isFollowingAircraft, setIsFollowingAircraft] = useState(false);
  const [showAircraftPopup, setShowAircraftPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    altitudeRange: 'all'
  });

  // Mock aircraft data - Expanded global Beluga fleet
  const [aircraftData] = useState([
    // European Operations
    {
      id: 'BGA001',
      flightNumber: 'BGA001',
      registration: 'F-GSTC',
      origin: 'TLS',
      destination: 'HAM',
      latitude: 43.6293,
      longitude: 1.3638,
      altitude: 35000,
      speed: 485,
      heading: 45,
      status: 'In Flight',
      lastUpdate: '2 min ago',
      route: 'TOULOUSE → HAMBURG',
      estimatedArrival: '14:30 UTC',
      region: 'Europe',
      trail: [
        { x: 100, y: 120 },
        { x: 110, y: 115 },
        { x: 120, y: 110 }
      ]
    },
    {
      id: 'BGA002',
      flightNumber: 'BGA002',
      registration: 'F-GSTD',
      origin: 'HAM',
      destination: 'TLS',
      latitude: 53.6305,
      longitude: 9.9883,
      altitude: 0,
      speed: 0,
      heading: 180,
      status: 'Landed',
      lastUpdate: '15 min ago',
      route: 'HAMBURG → TOULOUSE',
      estimatedArrival: 'Arrived',
      region: 'Europe'
    },
    {
      id: 'BGA003',
      flightNumber: 'BGA003',
      registration: 'F-GSTE',
      origin: 'MAD',
      destination: 'TLS',
      latitude: 40.4839,
      longitude: -3.3681,
      altitude: 28000,
      speed: 465,
      heading: 75,
      status: 'In Flight',
      lastUpdate: '1 min ago',
      route: 'MADRID → TOULOUSE',
      estimatedArrival: '16:45 UTC',
      region: 'Europe'
    },
    {
      id: 'BGA004',
      flightNumber: 'BGA004',
      registration: 'F-GSTF',
      origin: 'TLS',
      destination: 'BRE',
      latitude: 43.6293,
      longitude: 1.3638,
      altitude: 15000,
      speed: 420,
      heading: 15,
      status: 'Delayed',
      lastUpdate: '5 min ago',
      route: 'TOULOUSE → BREMEN',
      estimatedArrival: '17:15 UTC (Delayed)',
      region: 'Europe'
    },
    {
      id: 'BGA005',
      flightNumber: 'BGA005',
      registration: 'F-GSTG',
      origin: 'BRE',
      destination: 'TLS',
      latitude: 53.0475,
      longitude: 8.7867,
      altitude: 0,
      speed: 0,
      heading: 0,
      status: 'Maintenance',
      lastUpdate: '2 hours ago',
      route: 'BREMEN → TOULOUSE',
      estimatedArrival: 'Maintenance',
      region: 'Europe'
    },
    // North American Operations
    {
      id: 'BGA006',
      flightNumber: 'BGA006',
      registration: 'F-GSTH',
      origin: 'YMX',
      destination: 'MSY',
      latitude: 45.6795,
      longitude: -73.7570,
      altitude: 33000,
      speed: 495,
      heading: 210,
      status: 'In Flight',
      lastUpdate: '3 min ago',
      route: 'MONTREAL → NEW ORLEANS',
      estimatedArrival: '18:25 UTC',
      region: 'North America'
    },
    {
      id: 'BGA007',
      flightNumber: 'BGA007',
      registration: 'F-GSTI',
      origin: 'MSY',
      destination: 'TLS',
      latitude: 29.9934,
      longitude: -90.2581,
      altitude: 0,
      speed: 0,
      heading: 90,
      status: 'Loading',
      lastUpdate: '45 min ago',
      route: 'NEW ORLEANS → TOULOUSE',
      estimatedArrival: '08:30+1 UTC',
      region: 'North America'
    },
    {
      id: 'BGA008',
      flightNumber: 'BGA008',
      registration: 'F-GSTJ',
      origin: 'SEA',
      destination: 'YMX',
      latitude: 47.4502,
      longitude: -122.3088,
      altitude: 39000,
      speed: 505,
      heading: 75,
      status: 'In Flight',
      lastUpdate: '1 min ago',
      route: 'SEATTLE → MONTREAL',
      estimatedArrival: '22:15 UTC',
      region: 'North America'
    },
    // Asian Operations
    {
      id: 'BGA009',
      flightNumber: 'BGA009',
      registration: 'F-GSTK',
      origin: 'TSN',
      destination: 'TLS',
      latitude: 39.1244,
      longitude: 117.3464,
      altitude: 41000,
      speed: 520,
      heading: 285,
      status: 'In Flight',
      lastUpdate: '30 sec ago',
      route: 'TIANJIN → TOULOUSE',
      estimatedArrival: '15:45 UTC',
      region: 'Asia'
    },
    {
      id: 'BGA010',
      flightNumber: 'BGA010',
      registration: 'F-GSTL',
      origin: 'TLS',
      destination: 'TSN',
      latitude: 55.3781,
      longitude: 49.2072,
      altitude: 37000,
      speed: 515,
      heading: 65,
      status: 'In Flight',
      lastUpdate: '45 sec ago',
      route: 'TOULOUSE → TIANJIN',
      estimatedArrival: '02:30+1 UTC',
      region: 'Asia'
    },
    {
      id: 'BGA011',
      flightNumber: 'BGA011',
      registration: 'F-GSTM',
      origin: 'NRT',
      destination: 'TSN',
      latitude: 35.7725,
      longitude: 140.3929,
      altitude: 0,
      speed: 0,
      heading: 270,
      status: 'Landed',
      lastUpdate: '1 hour ago',
      route: 'TOKYO → TIANJIN',
      estimatedArrival: 'Arrived',
      region: 'Asia'
    },
    // Middle East Operations
    {
      id: 'BGA012',
      flightNumber: 'BGA012',
      registration: 'F-GSTN',
      origin: 'DXB',
      destination: 'TLS',
      latitude: 25.2532,
      longitude: 55.3657,
      altitude: 38000,
      speed: 510,
      heading: 315,
      status: 'In Flight',
      lastUpdate: '2 min ago',
      route: 'DUBAI → TOULOUSE',
      estimatedArrival: '19:40 UTC',
      region: 'Middle East'
    },
    // South American Operations
    {
      id: 'BGA013',
      flightNumber: 'BGA013',
      registration: 'F-GSTO',
      origin: 'GRU',
      destination: 'TLS',
      latitude: -23.4356,
      longitude: -46.4731,
      altitude: 0,
      speed: 0,
      heading: 45,
      status: 'Preparing',
      lastUpdate: '20 min ago',
      route: 'SÃO PAULO → TOULOUSE',
      estimatedArrival: '12:00+1 UTC',
      region: 'South America'
    },
    // Australian Operations
    {
      id: 'BGA014',
      flightNumber: 'BGA014',
      registration: 'F-GSTP',
      origin: 'SYD',
      destination: 'TSN',
      latitude: -33.9399,
      longitude: 151.1753,
      altitude: 0,
      speed: 0,
      heading: 0,
      status: 'Maintenance',
      lastUpdate: '3 hours ago',
      route: 'SYDNEY → TIANJIN',
      estimatedArrival: 'Maintenance',
      region: 'Australia'
    },
    // Additional European Routes
    {
      id: 'BGA015',
      flightNumber: 'BGA015',
      registration: 'F-GSTQ',
      origin: 'LTN',
      destination: 'TLS',
      latitude: 51.8763,
      longitude: -0.3717,
      altitude: 25000,
      speed: 475,
      heading: 195,
      status: 'In Flight',
      lastUpdate: '4 min ago',
      route: 'LONDON → TOULOUSE',
      estimatedArrival: '17:20 UTC',
      region: 'Europe'
    },
    {
      id: 'BGA016',
      flightNumber: 'BGA016',
      registration: 'F-GSTR',
      origin: 'FCO',
      destination: 'HAM',
      latitude: 41.8003,
      longitude: 12.2389,
      altitude: 31000,
      speed: 488,
      heading: 15,
      status: 'In Flight',
      lastUpdate: '1 min ago',
      route: 'ROME → HAMBURG',
      estimatedArrival: '16:50 UTC',
      region: 'Europe'
    }
  ]);

  const [lastUpdate, setLastUpdate] = useState('13:21:45');
  const [dataPoints, setDataPoints] = useState(1247);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLastUpdate(now?.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
      setDataPoints(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulate connection status changes
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'reconnecting', 'connected'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleAircraftSelect = (aircraft) => {
    setSelectedAircraft(aircraft);
    setIsFollowingAircraft(true);
  };

  const handleAircraftClick = (aircraft, event) => {
    setSelectedAircraft(aircraft);
    setShowAircraftPopup(true);
    
    if (event) {
      setPopupPosition({
        x: event?.clientX,
        y: event?.clientY
      });
    }
  };

  const handleMapClick = () => {
    setShowAircraftPopup(false);
    setSelectedAircraft(null);
  };

  const handleViewDetails = (aircraft) => {
    navigate('/aircraft-detail-modal', { state: { aircraft } });
  };

  const handleZoomIn = () => {
    console.log('Zoom in');
  };

  const handleZoomOut = () => {
    console.log('Zoom out');
  };

  const handleCenterLocation = () => {
    console.log('Center on location');
  };

  const handleToggleLayer = () => {
    const layers = ['satellite', 'terrain', 'street'];
    const currentIndex = layers?.indexOf(mapLayer);
    const nextIndex = (currentIndex + 1) % layers?.length;
    setMapLayer(layers?.[nextIndex]);
  };

  const handleToggleFollow = () => {
    setIsFollowingAircraft(!isFollowingAircraft);
  };

  const toggleListPanel = () => {
    setIsListPanelOpen(!isListPanelOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        onNavigate={handleNavigation}
        currentView="main-aircraft-tracking-dashboard"
        connectionStatus={connectionStatus}
      />
      {/* Main Content */}
      <main className="pt-16 h-screen overflow-hidden">
        {/* Interactive Map */}
        <div className="relative w-full h-full">
          <InteractiveMap
            aircraftData={aircraftData}
            selectedAircraft={selectedAircraft}
            onAircraftClick={handleAircraftClick}
            mapLayer={mapLayer}
            followAircraft={isFollowingAircraft}
            onMapClick={handleMapClick}
          />

          {/* Connection Status */}
          <ConnectionStatus
            status={connectionStatus}
            lastUpdate={lastUpdate}
            dataPoints={dataPoints}
          />

          {/* Filter Chips */}
          <FilterChips
            filters={filters}
            onFilterChange={setFilters}
            aircraftCount={aircraftData?.length}
          />

          {/* Map Controls */}
          <MapControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onCenterLocation={handleCenterLocation}
            onToggleLayer={handleToggleLayer}
            currentLayer={mapLayer}
            isFollowingAircraft={isFollowingAircraft}
            onToggleFollow={handleToggleFollow}
          />

          {/* Aircraft List Toggle Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            onClick={toggleListPanel}
            className="fixed bottom-4 left-4 z-30 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center aviation-shadow hover:bg-primary/90 transition-colors md:hidden"
          >
            <motion.div
              animate={{ rotate: isListPanelOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18m-9-9l9 9-9 9" />
              </svg>
            </motion.div>
          </motion.button>

          {/* Desktop List Toggle */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={toggleListPanel}
            className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2 z-30 w-10 h-16 bg-card/90 backdrop-blur-sm border border-border rounded-r-lg flex items-center justify-center aviation-shadow hover:bg-muted/50 transition-colors"
          >
            <motion.div
              animate={{ rotate: isListPanelOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.div>
          </motion.button>
        </div>

        {/* Aircraft List Panel */}
        <AircraftListPanel
          aircraftData={aircraftData}
          selectedAircraft={selectedAircraft}
          onAircraftSelect={handleAircraftSelect}
          isOpen={isListPanelOpen}
          onToggle={toggleListPanel}
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Aircraft Popup */}
        {showAircraftPopup && selectedAircraft && (
          <AircraftPopup
            aircraft={selectedAircraft}
            onClose={() => setShowAircraftPopup(false)}
            onViewDetails={handleViewDetails}
            position={popupPosition}
          />
        )}
      </main>
    </div>
  );
};

export default MainAircraftTrackingDashboard;