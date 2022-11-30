import { Router } from "express";
import createClientController from "./controllers/clientes/createClient.controller";
import deleteClientController from "./controllers/clientes/deleteClient.controller";
import listClientController from "./controllers/clientes/listClient.controller";
import updateClientController from "./controllers/clientes/updateClient.controller";
import listOneClientController from "./controllers/clientes/listOneClient.controller";
import createContatoController from "./controllers/contatos/createContato.controller";
import listContatoController from "./controllers/contatos/listContato.controller";
import deleteContatoController from "./controllers/contatos/deleteContato.controller";
import listOneContatoController from "./controllers/contatos/listOneContato.controller";
import updateContatoController from "./controllers/contatos/updateContato.controller";

const router = Router()


router.post('/clientes',createClientController)
router.get('/clientes',listClientController)
router.delete('/clientes/:id',deleteClientController)
router.get('/clientes/:id',listOneClientController)
router.patch('/clientes/:id',updateClientController)


router.post('/contatos',createContatoController)
router.get('/contatos',listContatoController)
router.delete('/contatos/:id',deleteContatoController)
router.get('/contatos/:id',listOneContatoController)
router.patch('/contatos/:id',updateContatoController)



export default router