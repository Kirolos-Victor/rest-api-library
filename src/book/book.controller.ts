import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create.dto';
import { Book } from './book.schema';
import { UpdateBookDto } from './dto/update.dto';
import { Query as queryExpress } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(
    @Query()
    query: queryExpress,
  ) {
    return this.bookService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id')
    id: string,
  ) {
    return this.bookService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Put(':id')
  async update(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ): Promise<string> {
    return this.bookService.deleteById(id);
  }
}
