import React from 'react';
import { Move } from '../types';

interface BattleMenuProps {
  onAttack: (move: Move) => void;
  moves: Move[];
  disabled: boolean;
}

const BattleMenu: React.FC<BattleMenuProps> = ({ onAttack, moves, disabled }) => {
  return (
    <div className="bg-white border-4 border-gray-800 rounded p-4 grid grid-cols-2 gap-2">
      {moves.map((move, index) => (
        <button
          key={index}
          onClick={() => onAttack(move)}
          disabled={disabled}
          className="text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 
                   disabled:opacity-50 disabled:cursor-not-allowed 
                   border-2 border-gray-300 rounded font-pokemon text-lg"
        >
          <div>{move.spanish_name}</div>
          <div className="text-sm text-gray-600">
            PP: {move.pp} | Poder: {move.power || '-'}
          </div>
        </button>
      ))}
    </div>
  );
}

export default BattleMenu;