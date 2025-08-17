import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FlightSearchOverlay = ({ isOpen, onClose, onFlightSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('flight'); // flight, route, registration
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search data
  const mockFlights = [
    {
      id: 'BGA001-20250817',
      flightNumber: 'BGA001',
      registration: 'F-GSTA',
      date: '2025-08-17',
      route: 'TLS → HAM',
      origin: 'Toulouse-Blagnac',
      destination: 'Hamburg',
      departure: '08:00',
      arrival: '10:40',
      duration: '2h 40m',
      cargo: 'A350 Wing Components',
      status: 'completed'
    },
    {
      id: 'BGA002-20250817',
      flightNumber: 'BGA002',
      registration: 'F-GSTB',
      date: '2025-08-17',
      route: 'HAM → SVQ',
      origin: 'Hamburg',
      destination: 'Seville',
      departure: '12:00',
      arrival: '14:40',
      duration: '2h 40m',
      cargo: 'A320 Fuselage Sections',
      status: 'completed'
    },
    {
      id: 'BGA003-20250816',
      flightNumber: 'BGA003',
      registration: 'F-GSTC',
      date: '2025-08-16',
      route: 'TLS → BRE',
      origin: 'Toulouse-Blagnac',
      destination: 'Bremen',
      departure: '09:15',
      arrival: '11:45',
      duration: '2h 30m',
      cargo: 'A380 Tail Section',
      status: 'completed'
    },
    {
      id: 'BGA004-20250816',
      flightNumber: 'BGA004',
      registration: 'F-GSTD',
      date: '2025-08-16',
      route: 'BRE → TLS',
      origin: 'Bremen',
      destination: 'Toulouse-Blagnac',
      departure: '14:30',
      arrival: '17:00',
      duration: '2h 30m',
      cargo: 'A350 Cockpit Modules',
      status: 'completed'
    },
    {
      id: 'BGA005-20250815',
      flightNumber: 'BGA005',
      registration: 'F-GSTE',
      date: '2025-08-15',
      route: 'TLS → HAM',
      origin: 'Toulouse-Blagnac',
      destination: 'Hamburg',
      departure: '07:45',
      arrival: '10:15',
      duration: '2h 30m',
      cargo: 'A321 Wing Assemblies',
      status: 'completed'
    }
  ];

  const searchTypes = [
    { value: 'flight', label: 'Flight Number', icon: 'Plane', placeholder: 'e.g., BGA001' },
    { value: 'route', label: 'Route', icon: 'Route', placeholder: 'e.g., TLS-HAM' },
    { value: 'registration', label: 'Registration', icon: 'Hash', placeholder: 'e.g., F-GSTA' }
  ];

  useEffect(() => {
    if (searchQuery?.length >= 2) {
      setIsSearching(true);
      
      // Simulate search delay
      const searchTimeout = setTimeout(() => {
        const filtered = mockFlights?.filter(flight => {
          switch (searchType) {
            case 'flight':
              return flight?.flightNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase());
            case 'route':
              return flight?.route?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                     flight?.origin?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                     flight?.destination?.toLowerCase()?.includes(searchQuery?.toLowerCase());
            case 'registration':
              return flight?.registration?.toLowerCase()?.includes(searchQuery?.toLowerCase());
            default:
              return false;
          }
        });
        
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(searchTimeout);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, searchType]);

  const handleFlightSelect = (flight) => {
    onFlightSelect(flight);
    onClose();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/20';
      case 'active':
        return 'text-primary bg-primary/20';
      case 'cancelled':
        return 'text-error bg-error/20';
      default:
        return 'text-muted-foreground bg-muted/20';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="w-full max-w-2xl mx-4 bg-card border border-border rounded-lg shadow-lg"
          onClick={(e) => e?.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={20} className="text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Search Flight History</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>

          {/* Search Controls */}
          <div className="p-4 border-b border-border">
            {/* Search Type Tabs */}
            <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
              {searchTypes?.map((type) => (
                <button
                  key={type?.value}
                  onClick={() => setSearchType(type?.value)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    searchType === type?.value
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={type?.icon} size={16} />
                  <span>{type?.label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative">
              <Input
                type="text"
                placeholder={searchTypes?.find(t => t?.value === searchType)?.placeholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pr-10"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  <span>Searching flights...</span>
                </div>
              </div>
            ) : searchQuery?.length >= 2 && searchResults?.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="SearchX" size={48} className="text-muted-foreground mb-2" />
                <h3 className="font-medium text-foreground mb-1">No flights found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search criteria or search type
                </p>
              </div>
            ) : searchResults?.length > 0 ? (
              <div className="divide-y divide-border">
                {searchResults?.map((flight) => (
                  <motion.button
                    key={flight?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => handleFlightSelect(flight)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon name="Plane" size={16} className="text-primary" />
                            <span className="font-semibold text-foreground">{flight?.flightNumber}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{flight?.registration}</span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flight?.status)}`}>
                            {flight?.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Icon name="MapPin" size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{flight?.route}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Calendar" size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{flight?.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Clock" size={14} className="text-muted-foreground" />
                            <span className="text-foreground">{flight?.departure} - {flight?.arrival}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Icon name="Package" size={14} className="text-muted-foreground" />
                            <span className="text-foreground truncate">{flight?.cargo}</span>
                          </div>
                        </div>
                      </div>

                      <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-2" />
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Icon name="Search" size={48} className="text-muted-foreground mb-2" />
                <h3 className="font-medium text-foreground mb-1">Search Flight History</h3>
                <p className="text-sm text-muted-foreground">
                  Enter at least 2 characters to search for flights
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {searchResults?.length > 0 && `${searchResults?.length} flight${searchResults?.length !== 1 ? 's' : ''} found`}
              </span>
              <div className="flex items-center space-x-4">
                <span>Press ESC to close</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlightSearchOverlay;