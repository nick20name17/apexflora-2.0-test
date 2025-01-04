export interface PasswordResetPayload {
    email: string
}
export interface PasswordResetResponse {
    message: string
}

export interface NewPasswordPayload {
    new_password1: string
    new_password2: string
}
export interface PasswordResetConfirmPayload extends NewPasswordPayload {
    token: string
    uidb64: string
}

export interface PasswordChangePayload extends NewPasswordPayload {
    old_password: string
}
