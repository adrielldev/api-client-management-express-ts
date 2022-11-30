import {Request, Response} from 'express'
import createContatoService from '../../services/contatos/createContato.service'


const createContatoController = async (req:Request,res:Response) => {

    try {
        const contato = await createContatoService(req.body)
        return res.status(201).json(contato)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }


}


export default createContatoController

