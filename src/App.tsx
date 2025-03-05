import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalGlobal } from './components/organism/modals/global';
import { TransactionsTable } from './pages/table-transactions';
import Home from './pages/user-register/home';


function App() {

  return (
    <>
      <div>
        <ModalGlobal />
        <Router>
          <Routes>
            <Route path="/" element={<TransactionsTable />} />
            <Route path="/user-register/home" element={<Home />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
