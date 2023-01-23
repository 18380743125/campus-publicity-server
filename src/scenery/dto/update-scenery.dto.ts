import { PartialType } from '@nestjs/mapped-types';
import { CreateSceneryDto } from './create-scenery.dto';

export class UpdateSceneryDto extends PartialType(CreateSceneryDto) {}
