import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { CreateOwner } from "./dto/create-owner.dto";
import { OwnerService } from "./owner.service";

@Controller("users")
export class OwnerController {
  constructor(private ownerService: OwnerService) {}

  @Post(":id/owner")
  createOwner(
    @Param("id", ParseIntPipe)
    id: number,
    @Body()
    owner: CreateOwner
  ) {
    return this.ownerService.createOwner(id, owner);
  }
}
