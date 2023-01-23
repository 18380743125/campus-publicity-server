import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const roles = value.roles;
    if (roles && roles instanceof Array && roles.length > 0) {
      value.roles = roles.map((item) => item.id);
    }
    if (
      !roles ||
      !(roles instanceof Array) ||
      (roles instanceof Array && !roles.length)
    ) {
      value.roles = [2];
    }
    return value;
  }
}
