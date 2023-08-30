const mdlClientes = require("../model/mdlClientes");

const getAllClientes = (req, res) =>
  (async () => {
    let registro = await mdlClientes.getAllClientes();
    res.json({ status: "ok", "registro": registro });
  })();

const getClienteByID = (req, res) =>
  (async () => {
    const ClienteID = parseInt(req.body.Clienteid);
    let registro = await mdlClientes.getClienteByID(ClienteID);

    res.json({ status: "ok", "registro": registro });
})();

const insertClientes = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const ClienteREG = request.body;    
    let { msg, linhasAfetadas } = await mdlClientes.insertClientes(ClienteREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateClientes = (request, res) =>
  (async () => {
    const ClienteREG = request.body;
    let  { msg, linhasAfetadas } = await mdlClientes.UpdateClientes(ClienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

  const DeleteClientes = (request, res) =>
  (async () => {
    const ClienteREG = request.body;
    let { msg, linhasAfetadas } = await mdlClientes.DeleteClientes(ClienteREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllClientes,
  getClienteByID,
  insertClientes,
  updateClientes,
  DeleteClientes
};