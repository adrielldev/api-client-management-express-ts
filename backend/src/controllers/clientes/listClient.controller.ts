import { Request,Response } from "express";
import listClientService from "../../services/clientes/listClient.service";

const listClientController = async (req:Request,res:Response) => {

    try {
        const clientes = await listClientService()
        return res.status(200).json(clientes)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }

}


export default listClientController