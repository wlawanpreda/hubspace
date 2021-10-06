import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from '../../products/entity/product.entity'

@Entity({ name: 'categories' })
export class Category {

    @OneToMany(() => Product, product => product.category)
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}