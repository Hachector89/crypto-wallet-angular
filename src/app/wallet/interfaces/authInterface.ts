
export interface User {
    ok: boolean;
    uid: string;
    name: string;
    email: string;
    fiatCurrency: number;
    cryptoCurrency: number;
}

export interface cryptoResponse {
    data: Data;
}

export interface Data {
    base:     string;
    currency: string;
    amount:   number;
    pairing?: number;
}
