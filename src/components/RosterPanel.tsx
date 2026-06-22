import type { Challenger } from '../game/agniKaiRules'

type RosterPanelProps = {
  backupChallengers: Challenger[]
  deadChallengers: Challenger[]
}

type RosterGroupProps = {
  challengers: Challenger[]
  label: string
}

export function RosterPanel(props: RosterPanelProps) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:min-h-0">
      <h2 className="text-lg font-bold">Roster</h2>
      <div className="mt-1 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
        <RosterGroup challengers={props.backupChallengers} label="Backup" />
        <RosterGroup challengers={props.deadChallengers} label="Defeated" />
      </div>
    </div>
  )
}

function RosterGroup(props: RosterGroupProps) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {props.label}
      </h3>
      {props.challengers.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {props.challengers.map((challenger) => (
            <span
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700"
              key={challenger.id}
            >
              C{challenger.id} {challenger.health}/{challenger.maxHealth}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-slate-500">None</p>
      )}
    </div>
  )
}
