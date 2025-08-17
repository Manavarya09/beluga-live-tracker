import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DisplayPreferences = ({ 
  theme, 
  onThemeChange, 
  unitSystem, 
  onUnitSystemChange, 
  mapLayer, 
  onMapLayerChange,
  language,
  onLanguageChange 
}) => {
  const unitOptions = [
    { value: 'metric', label: 'Metric (km, m/s, °C)' },
    { value: 'imperial', label: 'Imperial (mi, mph, °F)' }
  ];

  const mapLayerOptions = [
    { value: 'satellite', label: 'Satellite View' },
    { value: 'terrain', label: 'Terrain View' },
    { value: 'street', label: 'Street Map' },
    { value: 'dark', label: 'Dark Mode Map' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'es', label: 'Español' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 aviation-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Monitor" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Display Preferences</h3>
          <p className="text-sm text-muted-foreground">Customize your visual experience</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground">Theme</label>
            <p className="text-xs text-muted-foreground mt-1">Choose your preferred color scheme</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onThemeChange('light')}
              iconName="Sun"
              iconSize={16}
            >
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onThemeChange('dark')}
              iconName="Moon"
              iconSize={16}
            >
              Dark
            </Button>
          </div>
        </div>

        {/* Unit System */}
        <div>
          <Select
            label="Unit System"
            description="Choose measurement units for altitude, speed, and distance"
            options={unitOptions}
            value={unitSystem}
            onChange={onUnitSystemChange}
            className="mt-2"
          />
        </div>

        {/* Map Layer */}
        <div>
          <Select
            label="Default Map Layer"
            description="Select your preferred map visualization style"
            options={mapLayerOptions}
            value={mapLayer}
            onChange={onMapLayerChange}
            className="mt-2"
          />
        </div>

        {/* Language */}
        <div>
          <Select
            label="Language"
            description="Choose your preferred interface language"
            options={languageOptions}
            value={language}
            onChange={onLanguageChange}
            className="mt-2"
          />
        </div>

        {/* Additional Display Options */}
        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Zap" size={16} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">High Contrast</p>
                  <p className="text-xs text-muted-foreground">Enhanced visibility</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Maximize" size={16} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Full Screen</p>
                  <p className="text-xs text-muted-foreground">Immersive tracking</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Toggle
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayPreferences;