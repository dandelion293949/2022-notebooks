import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AuthorDocument = mongoose.Document & Author;

@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop()
  age: number;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
