import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ filters, onFilterChange, aircraftCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', count: aircraftCount },
    { value: 'In Flight', label: 'In Flight', count: 8 },
    { value: 'Landed', label: 'Landed', count: 2 },
    { value: 'Delayed', label: 'Delayed', count: 1 },
    { value: 'Maintenance', label: 'Maintenance', count: 1 }
  ];

  const altitudeOptions = [
    { value: 'all', label: 'All Altitudes' },
    { value: '0-10000', label: '0-10k ft' },
    { value: '10000-25000', label: '10k-25k ft' },
    { value: '25000-40000', label: '25k-40k ft' },
    { value: '40000-50000', label: '40k+ ft' }
  ];

  const handleStatusFilter = (status) => {
    onFilterChange({ ...filters, status });
  };

  const handleAltitudeFilter = (altitudeRange) => {
    onFilterChange({ ...filters, altitudeRange });
  };

  const clearFilters = () => {
    onFilterChange({ status: 'all', altitudeRange: 'all' });
  };

  const hasActiveFilters = filters?.status !== 'all' || filters?.altitudeRange !== 'all';

  return (
    <div className="absolute top-20 left-4 right-4 z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center gap-2"
      >
        {/* Active Aircraft Count */}
        <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-2 rounded-full text-sm font-medium shadow-lg">
          <Icon name="Plane" size={14} className="inline mr-1" />
          {aircraftCount} Global Belugas Active
        </div>

        {/* Enhanced Status Filter */}
        <select
          value={filters?.status}
          onChange={(e) => onFilterChange({ ...filters, status: e?.target?.value })}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shadow-lg cursor-pointer"
        >
          <option value="all">All Status ({aircraftCount})</option>
          <option value="In Flight">In Flight</option>
          <option value="Landed">Landed</option>
          <option value="Delayed">Delayed</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Loading">Loading</option>
          <option value="Preparing">Preparing</option>
        </select>

        {/* Enhanced Region Filter */}
        <select
          value={filters?.region || 'all'}
          onChange={(e) => onFilterChange({ ...filters, region: e?.target?.value })}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shadow-lg cursor-pointer"
        >
          <option value="all">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Asia">Asia</option>
          <option value="Middle East">Middle East</option>
          <option value="South America">South America</option>
          <option value="Australia">Australia</option>
          <option value="Transatlantic">Transatlantic</option>
          <option value="Asia-Europe">Asia-Europe</option>
        </select>

        {/* Enhanced Altitude Range Filter */}
        <select
          value={filters?.altitudeRange}
          onChange={(e) => onFilterChange({ ...filters, altitudeRange: e?.target?.value })}
          className="bg-card/90 backdrop-blur-sm border border-border rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors shadow-lg cursor-pointer"
        >
          <option value="all">All Altitudes</option>
          <option value="ground">Ground (0 ft)</option>
          <option value="low">Low (1-20,000 ft)</option>
          <option value="medium">Medium (20,001-35,000 ft)</option>
          <option value="high">High (35,001+ ft)</option>
        </select>

        {/* Worldwide Coverage Indicator */}
        <div className="bg-green-500/20 backdrop-blur-sm border border-green-500 text-green-600 px-3 py-2 rounded-full text-sm font-medium shadow-lg">
          <Icon name="Globe" size={14} className="inline mr-1" />
          Worldwide Coverage
        </div>

        {/* Real-time Status */}
        <div className="bg-blue-500/20 backdrop-blur-sm border border-blue-500 text-blue-600 px-3 py-2 rounded-full text-sm font-medium shadow-lg animate-pulse">
          <Icon name="Radio" size={14} className="inline mr-1" />
          Live Tracking
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filters</span>
            </div>
            <Button
              variant="ghost"
              size="xs"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={12}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        )}

        {/* Status Filters */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Flight Status
          </div>
          <div className="flex flex-wrap gap-2">
            {statusOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={filters?.status === option?.value ? "default" : "outline"}
                size="xs"
                onClick={() => handleStatusFilter(option?.value)}
                className="text-xs"
              >
                {option?.label}
                {option?.count !== undefined && (
                  <span className="ml-1 opacity-70">({option?.count})</span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Altitude Filters */}
        <div className="space-y-2 mt-3">
          <div className="text-xs text-muted-foreground uppercase tracking-wide">
            Altitude Range
          </div>
          <div className="flex flex-wrap gap-2">
            {altitudeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={filters?.altitudeRange === option?.value ? "default" : "outline"}
                size="xs"
                onClick={() => handleAltitudeFilter(option?.value)}
                className="text-xs"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Icon name="Info" size={12} />
              <span>
                Showing filtered results
                {filters?.status !== 'all' && ` • Status: ${filters?.status}`}
                {filters?.altitudeRange !== 'all' && ` • Altitude: ${filters?.altitudeRange} ft`}
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FilterChips;