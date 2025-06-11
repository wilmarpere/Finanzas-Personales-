// deno-lint-ignore-file
import {Router } from 'https://deno.land/x/oak@v17.1.3/mod.ts';
import{getCuentas} from "../Controller/cuentasController.ts"

const CuentasRoutes = new  Router();
CuentasRoutes.get("/cuentas",getCuentas)

export{CuentasRoutes}

