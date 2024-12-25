import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './schemas/note.schema';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  async findAll() {
    return this.notesRepository.findAll();
  }

  async findOne(id: string): Promise<Note> {
    const note = await this.notesRepository.findOne(id);
    console.log('🚀 ~ NotesService ~ findOne ~ note:', note);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  async delete(id: string) {
    return this.notesRepository.delete(id);
  }

  async query(queryParams: Record<string, any>) {
    console.log('🚀 ~ NotesService ~ query ~ queryParams:', queryParams);
    return this.notesRepository.query(queryParams);
  }
}
