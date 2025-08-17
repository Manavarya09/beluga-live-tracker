import React from 'react';
import Icon from '../../../components/AppIcon';

const HistoryTab = ({ aircraft }) => {
  const recentFlights = [
    {
      id: 1,
      date: '2025-01-16',
      flightNumber: 'BGA4521',
      origin: 'TLS',
      destination: 'HAM',
      duration: '2h 45m',
      status: 'completed',
      originName: 'Toulouse-Blagnac',
      destinationName: 'Hamburg Finkenwerder'
    },
    {
      id: 2,
      date: '2025-01-15',
      flightNumber: 'BGA4520',
      origin: 'HAM',
      destination: 'TLS',
      duration: '2h 50m',
      status: 'completed',
      originName: 'Hamburg Finkenwerder',
      destinationName: 'Toulouse-Blagnac'
    },
    {
      id: 3,
      date: '2025-01-14',
      flightNumber: 'BGA4519',
      origin: 'TLS',
      destination: 'BRE',
      duration: '2h 15m',
      status: 'completed',
      originName: 'Toulouse-Blagnac',
      destinationName: 'Bremen'
    },
    {
      id: 4,
      date: '2025-01-13',
      flightNumber: 'BGA4518',
      origin: 'BRE',
      destination: 'TLS',
      duration: '2h 20m',
      status: 'completed',
      originName: 'Bremen',
      destinationName: 'Toulouse-Blagnac'
    },
    {
      id: 5,
      date: '2025-01-12',
      flightNumber: 'BGA4517',
      origin: 'TLS',
      destination: 'SEV',
      duration: '1h 30m',
      status: 'completed',
      originName: 'Toulouse-Blagnac',
      destinationName: 'Seville'
    }
  ];

  const flightStats = [
    {
      label: 'Total Flights (30 days)',
      value: '24',
      icon: 'Plane',
      color: 'text-accent'
    },
    {
      label: 'Flight Hours',
      value: '58.5h',
      icon: 'Clock',
      color: 'text-success'
    },
    {
      label: 'Distance Covered',
      value: '29,847 km',
      icon: 'Route',
      color: 'text-warning'
    },
    {
      label: 'Average Speed',
      value: '512 kts',
      icon: 'Gauge',
      color: 'text-accent'
    }
  ];

  const frequentRoutes = [
    {
      route: 'TLS ↔ HAM',
      flights: 8,
      percentage: 33
    },
    {
      route: 'TLS ↔ BRE',
      flights: 6,
      percentage: 25
    },
    {
      route: 'TLS ↔ SEV',
      flights: 4,
      percentage: 17
    },
    {
      route: 'HAM ↔ BRE',
      flights: 3,
      percentage: 13
    },
    {
      route: 'Other Routes',
      flights: 3,
      percentage: 12
    }
  ];

  return (
    <div className="space-y-6">
      {/* Flight Statistics */}
      <div className="grid grid-cols-2 gap-4">
        {flightStats?.map((stat, index) => (
          <div key={index} className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={stat?.icon} size={16} className={stat?.color} />
              <span className="text-xs text-muted-foreground">{stat?.label}</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{stat?.value}</p>
          </div>
        ))}
      </div>
      {/* Frequent Routes */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Frequent Routes (30 days)</h3>
        </div>
        <div className="space-y-3">
          {frequentRoutes?.map((route, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-foreground">{route?.route}</span>
                <span className="text-xs text-muted-foreground">{route?.flights} flights</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent rounded-full transition-all duration-300"
                    style={{ width: `${route?.percentage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground w-8">{route?.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Flight History */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={20} className="text-accent" />
            <h3 className="text-sm font-medium text-foreground">Recent Flights</h3>
          </div>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentFlights?.map((flight, index) => (
            <div key={flight?.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                  <Icon name="Plane" size={14} className="text-success" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{flight?.flightNumber}</span>
                    <span className="text-xs text-muted-foreground">{flight?.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{flight?.origin}</span>
                    <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{flight?.destination}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">{flight?.duration}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-success capitalize">{flight?.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Flight Pattern Analysis */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="BarChart3" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Flight Pattern Analysis</h3>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Most Active Day</p>
              <p className="text-sm text-foreground">Tuesday</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Peak Flight Time</p>
              <p className="text-sm text-foreground">14:00 - 16:00 UTC</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Average Altitude</p>
              <p className="text-sm text-foreground">25,000 ft</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">On-Time Performance</p>
              <p className="text-sm text-success">96.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;