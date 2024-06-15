export class AuthCredentialsDto {
    username: string = '';
    password: string = '';
}

export class AuthResponseDto {
    access_token: string = '';
    refresh_token: string = '';
}