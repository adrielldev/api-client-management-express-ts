

import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/clientes.entity";

const listOneClientService = async (id:string) => {

    const clientRepository = AppDataSource.getRepository(Cliente)
    const clientes = await clientRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })
    const cliente = clientes.find(cliente => cliente.id === id)

    return cliente
}

export default listOneClientService
