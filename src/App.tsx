import React from 'react';

import "@arco-design/web-react/dist/css/arco.css";
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import Login from "./Login";
import Menu from "./Menu";
import Panel from "./Panel";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/panel" element={<Panel/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Router>

    );
}

export default App;
