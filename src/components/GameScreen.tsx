import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { hasReadBlockedEvent, hasReadEvent } from '../game/turnEvents'
import type {
  ChallengerAction,
  GameStatus,
  TurnEvent,
} from '../game/agniKaiRules'
import type {
  ActiveAgniKaiGameViewModel,
  ResolvedTurnPresentation,
} from '../hooks/useAgniKaiGame'
import { ChallengerPanel } from './ChallengerPanel'
import { FireMasterPanel } from './FireMasterPanel'
import { ReadResultsPanel } from './ReadResultsPanel'
import { RosterPanel } from './RosterPanel'
import { TurnLogPanel } from './TurnLogPanel'
import { FlameEmblem } from './ui/FlameEmblem'
import { DuelTransitionOverlay } from './DuelTransitionOverlay'

const TRANSITION_DURATION_MS = 10000
const REDUCED_MOTION_TRANSITION_DURATION_MS = 2000

type DuelTransitionPhase = 'actions' | 'clash' | 'result'

type DuelTransitionSequence = {
  phase: DuelTransitionPhase
  presentation: ResolvedTurnPresentation
}

type GameScreenProps = {
  game: ActiveAgniKaiGameViewModel
}

export function GameScreen(props: GameScreenProps) {
  const [transition, setTransition] = useState<DuelTransitionSequence | null>(
    null,
  )
  const [gameOverStatus, setGameOverStatus] = useState<GameStatus | null>(null)
  const isTransitioning = props.game.isOpeningDuel || transition !== null
  const readFeedbackClass = hasReadEvent(props.game.gameState.recentEvents)
    ? 'agni-read-reveal'
    : ''

  const finishTransition = useCallback(() => {
    if (!transition) {
      return
    }

    const status = transition.presentation.resolvedGameState.status
    setTransition(null)

    if (status !== 'playing') {
      setGameOverStatus(status)
    }
  }, [transition])

  const advanceTransition = useCallback(() => {
    setTransition((currentTransition) => {
      if (!currentTransition) {
        return null
      }

      if (currentTransition.phase === 'actions') {
        return { ...currentTransition, phase: 'clash' }
      }

      if (currentTransition.phase === 'clash') {
        return { ...currentTransition, phase: 'result' }
      }

      const status = currentTransition.presentation.resolvedGameState.status
      if (status !== 'playing') {
        setGameOverStatus(status)
      }

      return null
    })
  }, [])

  useEffect(() => {
    if (!transition) {
      return
    }

    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? REDUCED_MOTION_TRANSITION_DURATION_MS
      : TRANSITION_DURATION_MS
    const timeoutId = window.setTimeout(advanceTransition, delay)

    return () => window.clearTimeout(timeoutId)
  }, [advanceTransition, transition])

  const confirmTurn = () => {
    if (isTransitioning) {
      return
    }

    const presentation = props.game.confirmTurn()
    if (presentation) {
      setTransition({ phase: 'actions', presentation })
    }
  }

  return (
    <main className="agni-page min-h-dvh overflow-x-hidden px-3 py-3 sm:px-6 sm:py-4 lg:px-8 xl:h-dvh xl:overflow-hidden xl:py-2">
      <section className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-7xl flex-col sm:min-h-[calc(100dvh-2rem)] xl:h-full xl:min-h-0">
        <header className="flex shrink-0 flex-col gap-2 border-b-2 border-[var(--agni-border)] pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FlameEmblem className="h-10 w-10 shrink-0 drop-shadow-[0_3px_0_#0f0704]" />
            <div>
              <p className="agni-kicker">Dashboard</p>
              <h1 className="agni-display text-2xl text-[var(--agni-cream)]">
                Agni Kai
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="border border-[var(--agni-gold)] bg-[var(--agni-parchment)] px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-[var(--agni-ink)] shadow-[0_3px_0_#0f0704]">
              Turn {props.game.gameState.turn}
            </div>
            <button
              className="agni-button-secondary w-full px-3 py-1.5 text-sm md:w-auto"
              disabled={isTransitioning}
              type="button"
              onClick={props.game.resetGame}
            >
              Reset duel
            </button>
          </div>
        </header>

        <DuelResultBanner
          status={props.game.gameState.status}
        />

        <section className="mt-2 grid gap-2 xl:min-h-0 xl:flex-[0_0_46%] xl:grid-cols-[1fr_2fr]">
          <FireMasterPanel gameState={props.game.gameState} />

          <div className="agni-panel flex flex-col overflow-hidden p-3 xl:min-h-0">
            <div className="flex shrink-0 flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="agni-kicker !text-[var(--agni-rust)]">
                  Active challengers
                </p>
                <h2 className="agni-display text-lg">Choose each action</h2>
              </div>
              <button
                className="agni-button-primary w-full px-3 py-1.5 text-sm md:w-auto"
                disabled={!props.game.isTurnReady || isTransitioning}
                type="button"
                onClick={confirmTurn}
              >
                Confirm actions
              </button>
            </div>

            <div className="agni-scrollbar mt-2 grid gap-2 md:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-3 xl:overflow-y-auto xl:overscroll-contain xl:pr-1">
              {props.game.activeChallengers.map((challenger) => (
                <ChallengerPanel
                  challenger={challenger}
                  isDisabled={isTransitioning}
                  key={challenger.id}
                  recentEvents={props.game.gameState.recentEvents}
                  selectedActions={props.game.selectedActions}
                  onActionChange={props.game.updateSelectedAction}
                />
              ))}
            </div>

            {props.game.activeChallengers.length === 0 ? (
              <p className="mt-5 border border-dashed border-[var(--agni-border)] bg-[rgba(143,67,32,0.08)] p-4 text-sm text-[var(--agni-ink-muted)]">
                No active challengers remain.
              </p>
            ) : null}
          </div>
        </section>

        <section className="mt-2 grid gap-2 md:grid-cols-3 xl:min-h-0 xl:flex-1">
          <RosterPanel
            backupChallengers={props.game.backupChallengers}
            deadChallengers={props.game.deadChallengers}
          />
          <ReadResultsPanel
            feedbackClass={readFeedbackClass}
            hasReadBlocked={hasReadBlockedEvent(
              props.game.gameState.recentEvents,
            )}
            revealedMoves={props.game.gameState.revealedMoves}
          />
          <TurnLogPanel entries={props.game.gameState.turnLog} />
        </section>
      </section>

      {props.game.isOpeningDuel ? (
        <DuelTransitionOverlay
          eyebrow="The arena is ready"
          primaryActionLabel="Begin Duel"
          title="Duel Begins"
          onAdvance={props.game.acknowledgeOpeningDuel}
        >
          <strong className="text-amber-200">
            {props.game.gameState.challengers.length} Challengers
          </strong>{' '}
          face a <strong className="text-red-400">Fire Master</strong> with{' '}
          {props.game.gameState.fireMaster.maxHealth} health.
        </DuelTransitionOverlay>
      ) : null}

      {transition ? (
        <TurnTransitionOverlay
          transition={transition}
          onAdvance={advanceTransition}
          onSkip={finishTransition}
        />
      ) : null}

      {gameOverStatus ? (
        <DuelTransitionOverlay
          eyebrow="Duel concluded"
          primaryActionLabel="New Duel"
          secondaryActionLabel="Review Battlefield"
          title={
            gameOverStatus === 'won'
              ? 'Challengers Win'
              : 'Fire Master Wins'
          }
          onAdvance={props.game.resetGame}
          onSecondaryAction={() => setGameOverStatus(null)}
        >
          {gameOverStatus === 'won' ? (
            <>
              <strong className="text-red-400">The Fire Master</strong> has
              been reduced to <strong className="text-red-300">0 health</strong>.
            </>
          ) : (
            <>
              All <strong className="text-amber-200">Challengers</strong> have
              fallen.
            </>
          )}
        </DuelTransitionOverlay>
      ) : null}
    </main>
  )
}

function TurnTransitionOverlay(props: {
  transition: DuelTransitionSequence
  onAdvance: () => void
  onSkip: () => void
}) {
  const { phase, presentation } = props.transition

  if (phase === 'actions') {
    return (
      <DuelTransitionOverlay
        eyebrow={`Turn ${presentation.turn}`}
        primaryActionLabel="Next"
        secondaryActionLabel="Skip"
        title="Actions Locked"
        onAdvance={props.onAdvance}
        onSecondaryAction={props.onSkip}
      >
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(presentation.selections).map(([challengerId, action]) => (
            <span
              className="border border-[var(--agni-gold)] px-3 py-1"
              key={challengerId}
            >
              <strong className="text-amber-200">Challenger {challengerId}</strong>:{' '}
              <strong className={getChallengerActionClass(action)}>
                {action}
              </strong>
            </span>
          ))}
        </div>
      </DuelTransitionOverlay>
    )
  }

  if (phase === 'clash') {
    return (
      <DuelTransitionOverlay
        eyebrow={`Turn ${presentation.turn}`}
        primaryActionLabel="Next"
        secondaryActionLabel="Skip"
        title="Clash"
        onAdvance={props.onAdvance}
        onSecondaryAction={props.onSkip}
      >
        <strong className="text-red-400">The Fire Master</strong> uses{' '}
        <strong className="text-[var(--agni-gold)]">
          {presentation.fireMasterAction}
        </strong>
        .
      </DuelTransitionOverlay>
    )
  }

  return (
    <DuelTransitionOverlay
      eyebrow={`Turn ${presentation.turn}`}
      primaryActionLabel="Next"
      secondaryActionLabel="Skip"
      title="Turn Result"
      onAdvance={props.onAdvance}
      onSecondaryAction={props.onSkip}
    >
      <ul className="space-y-2">
        {getTurnEventSummaries(presentation.resolvedGameState.recentEvents).map(
          (summary, summaryIndex) => <li key={summaryIndex}>{summary}</li>,
        )}
      </ul>
    </DuelTransitionOverlay>
  )
}

