import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ 
  aircraftData, 
  selectedAircraft, 
  onAircraftClick, 
  mapLayer = 'satellite',
  followAircraft = false,
  onMapClick 
}) => {
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState({ lat: 25.0, lng: 10.0 }); // Global center view
  const [zoomLevel, setZoomLevel] = useState(2); // Global zoom for full map view
  const [isFullView, setIsFullView] = useState(true);

  // Enhanced positioning system for accurate geographical placement
  const calculatePosition = (lat, lng, containerWidth = 100, containerHeight = 100) => {
    // Convert lat/lng to screen coordinates using Web Mercator projection
    const x = ((lng + 180) / 360) * containerWidth;
    const y = ((1 - (Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI)) / 2) * containerHeight;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Enhanced zoom controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 8));
    setIsFullView(false);
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
    if (zoomLevel <= 2) setIsFullView(true);
  };

  const handleFullView = () => {
    setMapCenter({ lat: 25.0, lng: 10.0 });
    setZoomLevel(2);
    setIsFullView(true);
  };

  const handleFitToAircraft = () => {
    if (aircraftData?.length > 0) {
      // Calculate bounds to fit all aircraft
      const lats = aircraftData?.map(aircraft => aircraft?.latitude);
      const lngs = aircraftData?.map(aircraft => aircraft?.longitude);
      
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      
      setMapCenter({ lat: centerLat, lng: centerLng });
      
      // Determine appropriate zoom level based on bounds
      const latDiff = maxLat - minLat;
      const lngDiff = maxLng - minLng;
      const maxDiff = Math.max(latDiff, lngDiff);
      
      let newZoom = 2;
      if (maxDiff < 10) newZoom = 4;
      if (maxDiff < 5) newZoom = 5;
      if (maxDiff < 2) newZoom = 6;
      
      setZoomLevel(newZoom);
      setIsFullView(false);
    }
  };

  // Follow aircraft logic
  useEffect(() => {
    if (followAircraft && selectedAircraft) {
      setMapCenter({ 
        lat: selectedAircraft?.latitude, 
        lng: selectedAircraft?.longitude 
      });
      setZoomLevel(prev => Math.max(prev, 6));
      setIsFullView(false);
    }
  }, [followAircraft, selectedAircraft]);

  // Enhanced Aircraft marker component
  const AircraftMarker = ({ aircraft, isSelected, onClick }) => {
    const getMarkerColor = () => {
      switch (aircraft?.status) {
        case 'In Flight':
          return 'text-green-500';
        case 'Landed':
          return 'text-blue-500';
        case 'Delayed':
          return 'text-yellow-500';
        case 'Maintenance':
          return 'text-red-500';
        case 'Loading':
          return 'text-orange-500';
        case 'Preparing':
          return 'text-purple-500';
        default:
          return 'text-primary';
      }
    };

    const getStatusColor = () => {
      switch (aircraft?.status) {
        case 'In Flight':
          return 'bg-green-500/20 border-green-500';
        case 'Landed':
          return 'bg-blue-500/20 border-blue-500';
        case 'Delayed':
          return 'bg-yellow-500/20 border-yellow-500';
        case 'Maintenance':
          return 'bg-red-500/20 border-red-500';
        case 'Loading':
          return 'bg-orange-500/20 border-orange-500';
        case 'Preparing':
          return 'bg-purple-500/20 border-purple-500';
        default:
          return 'bg-primary/20 border-primary';
      }
    };

    // Enhanced position calculation
    const position = calculatePosition(aircraft?.latitude, aircraft?.longitude);

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        className="absolute cursor-pointer z-20"
        style={{
          left: `${position?.x}%`,
          top: `${position?.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={(e) => {
          e?.stopPropagation();
          onClick(aircraft, e);
        }}
      >
        <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
          {/* Enhanced Aircraft Icon */}
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
              isSelected 
                ? 'bg-primary text-primary-foreground shadow-2xl scale-125 border-primary' 
                : `bg-card/95 backdrop-blur-sm ${getStatusColor()}`
            }`}
            style={{
              transform: `rotate(${aircraft?.heading || 0}deg)`
            }}
          >
            <Icon 
              name="Plane" 
              size={isSelected ? 20 : 18} 
              className={isSelected ? 'text-primary-foreground' : getMarkerColor()}
            />
          </div>

          {/* Enhanced Selection Ring */}
          {isSelected && (
            <>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2, opacity: 0.3 }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                className="absolute inset-0 border-2 border-primary rounded-full"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0.1 }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeOut', delay: 0.5 }}
                className="absolute inset-0 border border-primary rounded-full"
              />
            </>
          )}

          {/* Enhanced Flight Information Label */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: isSelected || zoomLevel >= 4 ? 1 : 0, 
              y: isSelected || zoomLevel >= 4 ? 0 : -10 
            }}
            className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-2 py-1 text-xs font-medium text-foreground whitespace-nowrap shadow-lg">
              <div className="flex items-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${getMarkerColor()?.replace('text-', 'bg-')}`}></span>
                <span>{aircraft?.flightNumber}</span>
              </div>
              {(isSelected || zoomLevel >= 6) && (
                <>
                  <div className="text-muted-foreground">{aircraft?.registration}</div>
                  <div className="text-muted-foreground">{aircraft?.route}</div>
                  {aircraft?.status === 'In Flight' && (
                    <div className="text-muted-foreground">
                      {Math.round(aircraft?.altitude)} ft | {Math.round(aircraft?.speed)} kts
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {/* Region Indicator */}
          {zoomLevel <= 3 && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-accent/80 backdrop-blur-sm text-accent-foreground text-xs px-1 rounded">
                {aircraft?.region}
              </div>
            </div>
          )}

          {/* Enhanced Flight Path Trail */}
          {aircraft?.trail && aircraft?.trail?.length > 0 && isSelected && (
            <svg className="absolute inset-0 pointer-events-none" style={{ width: '300%', height: '300%', top: '-100%', left: '-100%' }}>
              <defs>
                <linearGradient id={`trail-${aircraft?.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.4)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
                </linearGradient>
              </defs>
              <path
                d={`M ${aircraft?.trail?.map(point => `${point?.x},${point?.y}`)?.join(' L ')}`}
                stroke={`url(#trail-${aircraft?.id})`}
                strokeWidth="3"
                fill="none"
                strokeDasharray="8,4"
                className="animate-pulse"
              />
            </svg>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900">
      {/* Enhanced Map Container */}
      <div ref={mapRef} className="w-full h-full relative">
        {/* World Map Base Layer */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-green-900/20"
          onClick={onMapClick}
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              linear-gradient(rgba(100, 116, 139, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: `
              800px 800px,
              600px 600px,
              ${isFullView ? '100px' : '50px'} ${isFullView ? '100px' : '50px'},
              ${isFullView ? '100px' : '50px'} ${isFullView ? '100px' : '50px'}
            `
          }}
        />

        {/* Continental Outlines (simplified) */}
        {isFullView && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {/* Simplified continent outlines */}
            <path
              d="M 15% 25% Q 20% 20% 35% 25% Q 40% 30% 45% 35% Q 35% 40% 25% 35% Q 15% 30% 15% 25%"
              fill="none"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
              filter="url(#glow)"
            />
            <path
              d="M 20% 45% Q 30% 40% 40% 45% Q 35% 55% 30% 60% Q 20% 55% 20% 45%"
              fill="none"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
              filter="url(#glow)"
            />
            <path
              d="M 70% 35% Q 80% 30% 85% 40% Q 80% 50% 75% 45% Q 70% 40% 70% 35%"
              fill="none"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="1"
              filter="url(#glow)"
            />
          </svg>
        )}

        {/* Flight Routes Network */}
        {zoomLevel <= 4 && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 2 }}>
            <defs>
              <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
            </defs>
            {aircraftData?.map((aircraft, index) => {
              const originPos = calculatePosition(
                aircraft?.origin === 'TLS' ? 43.6291 : 
                aircraft?.origin === 'HAM' ? 53.6304 : 
                aircraft?.origin === 'TSN' ? 39.1244 :
                aircraft?.latitude, 
                aircraft?.origin === 'TLS' ? 1.3638 : 
                aircraft?.origin === 'HAM' ? 9.9882 : 
                aircraft?.origin === 'TSN' ? 117.3464 :
                aircraft?.longitude
              );
              const currentPos = calculatePosition(aircraft?.latitude, aircraft?.longitude);
              
              return (
                <line
                  key={`route-${index}`}
                  x1={`${originPos?.x}%`}
                  y1={`${originPos?.y}%`}
                  x2={`${currentPos?.x}%`}
                  y2={`${currentPos?.y}%`}
                  stroke="url(#route-gradient)"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                  opacity="0.6"
                />
              );
            })}
          </svg>
        )}

        {/* Aircraft Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="relative w-full h-full pointer-events-auto">
            {aircraftData?.map((aircraft) => (
              <AircraftMarker
                key={aircraft?.id}
                aircraft={aircraft}
                isSelected={selectedAircraft?.id === aircraft?.id}
                onClick={onAircraftClick}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Map Controls */}
        <div className="absolute top-4 right-4 z-30 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            className="shadow-lg backdrop-blur-sm"
            iconName="Plus"
            iconSize={16}
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            className="shadow-lg backdrop-blur-sm"
            iconName="Minus"
            iconSize={16}
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={handleFullView}
            className="shadow-lg backdrop-blur-sm"
            iconName="Globe"
            iconSize={16}
            title="Full World View"
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={handleFitToAircraft}
            className="shadow-lg backdrop-blur-sm"
            iconName="Focus"
            iconSize={16}
            title="Fit All Aircraft"
          />
        </div>

        {/* Map Info Panel */}
        <div className="absolute bottom-4 left-4 z-20 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Plane" size={14} className="text-primary" />
              <span className="text-foreground font-medium">{aircraftData?.length}</span>
              <span className="text-muted-foreground">Beluga Aircraft</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={14} className="text-muted-foreground" />
              <span className="text-muted-foreground">Zoom: {zoomLevel}</span>
            </div>
            {isFullView && (
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={14} className="text-green-500" />
                <span className="text-green-500 text-xs">Full View</span>
              </div>
            )}
          </div>
        </div>

        {/* Loading State Enhancement */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-40"
        >
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
            />
            <div className="text-lg font-medium text-foreground">Loading Global Beluga Fleet</div>
            <div className="text-sm text-muted-foreground">Worldwide coverage • Real-time tracking</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveMap;