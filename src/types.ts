export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    versions?: {
      'generation-v'?: {
        'black-white'?: {
          animated?: {
            front_default: string;
            back_default: string;
            front_shiny: string;
            back_shiny: string;
          }
        }
      }
    }
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  moves: Array<{
    move: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

export interface Move {
  name: string;
  power: number | null;
  type: string;
  accuracy: number | null;
  pp: number;
  spanish_name: string;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export type GameState = 'selection' | 'battle' | 'gameover';

export type BattleAnimation = 'attack' | 'damage' | 'none';