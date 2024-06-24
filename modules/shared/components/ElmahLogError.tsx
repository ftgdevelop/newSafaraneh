import { useEffect } from "react"
import Elmahio from "elmah.io.javascript";

const ElmahLogError = () => {

    useEffect(()=>{
        new Elmahio({
          apiKey: '3758dec5fdb44382953dabaf8ea7c642',
          logId: '2c6ff775-ee37-431d-8e04-e55eef7021be'
        });
    },[]);

    return(
        null
    )
}

export default ElmahLogError;