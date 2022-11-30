import { AppDataSource } from "../../data-source";
import { Contato } from "../../entities/contatos.entity";
import listContatoService from "./listContato.service";

const listOneContatoService = async (id:string) => {

    const contatoRepository = AppDataSource.getRepository(Contato)
    const contatos = await contatoRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })
    const contato = contatos.find(contato => contato.id === id)


    return contato
} 


export default listOneContatoService