import { hasReadBlockedEvent, hasReadEvent } from '../game/turnEvents'
import type { ActiveAgniKaiGameViewModel } from '../hooks/useAgniKaiGame'
import { ChallengerPanel } from './ChallengerPanel'
import { FireMasterPanel } from './FireMasterPanel'
import { ReadResultsPanel } from './ReadResultsPanel'
import { RosterPanel } from './RosterPanel'
import { TurnLogPanel } from './TurnLogPanel'

type GameScreenProps = {
  game: ActiveAgniKaiGameViewModel
}

export function GameScreen(props: GameScreenProps) {
  const readFeedbackClass = hasReadEvent(props.game.gameState.recentEvents)
    ? 'agni-read-reveal'
    : ''

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#f6f7fb] px-3 py-3 text-slate-950 sm:px-6 sm:py-4 lg:px-8 xl:h-dvh xl:overflow-hidden">
      <section className="mx-auto flex min-h-[calc(100dvh-1.5rem)] max-w-7xl flex-col sm:min-h-[calc(100dvh-2rem)] xl:h-full xl:min-h-0">
        <header className="flex shrink-0 flex-col gap-3 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-normal text-slate-950">
            Agni Kai
          </h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-800">
              Turn {props.game.gameState.turn}
            </div>
            <button
              className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:text-red-700 md:w-auto"
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

          <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:min-h-0">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Active challengers
                </p>
                <h2 className="mt-1 text-xl font-bold">Choose each action</h2>
              </div>
              <button
                className="w-full rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 md:w-auto"
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
              <p className="mt-5 rounded-md bg-slate-100 p-4 text-sm text-slate-600">
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
      className={`mt-6 rounded-lg border p-5 ${
        hasWon
          ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
          : 'border-red-200 bg-red-50 text-red-950'
      }`}
    >
      <h2 className="text-2xl font-bold">
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
