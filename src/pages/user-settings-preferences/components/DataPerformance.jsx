import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const DataPerformance = ({ 
  refreshInterval, 
  onRefreshIntervalChange,
  cacheSettings,
  onCacheSettingsChange,
  offlineMode,
  onOfflineModeChange 
}) => {
  const refreshOptions = [
    { value: '5', label: '5 seconds (High frequency)' },
    { value: '10', label: '10 seconds (Recommended)' },
    { value: '15', label: '15 seconds (Balanced)' },
    { value: '30', label: '30 seconds (Low frequency)' },
    { value: '60', label: '1 minute (Minimal)' }
  ];

  const cacheOptions = [
    { value: '1hour', label: '1 Hour' },
    { value: '6hours', label: '6 Hours' },
    { value: '12hours', label: '12 Hours' },
    { value: '24hours', label: '24 Hours (Recommended)' },
    { value: '7days', label: '7 Days' }
  ];

  const handleClearCache = () => {
    // Mock cache clearing functionality
    console.log('Cache cleared');
  };

  const handleExportData = () => {
    // Mock data export functionality
    console.log('Exporting flight data');
  };

  return (
    <div className="bg-card rounded-lg p-6 aviation-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Database" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Data & Performance</h3>
          <p className="text-sm text-muted-foreground">Optimize tracking performance and data usage</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Auto-refresh Interval */}
        <div>
          <Select
            label="Auto-refresh Interval"
            description="How frequently to update aircraft positions"
            options={refreshOptions}
            value={refreshInterval}
            onChange={onRefreshIntervalChange}
            className="mt-2"
          />
        </div>

        {/* Cache Duration */}
        <div>
          <Select
            label="Data Cache Duration"
            description="How long to store flight data locally"
            options={cacheOptions}
            value={cacheSettings?.duration}
            onChange={(value) => onCacheSettingsChange({ ...cacheSettings, duration: value })}
            className="mt-2"
          />
        </div>

        {/* Offline Mode Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Offline Mode
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Enable Offline Mode"
              description="Continue tracking with cached data when connection is lost"
              checked={offlineMode?.enabled}
              onChange={(e) => onOfflineModeChange({ ...offlineMode, enabled: e?.target?.checked })}
            />
            
            <Checkbox
              label="Auto-sync on Reconnect"
              description="Automatically sync data when connection is restored"
              checked={offlineMode?.autoSync}
              onChange={(e) => onOfflineModeChange({ ...offlineMode, autoSync: e?.target?.checked })}
              disabled={!offlineMode?.enabled}
            />
          </div>
        </div>

        {/* Performance Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Performance Options
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <Checkbox
                label="Reduce Animations"
                description="Disable smooth aircraft movement for better performance"
                checked={cacheSettings?.reduceAnimations}
                onChange={(e) => onCacheSettingsChange({ 
                  ...cacheSettings, 
                  reduceAnimations: e?.target?.checked 
                })}
              />
            </div>
            
            <div className="p-3 bg-muted/20 rounded-lg">
              <Checkbox
                label="Limit Visible Aircraft"
                description="Show only aircraft within current map view"
                checked={cacheSettings?.limitVisible}
                onChange={(e) => onCacheSettingsChange({ 
                  ...cacheSettings, 
                  limitVisible: e?.target?.checked 
                })}
              />
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Data Management</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleClearCache}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Clear Cache
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExportData}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Export Data
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Storage Used</p>
                <p className="text-xs text-muted-foreground">Local cache and offline data</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">24.7 MB</p>
                <p className="text-xs text-muted-foreground">of 100 MB</p>
              </div>
            </div>
            <div className="mt-2 w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPerformance;