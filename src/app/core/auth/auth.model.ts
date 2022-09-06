export interface AuthCredentials {
    accessToken: string;
    user: User;
    sessionId: string;
    lastLogin?: string | Date;
    license: any; // todo
    passwordExpiry?: string; // todo implement as type "NotExpired" | etc...
    passwordManuallyExpired?: boolean;
}

export interface User {
    id: number;
    username: string;
    firstname: string;
    surname: string;
    emailAddress: string;
}