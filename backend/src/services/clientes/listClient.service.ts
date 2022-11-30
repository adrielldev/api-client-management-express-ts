

import { Cliente } from "../../entities/clientes.entity";
import { AppDataSource } from "../../data-source";

const listClientService = async () => {
    const clientRepository = AppDataSource.getRepository(Cliente)
    const clientes = await clientRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })


    return clientes
}


export default listClientService
