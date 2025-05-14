import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {}

  async findAll(query: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ data: Book[]; total: number; page: number; limit: number }> {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    let filter = {};
    if (query.search) {
      filter = { title: { $regex: query.search, $options: 'i' } };
    }

    const [data, total] = await Promise.all([
      this.bookModel.find(filter).skip(skip).limit(limit).exec(),
      this.bookModel.countDocuments(filter),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
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
