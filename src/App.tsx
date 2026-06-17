import { GameScreen } from './components/GameScreen'
import { StartScreen } from './components/StartScreen'
import {
  hasActiveAgniKaiGame,
  useAgniKaiGame,
} from './hooks/useAgniKaiGame'

function App() {
  const agniKaiGame = useAgniKaiGame()

  if (!hasActiveAgniKaiGame(agniKaiGame)) {
    return (
      <StartScreen
        challengerInput={agniKaiGame.challengerInput}
        challengerMaxHealthInput={agniKaiGame.challengerMaxHealthInput}
        fireMasterHealthAdditionInput={
          agniKaiGame.fireMasterHealthAdditionInput
        }
        fireMasterHealthMultiplierInput={
          agniKaiGame.fireMasterHealthMultiplierInput
        }
        canStartGame={agniKaiGame.canStartGame}
        storageWarning={agniKaiGame.storageWarning}
        onChallengerInputChange={agniKaiGame.setChallengerInput}
        onChallengerMaxHealthInputChange={
          agniKaiGame.setChallengerMaxHealthInput
        }
        onFireMasterHealthAdditionInputChange={
          agniKaiGame.setFireMasterHealthAdditionInput
        }
        onFireMasterHealthMultiplierInputChange={
          agniKaiGame.setFireMasterHealthMultiplierInput
        }
        onStartGame={agniKaiGame.startGame}
      />
    )
  }

  return <GameScreen game={agniKaiGame} />
}

export default App
