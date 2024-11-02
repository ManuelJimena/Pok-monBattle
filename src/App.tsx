import React, { useState, useEffect } from 'react';
import BattleScene from './components/BattleScene';
import BattleMenu from './components/BattleMenu';
import BattleLog from './components/BattleLog';
import PokemonSelector from './components/PokemonSelector';
import GameOverScreen from './components/GameOverScreen';
import { Pokemon, Move, GameState, BattleAnimation } from './types';
import { fetchPokemon, fetchMove } from './api';

function App() {
  const [gameState, setGameState] = useState<GameState>('selection');
  const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
  const [enemyPokemon, setEnemyPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [playerHP, setPlayerHP] = useState(100);
  const [enemyHP, setEnemyHP] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [availableMoves, setAvailableMoves] = useState<Move[]>([]);
  const [playerAnimation, setPlayerAnimation] = useState<BattleAnimation>('none');
  const [enemyAnimation, setEnemyAnimation] = useState<BattleAnimation>('none');

  const initializeBattle = async (playerName: string, enemyName?: string) => {
    setLoading(true);
    try {
      const player = await fetchPokemon(playerName);
      const enemy = await fetchPokemon(enemyName || Math.floor(Math.random() * 151) + 1);
      
      const movePromises = player.moves
        .sort(() => 0.5 - Math.random())
        .slice(0, 4)
        .map(m => fetchMove(m.move.url));
      
      const moves = await Promise.all(movePromises);
      
      setPlayerPokemon(player);
      setEnemyPokemon(enemy);
      setAvailableMoves(moves);
      setPlayerHP(100);
      setEnemyHP(100);
      setIsPlayerTurn(true);
      setBattleLog([`¡Un ${enemy.name} salvaje apareció!`]);
      setGameState('battle');
    } catch (error) {
      setBattleLog(['Error al cargar el combate. Inténtalo de nuevo.']);
    } finally {
      setLoading(false);
    }
  };

  const playAnimation = async (attacker: 'player' | 'enemy', damage: number) => {
    if (attacker === 'player') {
      setPlayerAnimation('attack');
      await new Promise(resolve => setTimeout(resolve, 300));
      setPlayerAnimation('none');
      setEnemyAnimation('damage');
      await new Promise(resolve => setTimeout(resolve, 300));
      setEnemyAnimation('none');
    } else {
      setEnemyAnimation('attack');
      await new Promise(resolve => setTimeout(resolve, 300));
      setEnemyAnimation('none');
      setPlayerAnimation('damage');
      await new Promise(resolve => setTimeout(resolve, 300));
      setPlayerAnimation('none');
    }
  };

  const handleAttack = async (move: Move) => {
    if (!isPlayerTurn || !playerPokemon || !enemyPokemon) return;
    
    const damage = Math.floor(((move.power || 40) * (Math.random() * 0.4 + 0.8)));
    await playAnimation('player', damage);
    setEnemyHP((prev) => Math.max(0, prev - damage));
    setBattleLog((prev) => [...prev, `¡${playerPokemon.name} usó ${move.spanish_name}!`]);
    setIsPlayerTurn(false);
    
    if (enemyHP - damage <= 0) {
      setBattleLog((prev) => [...prev, `¡${enemyPokemon.name} se debilitó!`, "¡Has ganado el combate!"]);
      setGameState('gameover');
      return;
    }

    // Enemy turn
    setTimeout(async () => {
      const enemyMoveData = enemyPokemon.moves[Math.floor(Math.random() * enemyPokemon.moves.length)].move;
      const enemyMove = await fetchMove(enemyMoveData.url);
      const enemyDamage = Math.floor(((enemyMove.power || 40) * (Math.random() * 0.4 + 0.8)));
      
      await playAnimation('enemy', enemyDamage);
      setPlayerHP((prev) => Math.max(0, prev - enemyDamage));
      setBattleLog((prev) => [...prev, `¡${enemyPokemon.name} usó ${enemyMove.spanish_name}!`]);
      
      if (playerHP - enemyDamage <= 0) {
        setBattleLog((prev) => [...prev, `¡${playerPokemon.name} se debilitó!`, "¡Has perdido el combate!"]);
        setGameState('gameover');
      } else {
        setIsPlayerTurn(true);
      }
    }, 1500);
  };

  const handleRematch = () => {
    if (playerPokemon && enemyPokemon) {
      initializeBattle(playerPokemon.name, enemyPokemon.name);
    }
  };

  const handleNewBattle = () => {
    setGameState('selection');
    setBattleLog([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center">
        <div className="text-white text-2xl font-pokemon animate-pulse">
          Cargando combate...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-8">
      <div className="container mx-auto max-w-4xl">
        {gameState === 'selection' && (
          <PokemonSelector onSelect={(name) => initializeBattle(name)} />
        )}
        
        {gameState === 'battle' && (
          <>
            <BattleScene
              playerPokemon={playerPokemon}
              enemyPokemon={enemyPokemon}
              playerHP={playerHP}
              enemyHP={enemyHP}
              playerAnimation={playerAnimation}
              enemyAnimation={enemyAnimation}
            />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <BattleLog messages={battleLog} />
              <BattleMenu
                onAttack={handleAttack}
                moves={availableMoves}
                disabled={!isPlayerTurn || playerHP <= 0 || enemyHP <= 0}
              />
            </div>
          </>
        )}

        {gameState === 'gameover' && (
          <GameOverScreen
            winner={playerHP > 0 ? playerPokemon?.name || '' : enemyPokemon?.name || ''}
            onRematch={handleRematch}
            onNewBattle={handleNewBattle}
          />
        )}
      </div>
    </div>
  );
}

export default App;