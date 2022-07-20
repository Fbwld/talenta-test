import React from "react";
import {BrowserRouter as Router,Route, Routes,Link} from "react-router-dom"
import Landing from "./pages/Landing";
import AddMember from "./pages/Member";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route exact path="/landing" element={<Landing/>}/>
      <Route exact path="/add-member" element={<AddMember/>}/>
    </Routes>
    </div>
  );
}

export default App;
