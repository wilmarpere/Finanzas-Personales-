// deno-lint-ignore-file
import { Router } from "../Dependencias/dependencias.ts";
import{postUsuario} from "../Controller/UsuarioController.ts"

const UsuarioRutes = new Router();

UsuarioRutes.post("/usuario",postUsuario);

export{UsuarioRutes}