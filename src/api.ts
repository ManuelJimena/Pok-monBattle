const SPANISH_MOVES: Record<string, string> = {
  'tackle': 'Placaje',
  'scratch': 'Arañazo',
  'ember': 'Ascuas',
  'water-gun': 'Pistola Agua',
  'thundershock': 'Impactrueno',
  'vine-whip': 'Látigo Cepa',
  'quick-attack': 'Ataque Rápido',
  'pound': 'Destructor',
  // Add more translations as needed
};

export const fetchPokemonList = async (): Promise<PokemonListItem[]> => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const data = await response.json();
  return data.results;
};

export const fetchPokemon = async (idOrName: number | string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  const data = await response.json();
  return data;
};

export const fetchMove = async (url: string): Promise<Move> => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    name: data.name,
    power: data.power,
    type: data.type.name,
    accuracy: data.accuracy,
    pp: data.pp,
    spanish_name: SPANISH_MOVES[data.name] || data.name
  };
};