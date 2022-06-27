import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, BaseEntity } from 'typeorm';
import { Author } from './author.entity';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    fullName!: string

    @Field()
    @Column()
    email!: string

    @Field()
    @Column()
    password!: string

    @Field()
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: string
}