import { AppDataSource } from "../../data-source";
import { Contato } from "../../entities/contatos.entity";
import { Email } from "../../entities/emails.entity";
import { Telefone } from "../../entities/telefones.entity";
import { IContato } from "../../interfaces/contatos";

const createContatoService = async ({name,emails,telefones}:IContato) => {

    const contatoRepository = AppDataSource.getRepository(Contato)
    const emailRepository = AppDataSource.getRepository(Email)
    const telefoneRepository = AppDataSource.getRepository(Telefone)

    const emailsAll = await emailRepository.find()
    const telefonesAll = await telefoneRepository.find()

    const contato = new Contato()
    contato.name = name
    contato.emails = []
    contato.telefones = []
    for(let i:number=0;i<emails.length;i++){
        if(emailsAll.find(item=>item.email === emails[i])){
            throw new Error(`Email: ${emails[i]} already in use`)
        }else{
            
            const email = new Email()
            email.email = emails[i]
            contato.emails.push(email)
            email.contato = contato
            await contatoRepository.save(contato)
            await emailRepository.save(email)  
        }
    }

    for(let i:number=0;i<telefones.length;i++){
        if(telefonesAll.find(item=>item.telefone === telefones[i])){
            throw new Error(`Telefone: ${telefones[i]} already in use`)
        }else{
            
            const telefone = new Telefone()
            telefone.telefone = telefones[i]
            contato.telefones.push(telefone)
            telefone.contato = contato
            await contatoRepository.save(contato)
            await telefoneRepository.save(telefone)  
        }
    }

    const contatoReturned = {
        id:contato.id,
        name:contato.name,
        emails:emails,
        telefones:telefones
    }

    return contatoReturned;

}

export default createContatoService