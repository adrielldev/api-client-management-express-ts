import { Entity, Column, PrimaryColumn,OneToMany,Relation } from "typeorm";

import { v4 as uuid } from "uuid"
import { Email } from "./emails.entity";
import { Telefone } from "./telefones.entity";


@Entity()
export class Cliente{
    @PrimaryColumn('uuid')
    readonly id:string

    @Column()
    name:string

    @OneToMany(()=>Email,(email)=>email.cliente)
    emails:Relation<Email[]>


    @OneToMany(()=>Telefone,(tel)=>tel.cliente)
    telefones:Relation<Telefone[]>

    @Column()
    created_at:Date




    

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}