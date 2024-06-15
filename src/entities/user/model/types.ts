import { BaseDto } from "@/shared/api/types";

export class UserDto extends BaseDto {
    constructor() {
        super();
    }
    username: string = '';
}