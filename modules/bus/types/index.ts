export type AvailibilityParams = {
    departureTime: string,
    destinationCode: string,
    originCode: string
}

export type BusItemType = {
    token: string;
    supplierType: string;
    salePrice: number;
    boardPrice: number;
    capacity: number;
    carrier: {
        id: number,
        name: string
    }
    description: string;
    departureDateTime: string;
    destination: {
        city: {
            name: string;
        }
        id: number;
        name: string,
        province: {
            name: string
        }
    }
    source: {
        city: {
            name: string;
        }
        id: number;
        name: string;
        province: {
            name: string
        }
    }
    office: {
        picture: {
            path: string;
        }
        name: string;
        nameLong: string
        code: string
        id: number
    }
}

export type BusAutocompleteType = {
    id: number,
    name: string,
    country: {
        name: string
    },
    province: {
        name: string
    },
    city: {
        name: string
    }
}