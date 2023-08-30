const db = require("../../../database/databaseconfig");

const getAllClientes = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = Clientes.cursoid)" +
        "FROM Clientes where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getClienteByID = async (ClienteIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT descricao from CURSOS where cursoid = Clientes.cursoid)" +
        "FROM Clientes WHERE Clienteid = $1 and deleted = false ORDER BY nome ASC",
      [ClienteIDPar]
    )
  ).rows;
};

const insertClientes = async (ClienteREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO Clientes " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          ClienteREGPar.prontuario,
          ClienteREGPar.nome,
          ClienteREGPar.endereco,
          ClienteREGPar.rendafamiliar,
          ClienteREGPar.datanascimento,
          ClienteREGPar.cursoid,
          ClienteREGPar.deleted,
        ]
      )
    ).rowCount;
    Cliente} catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdateClientes = async (ClienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Clientes SET " +
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE Clienteid = $1",
        [
          ClienteREGPar.Clienteid,
          ClienteREGPar.prontuario,
          ClienteREGPar.nome,
          ClienteREGPar.endereco,
          ClienteREGPar.rendafamiliar,
          ClienteREGPar.datanascimento,
          ClienteREGPar.cursoid,
          ClienteREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|insertClientes] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeleteClientes = async (ClienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE Clientes SET " + "deleted = true " + "WHERE Clienteid = $1",
      [ClienteREGPar.Clienteid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlClientes|insertClientes] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  UpdateClientes,
  DeleteClientes,
};