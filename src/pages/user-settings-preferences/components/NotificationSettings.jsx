import React from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = ({ 
  notifications, 
  onNotificationChange,
  alertFrequency,
  onAlertFrequencyChange 
}) => {
  const frequencyOptions = [
    { value: 'instant', label: 'Instant' },
    { value: '5min', label: 'Every 5 minutes' },
    { value: '15min', label: 'Every 15 minutes' },
    { value: '30min', label: 'Every 30 minutes' },
    { value: '1hour', label: 'Hourly' }
  ];

  const notificationTypes = [
    {
      key: 'aircraftAlerts',
      label: 'Aircraft Arrival Alerts',
      description: 'Get notified when Beluga aircraft arrive at airports',
      icon: 'Plane'
    },
    {
      key: 'takeoffNotifications',
      label: 'Takeoff Notifications',
      description: 'Alerts when tracked aircraft begin their journey',
      icon: 'TakeOff'
    },
    {
      key: 'favoriteTracking',
      label: 'Favorite Aircraft Tracking',
      description: 'Updates on your bookmarked aircraft movements',
      icon: 'Heart'
    },
    {
      key: 'routeChanges',
      label: 'Route Changes',
      description: 'Notifications when flight paths are modified',
      icon: 'Route'
    },
    {
      key: 'emergencyAlerts',
      label: 'Emergency Alerts',
      description: 'Critical notifications for emergency situations',
      icon: 'AlertTriangle'
    },
    {
      key: 'maintenanceUpdates',
      label: 'Maintenance Updates',
      description: 'Aircraft maintenance and service notifications',
      icon: 'Wrench'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-6 aviation-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Bell" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notification Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your alert preferences</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Alert Frequency */}
        <div>
          <Select
            label="Alert Frequency"
            description="How often you want to receive notifications"
            options={frequencyOptions}
            value={alertFrequency}
            onChange={onAlertFrequencyChange}
            className="mt-2"
          />
        </div>

        {/* Notification Types */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Notification Types
          </h4>
          
          {notificationTypes?.map((type) => (
            <div key={type?.key} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-1">
                <Icon name={type?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <Checkbox
                  label={type?.label}
                  description={type?.description}
                  checked={notifications?.[type?.key] || false}
                  onChange={(e) => onNotificationChange(type?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Methods */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Delivery Methods</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={16} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Browser notifications</p>
                </div>
              </div>
              <Checkbox
                checked={notifications?.pushEnabled || false}
                onChange={(e) => onNotificationChange('pushEnabled', e?.target?.checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email Alerts</p>
                  <p className="text-xs text-muted-foreground">Email notifications</p>
                </div>
              </div>
              <Checkbox
                checked={notifications?.emailEnabled || false}
                onChange={(e) => onNotificationChange('emailEnabled', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Sound Settings */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Sound Alerts</p>
              <p className="text-xs text-muted-foreground mt-1">Play sound with notifications</p>
            </div>
            <Checkbox
              checked={notifications?.soundEnabled || false}
              onChange={(e) => onNotificationChange('soundEnabled', e?.target?.checked)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;