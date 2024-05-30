import { BusItemType } from "../types"

export const SidebarFilterChange = (Buses: BusItemType[] , SidebarFilter: any , setBusInFilter: any) => {
    let list:BusItemType[] = Buses
    if (SidebarFilter.busComponies.length) {
        list = list.filter((item: any) => SidebarFilter.busComponies.includes(item.office.name))
    }
    if (SidebarFilter.time.length) {
        list = list.filter((item: any) => {
            let time = item.departureDateTime?.split('T')[1].split(':')[0]
            if (time.split('')[0] == 0) {
                time = +time.split('')[1]
            }
            else time = +time
            let itemOnFilterTime = SidebarFilter.time.map((i:any) => time >= i.minTime && time < i.maxTime).find((a: boolean) => a == true)
            return itemOnFilterTime
        })
    }
    if (SidebarFilter.priceRangeOption?.min) {
        list = list.filter(item => item.boardPrice >= SidebarFilter.priceRangeOption.min)
    }
    if (SidebarFilter.priceRangeOption?.max) {
        list = list.filter(item => item.boardPrice <= SidebarFilter.priceRangeOption.max)
    }
    
    setBusInFilter(list)
}