import {Request, Response} from 'express'
import listContatoService from '../../services/contatos/listContato.service'


const listContatoController = async (req:Request,res:Response) => {

    try {
        const contatos = await listContatoService()
        return res.status(200).json(contatos)
        
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }


}


export default listContatoController

