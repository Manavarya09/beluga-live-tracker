import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ aircraft, onClose }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Beluga Aircraft ${aircraft?.callsign}`,
        text: `Currently tracking Beluga aircraft ${aircraft?.callsign} flying from ${aircraft?.origin} to ${aircraft?.destination}`,
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleExport = () => {
    const data = {
      aircraft: aircraft?.callsign,
      registration: aircraft?.registration,
      flight: aircraft?.flightNumber,
      route: `${aircraft?.origin} → ${aircraft?.destination}`,
      altitude: `${aircraft?.altitude} ft`,
      speed: `${aircraft?.speed} kts`,
      heading: `${aircraft?.heading}°`,
      timestamp: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `beluga-${aircraft?.callsign}-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewHistory = () => {
    // Navigate to flight history playback
    window.location.href = '/flight-history-playback';
  };

  return (
    <div className="space-y-4">
      {/* Primary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant={isBookmarked ? "default" : "outline"}
          size="sm"
          onClick={handleBookmark}
          iconName={isBookmarked ? "Heart" : "Heart"}
          iconPosition="left"
          iconSize={16}
          className={isBookmarked ? "text-red-400" : ""}
        >
          {isBookmarked ? "Bookmarked" : "Bookmark"}
        </Button>
        
        <Button
          variant={notificationsEnabled ? "default" : "outline"}
          size="sm"
          onClick={handleNotifications}
          iconName={notificationsEnabled ? "BellRing" : "Bell"}
          iconPosition="left"
          iconSize={16}
        >
          {notificationsEnabled ? "Notifications On" : "Notify Arrival"}
        </Button>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          iconName="Share2"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Share
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleExport}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Export Data
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewHistory}
          iconName="History"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          View History
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="bg-card/30 rounded-lg p-3 border border-border/50">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Zap" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">Quick Actions</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-xs text-foreground">Center on Map</span>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
            <Icon name="Camera" size={14} className="text-muted-foreground" />
            <span className="text-xs text-foreground">Screenshot</span>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
            <Icon name="Route" size={14} className="text-muted-foreground" />
            <span className="text-xs text-foreground">Show Route</span>
          </button>
          <button className="flex items-center space-x-2 p-2 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
            <Icon name="Info" size={14} className="text-muted-foreground" />
            <span className="text-xs text-foreground">More Info</span>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      {notificationsEnabled && (
        <div className="bg-success/10 rounded-lg p-3 border border-success/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="BellRing" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">Notifications Enabled</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            You'll receive alerts for takeoff, landing, and significant altitude changes.
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="xs"
              onClick={() => setNotificationsEnabled(false)}
              className="text-xs"
            >
              Disable
            </Button>
            <Button
              variant="ghost"
              size="xs"
              className="text-xs"
            >
              Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;