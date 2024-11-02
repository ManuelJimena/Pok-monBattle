import React from 'react';
import { Pokemon, BattleAnimation } from '../types';
import HealthBar from './HealthBar';

interface BattleSceneProps {
  playerPokemon: Pokemon | null;
  enemyPokemon: Pokemon | null;
  playerHP: number;
  enemyHP: number;
  playerAnimation: BattleAnimation;
  enemyAnimation: BattleAnimation;
}

const BattleScene: React.FC<BattleSceneProps> = ({
  playerPokemon,
  enemyPokemon,
  playerHP,
  enemyHP,
  playerAnimation,
  enemyAnimation,
}) => {
  const getPlayerSprite = () => {
    if (!playerPokemon) return '';
    return playerPokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.back_default || 
           playerPokemon.sprites.back_default;
  };

  const getEnemySprite = () => {
    if (!enemyPokemon) return '';
    return enemyPokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || 
           enemyPokemon.sprites.front_default;
  };

  return (
    <div className="relative bg-green-100 border-4 border-gray-800 rounded-lg p-4 h-[500px]">
      {/* Enemy Section */}
      <div className="absolute top-4 right-4 z-10">
        <HealthBar
          current={enemyHP}
          max={100}
          name={enemyPokemon?.name || ''}
        />
      </div>
      <div 
        className={`absolute top-32 right-32 transition-transform duration-300
          ${enemyAnimation === 'damage' ? 'shake' : ''}
          ${enemyAnimation === 'attack' ? 'translate-x-[-20px]' : ''}`}
      >
        <img
          src={getEnemySprite()}
          alt={enemyPokemon?.name}
          className="w-48 h-48 object-contain pixelated"
          style={{
            filter: enemyAnimation === 'damage' ? 'brightness(1.5)' : 'none',
          }}
        />
      </div>
      
      {/* Player Section */}
      <div className="absolute bottom-4 left-4 z-10">
        <HealthBar
          current={playerHP}
          max={100}
          name={playerPokemon?.name || ''}
        />
      </div>
      <div 
        className={`absolute bottom-32 left-32 transition-transform duration-300
          ${playerAnimation === 'damage' ? 'shake' : ''}
          ${playerAnimation === 'attack' ? 'translate-x-[20px]' : ''}`}
      >
        <img
          src={getPlayerSprite()}
          alt={playerPokemon?.name}
          className="w-48 h-48 object-contain pixelated"
          style={{
            filter: playerAnimation === 'damage' ? 'brightness(1.5)' : 'none',
          }}
        />
      </div>
    </div>
  );
};

export default BattleScene;