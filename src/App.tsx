import './App.css'
import { ModalGlobal } from './components/organism/modals/global';
import Home from './pages/user-register/home';


function App() {

  return (
    <>
      <div>
        <ModalGlobal />
        <Home />
      </div>
    </>
  )
}

export default App
