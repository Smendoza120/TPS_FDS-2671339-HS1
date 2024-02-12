import { Module } from '@nestjs/common';
import { OwnerService } from './services/owner.service';
import { OwnerController } from './controllers/owner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, User])],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerModule],
})
export class OwnerModule {}
