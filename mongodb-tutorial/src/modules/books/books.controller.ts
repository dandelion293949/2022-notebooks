import { Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(): Promise<void> {
    await this.booksService.create();
  }

  @Get()
  async findAll(): Promise<string[]> {
    const startAt = Date.now();

    console.log('Started at:', startAt);

    for (let i = 0; i < 100; i++) {
      await this.booksService.findAllByDefault();
    }
    console.log('default: ', await this.booksService.findAllByDefault());
    const findByDefault = Date.now();
    console.log('findByDefault:', Date.now(), findByDefault - startAt);

    for (let i = 0; i < 100; i++) {
      await this.booksService.findAllByAggregate();
    }
    console.log('aggregate:', await this.booksService.findAllByAggregate());
    const findAllByAggregate = Date.now();
    console.log('aggregate:', Date.now(), findAllByAggregate - findByDefault);

    for (let i = 0; i < 100; i++) {
      await this.booksService.findAllByPopulate();
    }
    console.log('populate:', await this.booksService.findAllByPopulate());
    const findAllByPopulate = Date.now();
    console.log(
      'populate:',
      Date.now(),
      findAllByPopulate - findAllByAggregate,
    );

    return [
      findByDefault.toString(),
      findAllByAggregate.toString(),
      findAllByPopulate.toString(),
    ];
  }
}
