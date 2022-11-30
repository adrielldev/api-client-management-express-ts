import { Request,Response } from "express";
import listOneClientService from "../../services/clientes/listOneClient.service";

const listOneClientController = async (req:Request,res:Response) => {

    const {id} = req.params
    try {
        const cliente = await listOneClientService(id)

        return res.status(200).json(cliente)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }

}


export default listOneClientController