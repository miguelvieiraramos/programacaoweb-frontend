class Usuario {
   constructor(dados) {
     this.login = dados.login;
     this.nomeCompleto = dados.nomeCompleto;
     this.cpf = dados.cpf;
     this.dataNascimento = dados.dataNascimento;
     this.sexo = dados.sexo;
     this.estadocivil = dados.estadocivil;
   }
}

export default Usuario;
