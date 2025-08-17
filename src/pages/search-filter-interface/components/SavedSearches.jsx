import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ savedSearches, onLoadSearch, onSaveSearch, onDeleteSearch, currentFilters }) => {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [searchName, setSearchName] = useState('');

  const handleSaveSearch = () => {
    if (searchName?.trim()) {
      onSaveSearch(searchName?.trim(), currentFilters);
      setSearchName('');
      setShowSaveDialog(false);
    }
  };

  const hasActiveFilters = () => {
    return Object.values(currentFilters)?.some(value => {
      if (Array.isArray(value)) return value?.length > 0;
      return value && value !== '' && value !== 'all';
    });
  };

  return (
    <div className="border-t border-border bg-card">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-foreground">Saved Searches</h3>
          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSaveDialog(true)}
              iconName="Plus"
              iconPosition="left"
              iconSize={14}
            >
              Save Current
            </Button>
          )}
        </div>

        {showSaveDialog && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <Input
              label="Search Name"
              placeholder="Enter a name for this search"
              value={searchName}
              onChange={(e) => setSearchName(e?.target?.value)}
              className="mb-3"
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveSearch}
                disabled={!searchName?.trim()}
              >
                Save
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowSaveDialog(false);
                  setSearchName('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {savedSearches?.length === 0 ? (
          <div className="text-center py-6">
            <Icon name="Bookmark" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No saved searches yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {savedSearches?.map((search) => (
              <div
                key={search?.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm truncate">
                    {search?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Saved {search?.createdAt}
                  </p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onLoadSearch(search)}
                    className="h-8 w-8"
                    iconName="Search"
                    iconSize={14}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteSearch(search?.id)}
                    className="h-8 w-8 text-error hover:text-error"
                    iconName="Trash2"
                    iconSize={14}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedSearches;