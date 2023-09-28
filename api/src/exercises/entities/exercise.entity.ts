import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'exercises' })
export class Exercise {
  @PrimaryColumn('varchar', {
    length: 20,
  })
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 100 })
  content: string;

  @Column({ name: 'created_at', type: 'datetime' })
  createdAt: Date;
}
