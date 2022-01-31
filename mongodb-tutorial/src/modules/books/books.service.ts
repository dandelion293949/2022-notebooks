import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorDocument } from '../authors/schemas/authors.schema';
import { BookDocument } from './schemas/books.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<BookDocument>,
    @InjectModel('Author') private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async create(): Promise<void> {
    const newBook = {
      title: 'The Lord of the Rings',
      author: {
        name: 'J.R.R. Tolkien',
        age: 50,
      },
    };
    await new this.authorModel(newBook.author).save((err, author) => {
      if (err) {
        console.log(err);
      }

      return new this.bookModel({
        title: newBook.title,
        author: author._id,
      }).save();
    });
  }

  async findAllByDefault(): Promise<BookDocument[]> {
    const books = await this.bookModel.find().exec();
    for (const book of books) {
      const author = await this.authorModel.findById(book.author).exec();
      book.author = author;
    }
    return books;
  }

  async findAllByAggregate(): Promise<BookDocument[]> {
    return await this.bookModel
      .aggregate()
      .lookup({
        from: 'authors',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      })
      .exec();
  }

  async findAllByPopulate(): Promise<BookDocument[]> {
    return await this.bookModel.find().populate('author').exec();
  }
}