function getChallengerActionClass(action: ChallengerAction): string {
  const baseClass = 'font-bold uppercase tracking-wide'

  if (action === 'Strike') {
    return `${baseClass} text-red-400`
  }

  if (action === 'Guard') {
    return `${baseClass} text-sky-400`
  }

  if (action === 'Charge') {
    return `${baseClass} text-amber-300`
  }

  if (action === 'Lightning') {
    return `${baseClass} text-violet-300`
  }

  return `${baseClass} text-emerald-300`
}

function getTurnEventSummaries(events: TurnEvent[]): ReactNode[] {
  if (events.length === 0) {
    return ['The combatants hold their ground.']
  }

  return events.map((event) => {
    if (event.type === 'damage') {
      return event.target === 'fireMaster' ? (
        <>
          <strong className="text-red-400">The Fire Master</strong> takes{' '}
          <strong className="text-red-300">{event.amount} damage</strong>.
        </>
      ) : (
        <>
          <strong className="text-amber-200">
            Challenger {event.challengerId}
          </strong>{' '}
          takes <strong className="text-red-300">{event.amount} damage</strong>.
        </>
      )
    }
    if (event.type === 'blocked') {
      return event.target === 'fireMaster' ? (
        <>
          <strong className="text-red-400">The Fire Master</strong>{' '}
          <strong className="text-sky-300">blocks</strong>{' '}
          <strong className="text-amber-200">
            Challenger {event.challengerId}
          </strong>
          .
        </>
      ) : (
        <>
          <strong className="text-amber-200">
            Challenger {event.challengerId}
          </strong>{' '}
          <strong className="text-sky-300">blocks the attack</strong>.
        </>
      )
    }
    if (event.type === 'charge') {
      return <><strong className="text-amber-200">Challenger {event.challengerId}</strong> charges Lightning.</>
    }
    if (event.type === 'recover') {
      return <><strong className="text-red-400">The Fire Master</strong> recovers <strong className="text-emerald-300">{event.amount} health</strong>.</>
    }
    if (event.type === 'readBlocked') {
      return (
        <>
          <strong className="text-red-400">The Fire Master</strong>{' '}
          <strong className="text-stone-300">cannot be revealed any further</strong>.
        </>
      )
    }
    return (
      <>
        <strong className="text-violet-300">
          {event.count} upcoming Fire Master move
          {event.count === 1 ? '' : 's'} revealed
        </strong>
        .
      </>
    )
  })
}

function DuelResultBanner(props: { status: string }) {
  if (props.status === 'playing') {
    return null
  }

  const hasWon = props.status === 'won'

  return (
    <section
      className={`mt-2 max-h-40 overflow-y-auto border-2 p-3 shadow-[0_5px_0_#0f0704] ${
        hasWon
          ? 'border-emerald-700 bg-emerald-100 text-emerald-950'
          : 'border-[var(--agni-rust)] bg-[var(--agni-parchment)] text-[var(--agni-rust-dark)]'
      }`}
    >
      <h2 className="agni-display text-2xl">
        {hasWon ? 'The challengers win' : 'The Fire Master wins'}
      </h2>
      <p className="mt-2 text-sm leading-6">
        {hasWon
          ? 'The Fire Master has been reduced to 0 health.'
          : 'All challengers have fallen.'}
      </p>
    </section>
  )
}
