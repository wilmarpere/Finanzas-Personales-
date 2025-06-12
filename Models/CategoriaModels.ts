import { conexion } from "./conexion.ts";
import { z } from "../Dependencies/dependencias.ts";


type EstadoTIpo = 'Ingreso' | 'Gasto';


interface CategoriaData{

    id_categoria: number | null;
    id_usuario: number;
    nombre : string;
    tipo: EstadoTIpo;


}
export class Categoria {

    public _objCategoria: CategoriaData | null;
    public _idCategoria: number | null;

    constructor (objCategoria: CategoriaData | null= null, id_Categoria: number | null = null){

        this._idCategoria = id_Categoria;
        this._objCategoria = objCategoria;
    }

public async listaCategoria(): Promise<CategoriaData[]>{

    const {rows: Categorias} = await conexion.execute("SELECT * FROM categorias");
    return Categorias as CategoriaData[];
}

public async listaCategoriasPorUsers(id_usuario: number): Promise<CategoriaData[]>{
    const {rows: Categorias} = await conexion.execute("SELECT * FROM categorias WHERE id_usuario =?",[id_usuario]);
    return Categorias as CategoriaData[];
}


}
export async function obtenerCategPorUsers(id_usuario:number) {
    const categoria = new Categoria();
    try {
        const categorias = await categoria.listaCategoriasPorUsers(id_usuario);
        return {success: true, data: categorias};
        
    } catch (error) {
        
        return {success: false, msg:"Error al obtener categorias"};
    }
    
}
