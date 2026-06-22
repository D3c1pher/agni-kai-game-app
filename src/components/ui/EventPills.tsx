import type { TurnEvent } from '../../game/agniKaiRules'
import { getEventLabel, getEventPillClass } from '../../ui/eventPresentation'

type EventPillsProps = {
  events: TurnEvent[]
}

export function EventPills(props: EventPillsProps) {
  if (props.events.length === 0) {
    return null
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {props.events.map((event, eventIndex) => (
        <span
          className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wide shadow-[0_2px_0_rgba(15,7,4,0.3)] ${getEventPillClass(
            event,
          )}`}
          key={`${event.type}-${eventIndex}`}
        >
          {getEventLabel(event)}
        </span>
      ))}
    </div>
  )
}
