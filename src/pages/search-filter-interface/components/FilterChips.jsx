import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  if (activeFilters?.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-muted/30 border-b border-border">
      <span className="text-sm text-muted-foreground font-medium">Active filters:</span>
      {activeFilters?.map((filter) => (
        <div
          key={`${filter?.type}-${filter?.value}`}
          className="flex items-center space-x-1 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm"
        >
          <span>{filter?.label}</span>
          <button
            onClick={() => onRemoveFilter(filter?.type, filter?.value)}
            className="hover:bg-accent-foreground/20 rounded-full p-0.5 transition-colors"
          >
            <Icon name="X" size={12} />
          </button>
        </div>
      ))}
      {activeFilters?.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default FilterChips;