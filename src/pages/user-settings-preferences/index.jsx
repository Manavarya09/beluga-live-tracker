import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import DisplayPreferences from './components/DisplayPreferences';
import NotificationSettings from './components/NotificationSettings';
import DataPerformance from './components/DataPerformance';
import AccountSettings from './components/AccountSettings';
import AdvancedSettings from './components/AdvancedSettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const UserSettingsPreferences = () => {
  // Get current language from localStorage or default to English
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('selectedLanguage') || 'en';
  });

  // Display Preferences State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const [unitSystem, setUnitSystem] = useState(() => {
    return localStorage.getItem('unitSystem') || 'metric';
  });
  
  const [mapLayer, setMapLayer] = useState(() => {
    return localStorage.getItem('mapLayer') || 'satellite';
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved) : {
      aircraftAlerts: true,
      takeoffNotifications: true,
      favoriteTracking: true,
      routeChanges: false,
      emergencyAlerts: true,
      maintenanceUpdates: false,
      pushEnabled: true,
      emailEnabled: false,
      soundEnabled: true
    };
  });

  const [alertFrequency, setAlertFrequency] = useState(() => {
    return localStorage.getItem('alertFrequency') || '10min';
  });

  // Data & Performance State
  const [refreshInterval, setRefreshInterval] = useState(() => {
    return localStorage.getItem('refreshInterval') || '10';
  });

  const [cacheSettings, setCacheSettings] = useState(() => {
    const saved = localStorage.getItem('cacheSettings');
    return saved ? JSON.parse(saved) : {
      duration: '24hours',
      reduceAnimations: false,
      limitVisible: true
    };
  });

  const [offlineMode, setOfflineMode] = useState(() => {
    const saved = localStorage.getItem('offlineMode');
    return saved ? JSON.parse(saved) : {
      enabled: true,
      autoSync: true
    };
  });

  // Account Settings State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : {
      displayName: "Aviation Enthusiast",
      email: "pilot@belugalive.com",
      location: "San Francisco, CA",
      timezone: "America/Los_Angeles"
    };
  });

  const [exportPreferences, setExportPreferences] = useState(() => {
    const saved = localStorage.getItem('exportPreferences');
    return saved ? JSON.parse(saved) : {
      format: 'json'
    };
  });

  // Advanced Settings State
  const [apiSettings, setApiSettings] = useState(() => {
    const saved = localStorage.getItem('apiSettings');
    return saved ? JSON.parse(saved) : {
      connectionType: 'websocket',
      dataQuality: 'medium',
      timeout: '30',
      retryAttempts: '3'
    };
  });

  const [privacySettings, setPrivacySettings] = useState(() => {
    const saved = localStorage.getItem('privacySettings');
    return saved ? JSON.parse(saved) : {
      analytics: true,
      locationSharing: false,
      crashReporting: true,
      dataEncryption: true
    };
  });

  const [debugMode, setDebugMode] = useState(() => {
    const saved = localStorage.getItem('debugMode');
    return saved ? JSON.parse(saved) : {
      enabled: false,
      showApiResponses: false,
      performanceMonitoring: false
    };
  });

  // Active section state for mobile navigation
  const [activeSection, setActiveSection] = useState('display');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage);
    localStorage.setItem('theme', theme);
    localStorage.setItem('unitSystem', unitSystem);
    localStorage.setItem('mapLayer', mapLayer);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    localStorage.setItem('alertFrequency', alertFrequency);
    localStorage.setItem('refreshInterval', refreshInterval);
    localStorage.setItem('cacheSettings', JSON.stringify(cacheSettings));
    localStorage.setItem('offlineMode', JSON.stringify(offlineMode));
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    localStorage.setItem('exportPreferences', JSON.stringify(exportPreferences));
    localStorage.setItem('apiSettings', JSON.stringify(apiSettings));
    localStorage.setItem('privacySettings', JSON.stringify(privacySettings));
    localStorage.setItem('debugMode', JSON.stringify(debugMode));
    
    setHasUnsavedChanges(false);
  }, [
    currentLanguage, theme, unitSystem, mapLayer, notifications, alertFrequency,
    refreshInterval, cacheSettings, offlineMode, userProfile, exportPreferences,
    apiSettings, privacySettings, debugMode
  ]);

  // Navigation handler
  const handleNavigation = (path) => {
    if (path?.startsWith('/')) {
      window.location.href = path;
    }
  };

  // Language change handler
  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setHasUnsavedChanges(true);
  };

  // Theme change handler
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement?.setAttribute('data-theme', newTheme);
    setHasUnsavedChanges(true);
  };

  // Notification change handler
  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    setHasUnsavedChanges(true);
  };

  // Settings sections configuration
  const settingsSections = [
    {
      id: 'display',
      label: 'Display',
      icon: 'Monitor',
      component: DisplayPreferences
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationSettings
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: 'Database',
      component: DataPerformance
    },
    {
      id: 'account',
      label: 'Account',
      icon: 'User',
      component: AccountSettings
    },
    {
      id: 'advanced',
      label: 'Advanced',
      icon: 'Settings2',
      component: AdvancedSettings
    }
  ];

  const renderActiveSection = () => {
    const section = settingsSections?.find(s => s?.id === activeSection);
    if (!section) return null;

    const Component = section?.component;
    const commonProps = {
      key: section?.id
    };

    switch (section?.id) {
      case 'display':
        return (
          <Component
            {...commonProps}
            theme={theme}
            onThemeChange={handleThemeChange}
            unitSystem={unitSystem}
            onUnitSystemChange={setUnitSystem}
            mapLayer={mapLayer}
            onMapLayerChange={setMapLayer}
            language={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        );
      case 'notifications':
        return (
          <Component
            {...commonProps}
            notifications={notifications}
            onNotificationChange={handleNotificationChange}
            alertFrequency={alertFrequency}
            onAlertFrequencyChange={setAlertFrequency}
          />
        );
      case 'performance':
        return (
          <Component
            {...commonProps}
            refreshInterval={refreshInterval}
            onRefreshIntervalChange={setRefreshInterval}
            cacheSettings={cacheSettings}
            onCacheSettingsChange={setCacheSettings}
            offlineMode={offlineMode}
            onOfflineModeChange={setOfflineMode}
          />
        );
      case 'account':
        return (
          <Component
            {...commonProps}
            userProfile={userProfile}
            onProfileChange={setUserProfile}
            exportPreferences={exportPreferences}
            onExportPreferencesChange={setExportPreferences}
          />
        );
      case 'advanced':
        return (
          <Component
            {...commonProps}
            apiSettings={apiSettings}
            onApiSettingsChange={setApiSettings}
            privacySettings={privacySettings}
            onPrivacySettingsChange={setPrivacySettings}
            debugMode={debugMode}
            onDebugModeChange={setDebugMode}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={handleNavigation}
        currentView="user-settings-preferences"
        connectionStatus="connected"
      />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Settings" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings & Preferences</h1>
                <p className="text-muted-foreground">Customize your Beluga Live Tracker experience</p>
              </div>
            </div>
            
            {hasUnsavedChanges && (
              <div className="flex items-center space-x-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <Icon name="AlertCircle" size={16} className="text-warning" />
                <p className="text-sm text-warning">Settings are automatically saved</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:block">
              <div className="bg-card rounded-lg p-4 aviation-border sticky top-24">
                <nav className="space-y-2">
                  {settingsSections?.map((section) => (
                    <Button
                      key={section?.id}
                      variant={activeSection === section?.id ? 'default' : 'ghost'}
                      onClick={() => setActiveSection(section?.id)}
                      iconName={section?.icon}
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                      className="justify-start"
                    >
                      {section?.label}
                    </Button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Section Selector */}
            <div className="lg:hidden mb-6">
              <div className="bg-card rounded-lg p-4 aviation-border">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {settingsSections?.map((section) => (
                    <Button
                      key={section?.id}
                      variant={activeSection === section?.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setActiveSection(section?.id)}
                      iconName={section?.icon}
                      iconPosition="left"
                      iconSize={14}
                      className="text-xs"
                    >
                      {section?.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {renderActiveSection()}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Beluga Live Tracker v2.1.0
                </p>
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date()?.toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" iconName="HelpCircle" iconPosition="left">
                  Help & Support
                </Button>
                <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
                  Feedback
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettingsPreferences;