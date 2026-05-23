import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required.' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email address.' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Subject is required.' })
  subject: string;

  @IsString()
  @IsNotEmpty({ message: 'Details are required.' })
  @MinLength(10, {
    message: 'Please provide more details (minimum 10 characters).',
  })
  message: string;
}
