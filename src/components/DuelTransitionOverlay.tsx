import { useEffect, useRef, type ReactNode } from 'react'

type DuelTransitionOverlayProps = {
  eyebrow: string
  title: string
  children: ReactNode
  primaryActionLabel?: string
  secondaryActionLabel?: string
  onAdvance?: () => void
  onSecondaryAction?: () => void
}

export function DuelTransitionOverlay(props: DuelTransitionOverlayProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog || dialog.open) {
      return
    }

    dialog.showModal()

    return () => dialog.close()
  }, [])

  return (
    <dialog
      aria-labelledby="duel-transition-title"
      className="agni-how-to-play-dialog"
      ref={dialogRef}
      onCancel={(event) => event.preventDefault()}
      onClick={(event) => {
        if (event.target === event.currentTarget && props.onAdvance) {
          props.onAdvance()
        }
      }}
    >
      <section className="agni-how-to-play-panel agni-panel-dark w-full max-w-xl overflow-hidden text-center">
        <div className="border-b-2 border-[var(--agni-border)] px-5 py-8 sm:px-8 sm:py-10">
          <p className="agni-kicker">{props.eyebrow}</p>
          <h2
            className="agni-display mt-3 text-3xl text-[var(--agni-cream)] sm:text-4xl"
            id="duel-transition-title"
          >
            {props.title}
          </h2>
          <div className="mt-5 text-base leading-7 text-[var(--agni-parchment-muted)]">
            {props.children}
          </div>
        </div>

        {props.primaryActionLabel || props.secondaryActionLabel ? (
          <div className="flex flex-col gap-3 bg-[var(--agni-bg-deep)] px-5 py-4 sm:flex-row sm:justify-center">
            {props.secondaryActionLabel ? (
              <button
                className="agni-button-secondary px-5 py-2"
                type="button"
                onClick={props.onSecondaryAction}
              >
                {props.secondaryActionLabel}
              </button>
            ) : null}
            {props.primaryActionLabel ? (
              <button
                className="agni-button-primary px-5 py-2"
                type="button"
                onClick={props.onAdvance}
              >
                {props.primaryActionLabel}
              </button>
            ) : null}
          </div>
        ) : null}
      </section>
    </dialog>
  )
}
