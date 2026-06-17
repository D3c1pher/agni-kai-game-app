import {
  MAX_ACTIVE_CHALLENGERS,
} from './gameConstants'
import { chooseRandomPattern } from './selectors'
import type { GameState } from './types'

export function createGameState(
  challengerCount: number,
  challengerMaxHealth: number,
  fireMasterHealthMultiplier: number,
  fireMasterHealthAddition: number,
): GameState {
  const firstPattern = chooseRandomPattern()
  const fireMasterMaxHealth =
    challengerCount * challengerMaxHealth * fireMasterHealthMultiplier +
    fireMasterHealthAddition

  return {
    status: 'playing',
    turn: 1,
    challengers: Array.from({ length: challengerCount }, (_, index) => ({
      id: index + 1,
      health: challengerMaxHealth,
      maxHealth: challengerMaxHealth,
      isActive: index < MAX_ACTIVE_CHALLENGERS,
      hasLightningCharge: false,
      previousAction: null,
    })),
    fireMaster: {
      health: fireMasterMaxHealth,
      maxHealth: fireMasterMaxHealth,
      patternId: firstPattern.id,
      moveIndex: 0,
      lastAction: null,
    },
    revealedMoves: [],
    recentEvents: [],
    turnLog: ['The Fire Master enters the duel.'],
  }
}
