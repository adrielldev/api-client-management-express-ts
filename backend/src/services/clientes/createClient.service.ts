import { AppDataSource } from "../../data-source";
import { Cliente } from "../../entities/clientes.entity";
import { Email } from "../../entities/emails.entity";
import { Telefone } from "../../entities/telefones.entity";
import { IClient} from "../../interfaces/clientes";


const createClientService = async ({name,emails,telefones}:IClient) => {
    const clienteRepository = AppDataSource.getRepository(Cliente)
    const emailRepository = AppDataSource.getRepository(Email)
    const telefoneRepository = AppDataSource.getRepository(Telefone)

    const emailsAll = await emailRepository.find()
    const telefonesAll = await telefoneRepository.find()

    const cliente = new Cliente()
    cliente.name = name
    cliente.emails = []
    cliente.telefones = []
    for(let i:number=0;i<emails.length;i++){
        if(emailsAll.find(item=>item.email === emails[i])){
            throw new Error(`Email: ${emails[i]} already in use`)
        }else{
            
            const email = new Email()
            email.email = emails[i]
            cliente.emails.push(email)
            email.cliente = cliente
            cliente.created_at = new Date()
            await clienteRepository.save(cliente)
            await emailRepository.save(email)  
        }
    }

    for(let i:number=0;i<telefones.length;i++){
        if(telefonesAll.find(item=>item.telefone === telefones[i])){
            throw new Error(`Telefone: ${telefones[i]} already in use`)
        }else{
            
            const telefone = new Telefone()
            telefone.telefone = telefones[i]
            cliente.telefones.push(telefone)
            telefone.cliente = cliente
            cliente.created_at = new Date()
            await clienteRepository.save(cliente)
            await telefoneRepository.save(telefone)  
        }
    }
    const clienteReturned = {
        id:cliente.id,
        name:name,
        telefones:telefones,
        emails:emails,
        created_at:cliente.created_at

    }
    return clienteReturned
}


export default createClientService