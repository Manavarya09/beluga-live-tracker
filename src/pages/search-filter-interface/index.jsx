import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';
import { FilterSection, AircraftFilters, RouteFilters, StatusFilters, TimeFilters } from './components/FilterSection';
import FilterChips from './components/FilterChips';
import SearchResults from './components/SearchResults';
import SavedSearches from './components/SavedSearches';
import Button from '../../components/ui/Button';


const SearchFilterInterface = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Filter states
  const [expandedSections, setExpandedSections] = useState({
    aircraft: true,
    routes: false,
    status: false,
    time: false
  });

  const [filters, setFilters] = useState({
    registration: 'all',
    minAge: '',
    maxAge: '',
    configuration: 'all',
    origin: '',
    destination: '',
    radius: '',
    status: ['in-flight'],
    departureFrom: '',
    departureTo: '',
    minDuration: '',
    maxDuration: ''
  });

  // Mock data
  const mockSuggestions = [
    {
      type: 'aircraft',
      icon: 'Plane',
      value: 'F-GSTC',
      label: 'F-GSTC',
      description: 'Beluga #1 - Currently in Hamburg'
    },
    {
      type: 'flight',
      icon: 'Navigation',
      value: 'BGA001',
      label: 'BGA001',
      description: 'Toulouse to Hamburg'
    },
    {
      type: 'airport',
      icon: 'MapPin',
      value: 'TLS',
      label: 'Toulouse-Blagnac (TLS)',
      description: 'Toulouse, France'
    },
    {
      type: 'route',
      icon: 'Route',
      value: 'TLS-HAM',
      label: 'TLS → HAM',
      description: 'Toulouse to Hamburg route'
    }
  ];

  const mockResults = [
    {
      id: 1,
      registration: 'F-GSTC',
      flightNumber: 'BGA001',
      status: 'in-flight',
      origin: 'TLS',
      destination: 'HAM',
      altitude: 35000,
      speed: 485,
      heading: 45,
      lastSeen: '2 min ago'
    },
    {
      id: 2,
      registration: 'F-GSTD',
      flightNumber: 'BGA002',
      status: 'landed',
      origin: 'HAM',
      destination: 'BRE',
      altitude: null,
      speed: 0,
      heading: null,
      lastSeen: '15 min ago'
    },
    {
      id: 3,
      registration: 'F-GSTE',
      flightNumber: null,
      status: 'scheduled',
      origin: 'SVQ',
      destination: 'TLS',
      altitude: null,
      speed: 0,
      heading: null,
      lastSeen: '1 hour ago'
    }
  ];

  const [savedSearches, setSavedSearches] = useState([
    {
      id: 1,
      name: 'Hamburg Operations',
      filters: { origin: 'HAM', status: ['in-flight', 'scheduled'] },
      createdAt: '2 days ago'
    },
    {
      id: 2,
      name: 'Active Flights',
      filters: { status: ['in-flight'] },
      createdAt: '1 week ago'
    }
  ]);

  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState(mockResults);

  // Filter search suggestions based on query
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Simulate search with loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Filter results based on current filters
      let filteredResults = mockResults;
      
      if (filters.status.length > 0) {
        filteredResults = filteredResults.filter(aircraft => 
          filters.status.includes(aircraft.status)
        );
      }
      
      if (filters.registration !== 'all') {
        filteredResults = filteredResults.filter(aircraft => 
          aircraft.registration === filters.registration
        );
      }

      if (searchQuery) {
        filteredResults = filteredResults.filter(aircraft =>
          aircraft.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (aircraft.flightNumber && aircraft.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
          aircraft.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          aircraft.destination.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setResults(filteredResults);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, searchQuery]);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  }, []);

  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  const handleSuggestionSelect = useCallback((suggestion) => {
    setSearchQuery(suggestion.value);
  }, []);

  const getActiveFilters = () => {
    const active = [];
    
    if (filters.registration !== 'all') {
      active.push({ type: 'registration', value: filters.registration, label: `Registration: ${filters.registration}` });
    }
    
    if (filters.status.length > 0 && filters.status.length < 5) {
      filters.status.forEach(status => {
        active.push({ type: 'status', value: status, label: `Status: ${status.replace('-', ' ')}` });
      });
    }
    
    if (filters.origin) {
      active.push({ type: 'origin', value: filters.origin, label: `From: ${filters.origin}` });
    }
    
    if (filters.destination) {
      active.push({ type: 'destination', value: filters.destination, label: `To: ${filters.destination}` });
    }

    return active;
  };

  const handleRemoveFilter = (filterType, value) => {
    if (filterType === 'status') {
      setFilters(prev => ({
        ...prev,
        status: prev.status.filter(s => s !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: filterType === 'registration' ? 'all' : ''
      }));
    }
  };

  const handleClearAllFilters = () => {
    setFilters({
      registration: 'all',
      minAge: '',
      maxAge: '',
      configuration: 'all',
      origin: '',
      destination: '',
      radius: '',
      status: [],
      departureFrom: '',
      departureTo: '',
      minDuration: '',
      maxDuration: ''
    });
    setSearchQuery('');
  };

  const handleSaveSearch = (name, currentFilters) => {
    const newSearch = {
      id: Date.now(),
      name,
      filters: { ...currentFilters },
      createdAt: 'Just now'
    };
    setSavedSearches(prev => [newSearch, ...prev]);
  };

  const handleLoadSearch = (search) => {
    setFilters(search.filters);
    setSearchQuery('');
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  const handleViewOnMap = (aircraft) => {
    navigate('/main-aircraft-tracking-dashboard', { 
      state: { selectedAircraft: aircraft.id } 
    });
  };

  const handleViewDetails = (aircraft) => {
    navigate('/aircraft-detail-modal', { 
      state: { aircraftId: aircraft.id } 
    });
  };

  const handleSetNotification = (aircraft) => {
    // Mock notification setup
    console.log('Setting notification for:', aircraft.registration);
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onNavigate={(path) => navigate(path)} 
        currentView="search-filter-interface"
        connectionStatus="connected"
      />

      <div className="pt-16 h-screen flex flex-col lg:flex-row">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden border-b border-border bg-card">
          <div className="flex items-center justify-between p-4">
            <h2 className="font-semibold text-foreground">Search & Filter</h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
            >
              Filters {hasActiveFilters && `(${activeFilters.length})`}
            </Button>
          </div>
        </div>

        {/* Search and Filter Sidebar */}
        <div className={`lg:w-96 lg:border-r lg:border-border bg-card flex flex-col ${
          showMobileFilters ? 'block' : 'hidden lg:flex'
        }`}>
          {/* Search Bar */}
          <div className="p-4 border-b border-border">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              suggestions={suggestions}
              onSuggestionSelect={handleSuggestionSelect}
              isLoading={isLoading}
            />
          </div>

          {/* Active Filters */}
          <FilterChips
            activeFilters={activeFilters}
            onRemoveFilter={handleRemoveFilter}
            onClearAll={handleClearAllFilters}
          />

          {/* Filter Sections */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <FilterSection
                title="Aircraft"
                icon="Plane"
                isExpanded={expandedSections.aircraft}
                onToggle={() => toggleSection('aircraft')}
                resultCount={results.length}
                hasActiveFilters={filters.registration !== 'all' || filters.minAge || filters.maxAge}
              >
                <AircraftFilters filters={filters} onFilterChange={handleFilterChange} />
              </FilterSection>

              <FilterSection
                title="Routes"
                icon="Route"
                isExpanded={expandedSections.routes}
                onToggle={() => toggleSection('routes')}
                hasActiveFilters={filters.origin || filters.destination || filters.radius}
              >
                <RouteFilters filters={filters} onFilterChange={handleFilterChange} />
              </FilterSection>

              <FilterSection
                title="Status"
                icon="Activity"
                isExpanded={expandedSections.status}
                onToggle={() => toggleSection('status')}
                hasActiveFilters={filters.status.length > 0}
              >
                <StatusFilters filters={filters} onFilterChange={handleFilterChange} />
              </FilterSection>

              <FilterSection
                title="Time"
                icon="Clock"
                isExpanded={expandedSections.time}
                onToggle={() => toggleSection('time')}
                hasActiveFilters={filters.departureFrom || filters.departureTo || filters.minDuration || filters.maxDuration}
              >
                <TimeFilters filters={filters} onFilterChange={handleFilterChange} />
              </FilterSection>
            </div>

            {/* Saved Searches */}
            <SavedSearches
              savedSearches={savedSearches}
              onLoadSearch={handleLoadSearch}
              onSaveSearch={handleSaveSearch}
              onDeleteSearch={handleDeleteSearch}
              currentFilters={filters}
            />
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 flex flex-col bg-background">
          <SearchResults
            results={results}
            isLoading={isLoading}
            onViewOnMap={handleViewOnMap}
            onSetNotification={handleSetNotification}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilterInterface;