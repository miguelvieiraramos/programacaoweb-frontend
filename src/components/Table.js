import React from 'react';
import { Link } from "react-router-dom";

function Table({ users, setUsers }) {

  async function deleteUsuario(id) {
    const response = await fetch(`http://localhost:8080/usuario/${id}`, { method: 'DELETE' });
    if(response.status === 200) {
      const newUsers = users.filter(usuario => usuario.id !== id);
      setUsers(newUsers);
    }
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Nome</th>
          <th>CPF</th>
          <th>Data de Nascimento</th>
          <th>Sexo</th>
          <th>Estado Civil</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map(user => (
            <tr key={user.id}>
              <td>{user.login}</td>
              <td>{user.nomeCompleto}</td>
              <td>{user.cpf}</td>
              <td>{user.dataNascimento}</td>
              <td>{user.sexo}</td>
              <td>{user.estadoCivil}</td>
              <td>
                <button className="red button" onClick={deleteUsuario.bind(this, user.id)}>Remover</button>
                <button className="ocean button"><Link to="/alterar-usuario/1">Alterar</Link></button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default Table;
