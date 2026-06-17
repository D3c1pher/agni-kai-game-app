type HealthBarProps = {
  currentHealth: number
  label: string
  maxHealth: number
  tone: 'amber' | 'red'
}

export function HealthBar(props: HealthBarProps) {
  const healthPercent =
    props.maxHealth > 0 ? (props.currentHealth / props.maxHealth) * 100 : 0
  const barColor = props.tone === 'red' ? 'bg-red-600' : 'bg-amber-500'

  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-700">{props.label}</span>
        <span className="font-bold text-slate-950">
          {props.currentHealth} / {props.maxHealth}
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${healthPercent}%` }}
        />
      </div>
    </div>
  )
}
