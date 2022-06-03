import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Alert from './components/Alert';

function App() {

  return (
    <>
      {/* NoteState :-> contains all the states and functions */}

      <NoteState>
        <BrowserRouter>


          {/* Navbar :-> contains the navigation bar code */}
          <Navbar />


          {/* now i want to delete this alert after 2 sec of application starting how do i do that? */}
          {/* Alert:-> contains the Alert code */}
          <Alert message='welcome to react app' />

          <div className="container">
            <Routes>

              {/* Home :-> contains the Notes display code inheriting <Notes/> component */}
              <Route exact path="/" element={<Home />}></Route>

              {/* About :-> contains the About stuff */}
              <Route exact path="/about" element={<About />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
