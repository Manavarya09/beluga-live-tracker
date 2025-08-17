import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvancedSettings = ({ 
  apiSettings, 
  onApiSettingsChange,
  privacySettings,
  onPrivacySettingsChange,
  debugMode,
  onDebugModeChange 
}) => {
  const connectionTypeOptions = [
    { value: 'websocket', label: 'WebSocket (Recommended)' },
    { value: 'sse', label: 'Server-Sent Events' },
    { value: 'polling', label: 'HTTP Polling' }
  ];

  const dataQualityOptions = [
    { value: 'high', label: 'High Quality (More data usage)' },
    { value: 'medium', label: 'Medium Quality (Balanced)' },
    { value: 'low', label: 'Low Quality (Less data usage)' }
  ];

  const handleResetSettings = () => {
    console.log('Resetting all settings to default');
  };

  const handleExportSettings = () => {
    console.log('Exporting settings configuration');
  };

  const handleImportSettings = () => {
    console.log('Importing settings configuration');
  };

  return (
    <div className="bg-card rounded-lg p-6 aviation-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
          <Icon name="Settings2" size={20} className="text-error" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground">Configure technical preferences and privacy options</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* API Connection Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            API Connection
          </h4>
          
          <Select
            label="Connection Type"
            description="Choose how to receive real-time data updates"
            options={connectionTypeOptions}
            value={apiSettings?.connectionType}
            onChange={(value) => onApiSettingsChange({ ...apiSettings, connectionType: value })}
          />
          
          <Select
            label="Data Quality"
            description="Balance between data accuracy and bandwidth usage"
            options={dataQualityOptions}
            value={apiSettings?.dataQuality}
            onChange={(value) => onApiSettingsChange({ ...apiSettings, dataQuality: value })}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Connection Timeout (seconds)"
              type="number"
              value={apiSettings?.timeout}
              onChange={(e) => onApiSettingsChange({ ...apiSettings, timeout: e?.target?.value })}
              min="5"
              max="60"
            />
            
            <Input
              label="Retry Attempts"
              type="number"
              value={apiSettings?.retryAttempts}
              onChange={(e) => onApiSettingsChange({ ...apiSettings, retryAttempts: e?.target?.value })}
              min="1"
              max="10"
            />
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Privacy & Security
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Anonymous Usage Analytics"
              description="Help improve the app by sharing anonymous usage data"
              checked={privacySettings?.analytics}
              onChange={(e) => onPrivacySettingsChange({ ...privacySettings, analytics: e?.target?.checked })}
            />
            
            <Checkbox
              label="Location Sharing"
              description="Share your location for personalized nearby aircraft alerts"
              checked={privacySettings?.locationSharing}
              onChange={(e) => onPrivacySettingsChange({ ...privacySettings, locationSharing: e?.target?.checked })}
            />
            
            <Checkbox
              label="Crash Reporting"
              description="Automatically send crash reports to help fix issues"
              checked={privacySettings?.crashReporting}
              onChange={(e) => onPrivacySettingsChange({ ...privacySettings, crashReporting: e?.target?.checked })}
            />
            
            <Checkbox
              label="Data Encryption"
              description="Encrypt locally stored flight data and preferences"
              checked={privacySettings?.dataEncryption}
              onChange={(e) => onPrivacySettingsChange({ ...privacySettings, dataEncryption: e?.target?.checked })}
            />
          </div>
        </div>

        {/* Developer Options */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Developer Options
          </h4>
          
          <div className="space-y-3">
            <Checkbox
              label="Debug Mode"
              description="Enable detailed logging and debug information"
              checked={debugMode?.enabled}
              onChange={(e) => onDebugModeChange({ ...debugMode, enabled: e?.target?.checked })}
            />
            
            <Checkbox
              label="Show API Responses"
              description="Display raw API response data in console"
              checked={debugMode?.showApiResponses}
              onChange={(e) => onDebugModeChange({ ...debugMode, showApiResponses: e?.target?.checked })}
              disabled={!debugMode?.enabled}
            />
            
            <Checkbox
              label="Performance Monitoring"
              description="Track and log performance metrics"
              checked={debugMode?.performanceMonitoring}
              onChange={(e) => onDebugModeChange({ ...debugMode, performanceMonitoring: e?.target?.checked })}
              disabled={!debugMode?.enabled}
            />
          </div>
        </div>

        {/* Experimental Features */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Experimental Features
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Zap" size={16} className="text-warning" />
                <p className="text-sm font-medium text-foreground">AI Predictions</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Predict flight delays and route changes using AI
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Enable Beta
              </Button>
            </div>
            
            <div className="p-3 bg-accent/10 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Layers" size={16} className="text-accent" />
                <p className="text-sm font-medium text-foreground">3D Visualization</p>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                View aircraft in 3D space with altitude visualization
              </p>
              <Button variant="outline" size="sm" fullWidth>
                Try Preview
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Management */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Settings Management</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={handleExportSettings}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Export Config
            </Button>
            
            <Button
              variant="outline"
              onClick={handleImportSettings}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Import Config
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleResetSettings}
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Reset All
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Configuration Version</p>
                <p className="text-xs text-muted-foreground">v2.1.0 - Last updated: {new Date()?.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;