import {Request, Response} from 'express'
import createClientService from '../../services/clientes/createClient.service'


const createClientController = async(req:Request,res:Response) => {
    try {
        const newClient = await createClientService(req.body)

        return res.status(201).json(newClient)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                "error":error.name,
                "message":error.message
            })
        }
    }


}

export default createClientController