// update.output.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordEntity {
    @ApiProperty({
        example: 'Password updated successfully',
        description: 'Response message',
    })
    message: string;
}

export class UpdateProfileEntity {
    @ApiProperty({
        example: 'Profile updated successfully',
        description: 'Response message',
    })
    message: string;
}
