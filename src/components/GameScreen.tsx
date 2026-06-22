import { hasReadBlockedEvent, hasReadEvent } from '../game/turnEvents'
import type { ActiveAgniKaiGameViewModel } from '../hooks/useAgniKaiGame'
import { ChallengerPanel } from './ChallengerPanel'
import { FireMasterPanel } from './FireMasterPanel'
import { ReadResultsPanel } from './ReadResultsPanel'
import { RosterPanel } from './RosterPanel'
import { TurnLogPanel } from './TurnLogPanel'
import { FlameEmblem } from './ui/FlameEmblem'

type GameScreenProps = {
  game: ActiveAgniKaiGameViewModel
}

export function GameScreen(props: GameScreenProps) {
  const readFeedbackClass = hasReadEvent(props.game.gameState.recentEvents)
    ? 'agni-read-reveal'
    : ''

  return (
    <main className="agni-page min-h-dvh overflow-x-hidden px-3 py-3 sm:px-6 sm:py-4 lg:px-8 xl:h-dvh xl:overflow-hidden">
      <section className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-7xl flex-col sm:min-h-[calc(100dvh-2rem)] xl:h-full xl:min-h-0">
        <header className="flex shrink-0 flex-col gap-3 border-b-2 border-[var(--agni-border)] pb-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FlameEmblem className="h-12 w-12 shrink-0 drop-shadow-[0_3px_0_#0f0704]" />
            <div>
              <p className="agni-kicker">Fire Master dashboard</p>
              <h1 className="agni-display mt-1 text-3xl text-[var(--agni-cream)]">
                Agni Kai
              </h1>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="border border-[var(--agni-gold)] bg-[var(--agni-parchment)] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--agni-ink)] shadow-[0_3px_0_#0f0704]">
              Turn {props.game.gameState.turn}
            </div>
            <button
              className="agni-button-secondary w-full px-4 py-2 text-sm md:w-auto"
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

        <section className="mt-3 grid gap-3 xl:min-h-0 xl:flex-[0_0_45%] xl:grid-cols-[1fr_2fr]">
          <FireMasterPanel gameState={props.game.gameState} />

          <div className="agni-panel flex flex-col p-4 xl:min-h-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="agni-kicker !text-[var(--agni-rust)]">
                  Active challengers
                </p>
                <h2 className="agni-display mt-1 text-xl">Choose each action</h2>
              </div>
              <button
                className="agni-button-primary w-full px-4 py-2 text-sm md:w-auto"
                disabled={!props.game.isTurnReady}
                type="button"
                onClick={props.game.confirmTurn}
              >
                Confirm actions
              </button>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:min-h-0 xl:flex-1 xl:grid-cols-3">
              {props.game.activeChallengers.map((challenger) => (
                <ChallengerPanel
                  challenger={challenger}
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

        <section className="mt-3 grid gap-3 md:grid-cols-3 xl:min-h-0 xl:flex-1">
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
    </main>
  )
}

function DuelResultBanner(props: { status: string }) {
  if (props.status === 'playing') {
    return null
  }

  const hasWon = props.status === 'won'

  return (
    <section
      className={`mt-6 border-2 p-5 shadow-[0_5px_0_#0f0704] ${
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
