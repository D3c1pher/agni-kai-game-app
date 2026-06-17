type StartScreenProps = {
  challengerInput: string
  challengerMaxHealthInput: string
  fireMasterHealthMultiplierInput: string
  fireMasterHealthAdditionInput: string
  canStartGame: boolean
  storageWarning: string | null
  onChallengerInputChange: (value: string) => void
  onChallengerMaxHealthInputChange: (value: string) => void
  onFireMasterHealthMultiplierInputChange: (value: string) => void
  onFireMasterHealthAdditionInputChange: (value: string) => void
  onStartGame: () => void
}

export function StartScreen(props: StartScreenProps) {
  return (
    <main className="min-h-screen bg-[#f6f7fb] px-5 py-8 text-slate-950">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-4xl flex-col justify-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
            Duel prototype
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-normal sm:text-6xl">
            Agni Kai
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
            Set the total challengers, then test the turn-by-turn duel against
            the Fire Master.
          </p>
        </div>

        <div className="mt-10 max-w-xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 sm:grid-cols-2">
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="challenger-count"
            >
              Total challengers
              <input
                className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                id="challenger-count"
                min="1"
                inputMode="numeric"
                type="number"
                value={props.challengerInput}
                onChange={(event) =>
                  props.onChallengerInputChange(event.target.value)
                }
                placeholder="Count"
              />
            </label>
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="challenger-health"
            >
              Max health each
              <input
                className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                id="challenger-health"
                min="1"
                inputMode="numeric"
                type="number"
                value={props.challengerMaxHealthInput}
                onChange={(event) =>
                  props.onChallengerMaxHealthInputChange(event.target.value)
                }
                placeholder="Health"
              />
            </label>
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="fire-master-multiplier"
            >
              Fire Master multiplier
              <input
                className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                id="fire-master-multiplier"
                min="0.1"
                inputMode="decimal"
                step="0.1"
                type="number"
                value={props.fireMasterHealthMultiplierInput}
                onChange={(event) =>
                  props.onFireMasterHealthMultiplierInputChange(
                    event.target.value,
                  )
                }
                placeholder="Multiplier"
              />
            </label>
            <label
              className="block text-sm font-semibold text-slate-700"
              htmlFor="fire-master-addition"
            >
              Fire Master bonus health
              <input
                className="mt-3 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100"
                id="fire-master-addition"
                min="0"
                inputMode="numeric"
                type="number"
                value={props.fireMasterHealthAdditionInput}
                onChange={(event) =>
                  props.onFireMasterHealthAdditionInputChange(
                    event.target.value,
                  )
                }
                placeholder="Bonus"
              />
            </label>
          </div>
          <button
            className="mt-5 w-full rounded-md bg-red-700 px-4 py-3 text-base font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
            disabled={!props.canStartGame}
            type="button"
            onClick={props.onStartGame}
          >
            Play
          </button>
          {props.storageWarning ? (
            <p className="mt-4 text-sm leading-6 text-amber-700">
              {props.storageWarning} Start a new duel to replace it.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
