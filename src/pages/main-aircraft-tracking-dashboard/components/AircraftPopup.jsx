import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AircraftPopup = ({ aircraft, onClose, onViewDetails, position }) => {
  if (!aircraft) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Flight':
        return 'text-success';
      case 'Landed':
        return 'text-muted-foreground';
      case 'Delayed':
        return 'text-warning';
      case 'Maintenance':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'In Flight':
        return 'Plane';
      case 'Landed':
        return 'MapPin';
      case 'Delayed':
        return 'Clock';
      case 'Maintenance':
        return 'Wrench';
      default:
        return 'Circle';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed z-50 bg-card border border-border rounded-lg aviation-shadow max-w-sm w-full mx-4"
        style={{
          left: position?.x ? `${position?.x}px` : '50%',
          top: position?.y ? `${position?.y}px` : '50%',
          transform: position?.x && position?.y ? 'translate(-50%, -100%)' : 'translate(-50%, -50%)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="Plane" size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{aircraft?.flightNumber}</h3>
              <p className="text-sm text-muted-foreground">
                {aircraft?.origin} → {aircraft?.destination}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={16}
          />
        </div>

        {/* Status */}
        <div className="px-4 py-2 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon 
              name={getStatusIcon(aircraft?.status)} 
              size={16} 
              className={getStatusColor(aircraft?.status)} 
            />
            <span className={`text-sm font-medium ${getStatusColor(aircraft?.status)}`}>
              {aircraft?.status}
            </span>
            <div className="flex-1" />
            <span className="text-xs text-muted-foreground">
              Updated {aircraft?.lastUpdate}
            </span>
          </div>
        </div>

        {/* Flight Data */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Altitude
              </div>
              <div className="text-lg font-semibold text-foreground">
                {aircraft?.altitude?.toLocaleString()}
                <span className="text-sm text-muted-foreground ml-1">ft</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Ground Speed
              </div>
              <div className="text-lg font-semibold text-foreground">
                {aircraft?.speed}
                <span className="text-sm text-muted-foreground ml-1">kts</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Heading
              </div>
              <div className="text-lg font-semibold text-foreground">
                {aircraft?.heading}°
                <span className="text-sm text-muted-foreground ml-1">
                  {aircraft?.heading >= 0 && aircraft?.heading < 90 ? 'NE' :
                   aircraft?.heading >= 90 && aircraft?.heading < 180 ? 'SE' :
                   aircraft?.heading >= 180 && aircraft?.heading < 270 ? 'SW' : 'NW'}
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Registration
              </div>
              <div className="text-lg font-semibold text-foreground data-font">
                {aircraft?.registration}
              </div>
            </div>
          </div>

          {aircraft?.route && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Route
              </div>
              <div className="text-sm text-foreground">
                {aircraft?.route}
              </div>
            </div>
          )}

          {aircraft?.estimatedArrival && (
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                Estimated Arrival
              </div>
              <div className="text-sm text-foreground">
                {aircraft?.estimatedArrival}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(aircraft)}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
            fullWidth
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Navigation"
            iconPosition="left"
            iconSize={14}
            fullWidth
          >
            Follow
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AircraftPopup;