import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../api';
import type { PokemonListItem } from '../types';

interface PokemonSelectorProps {
  onSelect: (pokemonName: string) => void;
  disabled?: boolean;
}

const PokemonSelector: React.FC<PokemonSelectorProps> = ({ onSelect, disabled }) => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemonList = async () => {
      const list = await fetchPokemonList();
      setPokemonList(list);
      setLoading(false);
    };
    loadPokemonList();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-pokemon text-lg animate-pulse">
        Cargando Pokémon...
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-gray-800 rounded p-4">
      <h2 className="font-pokemon text-xl mb-4">Elige tu Pokémon</h2>
      <div className="grid grid-cols-3 gap-2 max-h-96 overflow-y-auto">
        {pokemonList.map((pokemon) => (
          <button
            key={pokemon.name}
            onClick={() => onSelect(pokemon.name)}
            disabled={disabled}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 
                     disabled:cursor-not-allowed border-2 border-gray-300 rounded 
                     font-pokemon text-lg capitalize"
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PokemonSelector;