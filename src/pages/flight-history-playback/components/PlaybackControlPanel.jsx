import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PlaybackControlPanel = ({ 
  selectedAircraft, 
  onAircraftFilter, 
  selectedDate, 
  onDateChange,
  playbackSpeed,
  onSpeedChange,
  isPlaying,
  onPlayPause,
  onExportData,
  flightCount = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const aircraftOptions = [
    { id: 'all', name: 'All Beluga Aircraft', registration: 'ALL' },
    { id: 'F-GSTA', name: 'Beluga #1', registration: 'F-GSTA' },
    { id: 'F-GSTB', name: 'Beluga #2', registration: 'F-GSTB' },
    { id: 'F-GSTC', name: 'Beluga #3', registration: 'F-GSTC' },
    { id: 'F-GSTD', name: 'Beluga #4', registration: 'F-GSTD' },
    { id: 'F-GSTE', name: 'Beluga #5', registration: 'F-GSTE' }
  ];

  const speedOptions = [
    { value: 0.5, label: '0.5x', icon: 'Turtle' },
    { value: 1, label: '1x', icon: 'Play' },
    { value: 2, label: '2x', icon: 'FastForward' },
    { value: 4, label: '4x', icon: 'Zap' },
    { value: 8, label: '8x', icon: 'Rocket' },
    { value: 16, label: '16x', icon: 'Lightning' }
  ];

  const handleAircraftSelect = (aircraft) => {
    onAircraftFilter(aircraft?.id);
  };

  const handleDateChange = (e) => {
    onDateChange(e?.target?.value);
  };

  const handleExport = () => {
    onExportData();
  };

  return (
    <>
      {/* Desktop Control Panel */}
      <div className="hidden lg:block fixed right-4 top-20 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Playback Controls</h3>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Activity" size={14} />
              <span>{flightCount} flights</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Date Selection */}
          <div>
            <Input
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date()?.toISOString()?.split('T')?.[0]}
            />
          </div>

          {/* Aircraft Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Aircraft Filter
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {aircraftOptions?.map((aircraft) => (
                <button
                  key={aircraft?.id}
                  onClick={() => handleAircraftSelect(aircraft)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border transition-colors ${
                    selectedAircraft === aircraft?.id
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Plane" size={16} />
                    <div className="text-left">
                      <div className="text-sm font-medium">{aircraft?.name}</div>
                      <div className="text-xs text-muted-foreground">{aircraft?.registration}</div>
                    </div>
                  </div>
                  {selectedAircraft === aircraft?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Speed Control */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Playback Speed
            </label>
            <div className="grid grid-cols-3 gap-2">
              {speedOptions?.map((option) => (
                <button
                  key={option?.value}
                  onClick={() => onSpeedChange(option?.value)}
                  className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
                    playbackSpeed === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-muted-foreground text-foreground'
                  }`}
                >
                  <Icon name={option?.icon} size={16} />
                  <span className="text-xs mt-1">{option?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Export Controls */}
          <div className="pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Export Flight Data
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Control Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-foreground">Controls</h3>
              <span className="text-xs text-muted-foreground">({flightCount} flights)</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? 'ChevronDown' : 'ChevronUp'}
              iconSize={16}
            />
          </div>

          {/* Always Visible Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={onPlayPause}
                iconName={isPlaying ? 'Pause' : 'Play'}
                iconSize={16}
              />
              <span className="text-sm text-muted-foreground">{playbackSpeed}x</span>
            </div>
            
            <Input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              max={new Date()?.toISOString()?.split('T')?.[0]}
              className="w-32"
            />
          </div>

          {/* Expandable Controls */}
          {isExpanded && (
            <div className="mt-4 space-y-4 animate-slide-in">
              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Speed
                </label>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {speedOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => onSpeedChange(option?.value)}
                      className={`flex-shrink-0 flex flex-col items-center p-2 rounded-lg border transition-colors ${
                        playbackSpeed === option?.value
                          ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={14} />
                      <span className="text-xs mt-1">{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aircraft Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aircraft
                </label>
                <div className="flex space-x-2 overflow-x-auto pb-2">
                  {aircraftOptions?.slice(0, 4)?.map((aircraft) => (
                    <button
                      key={aircraft?.id}
                      onClick={() => handleAircraftSelect(aircraft)}
                      className={`flex-shrink-0 px-3 py-2 rounded-lg border text-xs transition-colors ${
                        selectedAircraft === aircraft?.id
                          ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground'
                      }`}
                    >
                      {aircraft?.registration}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExport}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                fullWidth
              >
                Export Data
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaybackControlPanel;