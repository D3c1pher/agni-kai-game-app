import type { FireMasterPattern } from './types'

export type { FireMasterPattern } from './types'

export const FIRE_MASTER_PATTERNS = [
  {
    id: 'relentless-flame',
    name: 'Relentless Flame',
    moves: ['Strike', 'Guard', 'Strike', 'Guard', 'Strike'],
  },
  {
    id: 'breathing-ember',
    name: 'Breathing Ember',
    moves: ['Guard', 'Recover', 'Strike', 'Guard', 'Strike'],
  },
  {
    id: 'iron-stance',
    name: 'Iron Stance',
    moves: ['Guard', 'Strike', 'Guard', 'Strike', 'Recover'],
  },
  {
    id: 'burning-rhythm',
    name: 'Burning Rhythm',
    moves: ['Guard', 'Charge', 'Strike', 'Recover', 'Strike'],
  },
  {
    id: 'gathering-storm',
    name: 'Gathering Storm',
    moves: ['Strike', 'Charge', 'Lightning', 'Recover', 'Guard'],
  },
  {
    id: 'false-spark',
    name: 'False Spark',
    moves: ['Strike', 'Charge', 'Recover', 'Guard', 'Strike'],
  },
] as const satisfies readonly FireMasterPattern[]
