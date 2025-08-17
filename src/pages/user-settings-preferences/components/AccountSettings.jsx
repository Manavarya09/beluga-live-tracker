import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AccountSettings = ({ 
  userProfile, 
  onProfileChange,
  exportPreferences,
  onExportPreferencesChange 
}) => {
  const exportFormatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'xml', label: 'XML Format' },
    { value: 'kml', label: 'KML (Google Earth)' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' }
  ];

  const handleSaveProfile = () => {
    console.log('Profile saved');
  };

  const handleExportBookmarks = () => {
    console.log('Exporting bookmarks');
  };

  const handleImportBookmarks = () => {
    console.log('Importing bookmarks');
  };

  return (
    <div className="bg-card rounded-lg p-6 aviation-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="User" size={20} className="text-warning" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
          <p className="text-sm text-muted-foreground">Manage your profile and preferences</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Profile Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Profile Information
          </h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Display Name"
              type="text"
              value={userProfile?.displayName}
              onChange={(e) => onProfileChange({ ...userProfile, displayName: e?.target?.value })}
              placeholder="Enter your display name"
            />
            
            <Input
              label="Email Address"
              type="email"
              value={userProfile?.email}
              onChange={(e) => onProfileChange({ ...userProfile, email: e?.target?.value })}
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Location"
              type="text"
              value={userProfile?.location}
              onChange={(e) => onProfileChange({ ...userProfile, location: e?.target?.value })}
              placeholder="City, Country"
            />
            
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={userProfile?.timezone}
              onChange={(value) => onProfileChange({ ...userProfile, timezone: value })}
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              variant="default"
              onClick={handleSaveProfile}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Profile
            </Button>
          </div>
        </div>

        {/* Saved Searches */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Saved Searches & Bookmarks
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Search" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Saved Searches</p>
                  <p className="text-xs text-muted-foreground">12 saved search queries</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Bookmark" size={16} className="text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Bookmarked Aircraft</p>
                  <p className="text-xs text-muted-foreground">8 favorite aircraft tracked</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleExportBookmarks}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Export Bookmarks
            </Button>
            
            <Button
              variant="outline"
              onClick={handleImportBookmarks}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Import Bookmarks
            </Button>
          </div>
        </div>

        {/* Export Preferences */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Export Preferences
          </h4>
          
          <Select
            label="Default Export Format"
            description="Choose your preferred format for flight data exports"
            options={exportFormatOptions}
            value={exportPreferences?.format}
            onChange={(value) => onExportPreferencesChange({ ...exportPreferences, format: value })}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={16} className="text-success" />
                <div>
                  <p className="text-sm font-medium text-foreground">Include Timestamps</p>
                  <p className="text-xs text-muted-foreground">Add date/time to exports</p>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-warning" />
                <div>
                  <p className="text-sm font-medium text-foreground">Include Coordinates</p>
                  <p className="text-xs text-muted-foreground">Add GPS coordinates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-4">Account Statistics</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">247</p>
              <p className="text-xs text-muted-foreground">Flights Tracked</p>
            </div>
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <p className="text-2xl font-bold text-accent">18</p>
              <p className="text-xs text-muted-foreground">Hours Watched</p>
            </div>
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <p className="text-2xl font-bold text-success">8</p>
              <p className="text-xs text-muted-foreground">Bookmarks</p>
            </div>
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <p className="text-2xl font-bold text-warning">12</p>
              <p className="text-xs text-muted-foreground">Saved Searches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;