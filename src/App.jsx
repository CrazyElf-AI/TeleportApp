import { useGameState } from './state';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import LevelUp from './screens/LevelUp';
import Teleport from './screens/Teleport';
import Denied from './screens/Denied';

export default function App() {
  const state = useGameState();

  if (state.screen === 'onboarding' || !state.profile) {
    return <Onboarding onComplete={state.setProfile} />;
  }

  if (state.screen === 'home') {
    return (
      <Home
        profile={state.profile}
        mageLevel={state.mageLevel}
        mageTierName={state.mageTierName}
        isElder={state.isElder}
        onLevelUp={() => state.setScreen('levelup')}
        onTeleport={() => state.setScreen('teleport')}
      />
    );
  }

  if (state.screen === 'levelup') {
    return (
      <LevelUp
        mageLevel={state.mageLevel}
        onLevelUp={(level) => {
          state.setMageLevel(level);
          state.setScreen('home');
        }}
        onBack={() => state.setScreen('home')}
      />
    );
  }

  if (state.screen === 'teleport') {
    return (
      <Teleport
        profile={state.profile}
        mana={state.mana}
        setMana={state.setMana}
        onBack={() => state.setScreen('home')}
        onDenied={() => state.setScreen('denied')}
      />
    );
  }

  if (state.screen === 'denied') {
    return (
      <Denied
        profile={state.profile}
        onTryAgain={() => {
          state.setMana(0);
          state.setScreen('teleport');
        }}
        onHome={() => state.setScreen('home')}
      />
    );
  }

  return null;
}
