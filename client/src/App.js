/*
  Grupo: 02
        ID: 402330997 - Rolando Herrera Bustos - 10am
        ID: 116830152 - Marvin Aguilar Fuentes - 10am
        ID: 116880486 - Alonso Calderón Trigueros - 10am
        ID: 402390142 - José David Flores Rodríguez - 10am
*/

import { Main } from './components/Main';
import { Navigation } from './components/Navigation';
import { SearchDFAModal } from './components/modals/SearchDFAModal';
import { ConfirmModal } from './components/modals/ConfirmModal';
import { AboutModal } from './components/modals/AboutModal';
import { InstructionsModal } from './components/modals/InstructionsModal';
import { ErrorsModal } from './components/modals/ErrorsModal';
import { EditTransitionModal } from './components/modals/EditTransitionModal';
import GlobalProvider from './context/GlobalContext';

import './App.css';

function App() {
  return (
    <GlobalProvider>

      <Navigation />

      <Main />

      <SearchDFAModal />

      <ConfirmModal />

      <AboutModal />

      <EditTransitionModal/>

      <InstructionsModal />

      <ErrorsModal />

      

    </GlobalProvider>
  );
}

export default App;
