import { Cliente } from "../../entities/clientes.entity";
import { AppDataSource } from "../../data-source";

const deleteClientService = async (id:string) => {

    const clientRepository = AppDataSource.getRepository(Cliente)

    clientRepository.delete(id)



    return 
}


export default deleteClientService