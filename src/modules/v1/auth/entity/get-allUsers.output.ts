import { ApiProperty } from "@nestjs/swagger";

export class GetAllUsersOutput {

    @ApiProperty({
        example: 'success',
        description: 'Status of the operation',
    })
    status: string;

    @ApiProperty({
        example: 'All users retrieved successfully',
        description: 'Message describing the operation result',
    })
    message: string;

    @ApiProperty({
        type: 'array',
        items: {
            type: 'object',
            properties: {
                id: { type: 'string', example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
                username: { type: 'string', example: 'admin' },
                fullName: { type: 'string', example: 'Admin User' },
                email: { type: 'string', example: 'example@gmail.com' },
                createdAt: { type: 'string', format: 'date-time', example: '2023-10-01T12:00:00Z' },
                updatedAt: { type: 'string', format: 'date-time', example: '2023-10-01T12:00:00Z' },
            },
        },
        description: 'List of all users with their details',
    })
    data: {
        id: string;
        username: string;
        fullName: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}