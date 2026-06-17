import { FIRE_MASTER_PATTERNS } from './fireMasterPatterns'
import type {
  Challenger,
  FireMasterAction,
  FireMasterPattern,
  GameState,
} from './types'

export function getActiveChallengers(gameState: GameState): Challenger[] {
  return gameState.challengers.filter(
    (challenger) => challenger.isActive && challenger.health > 0,
  )
}

export function getBackupChallengers(gameState: GameState): Challenger[] {
  return gameState.challengers.filter(
    (challenger) => !challenger.isActive && challenger.health > 0,
  )
}

export function getDeadChallengers(gameState: GameState): Challenger[] {
  return gameState.challengers.filter((challenger) => challenger.health <= 0)
}

export function getCurrentPattern(gameState: GameState): FireMasterPattern {
  return findPatternById(gameState.fireMaster.patternId)
}

export function getCurrentFireMasterAction(
  gameState: GameState,
): FireMasterAction {
  return getCurrentPattern(gameState).moves[gameState.fireMaster.moveIndex]
}

export function chooseRandomPattern(): FireMasterPattern {
  const patternIndex = Math.floor(Math.random() * FIRE_MASTER_PATTERNS.length)

  return FIRE_MASTER_PATTERNS[patternIndex]
}

export function findPatternById(patternId: string): FireMasterPattern {
  return (
    FIRE_MASTER_PATTERNS.find((pattern) => pattern.id === patternId) ??
    FIRE_MASTER_PATTERNS[0]
  )
}
