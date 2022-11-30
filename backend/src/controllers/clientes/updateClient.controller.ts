import { Request,Response } from "express";
import updateClientService from "../../services/clientes/updateClient.service";

const updateClientController = async (req:Request,res:Response) => {
    const {name,emails,telefones} = req.body
    const {id} = req.params
    try {
        const clientUpdated = await updateClientService({name,emails,telefones,id})
        return res.status(200).json(clientUpdated)
        

        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }

}


export default updateClientController