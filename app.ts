// deno-lint-ignore-file
import { route } from "https://deno.land/x/oak@v17.1.3/middleware/serve.ts";
import { Application,oakCors } from "./Dependencies/dependencias.ts";
import{UsuarioRutes} from "./Routes/usuarioRoutes.ts"
import { LoginRouter } from "./Routes/LoginRoutes.ts";
import { CuentasRoutes } from "./Routes/cuentasRoutes.ts";
import { UserRouter } from "./Routes/userRou.ts";

const app = new Application();
app.use (oakCors());

const routes =[UsuarioRutes,LoginRouter,CuentasRoutes,UserRouter]

routes.forEach((route)=>{
    app.use(route.routes());
    app.use(route.allowedMethods());
})

console.log(" Servidor corriendo por el puerto 8000");
await app.listen({port: 8000})