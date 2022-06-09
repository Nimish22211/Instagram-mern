import './App.css';
import Header from './Components/Header';
import Story from './Components/Story';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Posts from './Components/Posts';
import Profile from './Components/Profile'

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={(
            <>
              <Header />
              <section className="main_container">
                <Story />
                <Posts />
              </section>
            </>
          )} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:username/:profile" element={(
            <>
              <Header />
              <Profile />
            </>
          )} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
