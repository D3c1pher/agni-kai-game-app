type TurnLogPanelProps = {
  entries: string[]
}

export function TurnLogPanel(props: TurnLogPanelProps) {
  return (
    <div className="agni-panel flex flex-col p-4 xl:min-h-0">
      <h2 className="agni-display text-lg">Turn log</h2>
      <ol className="agni-scrollbar mt-4 space-y-3 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:pr-1">
        {props.entries.map((entry) => (
          <li
            className="border-l-4 border-[var(--agni-border)] bg-[rgba(255,249,230,0.72)] px-4 py-3 text-sm leading-6 text-[var(--agni-ink-muted)]"
            key={entry}
          >
            {entry}
          </li>
        ))}
      </ol>
    </div>
  )
}
