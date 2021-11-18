import { Main } from './components/Main';
import { Navigation } from './components/Navigation';
import './App.css';
import UserProvider from './context/UserContext';
import { SearchDFAModal } from './components/modals/SearchDFAModal';
import { ConfirmModal } from './components/modals/ConfirmModal';
import { AboutModal } from './components/modals/AboutModal';
import { InstructionsModal } from './components/modals/InstructionsModal';
import { ErrorsModal } from './components/modals/ErrorsModal';


function App() {
  return (
    <UserProvider>
      {/* ===NAVBAR=== */}
      <Navigation />

      {/* ===MAIN CONTAINER=== */}
      <Main />

      <SearchDFAModal />

      <ConfirmModal />

      <AboutModal />

      <InstructionsModal />

      <ErrorsModal />
    </UserProvider>
  );
}

export default App;
