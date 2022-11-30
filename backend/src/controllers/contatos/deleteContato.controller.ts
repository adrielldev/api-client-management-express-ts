import {Request, Response} from 'express'
import deleteContatoService from '../../services/contatos/deleteContato.service'


const deleteContatoController = async (req:Request,res:Response) => {
    const {id} = req.params
    try {
        await deleteContatoService(id)
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


export default deleteContatoController

