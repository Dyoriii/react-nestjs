import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateGuestbookDto } from './create-guestbook.dto';

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Post()
  create(@Body() createGuestbookDto: CreateGuestbookDto) {
    return this.guestbookService.create(createGuestbookDto);
  }

  @Get()
  findAll() {
    return this.guestbookService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbookService.remove(+id);
  }
}