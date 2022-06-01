import './App.css';
import Header from './Components/Header';
import Story from './Components/Story';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={(
            <>
              <Header />
              <Story />
            </>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
