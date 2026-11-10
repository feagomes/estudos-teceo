import { Transform } from "class-transformer";
import { IsISO8601, IsNotEmpty, IsOptional, IsString, } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @Transform(({ value }) => (value === '' ? undefined : value))
    @IsISO8601()
    deadline?: string;

}