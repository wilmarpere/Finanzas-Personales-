// deno-lint-ignore-file
import {Router } from 'https://deno.land/x/oak@v17.1.3/mod.ts';
import{getCuentas,postCuentas,putCuentas,deleteCuentas} from "../Controller/cuentasController.ts"

const CuentasRoutes = new  Router();

CuentasRoutes.post("/cuentas",postCuentas);
CuentasRoutes.get("/cuentas/:id",getCuentas);
CuentasRoutes.put("/cuentas/:id",putCuentas);
CuentasRoutes.delete("/cuentas/:id",deleteCuentas)

export{CuentasRoutes}

