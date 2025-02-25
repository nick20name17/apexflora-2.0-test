interface ErrorWithMessage {
    response: {
        data: {
            detail: string
            amount: string
        }
    }
}

export const isErrorWithMessage = (error: unknown): error is ErrorWithMessage =>
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as Record<string, unknown>).response === 'object'
