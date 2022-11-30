import { Request,Response } from "express";
import deleteClientService from "../../services/clientes/deleteClient.service";

const deleteClientController = async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        await deleteClientService(id)

        return res.status(204).json({})

        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }

}


export default deleteClientController