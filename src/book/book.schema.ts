import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  FANTASY = 'fantasy',
  SCIFI = 'scifi',
  ROMANCE = 'romance',
  THRILLER = 'thriller',
  MYSTERY = 'mystery',
  NONFICTION = 'nonfiction',
}

@Schema({
  collection: 'book',
  timestamps: true,
})
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false, type: String, default: null })
  description: string | null;

  @Prop({ required: true, enum: Category })
  category: Category;
}

export const bookSchema = SchemaFactory.createForClass(Book);
