import React, { useEffect, useState } from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import { useParams } from "react-router-dom";
import * as yup from 'yup';

function AlterUserForm({ users, setUsers }) {
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    login: 'joao',
    nomeCompleto: '',
    cpf: '',
    dataNascimento: '2000-02-02',
    sexo:  'Masculino',
    estadoCivil: 'Solteiro(a)'
  }
);

  useEffect(() => {
    async function getUsuario() {
      const response = await fetch(`http://localhost:8080/usuario/${id}`)
      const data = await response.json();
      if(response.status === 200) {
        setInitialValues(data);
      }
    } 
    getUsuario();
  }, [id]);

  const validationSchema = yup.object().shape({
    login: yup.string().required('Login é um campo obrigatório.'),
    nomeCompleto: yup.string().required('Nome é um campo obrigatório.'),
    cpf: yup.string().required('CPF é um campo obrigatório.'),
    dataNascimento: yup.string().required('Data de Nascimento é um campo obrigatório.'),
  });

  async function handleSubmit(values) {
    try {
      const response = await fetch('http://localhost:8080/usuario', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        alterarUsuario(data);
        setSuccessMessage(true);
        closeSuccessMessage();
      }
    } catch(e) {
      setErrorMessage(true);
      closeErrorMessage();
    }
  }

  function alterarUsuario(usuarioAlterado) {
    const index = users.findIndex(usuario => usuario.id === usuarioAlterado.id);
    const novosUsuarios = [...users];
    novosUsuarios[index] = usuarioAlterado;
    setUsers(novosUsuarios);
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
    O usuário foi alterado com sucesso.
    </div>
    <div style={{opacity: errorMessage ? "1" : "0" }} className="error info">
      Não foi possível alterar o usuário.
    </div>
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema} enableReinitialize>
      <Form>
        <div className="title-group">
         <h2>Alterar Usuário { id }</h2>
        </div>
        <div className="form-group">
          <div className="label-group">
            <label>Login</label>
          </div>
          <Field type="text" name="login" />
          <ErrorMessage component="span" name="login" />
        </div>
        <div className="form-group">
          <div className="label-group">
            <label>Nome</label>
          </div>
          <Field type="text" name="nomeCompleto" />
          <ErrorMessage component="span" name="nomeCompleto" />
        </div>
        <div className="form-group">
        <div className="label-group">
            <label>CPF</label>
          </div>
          <Field type="text" name="cpf" />
          <ErrorMessage component="span" name="cpf" />
        </div>
        <div className="form-group">
          <div className="label-group">
            <label>Data de Nascimento</label>
          </div>
          <Field type="date" name="dataNascimento" /><br></br>
          <ErrorMessage component="span" name="dataNascimento" />
        </div>
        <div className="form-group">
          <div className="label-group">
            <label>Sexo</label>
          </div>
          <Field component="select" name="sexo">
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </Field>
          <ErrorMessage component="span" name="sexo" />
        </div>
        <div className="form-group">            
          <div className="label-group">
            <label>Estado Civil</label>
          </div>
          <Field component="select" name="estadoCivil">
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
            <option value="Viúvo(a)">Viúvo(a)</option>
            <option value="Separado(a)">Separado(a)</option>
          </Field>
          <ErrorMessage component="span" name="estadoCivil" />
        </div>
        <div className="form-group">
          <input type="submit" value="Alterar"></input>
        </div>
      </Form>
    </Formik>
    </>
  )
}

export default AlterUserForm;