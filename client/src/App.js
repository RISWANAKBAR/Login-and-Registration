import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from './pages/Loginpage';
import Registrationform from './pages/Registrationform';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="Registration" element={<Registrationform />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
