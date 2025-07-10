// register.output.ts
import { ApiProperty } from '@nestjs/swagger';

export class RegisterEntity {

    @ApiProperty({
        example: 'User registered successfully',
        description: 'Response message',
    })
    message: string;
}
