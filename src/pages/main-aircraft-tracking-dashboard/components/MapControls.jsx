import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const MapControls = ({ 
  onZoomIn, 
  onZoomOut, 
  onCenterLocation, 
  onToggleLayer, 
  currentLayer = 'satellite',
  isFollowingAircraft = false,
  onToggleFollow 
}) => {
  const layerOptions = [
    { value: 'satellite', label: 'Satellite', icon: 'Satellite' },
    { value: 'terrain', label: 'Terrain', icon: 'Mountain' },
    { value: 'street', label: 'Street', icon: 'Map' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-4 right-4 z-30 flex flex-col space-y-2"
    >
      {/* Zoom Controls */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1 aviation-shadow">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          iconName="Plus"
          iconSize={18}
          className="w-10 h-10"
          title="Zoom In"
        />
        <div className="w-full h-px bg-border my-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          iconName="Minus"
          iconSize={18}
          className="w-10 h-10"
          title="Zoom Out"
        />
      </div>
      {/* Layer Toggle */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1 aviation-shadow">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleLayer}
          iconName={layerOptions?.find(l => l?.value === currentLayer)?.icon || 'Map'}
          iconSize={18}
          className="w-10 h-10"
          title={`Current: ${layerOptions?.find(l => l?.value === currentLayer)?.label}`}
        />
      </div>
      {/* Location Center */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1 aviation-shadow">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCenterLocation}
          iconName="Crosshair"
          iconSize={18}
          className="w-10 h-10"
          title="Center on Location"
        />
      </div>
      {/* Follow Aircraft Toggle */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-1 aviation-shadow">
        <Button
          variant={isFollowingAircraft ? "default" : "ghost"}
          size="icon"
          onClick={onToggleFollow}
          iconName="Navigation"
          iconSize={18}
          className="w-10 h-10"
          title={isFollowingAircraft ? "Stop Following" : "Follow Selected Aircraft"}
        />
      </div>
      {/* Compass */}
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 aviation-shadow">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute inset-0 border-2 border-border rounded-full" />
          <div className="w-1 h-3 bg-error rounded-full transform -translate-y-1" />
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-error">
            N
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapControls;