export function validateEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}

export function validatePhoneNumber(input: string): boolean {
    const phoneRegex = /^\+?[0-9\s\-()]{7,15}$/;
    return phoneRegex.test(input);
}
