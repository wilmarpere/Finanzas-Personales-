import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";

interface CuentasData {
    id_cuenta: number | null,
    id_usuario: number,
    nombre: string,
    tipo: string,
    saldo: number,
    fecha_creacion?: string | undefined
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
                const cuentaResult = await conexion.query(
                    "SELECT id_cuenta, id_usuario, nombre, tipo, saldo FROM Cuentas WHERE id_cuenta = LAST_INSERT_ID()"
                );
                await conexion.execute("COMMIT");
                return {
                    success: true,
                    message: "Cuenta registrada correctamente",
                    cuenta: cuentaResult[0]
                };
            } else {
                throw new Error("Error al registrar la cuenta");
            }
        } catch (error) {
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

    public async listarCuentasPorUsuario(id_usuario: number): Promise<CuentasData[]> {
        try {
            console.log(`Buscando cuentas para usuario ID: ${id_usuario}`);
            
            const result = await conexion.query(
                "SELECT id_cuenta, id_usuario, nombre, tipo, saldo FROM Cuentas WHERE id_usuario = ?",
                [id_usuario]
            );
            
            console.log("Resultado de la consulta:", result);
            
            // Verificar si result es un array y si tiene datos
            if (!Array.isArray(result)) {
                console.log("El resultado no es un array:", typeof result);
                return [];
            }
            
            if (result.length === 0) {
                console.log("No se encontraron cuentas para este usuario");
                return [];
            }

            // Si el primer elemento es un array (formato [valor1, valor2, ...])
            if (Array.isArray(result[0])) {
                return result.map((row: any[]) => ({
                    id_cuenta: row[0],
                    id_usuario: row[1],
                    nombre: row[2],
                    tipo: row[3],
                    saldo: row[4],
                    fecha_creacion: undefined // No existe en la DB
                })) as CuentasData[];
            }
            
            // Si el primer elemento es un objeto (formato {columna: valor, ...})
            if (typeof result[0] === 'object' && result[0] !== null) {
                return result.map((row: any) => ({
                    id_cuenta: row.id_cuenta || row.ID_CUENTA,
                    id_usuario: row.id_usuario || row.ID_USUARIO,
                    nombre: row.nombre || row.NOMBRE,
                    tipo: row.tipo || row.TIPO,
                    saldo: row.saldo || row.SALDO,
                    fecha_creacion: undefined // No existe en la DB
                })) as CuentasData[];
            }
            
            console.log("Formato de resultado no reconocido");
            return [];
            
        } catch (error) {
            console.error("Error en listarCuentasPorUsuario:", error);
            throw error;
        }
    }
}

// Función para usar en el controlador
export async function obtenerCuentasPorUsuario(id_usuario: number) {
    const cuentas = new Cuentas();
    try {
        console.log(`Obteniendo cuentas para usuario: ${id_usuario}`);
        const lista = await cuentas.listarCuentasPorUsuario(id_usuario);
        console.log(`Cuentas encontradas: ${lista.length}`);
        return { success: true, data: lista };
    } catch (error) {
        console.error("Error en obtenerCuentasPorUsuario:", error);
        return { success: false, msg: "Error al obtener cuentas" };
    }
}