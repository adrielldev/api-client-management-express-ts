import { Entity,Column,PrimaryColumn,Relation,ManyToOne } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Cliente } from "./clientes.entity";
import { Contato } from "./contatos.entity";

@Entity()
export class Telefone {
    @PrimaryColumn('uuid')
    readonly id:string

    @Column()
    telefone:string

    @ManyToOne(()=>Cliente,(cliente)=>cliente.telefones,{
        onDelete:'CASCADE'
    })
    cliente:Relation<Cliente>

    @ManyToOne(()=>Contato,(contato)=>contato.telefones,{
        onDelete:'CASCADE'
    })
    contato:Relation<Contato>



    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}