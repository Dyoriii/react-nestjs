import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../../supabase/supabase.service';
import { CreateGuestbookDto } from './create-guestbook.dto';

@Injectable()
export class GuestbookService {
  constructor(private supabaseService: SupabaseService) {}

  async create(createGuestbookDto: CreateGuestbookDto) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('guestbook_entries')
      .insert([createGuestbookDto])
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findAll() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('guestbook_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('guestbook_entries')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}