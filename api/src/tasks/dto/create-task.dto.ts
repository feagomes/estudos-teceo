import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsOptional()
    @IsDateString()
    deadline?: string;

}