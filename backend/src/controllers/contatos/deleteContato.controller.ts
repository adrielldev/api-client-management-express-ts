import {Request, Response} from 'express'


const deleteContatoController = async (req:Request,res:Response) => {

    try {
        
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

