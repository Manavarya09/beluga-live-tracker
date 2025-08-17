import React from 'react';
import Icon from '../../../components/AppIcon';

const MiniMap = ({ aircraft }) => {
  const flightPath = [
    { lat: 43.6293, lng: 1.3638 }, // Toulouse
    { lat: 44.2, lng: 2.1 },
    { lat: 45.1, lng: 3.2 },
    { lat: 46.3, lng: 4.8 },
    { lat: 47.8, lng: 6.2 },
    { lat: 49.2, lng: 7.8 },
    { lat: 50.8, lng: 8.9 },
    { lat: 53.5, lng: 9.9 } // Hamburg
  ];

  return (
    <div className="bg-card/50 rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Map" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Flight Path</h3>
        </div>
        <button className="text-xs text-accent hover:text-accent/80 transition-colors">
          Full Map
        </button>
      </div>
      {/* Mini Map Container */}
      <div className="relative w-full h-48 bg-slate-900 rounded-lg overflow-hidden border border-border">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
              {Array.from({ length: 48 })?.map((_, i) => (
                <div key={i} className="border border-slate-700/30"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Flight Path Line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.8" />
              <stop offset="50%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-warning)" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <polyline
            points="20,160 40,140 80,120 120,100 160,80 200,60 240,40 280,20"
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="3"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>

        {/* Origin Airport */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <div className="bg-background/90 px-2 py-1 rounded text-xs">
            <span className="text-success font-medium">TLS</span>
            <span className="text-muted-foreground ml-1">Origin</span>
          </div>
        </div>

        {/* Current Position */}
        <div className="absolute top-16 right-20">
          <div className="relative">
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -top-1 -left-1 w-6 h-6 border-2 border-accent rounded-full animate-ping"></div>
          </div>
          <div className="absolute -bottom-8 -left-8 bg-background/90 px-2 py-1 rounded text-xs whitespace-nowrap">
            <span className="text-accent font-medium">{aircraft?.callsign}</span>
            <span className="text-muted-foreground ml-1">Current</span>
          </div>
        </div>

        {/* Destination Airport */}
        <div className="absolute top-2 right-4 flex items-center space-x-2">
          <div className="bg-background/90 px-2 py-1 rounded text-xs">
            <span className="text-warning font-medium">HAM</span>
            <span className="text-muted-foreground ml-1">Destination</span>
          </div>
          <div className="w-3 h-3 bg-warning rounded-full"></div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="bg-background/90 rounded-lg p-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">68%</span>
            </div>
            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-gradient-to-r from-success via-accent to-warning rounded-full transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      {/* Route Summary */}
      <div className="mt-3 grid grid-cols-3 gap-3 text-center">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Distance</p>
          <p className="text-sm font-medium text-foreground">1,247 km</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Remaining</p>
          <p className="text-sm font-medium text-foreground">399 km</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">ETA</p>
          <p className="text-sm font-medium text-foreground">17:15 UTC</p>
        </div>
      </div>
    </div>
  );
};

export default MiniMap;