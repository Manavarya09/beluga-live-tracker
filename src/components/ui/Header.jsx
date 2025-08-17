import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onNavigate, currentView = 'main-aircraft-tracking-dashboard', connectionStatus = 'connected' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Live Tracking',
      path: '/main-aircraft-tracking-dashboard',
      icon: 'Radar',
      tooltip: 'Real-time Beluga aircraft tracking dashboard'
    },
    {
      label: 'Search',
      path: '/search-filter-interface',
      icon: 'Search',
      tooltip: 'Find specific aircraft or routes'
    },
    {
      label: 'History',
      path: '/flight-history-playback',
      icon: 'History',
      tooltip: 'Flight history and playback'
    },
    {
      label: 'Settings',
      path: '/user-settings-preferences',
      icon: 'Settings',
      tooltip: 'User preferences and settings'
    }
  ];

  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }
    setIsMenuOpen(false);
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'text-success';
      case 'disconnected':
        return 'text-error';
      case 'reconnecting':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Wifi';
      case 'disconnected':
        return 'WifiOff';
      case 'reconnecting':
        return 'RotateCw';
      default:
        return 'Wifi';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plane" size={20} color="var(--color-primary-foreground)" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-none">
                Beluga Live
              </h1>
              <span className="text-xs text-muted-foreground leading-none">
                Tracker
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={currentView === item?.path?.slice(1) ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className="text-sm"
              title={item?.tooltip}
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Connection Status */}
          <div className="hidden sm:flex items-center space-x-2">
            <Icon 
              name={getConnectionStatusIcon()} 
              size={16} 
              className={`${getConnectionStatusColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : connectionStatus === 'connected' ? 'animate-pulse-soft' : ''}`}
            />
            <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
              {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            iconName={isMenuOpen ? 'X' : 'Menu'}
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-in">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <Button
                key={item?.path}
                variant={currentView === item?.path?.slice(1) ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavigation(item?.path)}
                iconName={item?.icon}
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start text-sm"
              >
                {item?.label}
              </Button>
            ))}
            
            {/* Mobile Connection Status */}
            <div className="flex items-center justify-center space-x-2 pt-3 border-t border-border mt-3">
              <Icon 
                name={getConnectionStatusIcon()} 
                size={16} 
                className={`${getConnectionStatusColor()} ${connectionStatus === 'reconnecting' ? 'animate-spin' : connectionStatus === 'connected' ? 'animate-pulse-soft' : ''}`}
              />
              <span className={`text-xs font-medium ${getConnectionStatusColor()}`}>
                Connection: {connectionStatus?.charAt(0)?.toUpperCase() + connectionStatus?.slice(1)}
              </span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;