import { IsEmail, IsNotEmpty, Length, IsOptional, IsIn } from 'class-validator';
import { Expose } from 'class-transformer';

// DTO for User Registration
export class RegisterUserDTO {
  @IsNotEmpty({ message: 'Name is required' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters long' })
  @Expose()
  name!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Expose()
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  @Expose()
  password!: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: string;
}

// DTO for User Login
export class LoginUserDTO {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  @Expose()
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 100, { message: 'Password must be at least 6 characters long' })
  @Expose()
  password!: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsIn(['user', 'admin'], { message: 'Role must be either user or admin' })
  role?: string;
}

