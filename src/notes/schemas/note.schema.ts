import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  isArchived: boolean;

  @Prop({ type: Date, default: null })
  reminder: Date | null;

  @Prop({ required: true })
  createdBy: string; // Reference to the user  ID
}

export const NoteSchema = SchemaFactory.createForClass(Note);
