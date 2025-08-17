import React from 'react';
import Icon from '../../../components/AppIcon';

const LiveDataTab = ({ aircraft }) => {
  const liveMetrics = [
    {
      label: 'Altitude',
      value: `${aircraft?.altitude?.toLocaleString()} ft`,
      icon: 'TrendingUp',
      color: 'text-accent',
      change: '+150 ft/min'
    },
    {
      label: 'Ground Speed',
      value: `${aircraft?.speed} kts`,
      icon: 'Gauge',
      color: 'text-success',
      change: 'Stable'
    },
    {
      label: 'Heading',
      value: `${aircraft?.heading}°`,
      icon: 'Compass',
      color: 'text-warning',
      change: 'NE'
    },
    {
      label: 'Vertical Speed',
      value: `${aircraft?.verticalSpeed} ft/min`,
      icon: 'ArrowUp',
      color: aircraft?.verticalSpeed > 0 ? 'text-success' : 'text-error',
      change: aircraft?.verticalSpeed > 0 ? 'Climbing' : 'Descending'
    }
  ];

  const coordinates = {
    latitude: aircraft?.position?.lat?.toFixed(6),
    longitude: aircraft?.position?.lng?.toFixed(6)
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {liveMetrics?.map((metric, index) => (
          <div key={index} className="bg-card/50 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className={metric?.color} />
              <span className="text-xs text-muted-foreground">{metric?.change}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
              <p className="text-lg font-semibold text-foreground">{metric?.value}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Position Information */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="MapPin" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Current Position</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Latitude</p>
            <p className="text-sm font-mono text-foreground">{coordinates?.latitude}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Longitude</p>
            <p className="text-sm font-mono text-foreground">{coordinates?.longitude}</p>
          </div>
        </div>
      </div>
      {/* Signal Quality */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Wifi" size={20} className="text-success" />
            <h3 className="text-sm font-medium text-foreground">Signal Quality</h3>
          </div>
          <span className="text-xs text-success">Excellent</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">ADS-B Signal</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                <div className="w-full h-full bg-success rounded-full"></div>
              </div>
              <span className="text-xs text-success">100%</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Last Update</span>
            <span className="text-xs text-foreground">2 seconds ago</span>
          </div>
        </div>
      </div>
      {/* Weather Conditions */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Cloud" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Weather Conditions</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm text-foreground">15 kts NW</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Visibility</p>
            <p className="text-sm text-foreground">10+ km</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Temperature</p>
            <p className="text-sm text-foreground">18°C</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Pressure</p>
            <p className="text-sm text-foreground">1013 hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDataTab;