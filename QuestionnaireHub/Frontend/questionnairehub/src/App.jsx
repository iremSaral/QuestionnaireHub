//İrem SARAL
//Date: 20.07.2023

import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//İmport application pages from pages folder.
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from './pages/Register';
import Create from './pages/Create';
import Solve  from'./pages/Solve';
import Edit from './pages/Edit';
import ShowInfo from './pages/ShowInfo';
function App() {
  return (
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}></Route>
  <Route path="/Login" element={<Login/>}></Route>
  <Route path='/Register' element={<Register/>}/>
  <Route path='/Create' element={<Create/>}/>
  <Route path='/Solve' element={<Solve/>}/>
  <Route path='/Edit' element={<Edit/>}/>
  <Route path='/ShowInfo' element={<ShowInfo/>}/>
</Routes>
</BrowserRouter>
  )
}

export default App