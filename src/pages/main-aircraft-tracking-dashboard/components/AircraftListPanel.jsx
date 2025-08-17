import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AircraftListPanel = ({ 
  aircraftData, 
  selectedAircraft, 
  onAircraftSelect, 
  isOpen, 
  onToggle,
  filters,
  onFilterChange 
}) => {
  const [expandedAircraft, setExpandedAircraft] = useState(null);

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

  const filteredAircraft = aircraftData?.filter(aircraft => {
    if (filters?.status && filters?.status !== 'all' && aircraft?.status !== filters?.status) {
      return false;
    }
    if (filters?.altitudeRange && filters?.altitudeRange !== 'all') {
      const [min, max] = filters?.altitudeRange?.split('-')?.map(Number);
      if (aircraft?.altitude < min || aircraft?.altitude > max) {
        return false;
      }
    }
    return true;
  });

  const handleAircraftClick = (aircraft) => {
    onAircraftSelect(aircraft);
    if (expandedAircraft === aircraft?.id) {
      setExpandedAircraft(null);
    } else {
      setExpandedAircraft(aircraft?.id);
    }
  };

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="md:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-40 bg-card border-t border-border rounded-t-2xl max-h-[70vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center py-3">
                <div className="w-12 h-1 bg-muted rounded-full" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between px-4 pb-3 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Plane" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Active Aircraft ({filteredAircraft?.length})
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  iconName="X"
                  iconSize={16}
                />
              </div>

              {/* Aircraft List */}
              <div className="overflow-y-auto max-h-[50vh]">
                {filteredAircraft?.map((aircraft) => (
                  <motion.div
                    key={aircraft?.id}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border-b border-border cursor-pointer transition-colors ${
                      selectedAircraft?.id === aircraft?.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleAircraftClick(aircraft)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon name="Plane" size={16} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{aircraft?.flightNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {aircraft?.origin} → {aircraft?.destination}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(aircraft?.status)} 
                          size={14} 
                          className={getStatusColor(aircraft?.status)} 
                        />
                        <span className={`text-xs font-medium ${getStatusColor(aircraft?.status)}`}>
                          {aircraft?.status}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedAircraft === aircraft?.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="mt-3 pt-3 border-t border-border/50"
                        >
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Altitude:</span>
                              <span className="ml-2 font-medium text-foreground">
                                {aircraft?.altitude?.toLocaleString()} ft
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Speed:</span>
                              <span className="ml-2 font-medium text-foreground">
                                {aircraft?.speed} kts
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Heading:</span>
                              <span className="ml-2 font-medium text-foreground">
                                {aircraft?.heading}°
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Registration:</span>
                              <span className="ml-2 font-medium text-foreground data-font">
                                {aircraft?.registration}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop Side Panel */}
      <div className="hidden md:block">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-16 bottom-0 z-40 w-80 bg-card border-r border-border overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center space-x-2">
                  <Icon name="Plane" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">
                    Active Aircraft ({filteredAircraft?.length})
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  iconName="X"
                  iconSize={16}
                />
              </div>

              {/* Aircraft List */}
              <div className="overflow-y-auto h-full pb-4">
                {filteredAircraft?.map((aircraft) => (
                  <motion.div
                    key={aircraft?.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border-b border-border cursor-pointer transition-colors ${
                      selectedAircraft?.id === aircraft?.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                    }`}
                    onClick={() => handleAircraftClick(aircraft)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon name="Plane" size={18} className="text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{aircraft?.flightNumber}</div>
                          <div className="text-sm text-muted-foreground">
                            {aircraft?.origin} → {aircraft?.destination}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getStatusIcon(aircraft?.status)} 
                          size={14} 
                          className={getStatusColor(aircraft?.status)} 
                        />
                        <span className={`text-xs font-medium ${getStatusColor(aircraft?.status)}`}>
                          {aircraft?.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Alt:</span>
                        <span className="ml-1 font-medium text-foreground">
                          {aircraft?.altitude?.toLocaleString()} ft
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Speed:</span>
                        <span className="ml-1 font-medium text-foreground">
                          {aircraft?.speed} kts
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Hdg:</span>
                        <span className="ml-1 font-medium text-foreground">
                          {aircraft?.heading}°
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Reg:</span>
                        <span className="ml-1 font-medium text-foreground data-font">
                          {aircraft?.registration}
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      Last update: {aircraft?.lastUpdate}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default AircraftListPanel;