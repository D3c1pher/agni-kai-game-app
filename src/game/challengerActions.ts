import { FIRE_MASTER_RECOVERY, PLAYER_ACTIONS } from './gameConstants'
import type {
  Challenger,
  ChallengerAction,
  ChallengerActionSelections,
  FireMasterAction,
} from './types'

export function getLegalChallengerActions(
  challenger: Challenger,
  selections: Partial<ChallengerActionSelections>,
): ChallengerAction[] {
  return PLAYER_ACTIONS.filter((action) => {
    if (action === 'Guard') {
      return challenger.previousAction !== 'Guard'
    }

    if (action === 'Lightning') {
      return canSelectLightning(challenger, selections)
    }

    return true
  })
}

export function calculatePlayerDamage(
  activeChallengers: Challenger[],
  selections: ChallengerActionSelections,
): number {
  return activeChallengers.reduce((damage, challenger) => {
    const selectedAction = selections[challenger.id]

    if (selectedAction === 'Strike') {
      return damage + 1
    }

    if (selectedAction === 'Lightning') {
      return damage + 3
    }

    return damage
  }, 0)
}

export function countReaders(
  activeChallengers: Challenger[],
  selections: ChallengerActionSelections,
): number {
  return activeChallengers.filter(
    (challenger) => selections[challenger.id] === 'Read',
  ).length
}

export function getRecoveryAmount(
  fireMasterHealth: number,
  playerDamage: number,
  fireMasterMaxHealth: number,
  fireMasterAction: FireMasterAction,
): number {
  if (fireMasterAction !== 'Recover') {
    return 0
  }

  const fireMasterHealthAfterDamage = Math.max(
    0,
    fireMasterHealth - playerDamage,
  )

  if (fireMasterHealthAfterDamage <= 0) {
    return 0
  }

  return Math.min(
    FIRE_MASTER_RECOVERY,
    fireMasterMaxHealth - fireMasterHealthAfterDamage,
  )
}

function canSelectLightning(
  challenger: Challenger,
  selections: Partial<ChallengerActionSelections>,
): boolean {
  if (!challenger.hasLightningCharge) {
    return false
  }

  return Object.entries(selections).every(([challengerId, action]) => {
    return action !== 'Lightning' || Number(challengerId) === challenger.id
  })
}
