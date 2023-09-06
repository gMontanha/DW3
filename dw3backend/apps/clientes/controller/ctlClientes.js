const mdlClientes = require("../model/mdlClientes");

const GetAllClientes = (req, res) =>
  (async () => {
    let registro = await mdlClientes.GetAllClientes();
    res.json({ status: "ok", "registro": registro });
  })();

const GetClienteByID = (req, res) =>
  (async () => {
    const ClienteID = parseInt(req.body.Clienteid);
    let registro = await mdlClientes.GetClienteByID(ClienteID);

    res.json({ status: "ok", "registro": registro });
})();

const InsertClientes = (request, res) =>
  (async () => {
    //@ Atenção: aqui já começamos a utilizar a variável msg para retornar erros de banco de dados.
    const ClienteREG = request.body;    
    let { msg, linhasAfetadas } = await mdlClientes.InsertClientes(ClienteREG);    
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const UpdateClientes = (request, res) =>
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
  GetAllClientes,
  GetClienteByID,
  InsertClientes,
  UpdateClientes,
  DeleteClientes
};