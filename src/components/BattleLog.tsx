import React from 'react';

interface BattleLogProps {
  messages: string[];
}

const BattleLog: React.FC<BattleLogProps> = ({ messages }) => {
  return (
    <div className="bg-white border-4 border-gray-800 rounded p-4 h-32 overflow-y-auto">
      <div className="font-pokemon text-lg space-y-1">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}

export default BattleLog;