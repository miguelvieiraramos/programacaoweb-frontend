import React from 'react';
import {ErrorMessage, Formik, Form, Field} from 'formik';
import { useParams } from "react-router-dom";
import * as yup from 'yup';

function AlterUserForm({ users, setUsers }) {
  const { id } = useParams();

  const initialValues = {
    login: '',
    nome: '',
    cpf: '',
    dataNascimento: '2000-02-02',
    sexo:  'Masculino',
    estadoCivil: 'Solteiro(a)'
  }

  const validationSchema = yup.object().shape({
    login: yup.string().required('Login é um campo obrigatório.'),
    nome: yup.string().required('Nome é um campo obrigatório.'),
    cpf: yup.string().required('CPF é um campo obrigatório.'),
    dataNascimento: yup.string().required('Data de Nascimento é um campo obrigatório.'),
  });

  function handleSubmit(values) {
    alert(JSON.stringify(values))
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
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
          <Field type="text" name="nome" />
          <ErrorMessage component="span" name="nome" />
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
          <input type="submit" value="Criar"></input>
        </div>
      </Form>
    </Formik>
  )
}

export default AlterUserForm;