import { plainToInstance, Type } from "class-transformer";
import { IsEnum, IsOptional, validate } from "class-validator";
import { Request } from "express";

export enum SORTBY {
  DATE = "date",
  PRIORITY = "priority",
}

export class QueryParams {
  @IsEnum(SORTBY)
  @IsOptional()
  sortBy?: SORTBY;
}

export const getTodosValidator = async (
  req: Request
): Promise<QueryParams | undefined> => {
  const query: QueryParams = plainToInstance(QueryParams, req.query);
  const errors = await validate(query);
  if (errors.length > 0) {
    return;
  }

  return query;
};
