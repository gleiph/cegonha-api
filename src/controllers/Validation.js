const { Sequelize } = require("sequelize");

module.exports = {
  validationCpf: function (value) {
    cpf = value.split("").map((e) => parseInt(e));
    let errors = 0;
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
      sum1 += cpf[i] * (10 - i);
    }
    const resto1 = (sum1 * 10) % 11;
    if (resto1 < 10) {
      if ((cpf[9] == resto1) == false) errors++;
    } else {
      if ((errors = cpf[9] == 0) == false) errors++;
    }

    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
      sum2 += cpf[i] * (11 - i);
    }
    const resto2 = (sum2 * 10) % 11;
    if (resto2 < 10) {
      if ((cpf[10] == resto2) == false) errors++;
    } else {
      if ((errors = cpf[10] == 0) == false) errors++;
    }

    const primeiro = cpf[0];
    let different = false;
    for (let i = 1; i < cpf.length; i++) {
      if (cpf[i] != primeiro) {
        different = true;
        break;
      }
    }
    if (different == false) errors++;

    if (cpf.length != 11) {
      errors++;
    }

    if (errors == 0) {
      return true;
    }

    return false;
  },

  validationPassword: function (senha) {
    var validation = false;
    var letrasMaiusculas = /[A-Z]/;
    var letrasMinusculas = /[a-z]/;
    var numeros = /[0-9]/;
    var caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;
    if (senha.length < 8) {
      return validation;
    }
    var auxMaiuscula = 0;
    var auxMinuscula = 0;
    var auxNumero = 0;
    var auxEspecial = 0;
    for (var i = 0; i < senha.length; i++) {
      if (letrasMaiusculas.test(senha[i])) auxMaiuscula++;
      else if (letrasMinusculas.test(senha[i])) auxMinuscula++;
      else if (numeros.test(senha[i])) auxNumero++;
      else if (caracteresEspeciais.test(senha[i])) auxEspecial++;
    }
    if (auxMaiuscula > 0) {
      if (auxMinuscula > 0) {
        if (auxNumero > 0) {
          if (auxEspecial) {
            validation = true;
          }
        }
      }
    }

    return validation;
  },

  validationEmail: function (email) {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!re.test(String(email).toLowerCase())) {
      return false;
    }
    return true;
  },
};
