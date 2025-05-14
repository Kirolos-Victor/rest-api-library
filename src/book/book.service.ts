import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(book: Book): Promise<Book> {
    return this.bookModel.create(book);
  }

  async updateById(id: string, bookData: Book): Promise<Book> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, bookData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure validation is run on the update
      })
      .exec();

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return book;
  }

  async deleteById(id: string): Promise<string> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return `Book with id ${id} deleted successfully`;
  }
}
