import { CreateUser } from '../dto/create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUser extends PartialType(CreateUser) {}
