
export interface AuthResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    fiatCurrency?: number;
    cryptoCurrency?: number;
    token?: string;
    msg?: string;
}

export interface User {
    ok: boolean;
    uid: string;
    name: string;
    email: string;
    fiatCurrency: number;
    cryptoCurrency: number;
}