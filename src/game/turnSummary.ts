import { TURN_LOG_LIMIT } from './gameConstants'
import type {
  Challenger,
  ChallengerActionSelections,
  FireMasterAction,
} from './types'

type TurnSummaryDetails = {
  turn: number
  activeChallengers: Challenger[]
  selections: ChallengerActionSelections
  fireMasterAction: FireMasterAction
  playerDamage: number
  fireMasterHealthBefore: number
  fireMasterHealthAfter: number
  challengersBefore: Challenger[]
  challengersAfter: Challenger[]
}

export function createTurnSummary(details: TurnSummaryDetails): string {
  const playerActions = details.activeChallengers
    .map(
      (challenger) =>
        `C${challenger.id} ${details.selections[challenger.id]}`,
    )
    .join(', ')
  const defeatedText = createDefeatedText(
    details.challengersBefore,
    details.challengersAfter,
  )

  return `Turn ${details.turn}: ${playerActions}. Fire Master used ${details.fireMasterAction}. Fire Master ${details.fireMasterHealthBefore} -> ${details.fireMasterHealthAfter} after ${details.playerDamage} damage.${defeatedText}`
}

export function trimTurnLog(turnLog: string[]): string[] {
  return turnLog.slice(0, TURN_LOG_LIMIT)
}

function createDefeatedText(
  challengersBefore: Challenger[],
  challengersAfter: Challenger[],
): string {
  const defeatedChallengers = challengersAfter.filter((challenger) => {
    const previousChallenger = challengersBefore.find(
      (beforeChallenger) => beforeChallenger.id === challenger.id,
    )

    return (
      previousChallenger &&
      previousChallenger.health > 0 &&
      challenger.health <= 0
    )
  })

  if (defeatedChallengers.length === 0) {
    return ''
  }

  const challengerLabels = defeatedChallengers
    .map((challenger) => `C${challenger.id}`)
    .join(', ')

  return ` Defeated: ${challengerLabels}.`
}
