import { useEffect } from "react"
import Elmahio from "elmah.io.javascript";

const ElmahLogError = () => {

    useEffect(()=>{
        new Elmahio({
          apiKey: '09e2781cc39a4e8bad735d57504a8c5f',
          logId: 'fc0b0e4b-2a0d-4a00-9b61-194915b2c983'
        });
    },[]);

    return(
        null
    )
}

export default ElmahLogError;