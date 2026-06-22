import type { RevealedMove } from '../game/agniKaiRules'

type ReadResultsPanelProps = {
  revealedMoves: RevealedMove[]
  feedbackClass: string
  hasReadBlocked: boolean
}

export function ReadResultsPanel(props: ReadResultsPanelProps) {
  return (
    <div
      className={`flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:min-h-0 ${props.feedbackClass}`}
    >
      <h2 className="text-lg font-bold">Read results</h2>
      {props.hasReadBlocked ? (
        <p className="mt-3 rounded-md bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
          Unable to read. The read window is full.
        </p>
      ) : null}
      {props.revealedMoves.length > 0 ? (
        <ul className="mt-4 space-y-3 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:overscroll-contain xl:pr-1">
          {props.revealedMoves.map((move, moveIndex) => (
            <li
              className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-950"
              key={`${move.turn}-${move.action}-${moveIndex}`}
            >
              Turn {move.turn}: {move.action}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Use Read with active challengers to reveal upcoming Fire Master moves.
        </p>
      )}
    </div>
  )
}
