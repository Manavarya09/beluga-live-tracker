import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimelineControl = ({ 
  selectedDate, 
  onDateChange, 
  playbackSpeed, 
  onSpeedChange, 
  isPlaying, 
  onPlayPause,
  currentTime,
  onTimeChange,
  totalDuration = 86400 // 24 hours in seconds
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const speedOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 4, label: '4x' },
    { value: 8, label: '8x' },
    { value: 16, label: '16x' }
  ];

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleTimelineClick = (e) => {
    const rect = e?.currentTarget?.getBoundingClientRect();
    const clickX = e?.clientX - rect?.left;
    const percentage = clickX / rect?.width;
    const newTime = Math.max(0, Math.min(totalDuration, percentage * totalDuration));
    onTimeChange(newTime);
  };

  const progress = (currentTime / totalDuration) * 100;

  return (
    <div className="bg-card border-b border-border">
      {/* Desktop Timeline */}
      <div className="hidden md:block px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">Flight History Playback</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>{formatDate(selectedDate)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Speed Control */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Speed:</span>
              <div className="flex bg-muted rounded-lg p-1">
                {speedOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => onSpeedChange(option?.value)}
                    className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                      playbackSpeed === option?.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option?.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Play/Pause */}
            <Button
              variant="default"
              size="sm"
              onClick={onPlayPause}
              iconName={isPlaying ? 'Pause' : 'Play'}
              iconPosition="left"
              iconSize={16}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>00:00</span>
            <span className="font-medium text-foreground">{formatTime(currentTime)}</span>
            <span>23:59</span>
          </div>
          
          <div 
            className="relative h-2 bg-muted rounded-full cursor-pointer group"
            onClick={handleTimelineClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-lg transition-all duration-200 group-hover:scale-110"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>
        </div>
      </div>
      {/* Mobile Timeline */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{formatDate(selectedDate)}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">{playbackSpeed}x</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlayPause}
              iconName={isPlaying ? 'Pause' : 'Play'}
              iconSize={16}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>00:00</span>
            <span className="font-medium text-foreground">{formatTime(currentTime)}</span>
            <span>23:59</span>
          </div>
          
          <div 
            className="relative h-2 bg-muted rounded-full"
            onClick={handleTimelineClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-primary rounded-full"
              style={{ width: `${progress}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineControl;