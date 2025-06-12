// deno-lint-ignore-file
import {Router } from 'https://deno.land/x/oak@v17.1.3/mod.ts';
import { authMiddleware } from "../Middlewares/authMiddleware.ts";
import{getCuentasUsuario,postCuentas,putCuentas,deleteCuentas} from "../Controller/cuentasController.ts"

const CuentasRoutes = new  Router();

CuentasRoutes.get("/cuentas", authMiddleware, getCuentasUsuario);
CuentasRoutes.post("/cuentas",authMiddleware,postCuentas);
CuentasRoutes.put("/cuentas/:id",authMiddleware,putCuentas);
CuentasRoutes.delete("/cuentas/:id",authMiddleware,deleteCuentas)

export{CuentasRoutes}

