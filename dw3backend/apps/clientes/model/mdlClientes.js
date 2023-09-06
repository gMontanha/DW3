const db = require("../../../database/databaseconfig");

const GetAllClientes = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM clientes where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const GetClienteByID = async (ClienteIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM clientes WHERE clienteid = $1 and deleted = false ORDER BY nome ASC",
      [ClienteIDPar]
    )
  ).rows;
};

const InsertClientes = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes " + "values(default, $1, $2, $3, $4, $5)",
        [
          registroPar.codigo,
          registroPar.nome,
          registroPar.endereco,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET " +
          "codigo = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "ativo = $5, " +
          "deleted = $6 " +          
          "WHERE clienteid = $1",
        [
            registroPar.clienteid  ,
            registroPar.codigo   ,
            registroPar.nome,
            registroPar.ativo    ,
            registroPar.deleted  ,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|UpdateClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeleteClientes = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE clientes SET " + "deleted = true " + "WHERE clienteid = $1",
      [registroPar.Clienteid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlClientes|DeleteClientes] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateClientes,
  DeleteClientes,
};