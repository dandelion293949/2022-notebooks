import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from '../authors/schemas/authors.schema';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookSchema } from './schemas/books.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema },
      { name: 'Author', schema: AuthorSchema },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksModule],
})
export class BooksModule {}
