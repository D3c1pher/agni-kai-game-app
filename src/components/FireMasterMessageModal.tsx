import { useCallback, useEffect, useRef, useState } from 'react'
import fireMasterAvatar from '../assets/fire-master-norven.jpg'

const CLOSE_ANIMATION_DURATION_MS = 160

type FireMasterMessageModalProps = {
  onClose: () => void
}

export function FireMasterMessageModal(props: FireMasterMessageModalProps) {
  const { onClose } = props
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeTimeoutRef = useRef<number | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const closeModal = useCallback(() => {
    if (isClosing) {
      return
    }

    setIsClosing(true)
    const closeDelay = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 0
      : CLOSE_ANIMATION_DURATION_MS

    closeTimeoutRef.current = window.setTimeout(() => {
      dialogRef.current?.close()
      onClose()
    }, closeDelay)
  }, [isClosing, onClose])

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog || dialog.open) {
      return
    }

    dialog.showModal()

    return () => {
      if (closeTimeoutRef.current !== null) {
        window.clearTimeout(closeTimeoutRef.current)
      }

      dialog.close()
    }
  }, [])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') {
        return
      }

      event.preventDefault()
      closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeModal])

  return (
    <dialog
      aria-labelledby="fire-master-message-title"
      className={`agni-how-to-play-dialog ${isClosing ? 'is-closing' : ''}`}
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault()
        closeModal()
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeModal()
        }
      }}
    >
      <div className="agni-how-to-play-panel mx-auto flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-slate-200 bg-white text-slate-950 shadow-2xl">
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red-700">
              A message from your Fire Master
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-normal"
              id="fire-master-message-title"
            >
              Thank You, Campers!
            </h2>
          </div>
          <button
            aria-label="Close message from the Fire Master"
            className="rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-red-200"
            type="button"
            onClick={closeModal}
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </button>
        </header>

        <div className="overflow-y-auto px-6 py-6">
          <div className="space-y-5 text-sm leading-7 text-slate-700 sm:text-base">
            <p>
              To the <strong className="text-slate-950">Thrive As One Campers</strong>{' '}
              who experienced the{' '}
              <strong className="text-red-700">Agni Kai Trial</strong> during the{' '}
              <strong className="text-slate-950">Trials of the Elements</strong>{' '}
              activity:
            </p>

            <p className="text-lg font-bold text-slate-950">Thank you for playing!</p>

            <p>
              It was a joy seeing you face the challenge together with your
              tribes. I hope the game gave you a fun and memorable experience
              during camp, and I’m grateful that I got to be part of your
              Amazing Race experience.
            </p>

            <p>
              I hope you enjoy this digital version of the game and get to test
              what you could have done differently during the trial. I’ll keep
              updating it from time to time, so feel free to play again.
            </p>

            <p>
              Also, shoutout to the{' '}
              <strong className="text-red-700">Flamethrowers Tribe</strong> for
              that dominating win!
            </p>

            <p>
              May we continue to{' '}
              <strong className="text-slate-950">THRIVE AS ONE!</strong>
            </p>

            <div className="flex items-center gap-4 border-t border-slate-200 pt-5">
              <img
                alt="Norven, the Fire Master"
                className="h-20 w-20 shrink-0 rounded-full border-2 border-red-100 object-cover shadow-sm"
                src={fireMasterAvatar}
              />
              <p className="leading-6 text-slate-700">
                From Yours Truly,
                <br />
                <strong className="text-slate-950">Norven (Inspired Weaver) Caracas</strong>
                <br />
                Your Fire Master
              </p>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
