type StatProps = {
  label: string
  value: string
}

export function Stat(props: StatProps) {
  return (
    <div className="rounded-md bg-slate-100 p-3">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {props.label}
      </dt>
      <dd className="mt-1 font-bold text-slate-950">{props.value}</dd>
    </div>
  )
}
