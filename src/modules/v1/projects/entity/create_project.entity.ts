import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectEntity {
    @ApiProperty({
        description: 'Unique identifier for the project',
        example: 1,
        type: Number,
    })
    id: number;

    @ApiProperty({
        description: 'Name of the project',
        example: 'Project Alpha',
        required: true,
    })
    name: string;

    @ApiProperty({
        description: 'Description of the project',
        example: 'This project involves...',
        required: false,
    })
    description?: string;

    @ApiProperty({
        description: 'Identifier of the user who created the project',
        example: 1,
        required: true,
    })
    created_by: number;

    @ApiProperty({
        description: 'Timestamp when the project was created',
        example: '2023-10-01T12:00:00Z',
        type: String,
    })
    created_at: Date;

    
    @ApiProperty({
        description: 'Timestamp when the project was last updated',
        example: '2023-10-01T12:00:00Z',
        type: String,
    })
    updated_at: Date;
}