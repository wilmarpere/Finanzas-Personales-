import { Router } from "../Dependencies/dependencias.ts";
import { authMiddleware } from "../Middlewares/ValidateJWT.ts";
import { getCategoriaUsuario } from "../Controller/CategoriaController.ts";


const CategoriaRouter = new Router();

CategoriaRouter.get("/categoria",authMiddleware,getCategoriaUsuario);

export {CategoriaRouter};