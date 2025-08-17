import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, suggestions, onSuggestionSelect, isLoading }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  useEffect(() => {
    setShowSuggestions(searchQuery?.length > 0 && suggestions?.length > 0);
    setSelectedIndex(-1);
  }, [searchQuery, suggestions]);

  const handleKeyDown = (e) => {
    if (!showSuggestions) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0) {
          onSuggestionSelect(suggestions?.[selectedIndex]);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
    inputRef?.current?.focus();
  };

  const clearSearch = () => {
    onSearchChange('');
    inputRef?.current?.focus();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          {isLoading ? (
            <Icon name="Loader2" size={20} className="text-muted-foreground animate-spin" />
          ) : (
            <Icon name="Search" size={20} className="text-muted-foreground" />
          )}
        </div>
        
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search aircraft registration, flight number, airport..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 h-12 text-base"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
          >
            <Icon name="X" size={16} className="text-muted-foreground" />
          </button>
        )}
      </div>
      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
        >
          {suggestions?.map((suggestion, index) => (
            <div
              key={`${suggestion?.type}-${suggestion?.value}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
                index === selectedIndex 
                  ? 'bg-accent text-accent-foreground' 
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex-shrink-0">
                <Icon 
                  name={suggestion?.icon} 
                  size={16} 
                  className={index === selectedIndex ? 'text-accent-foreground' : 'text-muted-foreground'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {suggestion?.label}
                </div>
                {suggestion?.description && (
                  <div className={`text-xs truncate ${
                    index === selectedIndex ? 'text-accent-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {suggestion?.description}
                  </div>
                )}
              </div>
              <div className="flex-shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  index === selectedIndex 
                    ? 'bg-accent-foreground/20 text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {suggestion?.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;