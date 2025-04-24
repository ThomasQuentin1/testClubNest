import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  mediaUrl: string;

  @ManyToOne(() => User, (user) => user.media)
  user: User;

  @ManyToMany(() => User, user => user.viewedMedia)
  @JoinTable()
  viewedBy: User[];
  
}
