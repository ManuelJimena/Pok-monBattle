import React from 'react';

interface GameOverScreenProps {
  winner: string;
  onRematch: () => void;
  onNewBattle: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ winner, onRematch, onNewBattle }) => {
  return (
    <div className="bg-white border-4 border-gray-800 rounded p-8 text-center">
      <h2 className="font-pokemon text-2xl mb-6">¡Combate Terminado!</h2>
      <p className="font-pokemon text-xl mb-8">¡{winner} ha ganado!</p>
      <div className="space-y-4">
        <button
          onClick={onRematch}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white 
                   rounded font-pokemon text-lg"
        >
          Revancha
        </button>
        <button
          onClick={onNewBattle}
          className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white 
                   rounded font-pokemon text-lg"
        >
          Nueva Batalla
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;