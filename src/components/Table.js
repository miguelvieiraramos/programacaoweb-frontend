import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Table({ users, setUsers }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  async function deleteUsuario(id) {
    try {
      const response = await fetch(`http://localhost:8080/usuario/3`, { method: 'DELETE' });
      if(response.status === 200) {
        const newUsers = users.filter(usuario => usuario.id !== id);
        setUsers(newUsers);
        setSuccessMessage(true);
        closeSuccessMessage();
      } else {
        setErrorMessage(true);
        closeErrorMessage();
      }
    } catch(e) {
      setErrorMessage(true);
      closeErrorMessage();
    }
  }

  function closeSuccessMessage() {
    setTimeout(() => setSuccessMessage(false), 3000);
  }

  function closeErrorMessage() {
    setTimeout(() => setErrorMessage(false), 3000);
  }
  return (
    <>
      <div style={{opacity: successMessage ? "1" : "0" }} className="success info">
        O usuário foi deletado com sucesso.
      </div>
      <div style={{opacity: errorMessage ? "1" : "0" }} className="error info">
        Não foi possível deletar o usuário.
      </div>
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
                  <button className="ocean button"><Link to={`/alterar-usuario/${user.id}`}>Alterar</Link></button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}

export default Table;
