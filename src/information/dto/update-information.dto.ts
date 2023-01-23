import { PartialType } from '@nestjs/mapped-types';
import { CreateInformationDto } from './create-information.dto';

export class UpdateInformationDto extends PartialType(CreateInformationDto) {}
