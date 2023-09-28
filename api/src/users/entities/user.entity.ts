import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn({ type: 'varchar' })
  id: string;

  @Column({ type: 'nvarchar' })
  name: string;
}
