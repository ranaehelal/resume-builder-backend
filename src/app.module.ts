import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ResumeModule } from './resume/resume.module';
import { AuthModule } from './auth/auth.module';
import { AiService } from './ai/ai.service';
import { AiController } from './ai/ai.controller';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    UserModule,
    AuthModule,
    ResumeModule,
    AiModule,
  ],
  providers: [AiService],
  controllers: [AiController],
})
export class AppModule {}
