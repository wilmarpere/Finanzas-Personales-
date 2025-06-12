import { Router } from "../Dependencies/dependencias.ts";
import { authMiddleware } from '../Middlewares/authMiddleware.ts';
import { getTransaccionUsuario } from "../Controller/transaccionController.ts";

const TransaccionRouter = new Router();

TransaccionRouter.get("/transaccion", authMiddleware,getTransaccionUsuario);

export { TransaccionRouter};
