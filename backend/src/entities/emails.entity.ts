import { Entity,Column,PrimaryColumn,Relation,ManyToOne } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Cliente } from "./clientes.entity";
import { Contato } from "./contatos.entity";

@Entity()
export class Email { 
    @PrimaryColumn('uuid')
    readonly id:string

    @Column()
    email:string

    @ManyToOne(()=>Cliente,(cliente)=>cliente.emails,{
        onDelete:'CASCADE'
    })
    cliente:Relation<Cliente>

    @ManyToOne(()=>Contato,(contato)=>contato.emails,{
        onDelete:'CASCADE'
    })
    contato:Relation<Contato>

    

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}