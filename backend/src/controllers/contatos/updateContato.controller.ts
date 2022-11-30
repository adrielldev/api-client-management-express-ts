import {Request, Response} from 'express'
import patchContatoService from '../../services/contatos/patchContato.service'


const updateContatoController = async (req:Request,res:Response) => {
    const {name,emails,telefones} = req.body
    const {id} = req.params
    try {
        const contatoUpdated = await patchContatoService({name,emails,telefones,id})
        return res.status(200).json(contatoUpdated)
    } catch (error) {
        if(error instanceof Error){
            return res.status(400).json({
                error:error.name,
                message:error.message
            })
        }
    }


}


export default updateContatoController

