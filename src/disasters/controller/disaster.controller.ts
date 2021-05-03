import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DisasterService } from '../service/disaster.service';
import { DisasterRequest } from '../payload/disaster.request';
import { DisasterResponse } from '../payload/disaster.response';
import { AuthPrincipal, Public } from '../../auth/decorator/auth.decorator';
import { EssentialsRequest } from '../payload/essentials.request';
import { FinalMessageRequest } from '../payload/final-message.request';
import { DisasterTypeResponse } from '../payload/disaster-type.response';
import { ClientProxy } from '@nestjs/microservices';

@Controller('/disasters')
export class DisasterController {
  constructor(private readonly disasterService: DisasterService) {}

  @Get()
  @Public()
  async disasters(
    @Query('resolvedFrom') resolvedFrom = true,
    @Query('resolvedTo') resolvedTo = false,
    @Query('typeId') typeId,
    @Query('userId') userId,
  ): Promise<DisasterResponse[]> {
    return this.disasterService.all();
  }

  @Get('/types')
  @Public()
  async types(): Promise<DisasterTypeResponse[]> {
    return this.disasterService.types();
  }

  @Get('/:id')
  @Public()
  async disaster(@Param('id') id: number) {
    return this.disasterService.single(id);
  }

  @Post()
  @Public()
  async report(@Body() model: DisasterRequest): Promise<DisasterResponse> {
    return this.disasterService.create(model);
  }

  @Patch('/:id/volunteer')
  @Public()
  async volunteer(
    @AuthPrincipal() principal,
    @Param('id') id: number,
  ): Promise<DisasterResponse> {
    return this.disasterService.volunteer(principal, id);
  }

  @Patch('/:id/essentials')
  async essentials(
    @Param('id') id: number,
    @Body() model: EssentialsRequest,
  ): Promise<DisasterResponse> {
    return this.disasterService.essentials(id, model);
  }

  @Patch('/:id/resolve')
  async resolve(
    @Param('id') id: number,
    @Body() model: FinalMessageRequest,
  ): Promise<DisasterResponse> {
    return this.disasterService.resolve(id, model);
  }
}
