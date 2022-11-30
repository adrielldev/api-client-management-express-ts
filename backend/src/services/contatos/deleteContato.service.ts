import { AppDataSource } from "../../data-source";
import { Contato } from "../../entities/contatos.entity";

const deleteContatoService = async(id:string) => {
    const contatoRepository = AppDataSource.getRepository(Contato)
    contatoRepository.delete(id)
    
    return
}


export default deleteContatoService