import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm";
import { Media } from "./Media";
import { UserRelationship } from "./UserRelathionship";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  profilePictureUrl: string;

  @Column()
  password: string;

  @OneToMany(() => Media, media => media.user)
  media: Media[];

  @OneToMany(() => UserRelationship, relationship => relationship.follower)
  following: UserRelationship[];

  @OneToMany(() => UserRelationship, relationship => relationship.followed)
  followers: UserRelationship[];

  @ManyToMany(() => Media, media => media.viewedBy)
  viewedMedia: Media[];
}
