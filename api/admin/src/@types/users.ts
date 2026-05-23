export type UserApiResponse = {
    id: string;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    failed_attempts: string;
    is_locked: boolean;
    lock_until: string;
    token_version: string;
    created_at: string;
    updated_at: string;
}