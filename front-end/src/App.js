import 'antd/dist/antd.css';
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Button} from 'antd';

import Home from "./pages/Home.jsx";
import CreateNewWork from './pages/CreateNewWork.jsx';
import { Header } from 'antd/lib/layout/layout';
import EditWork from './pages/EditWork.jsx';

function App() {
  return (
    <div >
      {/* <Header><h1 style={{color: 'white'}}>Home Page</h1></Header> */}
      <h1>Home Page</h1>
      <a href="/">
      <Button type="primary"  shape="round">Home Page</Button>
      </a>
      <a href="/Home">
      <Button type="primary"  shape="round">View List</Button>
      </a>
      <a href="/create">
      <Button type="primary"  shape="round">Create New Work Flow</Button>
      </a>  
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/create" element={<CreateNewWork />}/>
        <Route path="/editWork/:id" element={<EditWork />}/>
        
      </Routes>
    </BrowserRouter>
    
    </div>
    
  );
}

export default App;
