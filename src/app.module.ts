import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { AppDataSourceConfig } from "./data-source";
import { UserRelationshipModule } from "./user-relationship/user-relationship.module";
import { ProfilModule } from "./profil/profil.module";
import { MediaModule } from "./media/media.module";
import { FeedModule } from "./feed/feed.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSourceConfig),
    AuthModule,
    FeedModule,
    MediaModule,
    ProfilModule,
    UserRelationshipModule,
  ],
})
export class AppModule {}
