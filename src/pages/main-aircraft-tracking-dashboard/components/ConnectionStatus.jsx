import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ConnectionStatus = ({ status = 'connected', lastUpdate, dataPoints = 0 }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          color: 'text-success',
          bgColor: 'bg-success/20',
          icon: 'Wifi',
          label: 'Connected',
          animation: 'animate-pulse-soft'
        };
      case 'disconnected':
        return {
          color: 'text-error',
          bgColor: 'bg-error/20',
          icon: 'WifiOff',
          label: 'Disconnected',
          animation: ''
        };
      case 'reconnecting':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/20',
          icon: 'RotateCw',
          label: 'Reconnecting',
          animation: 'animate-spin'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/20',
          icon: 'Wifi',
          label: 'Unknown',
          animation: ''
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="fixed top-20 left-4 z-30 md:top-24 md:left-6"
    >
      <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 aviation-shadow">
        <div className="flex items-center space-x-3">
          {/* Status Indicator */}
          <div className={`w-8 h-8 ${config?.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon 
              name={config?.icon} 
              size={16} 
              className={`${config?.color} ${config?.animation}`}
            />
          </div>

          {/* Status Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${config?.color}`}>
                {config?.label}
              </span>
              {status === 'connected' && (
                <div className={`w-2 h-2 ${config?.bgColor} rounded-full ${config?.animation}`} />
              )}
            </div>
            
            {lastUpdate && (
              <div className="text-xs text-muted-foreground">
                Last update: {lastUpdate}
              </div>
            )}
            
            {status === 'connected' && dataPoints > 0 && (
              <div className="text-xs text-muted-foreground">
                {dataPoints} data points received
              </div>
            )}
          </div>
        </div>

        {/* Connection Quality Indicator */}
        {status === 'connected' && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Signal:</span>
              <div className="flex space-x-1">
                {[1, 2, 3, 4]?.map((bar) => (
                  <div
                    key={bar}
                    className={`w-1 rounded-full ${
                      bar <= 3 ? 'bg-success h-2' : 'bg-muted h-1'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-success font-medium">Strong</span>
            </div>
          </div>
        )}

        {/* Reconnection Info */}
        {status === 'reconnecting' && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="text-xs text-warning">
              Attempting to reconnect...
            </div>
          </div>
        )}

        {/* Disconnection Info */}
        {status === 'disconnected' && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <div className="text-xs text-error">
              Connection lost. Check network.
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConnectionStatus;