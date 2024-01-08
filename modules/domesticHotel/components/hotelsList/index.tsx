import { PricedHotelItem } from "../../types/hotel";
import HotelListItem from "./HotelListItem";

type Props ={
    hotels: PricedHotelItem[];
}

const HotelsList : React.FC<Props> = props => {

    const { hotels} = props;

    return(
        <>
        <div>
            pagination
        </div>
          {hotels.slice(0,20).map(hotel => <HotelListItem key={hotel.HotelId} hotel={hotel} />)}            
        <div>
            pagination
        </div>
        </>
    )
}

export default HotelsList;