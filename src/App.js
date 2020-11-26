import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table.js';
import CreateUserForm from './components/CreateUserForm.js';
import AlterUserForm from './components/AlterUserForm.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Usuario from './components/Usuario';


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  async function getUsuarios() {
    const response = await fetch('http://localhost:8080/usuario');
    const data = await response.json();
    setUsers(data);
  }
  

  return (
    <div className="main">
      <h1>CRUD User</h1>
      <Router>
        <div className="container">
          <div className="buttons">
            <button className="blue button"><Link to="/listar">Listar Usuário</Link></button>
            <button className="green button"><Link to="/criar-usuario">Criar Usuário</Link></button>
          </div>
          
          <Table users={users} setUsers={setUsers} />
          
          <Route path="/criar-usuario">
            <CreateUserForm users={users} setUsers={setUsers} />
          </Route>
          <Route path="/alterar-usuario/:id">
            <AlterUserForm users={users} setUsers={setUsers} />
          </Route>
        </div>
      </Router>
    </div>
  );
}

export default App;
