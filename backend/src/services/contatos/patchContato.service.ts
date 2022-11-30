import { AppDataSource } from "../../data-source";
import { Contato } from "../../entities/contatos.entity";
import { Email } from "../../entities/emails.entity";
import { Telefone } from "../../entities/telefones.entity";
import {IContatoUpdated }from '../../interfaces/contatos'

const patchContatoService = async ({name,emails,telefones,id}:IContatoUpdated) => {
    const contatoRepository = AppDataSource.getRepository(Contato)
    const emailRepository = AppDataSource.getRepository(Email)
    const telefoneRepository = AppDataSource.getRepository(Telefone)

    const emailsAll = await emailRepository.find()
    const telefonesAll = await telefoneRepository.find()
    const contatosAll = await contatoRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })
    
    const contato = contatosAll.find(contato => contato.id === id)
    let contatoUpdated = {}
    let telefonesUpdated = []; let emailsUpdated = []
    if(contato) {
        if(emails){
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

        }
        if(telefones){
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

        }
        if(name){
            contato.name = name
        }

        for(let i:number =0 ; i<contato.telefones.length;i++){
            telefonesUpdated.push(contato.telefones[i].telefone)
        }
        for(let i:number=0;i<contato.emails.length;i++){
            emailsUpdated.push(contato.emails[i].email)
        }

        contatoUpdated = {
            id:contato.id,
            name:contato.name,
            telefones:telefonesUpdated,
            emails:emailsUpdated
        }


    }


    return contatoUpdated

}

export default patchContatoService