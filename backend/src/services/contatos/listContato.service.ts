import { AppDataSource } from "../../data-source";
import { Contato } from "../../entities/contatos.entity";

const listContatoService = async () => {
    const contatoRepository = AppDataSource.getRepository(Contato)
    const contatos = await contatoRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })


    return contatos;


}


export default listContatoService