import { Entity, Column, PrimaryColumn,OneToMany,Relation } from "typeorm";

import { v4 as uuid } from "uuid"

import { Email } from "./emails.entity";
import { Telefone } from "./telefones.entity";

@Entity()
export class Contato{
    @PrimaryColumn('uuid')
    readonly id:string

    @Column()
    name:string

    // one to many emails

    @OneToMany(()=>Email,(email)=>email.contato)
    emails:Relation<Email[]>


    // one to many telefones
    @OneToMany(()=>Telefone,(tel)=>tel.contato)
    telefones:Relation<Telefone[]>

    


    

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}