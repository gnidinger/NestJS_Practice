import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'USER_SEQ' })
  seq: number;

  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
