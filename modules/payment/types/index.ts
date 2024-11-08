export type GetTransactionParams = {
    reserveId?: number;
    CreationTimeFrom?: string;
    CreationTimeTo?: string;
    CurrencyType: "IRR" | "USD" | "EUR";
    SkipCount: number;
    MaxResultCount: number;
}

export type bankGatewayItem = {
    keyword?: string;
    category?: string;
    name?: string;
    title?: string;
    description?: string;
    image: {
        path?: string;
        titleAttribute?: string;
        altAttribute?: string;
    };
    gateways: {
        id: number;
        name?: string;
        displayName?: string;
        isEnabled: boolean;
        image: {
            path?: string;
            titleAttribute?: string;
            altAttribute?: string;
        };
        form: {
            elements: unknown;
        };
    }[]
}