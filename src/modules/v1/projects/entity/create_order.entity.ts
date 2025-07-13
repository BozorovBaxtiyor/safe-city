import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderEntity {
    @ApiProperty({
        description: 'Unique identifier for the order',
        example: 1,
        type: Number,
    })
    id: number;

    @ApiProperty({
        example: 'Order created successfully',
        description: 'Message',
    })
    message: string;
}
