import { SearchHotelsItem } from "../../types/hotel";
import HotelListItem from "./HotelListItem";

type Props ={
    hotels: SearchHotelsItem[];
}

const HotelsList : React.FC<Props> = props => {

    const { hotels} = props;

    return(
        <>
        <div>
            pagination
        </div>
          {hotels.slice(0,10).map(hotel => <HotelListItem key={hotel.HotelId} hotel={hotel} />)}            
        <div>
            pagination
        </div>
        </>
    )
}

export default HotelsList;