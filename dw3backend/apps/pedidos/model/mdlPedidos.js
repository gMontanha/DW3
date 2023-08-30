const db = require("../../../database/databaseconfig");

const GetAllPedidos = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM Pedidos where deleted = false ORDER BY data ASC"
    )
  ).rows;
};

const GetPedidoByID = async (PedidoIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM Pedidos WHERE Pedidoid = $1 and deleted = false ORDER BY data ASC",
      [PedidoIDPar]
    )
  ).rows;
};

const InsertPedidos = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO Pedidos " + "values(default, $1, $2, $3, $4, $5)",
        [
          registroPar.numero,
          registroPar.data,
          registroPar.valortotal,
          registroPar.clienteid,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdatePedidos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Pedidos SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +          
          "WHERE Pedidoid = $1",
        [
            registroPar.Pedidoid  ,
            registroPar.codigo   ,
            registroPar.descricao,
            registroPar.ativo    ,
            registroPar.deleted  ,          
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|UpdatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};


const DeletePedidos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE Pedidos SET " + "deleted = true " + "WHERE Pedidoid = $1",
      [registroPar.Pedidoid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlPedidos|DeletePedidos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};


module.exports = {
  GetAllPedidos,
  GetPedidoByID,
  InsertPedidos,
  UpdatePedidos,
  DeletePedidos,
};