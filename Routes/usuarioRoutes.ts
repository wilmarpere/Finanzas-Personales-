// deno-lint-ignore-file
import { Router } from "../Dependencies/dependencias.ts";
import{postUsuario} from "../Controller/UsuarioController.ts"

const UsuarioRutes = new Router();

UsuarioRutes.post("/usuarioss",postUsuario);

export{UsuarioRutes}