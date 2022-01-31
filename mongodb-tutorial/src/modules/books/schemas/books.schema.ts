import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Author } from 'src/modules/authors/schemas/authors.schema';
import * as mongoose from 'mongoose';

export type BookDocument = mongoose.Document & Book;
@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;
}

export const BookSchema = SchemaFactory.createForClass(Book);
