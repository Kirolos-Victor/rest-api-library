import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'user',
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;
  @Prop({ required: true, select: false })
  password: string;
  @Prop({ required: true, unique: [true, 'email already exists'] })
  email: string;
}

export const userSchema = SchemaFactory.createForClass(User);
