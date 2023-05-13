import { UserRoles } from "src/entities/user.entity";

export interface AuthSignUpRequest {

    firstName: string;
    lastName: string;
    displayName: string
    phoneNumber: string;
    email: string;
    password: string
}
// i want an interface 
export interface AuthResponse {
    displayName: string;
    role: string;
}

export interface AuthSignInRequest{
    username: string;
    password?: string;
}

export interface AuthSignInResponse{
    user: {
        sub: number;
        role: UserRoles
    };
    sessionID: string;
}

export interface AuthRefreshTokensRequest{
    userName: string;
    refresh_token: string;
}