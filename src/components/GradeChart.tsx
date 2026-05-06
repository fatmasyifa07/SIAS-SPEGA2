import React from 'react';
import { 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  XAxis, 
  YAxis,
  AreaChart,
  Area
} from 'recharts';

interface GradeChartProps {
  data: { name: string; nilai: number }[];
}

export default function GradeChart({ data }: GradeChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNilai" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: '#64748b' }}
            dy={10}
          />
          <YAxis 
            hide
            domain={[60, 100]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              borderRadius: '8px', 
              border: 'none', 
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
            }}
          />
          <Area 
            type="monotone" 
            dataKey="nilai" 
            stroke="#1e3a8a" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorNilai)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
