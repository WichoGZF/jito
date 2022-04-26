import React, {useState} from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="App">
      <ResponsiveAppBar loggedIn={loggedIn}></ResponsiveAppBar>
    </div>
  );
}

export default App;
