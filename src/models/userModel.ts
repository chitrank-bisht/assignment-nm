import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
  }
  
  @Entity('users')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    name!: string;
  
    @Column()
    password!: string;
  
    @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USER,
    })
    role!: UserRole;
  
    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
  
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
  }
  