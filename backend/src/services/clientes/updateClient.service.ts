import { Cliente } from "../../entities/clientes.entity";
import { Email } from "../../entities/emails.entity";
import { Telefone } from "../../entities/telefones.entity";
import { AppDataSource } from "../../data-source";
import { IClientUpdated } from "../../interfaces/clientes";


const updateClientService = async ({name,emails,telefones,id}:IClientUpdated) => {
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const emailRepository = AppDataSource.getRepository(Email)
    const telefoneRepository = AppDataSource.getRepository(Telefone)
    const emailsAll = await emailRepository.find()
    const telefonesAll = await telefoneRepository.find()
    const clientes = await clienteRepository.find({
        relations:{
            telefones:true,
            emails:true
        }
    })
    const cliente = clientes.find(client => client.id === id)
    let clienteReturned = {}
    let emailsReturned = [];let telefonesReturned = [];
    if(cliente){
        if(emails){
            for(let i:number=0;i<emails.length;i++){
                if(emailsAll.find(item=>item.email === emails[i])){
                    throw new Error(`Email: ${emails[i]} already in use`)
                }else{
                    const email = new Email()
                    email.email = emails[i]
                    cliente.emails.push(email)
                    email.cliente = cliente
                    await clienteRepository.save(cliente)
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
                    cliente.telefones.push(telefone)
                    telefone.cliente = cliente
                    await clienteRepository.save(cliente)
                    await telefoneRepository.save(telefone)  
                }
            }

        }
        if(name){
            cliente.name = name
        }

        for(let i=0;i<cliente.emails.length;i++){
            emailsReturned.push(cliente.emails[i].email)

        }
        for(let i=0;i<cliente.telefones.length;i++){
            telefonesReturned.push(cliente.telefones[i].telefone)

        }
        clienteReturned = {
            id:cliente.id,
            name:cliente.name,
            emails:emailsReturned,
            telefones:telefonesReturned,
            created_at:cliente.created_at
        }
    
}

return clienteReturned


}


export default updateClientService