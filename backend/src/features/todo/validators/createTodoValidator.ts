import { Request } from "express";
import { TodoPriority } from "../types/Todo";
import { IsDate, IsEnum, IsString, validate } from "class-validator";
import { plainToInstance, Type } from "class-transformer";

export class CreateTodoDTO {
  @IsString()
  text!: string;

  @IsEnum(TodoPriority)
  priority!: TodoPriority;

  @IsDate()
  @Type(() => Date)
  date!: Date;
}

export const createTodoValidator = async (
  req: Request
): Promise<CreateTodoDTO | undefined> => {
  const body = plainToInstance(CreateTodoDTO, req.body);
  const errors = await validate(body);
  if (errors.length > 0) {
    return;
  }

  return body;
};
