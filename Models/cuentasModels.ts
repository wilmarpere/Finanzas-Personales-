import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface CuentasData {
    id_cuenta: number | null,
    id_usuario: number,
    nombre: string,
    tipo: string,
    saldo: number
}

export class Cuentas {
    public _objCuentas: CuentasData | null;
    public _idCuentas: number | null;

    constructor(objCuentas: CuentasData | null = null, idCuentas: number | null = null) {
        this._idCuentas = idCuentas;
        this._objCuentas = objCuentas;
    }

    public async registrarCuentas(): Promise<{ success: boolean; message: string; cuenta?: Record<string, unknown> }> {
        try {
            if (!this._objCuentas) {
                throw new Error("No se ha proporcionado un objeto de tipo cliente valido");
            }

            const { id_usuario, nombre, tipo, saldo } = this._objCuentas;
            if (!nombre || !id_usuario || !tipo || saldo === undefined || saldo === null) {
                throw new Error("Faltan campos requeridos para registrar la peticion");
            }

            await conexion.execute("START TRANSACTION");
            const result = await conexion.execute(
                "INSERT INTO Cuentas (id_usuario, nombre, tipo, saldo) VALUES (?, ?, ?, ?)",
                [id_usuario, nombre, tipo, saldo]
            );
            if (result && typeof result.affectedRows == "number" && result.affectedRows > 0) {
                const [Cuenta] = await conexion.query(
                    "SELECT * FROM Cuentas WHERE id_cuenta = LAST_INSERT_ID()"
                );
                await conexion.execute("COMMIT");
                return {
                    success: true,
                    message: "Cuenta registrada correctamente",
                    cuenta: Cuenta
                };
            } else {
                throw new Error("Error al registrar la cuenta");
            }
        } catch (error) {
            await conexion.execute("ROLLBACK");
            console.error("Error en registrarCuentas:", error);
            if (error instanceof z.ZodError) {
                return {
                    success: false,
                    message: error.message
                };
            } else {
                return {
                    success: false,
                    message: "Error interno del servidor"
                };
            }
        }
    }
}