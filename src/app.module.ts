import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UIController } from './ui/ui.controller';
import { UIService } from './ui/ui.service';
import { UiModule } from './ui/ui.module';

@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URL'),
    }),
  }),UserModule, AuthModule, TodoModule, UiModule, TodoModule],
  controllers: [AppController, UserController, UIController],
  providers: [AppService, ],
})
export class AppModule {}
