import { BusItemType } from "../types";

export const SortCapacity = (a: BusItemType, b: BusItemType) => {
    if (a.capacity > b.capacity) return -1
    if (a.capacity < b.capacity) return 1
    return 0
}

export const SortTime = (a: BusItemType, b: BusItemType) => {
    let aHour: any = a.departureDateTime?.split('T')[1].split(':')[0]
    let aMinutes: any = a.departureDateTime?.split('T')[1].split(':')[1]
    if (aHour?.split('')[0] == 0) aHour = aHour.split('')[1]
    if (aMinutes?.split('')[0] == 0) aMinutes = aMinutes.split('')[1]

    let bHour: any = b.departureDateTime?.split('T')[1].split(':')[0]
    let bMinutes: any = b.departureDateTime?.split('T')[1].split(':')[1]
    if (bHour?.split('')[0] == 0) bHour = bHour.split('')[1]
    if (bMinutes?.split('')[0] == 0) bMinutes = bMinutes.split('')[1]
    
    if (+aHour > +bHour) return 1
    if (+aHour < +bHour) return -1
    if (+aHour == +bHour && +aMinutes > +bMinutes) return 1
    if (+aHour == +bHour && +aMinutes < +bMinutes) return -1
    if (+aHour == +bHour && +aMinutes == +bMinutes) return 1
    return 0
}

export const SortHightestPrice = (a: BusItemType,b: BusItemType) => {
    if (a.boardPrice < b.boardPrice) return 1
    if (a.boardPrice > b.boardPrice) return -1
    return 0
}