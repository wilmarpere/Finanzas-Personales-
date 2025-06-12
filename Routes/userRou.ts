import { Router } from "../Dependencies/dependencias.ts";
import { authMiddleware } from "../Middlewares/ValidateJWT.ts";


const UserRouter = new Router();

UserRouter.get("/users",authMiddleware,(ctx)=>{
    ctx.response.status = 200;
    ctx.response.body = {msg: "Acceso permitido"}
});



UserRouter.post("/users",authMiddleware,()=>{})
UserRouter.put("/users",authMiddleware,()=>{})
UserRouter.delete("/users",authMiddleware,()=>{})



export {  UserRouter } ;