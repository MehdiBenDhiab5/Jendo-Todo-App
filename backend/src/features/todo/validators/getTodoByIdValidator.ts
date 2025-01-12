import { plainToInstance, Type } from "class-transformer";
import { IsInt, validate } from "class-validator";
import { Request } from "express";

export class PathParams {
  @IsInt()
  @Type(() => Number)
  id!: number;
}

export const getTodoByIdValidator = async (
  req: Request
): Promise<PathParams | undefined> => {
  const params: PathParams = plainToInstance(PathParams, req.params);
  const errors = await validate(params);
  if (errors.length > 0) {
    return;
  }

  return params;
};
