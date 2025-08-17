import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoricalMap = ({ 
  selectedDate, 
  selectedAircraft, 
  currentTime, 
  isPlaying, 
  playbackSpeed,
  onFlightSelect 
}) => {
  const [mapCenter, setMapCenter] = useState({ lat: 25.0, lng: 10.0 }); // Global center
  const [zoomLevel, setZoomLevel] = useState(2); // Start with full global view
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isFullView, setIsFullView] = useState(true);
  const mapRef = useRef(null);

  // Enhanced historical flight data with global coverage
  const historicalFlights = [
    {
      id: 'BGA001-20250817',
      registration: 'F-GSTA',
      flightNumber: 'BGA001',
      date: '2025-08-17',
      route: {
        origin: { code: 'TLS', name: 'Toulouse-Blagnac', lat: 43.6291, lng: 1.3638 },
        destination: { code: 'HAM', name: 'Hamburg', lat: 53.6304, lng: 9.9882 }
      },
      path: [
        { lat: 43.6291, lng: 1.3638, time: 28800, altitude: 0, speed: 0 },
        { lat: 44.2, lng: 2.1, time: 29400, altitude: 25000, speed: 480 },
        { lat: 45.5, lng: 3.8, time: 31200, altitude: 35000, speed: 520 },
        { lat: 47.2, lng: 5.2, time: 33000, altitude: 35000, speed: 520 },
        { lat: 49.1, lng: 6.8, time: 34800, altitude: 35000, speed: 520 },
        { lat: 51.2, lng: 8.1, time: 36600, altitude: 25000, speed: 450 },
        { lat: 53.6304, lng: 9.9882, time: 38400, altitude: 0, speed: 0 }
      ],
      status: 'completed',
      duration: 9600,
      cargo: 'A350 Wing Components',
      region: 'Europe'
    },
    {
      id: 'BGA002-20250817',
      registration: 'F-GSTB',
      flightNumber: 'BGA002',
      date: '2025-08-17',
      route: {
        origin: { code: 'HAM', name: 'Hamburg', lat: 53.6304, lng: 9.9882 },
        destination: { code: 'SVQ', name: 'Seville', lat: 37.4180, lng: -5.8931 }
      },
      path: [
        { lat: 53.6304, lng: 9.9882, time: 43200, altitude: 0, speed: 0 },
        { lat: 52.1, lng: 8.2, time: 43800, altitude: 28000, speed: 490 },
        { lat: 49.8, lng: 6.1, time: 45600, altitude: 37000, speed: 530 },
        { lat: 46.9, lng: 3.8, time: 47400, altitude: 37000, speed: 530 },
        { lat: 43.2, lng: 1.1, time: 49200, altitude: 37000, speed: 530 },
        { lat: 40.1, lng: -2.8, time: 51000, altitude: 28000, speed: 470 },
        { lat: 37.4180, lng: -5.8931, time: 52800, altitude: 0, speed: 0 }
      ],
      status: 'completed',
      duration: 9600,
      cargo: 'A320 Fuselage Sections',
      region: 'Europe'
    },
    // Transoceanic Routes
    {
      id: 'BGA006-20250817',
      registration: 'F-GSTH',
      flightNumber: 'BGA006',
      date: '2025-08-17',
      route: {
        origin: { code: 'TLS', name: 'Toulouse', lat: 43.6291, lng: 1.3638 },
        destination: { code: 'YMX', name: 'Montreal', lat: 45.6795, lng: -73.7570 }
      },
      path: [
        { lat: 43.6291, lng: 1.3638, time: 25200, altitude: 0, speed: 0 },
        { lat: 45.1, lng: -5.2, time: 27000, altitude: 37000, speed: 520 },
        { lat: 47.8, lng: -15.4, time: 30600, altitude: 41000, speed: 540 },
        { lat: 50.2, lng: -25.8, time: 34200, altitude: 41000, speed: 540 },
        { lat: 51.5, lng: -35.6, time: 37800, altitude: 41000, speed: 540 },
        { lat: 49.8, lng: -45.2, time: 41400, altitude: 41000, speed: 540 },
        { lat: 47.2, lng: -55.8, time: 45000, altitude: 35000, speed: 490 },
        { lat: 45.6795, lng: -73.7570, time: 50400, altitude: 0, speed: 0 }
      ],
      status: 'completed',
      duration: 25200,
      cargo: 'A350 Fuselage Barrel',
      region: 'Transatlantic'
    },
    // Asian Route
    {
      id: 'BGA009-20250817',
      registration: 'F-GSTK',
      flightNumber: 'BGA009',
      date: '2025-08-17',
      route: {
        origin: { code: 'TSN', name: 'Tianjin', lat: 39.1244, lng: 117.3464 },
        destination: { code: 'TLS', name: 'Toulouse', lat: 43.6291, lng: 1.3638 }
      },
      path: [
        { lat: 39.1244, lng: 117.3464, time: 21600, altitude: 0, speed: 0 },
        { lat: 42.3, lng: 110.5, time: 23400, altitude: 39000, speed: 530 },
        { lat: 45.8, lng: 95.2, time: 27000, altitude: 41000, speed: 545 },
        { lat: 48.2, lng: 75.4, time: 32400, altitude: 41000, speed: 545 },
        { lat: 49.1, lng: 55.8, time: 37800, altitude: 41000, speed: 545 },
        { lat: 47.8, lng: 35.2, time: 43200, altitude: 39000, speed: 525 },
        { lat: 45.2, lng: 15.6, time: 48600, altitude: 35000, speed: 505 },
        { lat: 43.6291, lng: 1.3638, time: 54000, altitude: 0, speed: 0 }
      ],
      status: 'completed',
      duration: 32400,
      cargo: 'A330 Wing Box',
      region: 'Asia-Europe'
    }
  ];

  // Enhanced position calculation
  const calculatePosition = (lat, lng) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((1 - (Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI)) / 2) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Calculate aircraft position based on current time with enhanced interpolation
  const getAircraftPosition = (flight, currentTime) => {
    if (currentTime < flight?.path?.[0]?.time || currentTime > flight?.path?.[flight?.path?.length - 1]?.time) {
      return null;
    }

    for (let i = 0; i < flight?.path?.length - 1; i++) {
      const current = flight?.path?.[i];
      const next = flight?.path?.[i + 1];

      if (currentTime >= current?.time && currentTime <= next?.time) {
        const progress = (currentTime - current?.time) / (next?.time - current?.time);
        
        // Enhanced interpolation with smooth curves
        const smoothProgress = progress * progress * (3 - 2 * progress); // Smoothstep function
        
        return {
          lat: current?.lat + (next?.lat - current?.lat) * smoothProgress,
          lng: current?.lng + (next?.lng - current?.lng) * smoothProgress,
          altitude: current?.altitude + (next?.altitude - current?.altitude) * smoothProgress,
          speed: current?.speed + (next?.speed - current?.speed) * smoothProgress,
          heading: Math.atan2(next?.lng - current?.lng, next?.lat - current?.lat) * (180 / Math.PI),
          progress: progress
        };
      }
    }

    return null;
  };

  // Enhanced map controls
  const handleFullView = () => {
    setMapCenter({ lat: 25.0, lng: 10.0 });
    setZoomLevel(2);
    setIsFullView(true);
  };

  const handleFitToFlights = () => {
    const activeFlights = filteredFlights?.filter(flight => 
      getAircraftPosition(flight, currentTime) !== null
    );
    
    if (activeFlights?.length > 0) {
      const positions = activeFlights?.map(flight => 
        getAircraftPosition(flight, currentTime)
      )?.filter(pos => pos !== null);
      
      if (positions?.length > 0) {
        const lats = positions?.map(pos => pos?.lat);
        const lngs = positions?.map(pos => pos?.lng);
        
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        const centerLat = (minLat + maxLat) / 2;
        const centerLng = (minLng + maxLng) / 2;
        
        setMapCenter({ lat: centerLat, lng: centerLng });
        
        const latDiff = maxLat - minLat;
        const lngDiff = maxLng - minLng;
        const maxDiff = Math.max(latDiff, lngDiff);
        
        let newZoom = 2;
        if (maxDiff < 60) newZoom = 3;
        if (maxDiff < 30) newZoom = 4;
        if (maxDiff < 15) newZoom = 5;
        if (maxDiff < 8) newZoom = 6;
        
        setZoomLevel(newZoom);
        setIsFullView(false);
      }
    }
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 8));
    setIsFullView(false);
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
    if (zoomLevel <= 2) setIsFullView(true);
  };

  // Filter flights based on selected aircraft
  const filteredFlights = selectedAircraft === 'all' 
    ? historicalFlights 
    : historicalFlights?.filter(flight => flight?.registration === selectedAircraft);

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight);
    onFlightSelect && onFlightSelect(flight);
  };

  const handleMapClick = () => {
    setSelectedFlight(null);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
      {/* Enhanced Map Background with full world view */}
      <div 
        ref={mapRef}
        className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900"
        onClick={handleMapClick}
      >
        {/* Enhanced World Grid with geographical context */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: `
                linear-gradient(rgba(148, 163, 184, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(148, 163, 184, 0.3) 1px, transparent 1px),
                radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: `
                ${isFullView ? '50px' : '25px'} ${isFullView ? '50px' : '25px'},
                ${isFullView ? '50px' : '25px'} ${isFullView ? '50px' : '25px'},
                800px 800px,
                600px 600px
              `
            }} 
          />
        </div>

        {/* Enhanced Continental Outlines */}
        {isFullView && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" style={{ zIndex: 1 }}>
            <defs>
              <filter id="continent-glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="continent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(148, 163, 184, 0.4)" />
                <stop offset="100%" stopColor="rgba(148, 163, 184, 0.2)" />
              </linearGradient>
            </defs>
            
            {/* Europe */}
            <path
              d="M 27% 25% Q 32% 20% 45% 25% Q 48% 30% 52% 35% Q 48% 40% 40% 38% Q 32% 35% 27% 30% Z"
              fill="rgba(148, 163, 184, 0.1)"
              stroke="url(#continent-gradient)"
              strokeWidth="1"
              filter="url(#continent-glow)"
            />
            
            {/* Asia */}
            <path
              d="M 52% 25% Q 75% 20% 85% 30% Q 88% 40% 80% 50% Q 70% 45% 60% 40% Q 52% 35% 52% 25% Z"
              fill="rgba(148, 163, 184, 0.1)"
              stroke="url(#continent-gradient)"
              strokeWidth="1"
              filter="url(#continent-glow)"
            />
            
            {/* North America */}
            <path
              d="M 15% 20% Q 25% 15% 35% 25% Q 32% 35% 28% 40% Q 20% 35% 15% 30% Q 12% 25% 15% 20% Z"
              fill="rgba(148, 163, 184, 0.1)"
              stroke="url(#continent-gradient)"
              strokeWidth="1"
              filter="url(#continent-glow)"
            />
          </svg>
        )}

        {/* Enhanced Flight Paths with full visibility */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
            </linearGradient>
            <linearGradient id="completed-path" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.6)" />
            </linearGradient>
          </defs>
          
          {filteredFlights?.map((flight) => {
            const pathPoints = flight?.path?.map(point => {
              const pos = calculatePosition(point?.lat, point?.lng);
              return `${pos?.x},${pos?.y}`;
            })?.join(' ');
            
            const currentPos = getAircraftPosition(flight, currentTime);
            const isActive = currentPos !== null;
            
            // Calculate completed path
            let completedPath = '';
            if (isActive) {
              const completedPoints = [];
              for (let i = 0; i < flight?.path?.length - 1; i++) {
                const current = flight?.path?.[i];
                const next = flight?.path?.[i + 1];
                
                if (currentTime >= current?.time) {
                  const pos = calculatePosition(current?.lat, current?.lng);
                  completedPoints?.push(`${pos?.x},${pos?.y}`);
                  
                  if (currentTime <= next?.time) {
                    const currentScreenPos = calculatePosition(currentPos?.lat, currentPos?.lng);
                    completedPoints?.push(`${currentScreenPos?.x},${currentScreenPos?.y}`);
                    break;
                  }
                }
              }
              completedPath = completedPoints?.join(' ');
            }

            return (
              <g key={`path-${flight?.id}`}>
                {/* Full planned path */}
                <polyline
                  points={pathPoints}
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity="0.6"
                />
                
                {/* Completed path */}
                {isActive && completedPath && (
                  <polyline
                    points={completedPath}
                    fill="none"
                    stroke="url(#completed-path)"
                    strokeWidth="3"
                    opacity="0.9"
                  />
                )}
                
                {/* Enhanced route for selected flight */}
                {selectedFlight?.id === flight?.id && (
                  <polyline
                    points={pathPoints}
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="4"
                    strokeDasharray="12,6"
                    opacity="0.9"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Enhanced Aircraft Icons with full visibility */}
        <AnimatePresence>
          {filteredFlights?.map((flight) => {
            const position = getAircraftPosition(flight, currentTime);
            if (!position) return null;

            const screenPos = calculatePosition(position?.lat, position?.lng);

            return (
              <motion.div
                key={flight?.id}
                className="absolute cursor-pointer z-10"
                style={{
                  left: `${screenPos?.x}%`,
                  top: `${screenPos?.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  rotate: position?.heading || 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.3 }}
                onClick={(e) => {
                  e?.stopPropagation();
                  handleFlightClick(flight);
                }}
              >
                <div className={`relative p-3 rounded-full transition-all duration-300 border-2 ${
                  selectedFlight?.id === flight?.id 
                    ? 'bg-primary text-primary-foreground border-primary shadow-2xl scale-125' 
                    : 'bg-card/95 text-foreground hover:bg-primary/20 border-primary/50'
                }`}>
                  <Icon name="Plane" size={24} />
                  
                  {/* Enhanced Progress Trail */}
                  {selectedFlight?.id === flight?.id && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 2.5, opacity: 0.3 }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                      className="absolute inset-0 border-2 border-primary rounded-full"
                    />
                  )}
                  
                  {/* Enhanced Aircraft Label with full flight info */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: selectedFlight?.id === flight?.id || zoomLevel >= 4 ? 1 : 0, y: 0 }}
                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
                  >
                    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-xl">
                      <div className="font-semibold text-foreground text-sm">{flight?.flightNumber}</div>
                      <div className="text-muted-foreground text-xs">{flight?.registration}</div>
                      <div className="text-muted-foreground text-xs">
                        {flight?.route?.origin?.code} → {flight?.route?.destination?.code}
                      </div>
                      {position && (
                        <div className="text-muted-foreground text-xs mt-1">
                          {Math.round(position?.altitude)} ft • {Math.round(position?.speed)} kts
                        </div>
                      )}
                      <div className="text-primary text-xs">
                        {Math.round(position?.progress * 100)}% complete
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Enhanced Airport Markers with better visibility */}
        {filteredFlights?.map((flight) => (
          <React.Fragment key={`airports-${flight?.id}`}>
            {/* Origin Airport */}
            <div
              className="absolute z-5"
              style={{
                left: `${calculatePosition(flight?.route?.origin?.lat, flight?.route?.origin?.lng)?.x}%`,
                top: `${calculatePosition(flight?.route?.origin?.lat, flight?.route?.origin?.lng)?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-green-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <Icon name="MapPin" size={16} />
              </div>
              {zoomLevel >= 3 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-card/95 backdrop-blur-sm border border-border rounded px-2 py-1 shadow-lg">
                    <div className="text-sm font-semibold text-foreground">{flight?.route?.origin?.code}</div>
                    <div className="text-xs text-muted-foreground">{flight?.route?.origin?.name}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Destination Airport */}
            <div
              className="absolute z-5"
              style={{
                left: `${calculatePosition(flight?.route?.destination?.lat, flight?.route?.destination?.lng)?.x}%`,
                top: `${calculatePosition(flight?.route?.destination?.lat, flight?.route?.destination?.lng)?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-red-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                <Icon name="MapPin" size={16} />
              </div>
              {zoomLevel >= 3 && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-card/95 backdrop-blur-sm border border-border rounded px-2 py-1 shadow-lg">
                    <div className="text-sm font-semibold text-foreground">{flight?.route?.destination?.code}</div>
                    <div className="text-xs text-muted-foreground">{flight?.route?.destination?.name}</div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
      {/* Enhanced Map Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={zoomIn}
          iconName="Plus"
          iconSize={16}
          className="shadow-lg backdrop-blur-sm"
        />
        <Button
          variant="secondary"
          size="icon"
          onClick={zoomOut}
          iconName="Minus"
          iconSize={16}
          className="shadow-lg backdrop-blur-sm"
        />
        <Button
          variant="secondary"
          size="icon"
          onClick={handleFullView}
          iconName="Globe"
          iconSize={16}
          title="Full World View"
          className="shadow-lg backdrop-blur-sm"
        />
        <Button
          variant="secondary"
          size="icon"
          onClick={handleFitToFlights}
          iconName="Focus"
          iconSize={16}
          title="Fit Active Flights"
          className="shadow-lg backdrop-blur-sm"
        />
      </div>
      {/* Enhanced Time Display */}
      <div className="absolute top-4 right-4 z-20 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={18} className="text-primary" />
          <div>
            <div className="text-lg font-bold text-foreground">{formatTime(currentTime)}</div>
            <div className="text-xs text-muted-foreground">UTC • {selectedDate}</div>
          </div>
          {isFullView && (
            <div className="flex items-center space-x-1 ml-2">
              <Icon name="Eye" size={14} className="text-green-500" />
              <span className="text-green-500 text-xs">Full View</span>
            </div>
          )}
        </div>
      </div>
      {/* Enhanced Flight Info Panel */}
      <AnimatePresence>
        {selectedFlight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 lg:right-auto lg:w-96 bg-card/95 backdrop-blur-sm border border-border rounded-lg shadow-2xl z-20"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Icon name="Plane" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{selectedFlight?.flightNumber}</h3>
                    <p className="text-sm text-muted-foreground">{selectedFlight?.registration}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFlight(null)}
                  iconName="X"
                  iconSize={16}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block">Origin:</span>
                    <span className="font-semibold text-foreground">{selectedFlight?.route?.origin?.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Destination:</span>
                    <span className="font-semibold text-foreground">{selectedFlight?.route?.destination?.name}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cargo:</span>
                  <span className="font-medium text-foreground">{selectedFlight?.cargo}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Region:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                    {selectedFlight?.region}
                  </span>
                </div>

                {(() => {
                  const position = getAircraftPosition(selectedFlight, currentTime);
                  return position && (
                    <div className="pt-4 border-t border-border">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground block">Altitude:</span>
                          <div className="font-bold text-foreground">{Math.round(position?.altitude)} ft</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Speed:</span>
                          <div className="font-bold text-foreground">{Math.round(position?.speed)} kts</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Progress:</span>
                          <div className="font-bold text-primary">{Math.round(position?.progress * 100)}%</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Map Overview Panel */}
      <div className="absolute bottom-4 right-4 z-20 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-lg">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Plane" size={16} className="text-primary" />
            <span className="font-semibold text-foreground">{filteredFlights?.length}</span>
            <span className="text-muted-foreground">Flights</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Zoom: {zoomLevel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalMap;