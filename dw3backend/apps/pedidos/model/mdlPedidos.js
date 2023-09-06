const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  return (
    await db.query(
      "SELECT *, (SELECT data from CLIENTES where clienteid = Pedidos.clienteid)" +
        "FROM Pedidos where deleted = false ORDER BY data ASC"
    )
  ).rows;
};

const getPedidoByID = async (PedidoIDPar) => {
  return (
    await db.query(
      "SELECT *, (SELECT data from CLIENTES where clienteid = Pedidos.clienteid)" +
        "FROM Pedidos WHERE Pedidoid = $1 and deleted = false ORDER BY data ASC",
      [PedidoIDPar]
    )
  ).rows;
};

const insertPedidos = async (PedidoREGPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO Pedidos " + "values(default, $1, $2, $3, $4, $5)",
        [
          PedidoREGPar.numero,
          PedidoREGPar.data,
          PedidoREGPar.valortotal,
          PedidoREGPar.clienteid,
          PedidoREGPar.deleted,
        ]
      )
    ).rowCount;
    Pedido} catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const UpdatePedidos = async (PedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE Pedidos SET " +
          "numero = $2, " +
          "data = $3, " +
          "valortotal = $4, " +
          "clienteid = $5, " +
          "deleted = $6 " +
          "WHERE Pedidoid = $1",
        [
          PedidoREGPar.Pedidoid,
          PedidoREGPar.numero,
          PedidoREGPar.data,
          PedidoREGPar.valortotal,
          PedidoREGPar.clienteid,
          PedidoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const DeletePedidos = async (PedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE Pedidos SET " + "deleted = true " + "WHERE Pedidoid = $1",
      [PedidoREGPar.Pedidoid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlPedidos|insertPedidos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  UpdatePedidos,
  DeletePedidos,
};