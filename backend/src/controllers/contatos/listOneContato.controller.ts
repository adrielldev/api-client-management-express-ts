import {Request, Response} from 'express'
import listOneContatoService from '../../services/contatos/listOneContato.service'


const listOneContatoController = async (req:Request,res:Response) => {
    const {id} =  req.params
    try {
        const contato = await listOneContatoService(id)

        return res.status(200).json(contato)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }


}


export default listOneContatoController

