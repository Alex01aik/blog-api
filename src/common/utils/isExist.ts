import { BadRequestException } from '@nestjs/common';

export const isExist = (target: any) => {
  if (!target) {
    throw new BadRequestException('Not exist');
  }
};
