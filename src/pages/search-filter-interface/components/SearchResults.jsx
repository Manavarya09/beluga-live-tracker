import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResults = ({ results, isLoading, onViewOnMap, onSetNotification, onViewDetails }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Searching aircraft...</p>
        </div>
      </div>
    );
  }

  if (results?.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No aircraft found</h3>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search criteria or filters to find more results.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'in-flight':
        return 'text-success bg-success/10';
      case 'landed':
        return 'text-muted-foreground bg-muted';
      case 'scheduled':
        return 'text-warning bg-warning/10';
      case 'delayed':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-flight':
        return 'Plane';
      case 'landed':
        return 'MapPin';
      case 'scheduled':
        return 'Clock';
      case 'delayed':
        return 'AlertTriangle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 border-b border-border">
        <p className="text-sm text-muted-foreground">
          Found {results?.length} aircraft matching your criteria
        </p>
      </div>
      <div className="space-y-3 p-4">
        {results?.map((aircraft) => (
          <div
            key={aircraft?.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">{aircraft?.registration}</h3>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(aircraft?.status)}`}>
                    <Icon name={getStatusIcon(aircraft?.status)} size={12} />
                    <span>{aircraft?.status?.replace('-', ' ')?.toUpperCase()}</span>
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {aircraft?.flightNumber || 'No flight number'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onSetNotification(aircraft)}
                className="flex-shrink-0"
                iconName="Bell"
                iconSize={16}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Route</p>
                <p className="font-medium text-foreground">
                  {aircraft?.origin} → {aircraft?.destination}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {aircraft?.status === 'in-flight' ? 'Altitude' : 'Last Seen'}
                </p>
                <p className="font-medium text-foreground">
                  {aircraft?.status === 'in-flight' 
                    ? `${aircraft?.altitude?.toLocaleString()} ft`
                    : aircraft?.lastSeen
                  }
                </p>
              </div>
            </div>

            {aircraft?.status === 'in-flight' && (
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Speed</p>
                  <p className="font-medium text-foreground">{aircraft?.speed} kts</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Heading</p>
                  <p className="font-medium text-foreground">{aircraft?.heading}°</p>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => onViewOnMap(aircraft)}
                iconName="Map"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                View on Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(aircraft)}
                iconName="Info"
                iconPosition="left"
                iconSize={14}
                className="flex-1"
              >
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;