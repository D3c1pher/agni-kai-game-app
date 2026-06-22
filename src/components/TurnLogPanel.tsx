type TurnLogPanelProps = {
  entries: string[]
}

export function TurnLogPanel(props: TurnLogPanelProps) {
  return (
    <div className="flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:min-h-0">
      <h2 className="text-lg font-bold">Turn log</h2>
      <ol className="mt-4 space-y-3 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
        {props.entries.map((entry) => (
          <li
            className="rounded-md bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700"
            key={entry}
          >
            {entry}
          </li>
        ))}
      </ol>
    </div>
  )
}
