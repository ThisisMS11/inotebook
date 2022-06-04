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
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {

  const [alert, setAlert] = useState({ msg: 'Welcome to inotebook', type: "success" });

  console.log("localstorage",localStorage.getItem('token'))

  // This way you can pass variables to arrow functions.
  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    // using setTimeout we can delete this alert after 1.5 seconds
    setTimeout(() => {
      setAlert(null)
    }, 2500);
  }

  return (
    <>
      {/* NoteState :-> contains all the states and functions */}

      <NoteState>
        <BrowserRouter>


          {/* Navbar :-> contains the navigation bar code */}
          <Navbar />


          {/* now i want to delete this alert after 2 sec of application starting how do i do that? */}
          {/* Alert:-> contains the Alert code */}
          {/* alerto is the prop name */}

          <Alert alerto={alert} showalert={showalert}/>

          <div className="container">
            <Routes>

              {/* Home :-> contains the Notes display code inheriting <Notes/> component */}
              <Route exact path="/" element={<Home showalert={showalert} />}></Route>

              {/* About :-> contains the About stuff */}
              <Route exact path="/about" element={<About />}></Route>

              <Route exact path="/login" element={<Login showalert={showalert} />}></Route>

              <Route exact path="/signup" element={<Signup showalert={showalert} />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
