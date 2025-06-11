// deno-lint-ignore-file
import { Router } from "../Dependencies/dependencias.ts";
import { posUserLogin } from "../Controller/LoginController.ts";


const  LoginRouter = new Router();

LoginRouter.post("/",posUserLogin)



export {LoginRouter};