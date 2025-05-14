import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, bookSchema } from './book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: bookSchema }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
