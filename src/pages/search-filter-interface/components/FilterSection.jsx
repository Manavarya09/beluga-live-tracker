import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterSection = ({ 
  title, 
  icon, 
  isExpanded, 
  onToggle, 
  children, 
  resultCount = 0,
  hasActiveFilters = false 
}) => {
  return (
    <div className="border border-border rounded-lg bg-card">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={20} className="text-primary" />
          <span className="font-medium text-foreground">{title}</span>
          {hasActiveFilters && (
            <div className="w-2 h-2 bg-accent rounded-full"></div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {resultCount > 0 && (
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
              {resultCount}
            </span>
          )}
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-muted-foreground" 
          />
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

const AircraftFilters = ({ filters, onFilterChange }) => {
  const registrationOptions = [
    { value: 'all', label: 'All Registrations' },
    { value: 'F-GSTC', label: 'F-GSTC (Beluga #1)' },
    { value: 'F-GSTD', label: 'F-GSTD (Beluga #2)' },
    { value: 'F-GSTE', label: 'F-GSTE (Beluga #3)' },
    { value: 'F-GSTF', label: 'F-GSTF (Beluga #4)' },
    { value: 'F-GSTG', label: 'F-GSTG (Beluga #5)' }
  ];

  const configurationOptions = [
    { value: 'all', label: 'All Configurations' },
    { value: 'standard', label: 'Standard Cargo' },
    { value: 'oversized', label: 'Oversized Parts' }
  ];

  return (
    <div className="space-y-4">
      <Select
        label="Aircraft Registration"
        options={registrationOptions}
        value={filters?.registration}
        onChange={(value) => onFilterChange('registration', value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Min Age (years)"
          type="number"
          placeholder="0"
          value={filters?.minAge}
          onChange={(e) => onFilterChange('minAge', e?.target?.value)}
        />
        <Input
          label="Max Age (years)"
          type="number"
          placeholder="30"
          value={filters?.maxAge}
          onChange={(e) => onFilterChange('maxAge', e?.target?.value)}
        />
      </div>
      <Select
        label="Configuration"
        options={configurationOptions}
        value={filters?.configuration}
        onChange={(value) => onFilterChange('configuration', value)}
      />
    </div>
  );
};

const RouteFilters = ({ filters, onFilterChange }) => {
  const airportOptions = [
    { value: '', label: 'Select Airport' },
    { value: 'TLS', label: 'TLS - Toulouse-Blagnac' },
    { value: 'HAM', label: 'HAM - Hamburg' },
    { value: 'BRE', label: 'BRE - Bremen' },
    { value: 'SVQ', label: 'SVQ - Seville' },
    { value: 'XFW', label: 'XFW - Hamburg-Finkenwerder' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Origin Airport"
          options={airportOptions}
          value={filters?.origin}
          onChange={(value) => onFilterChange('origin', value)}
          searchable
        />
        <Select
          label="Destination Airport"
          options={airportOptions}
          value={filters?.destination}
          onChange={(value) => onFilterChange('destination', value)}
          searchable
        />
      </div>
      <Input
        label="Search Radius (km)"
        type="number"
        placeholder="50"
        description="Search within radius of selected location"
        value={filters?.radius}
        onChange={(e) => onFilterChange('radius', e?.target?.value)}
      />
    </div>
  );
};

const StatusFilters = ({ filters, onFilterChange }) => {
  const statusOptions = [
    { id: 'in-flight', label: 'In Flight', count: 3 },
    { id: 'landed', label: 'Landed', count: 2 },
    { id: 'scheduled', label: 'Scheduled', count: 1 },
    { id: 'delayed', label: 'Delayed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 }
  ];

  return (
    <div className="space-y-3">
      {statusOptions?.map((status) => (
        <div key={status?.id} className="flex items-center justify-between">
          <Checkbox
            label={status?.label}
            checked={filters?.status?.includes(status?.id)}
            onChange={(e) => {
              const newStatus = e?.target?.checked
                ? [...filters?.status, status?.id]
                : filters?.status?.filter(s => s !== status?.id);
              onFilterChange('status', newStatus);
            }}
          />
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
            {status?.count}
          </span>
        </div>
      ))}
    </div>
  );
};

const TimeFilters = ({ filters, onFilterChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Departure From"
          type="datetime-local"
          value={filters?.departureFrom}
          onChange={(e) => onFilterChange('departureFrom', e?.target?.value)}
        />
        <Input
          label="Departure To"
          type="datetime-local"
          value={filters?.departureTo}
          onChange={(e) => onFilterChange('departureTo', e?.target?.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Min Duration (hours)"
          type="number"
          placeholder="0"
          step="0.5"
          value={filters?.minDuration}
          onChange={(e) => onFilterChange('minDuration', e?.target?.value)}
        />
        <Input
          label="Max Duration (hours)"
          type="number"
          placeholder="12"
          step="0.5"
          value={filters?.maxDuration}
          onChange={(e) => onFilterChange('maxDuration', e?.target?.value)}
        />
      </div>
    </div>
  );
};

export { FilterSection, AircraftFilters, RouteFilters, StatusFilters, TimeFilters };