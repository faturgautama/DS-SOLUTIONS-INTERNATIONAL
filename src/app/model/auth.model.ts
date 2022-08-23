export interface IAuth {
    localId: string
    email: string
    displayName: string
    idToken: string
    registered: boolean
    refreshToken: string
    expiresIn: string
}

export interface SignIn {
    email: string;
    password: string;
    returnSecureToken: boolean;
}