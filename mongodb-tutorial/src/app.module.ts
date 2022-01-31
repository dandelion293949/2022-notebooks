import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', {
      user: 'root',
      pass: 'password123',
    }),
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
