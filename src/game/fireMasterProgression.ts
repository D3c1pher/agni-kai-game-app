import { chooseRandomPattern, findPatternById } from './selectors'
import type { FireMasterState, RevealedMove } from './types'

type FutureFireMasterMovesResult = {
  fireMaster: FireMasterState
  revealedMoves: RevealedMove[]
}

export function advanceFireMaster(
  fireMaster: FireMasterState,
): FireMasterState {
  const currentPattern = findPatternById(fireMaster.patternId)
  const nextMoveIndex = fireMaster.moveIndex + 1

  if (nextMoveIndex < currentPattern.moves.length) {
    return {
      ...fireMaster,
      moveIndex: nextMoveIndex,
    }
  }

  const nextPattern = fireMaster.queuedPatternId
    ? findPatternById(fireMaster.queuedPatternId)
    : chooseRandomPattern()

  return {
    ...fireMaster,
    patternId: nextPattern.id,
    moveIndex: 0,
    queuedPatternId: undefined,
  }
}

export function getFutureFireMasterMoves(
  fireMaster: FireMasterState,
  nextTurn: number,
  readCount: number,
  existingRevealedMoves: RevealedMove[],
  maxRevealedFutureTurns: number,
): FutureFireMasterMovesResult {
  const revealedMoves: RevealedMove[] = []
  const unresolvedRevealedMoves = getUnresolvedRevealedMoves(
    existingRevealedMoves,
    nextTurn,
  )
  const remainingReadSlots = Math.max(
    0,
    maxRevealedFutureTurns - unresolvedRevealedMoves.length,
  )
  const allowedReadCount = Math.min(readCount, remainingReadSlots)
  const existingTurns = new Set(unresolvedRevealedMoves.map((move) => move.turn))
  let pattern = findPatternById(fireMaster.patternId)
  let moveIndex = fireMaster.moveIndex
  let revealTurn = nextTurn
  let queuedPatternId = fireMaster.queuedPatternId

  while (revealedMoves.length < allowedReadCount) {
    if (!existingTurns.has(revealTurn)) {
      revealedMoves.push({
        turn: revealTurn,
        action: pattern.moves[moveIndex],
      })
    }

    moveIndex += 1
    revealTurn += 1

    if (moveIndex >= pattern.moves.length) {
      pattern = queuedPatternId
        ? findPatternById(queuedPatternId)
        : chooseRandomPattern()
      queuedPatternId = pattern.id
      moveIndex = 0
    }
  }

  return {
    fireMaster: {
      ...fireMaster,
      queuedPatternId,
    },
    revealedMoves,
  }
}

export function getUnresolvedRevealedMoves(
  revealedMoves: RevealedMove[],
  currentTurn: number,
): RevealedMove[] {
  return revealedMoves
    .filter((revealedMove) => revealedMove.turn >= currentTurn)
    .sort((firstMove, secondMove) => secondMove.turn - firstMove.turn)
}

export function getRevealedMoveForTurn(
  revealedMoves: RevealedMove[],
  turn: number,
): RevealedMove | null {
  return revealedMoves.find((revealedMove) => revealedMove.turn === turn) ?? null
}
