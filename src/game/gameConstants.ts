import type { ChallengerAction, FireMasterAction } from './types'

export const STORAGE_KEY = 'agni-kai-game-state-v1'

export const MAX_ACTIVE_CHALLENGERS = 3
export const MAX_REVEALED_FUTURE_TURNS = MAX_ACTIVE_CHALLENGERS
export const DEFAULT_CHALLENGER_MAX_HEALTH = 1
export const DEFAULT_FIRE_MASTER_HEALTH_MULTIPLIER = 2
export const DEFAULT_FIRE_MASTER_HEALTH_ADDITION = 10
export const FIRE_MASTER_RECOVERY = 2
export const TURN_LOG_LIMIT = 10

export const PLAYER_ACTIONS = [
  'Strike',
  'Guard',
  'Charge',
  'Lightning',
  'Read',
] as const satisfies readonly ChallengerAction[]

export const FIRE_MASTER_ACTIONS = [
  'Strike',
  'Guard',
  'Charge',
  'Lightning',
  'Recover',
] as const satisfies readonly FireMasterAction[]
