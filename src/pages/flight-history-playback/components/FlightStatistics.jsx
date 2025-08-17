import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FlightStatistics = ({ selectedDate, selectedAircraft, flightData }) => {
  // Mock statistics data
  const statistics = {
    totalFlights: 12,
    totalDistance: 8450, // km
    totalFlightTime: 1920, // minutes
    averageAltitude: 35000, // feet
    averageSpeed: 485, // knots
    aircraftUtilization: {
      'F-GSTA': { flights: 3, hours: 8.2 },
      'F-GSTB': { flights: 2, hours: 5.4 },
      'F-GSTC': { flights: 3, hours: 7.8 },
      'F-GSTD': { flights: 2, hours: 4.9 },
      'F-GSTE': { flights: 2, hours: 6.1 }
    },
    routeFrequency: [
      { route: 'TLS → HAM', count: 4, percentage: 33.3 },
      { route: 'HAM → SVQ', count: 3, percentage: 25.0 },
      { route: 'TLS → BRE', count: 2, percentage: 16.7 },
      { route: 'BRE → TLS', count: 2, percentage: 16.7 },
      { route: 'SVQ → TLS', count: 1, percentage: 8.3 }
    ],
    cargoTypes: [
      { type: 'Wing Components', count: 5, percentage: 41.7 },
      { type: 'Fuselage Sections', count: 3, percentage: 25.0 },
      { type: 'Cockpit Modules', count: 2, percentage: 16.7 },
      { type: 'Tail Sections', count: 2, percentage: 16.7 }
    ]
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="hidden xl:block fixed right-4 bottom-20 w-80 bg-card border border-border rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Flight Statistics</h3>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {formatDate(selectedDate)}
        </p>
      </div>
      <div className="p-4 space-y-4">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/50 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Plane" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Total Flights</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{statistics?.totalFlights}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-muted/50 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Flight Time</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{formatDuration(statistics?.totalFlightTime)}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-muted/50 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Route" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Distance</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{statistics?.totalDistance?.toLocaleString()} km</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-muted/50 rounded-lg p-3"
          >
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Gauge" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">Avg Speed</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{statistics?.averageSpeed} kts</div>
          </motion.div>
        </div>

        {/* Aircraft Utilization */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Settings" size={14} />
            <span>Aircraft Utilization</span>
          </h4>
          <div className="space-y-2">
            {Object.entries(statistics?.aircraftUtilization)?.map(([registration, data], index) => (
              <motion.div
                key={registration}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                  selectedAircraft === registration 
                    ? 'bg-primary/20 border border-primary/30' :'bg-muted/30'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Plane" size={12} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{registration}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{data?.flights} flights</div>
                  <div className="text-xs text-muted-foreground">{data?.hours}h</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Routes */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="TrendingUp" size={14} />
            <span>Popular Routes</span>
          </h4>
          <div className="space-y-2">
            {statistics?.routeFrequency?.slice(0, 3)?.map((route, index) => (
              <motion.div
                key={route?.route}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{route?.route}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{route?.count}</span>
                  <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${route?.percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cargo Distribution */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center space-x-2">
            <Icon name="Package" size={14} />
            <span>Cargo Types</span>
          </h4>
          <div className="space-y-2">
            {statistics?.cargoTypes?.slice(0, 3)?.map((cargo, index) => (
              <motion.div
                key={cargo?.type}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-foreground truncate">{cargo?.type}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-foreground">{cargo?.count}</span>
                  <div className="w-8 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${cargo?.percentage}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightStatistics;