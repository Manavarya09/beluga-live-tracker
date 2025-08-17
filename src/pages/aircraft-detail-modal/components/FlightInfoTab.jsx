import React from 'react';
import Icon from '../../../components/AppIcon';

const FlightInfoTab = ({ aircraft }) => {
  const flightDetails = [
    {
      label: 'Flight Number',
      value: aircraft?.flightNumber,
      icon: 'Plane'
    },
    {
      label: 'Aircraft Registration',
      value: aircraft?.registration,
      icon: 'Hash'
    },
    {
      label: 'ICAO24 Code',
      value: aircraft?.icao24,
      icon: 'Tag'
    },
    {
      label: 'Aircraft Type',
      value: 'Airbus A300-600ST Beluga',
      icon: 'Plane'
    }
  ];

  const routeInfo = {
    origin: {
      code: aircraft?.origin,
      name: 'Toulouse-Blagnac Airport',
      country: 'France'
    },
    destination: {
      code: aircraft?.destination,
      name: 'Hamburg Finkenwerder Airport',
      country: 'Germany'
    }
  };

  const timeline = [
    {
      time: '14:30 UTC',
      event: 'Departure',
      location: routeInfo?.origin?.name,
      status: 'completed',
      icon: 'TakeOff'
    },
    {
      time: '16:45 UTC',
      event: 'En Route',
      location: 'Over Belgium',
      status: 'current',
      icon: 'Navigation'
    },
    {
      time: '17:15 UTC',
      event: 'Arrival',
      location: routeInfo?.destination?.name,
      status: 'pending',
      icon: 'MapPin'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Aircraft Information */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Info" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Aircraft Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {flightDetails?.map((detail, index) => (
            <div key={index} className="flex items-center space-x-3">
              <Icon name={detail?.icon} size={16} className="text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{detail?.label}</p>
                <p className="text-sm font-medium text-foreground">{detail?.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Route Information */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Route" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Route Information</h3>
        </div>
        <div className="space-y-4">
          {/* Origin */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
              <Icon name="TakeOff" size={16} className="text-success" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{routeInfo?.origin?.code}</span>
                <span className="text-xs text-muted-foreground">Origin</span>
              </div>
              <p className="text-sm text-muted-foreground">{routeInfo?.origin?.name}</p>
              <p className="text-xs text-muted-foreground">{routeInfo?.origin?.country}</p>
            </div>
          </div>

          {/* Flight Path */}
          <div className="flex items-center space-x-3 pl-4">
            <div className="w-px h-8 bg-border"></div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <Icon name="ArrowRight" size={16} className="text-accent" />
                <span className="text-xs text-muted-foreground">Flight Distance: 1,247 km</span>
              </div>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center">
              <Icon name="MapPin" size={16} className="text-warning" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{routeInfo?.destination?.code}</span>
                <span className="text-xs text-muted-foreground">Destination</span>
              </div>
              <p className="text-sm text-muted-foreground">{routeInfo?.destination?.name}</p>
              <p className="text-xs text-muted-foreground">{routeInfo?.destination?.country}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Flight Timeline */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Clock" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Flight Timeline</h3>
        </div>
        <div className="space-y-4">
          {timeline?.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                item?.status === 'completed' ? 'bg-success/20' :
                item?.status === 'current' ? 'bg-accent/20' : 'bg-muted/20'
              }`}>
                <Icon 
                  name={item?.icon} 
                  size={16} 
                  className={
                    item?.status === 'completed' ? 'text-success' :
                    item?.status === 'current' ? 'text-accent' : 'text-muted-foreground'
                  } 
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{item?.event}</span>
                  <span className="text-xs text-muted-foreground">{item?.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item?.location}</p>
                {item?.status === 'current' && (
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-xs text-accent">Current</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Details */}
      <div className="bg-card/50 rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="FileText" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Additional Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Operator</p>
            <p className="text-sm text-foreground">Airbus Transport International</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Flight Purpose</p>
            <p className="text-sm text-foreground">Cargo Transport</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Estimated Flight Time</p>
            <p className="text-sm text-foreground">2h 45m</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Max Cargo Capacity</p>
            <p className="text-sm text-foreground">47 tonnes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoTab;