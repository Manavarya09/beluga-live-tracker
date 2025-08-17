import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const AltitudeSpeedChart = ({ aircraft }) => {
  const chartData = [
    { time: '14:30', altitude: 0, speed: 0 },
    { time: '14:35', altitude: 8500, speed: 180 },
    { time: '14:40', altitude: 15200, speed: 280 },
    { time: '14:45', altitude: 22000, speed: 420 },
    { time: '14:50', altitude: 25000, speed: 480 },
    { time: '14:55', altitude: 25000, speed: 510 },
    { time: '15:00', altitude: 25000, speed: 520 },
    { time: '15:05', altitude: 25000, speed: 515 },
    { time: '15:10', altitude: 25000, speed: 518 },
    { time: '15:15', altitude: 25000, speed: 522 },
    { time: '15:20', altitude: 25000, speed: 520 },
    { time: '15:25', altitude: 25000, speed: 516 },
    { time: '15:30', altitude: 25000, speed: 519 },
    { time: '15:35', altitude: 25000, speed: 521 },
    { time: '15:40', altitude: 25000, speed: 518 },
    { time: '15:45', altitude: 25000, speed: 520 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-background/95 border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">{`Time: ${label}`}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-foreground">
                {entry?.dataKey === 'altitude' 
                  ? `${entry?.value?.toLocaleString()} ft` 
                  : `${entry?.value} kts`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card/50 rounded-lg p-4 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} className="text-accent" />
          <h3 className="text-sm font-medium text-foreground">Altitude & Speed Profile</h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-muted-foreground">Altitude</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Speed</span>
          </div>
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="altitude"
              orientation="left"
              stroke="var(--color-accent)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000)?.toFixed(0)}k`}
            />
            <YAxis 
              yAxisId="speed"
              orientation="right"
              stroke="var(--color-success)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              yAxisId="altitude"
              type="monotone"
              dataKey="altitude"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
            <Line
              yAxisId="speed"
              type="monotone"
              dataKey="speed"
              stroke="var(--color-success)"
              strokeWidth={2}
              dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, stroke: 'var(--color-success)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Current Values */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-background/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-xs text-muted-foreground">Current Altitude</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{aircraft?.altitude?.toLocaleString()} ft</p>
          <p className="text-xs text-success">+150 ft/min</p>
        </div>
        <div className="bg-background/50 rounded-lg p-3 border border-border/50">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Gauge" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Ground Speed</span>
          </div>
          <p className="text-lg font-semibold text-foreground">{aircraft?.speed} kts</p>
          <p className="text-xs text-muted-foreground">Stable</p>
        </div>
      </div>
    </div>
  );
};

export default AltitudeSpeedChart;