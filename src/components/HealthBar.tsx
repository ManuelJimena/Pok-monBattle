import React from 'react';

interface HealthBarProps {
  current: number;
  max: number;
  name: string;
  level?: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max, name, level = 50 }) => {
  const percentage = (current / max) * 100;
  const healthColor = percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white border-4 border-gray-800 rounded p-2 w-64">
      <div className="flex justify-between mb-1">
        <span className="font-pokemon text-lg capitalize">{name}</span>
        <span className="font-pokemon text-lg">Nv{level}</span>
      </div>
      <div className="w-full bg-gray-200 rounded h-4 border-2 border-gray-400">
        <div
          className={`${healthColor} h-full rounded transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right mt-1 font-pokemon">
        {current}/{max} PS
      </div>
    </div>
  );
}

export default HealthBar;