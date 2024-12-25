import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { QueryNoteDto } from './dto/query-note.dto';

@Injectable()
export class NotesRepository {
  constructor(
    @InjectModel(Note.name) private readonly noteModel: Model<Note>,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = await this.noteModel.create(createNoteDto);
    return createdNote.save();
  }

  async findAll(): Promise<Note[]> {
    return this.noteModel.find().exec();
  }

  async findOne(id: string): Promise<Note> {
    return this.noteModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true });
  }

  async delete(id: string): Promise<Note> {
    return this.noteModel.findByIdAndDelete(id);
  }

  async query(queryParams: QueryNoteDto): Promise<Note[]> {
    const { title, isArchived } = queryParams;
    const query: any = {};
    if (title) query.title = title;
    if (isArchived !== undefined) query.isArchived = isArchived;

    return this.noteModel.find(query).exec();
  }
}
