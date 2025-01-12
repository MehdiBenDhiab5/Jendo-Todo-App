import { Request } from "express";
import { TodoPriority } from "../types/Todo";
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  validate,
} from "class-validator";
import { plainToInstance, Type } from "class-transformer";

export class UpdateTodoDTO {
  @IsString()
  @IsOptional()
  text?: string;

  @IsEnum(TodoPriority)
  @IsOptional()
  priority?: TodoPriority;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date?: Date;

  @IsBoolean()
  @IsOptional()
  isChecked?: boolean;
}

export class PathParams {
  @IsInt()
  @Type(() => Number)
  id!: number;
}

export class Result {
  body!: UpdateTodoDTO;
  params!: PathParams;
}

export const updateTodoValidator = async (
  req: Request
): Promise<Result | undefined> => {
  const body = plainToInstance(UpdateTodoDTO, req.body);
  let errors = await validate(body);
  if (errors.length > 0) {
    return;
  }

  const params = plainToInstance(PathParams, req.params);
  errors = await validate(params);
  if (errors.length > 0) {
    return;
  }

  return { body: body, params: params };
};
