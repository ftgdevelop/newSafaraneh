import { useEffect } from "react"
import Elmahio from "elmah.io.javascript";

const ElmahLogError = () => {

    useEffect(() => {
        new Elmahio({
            apiKey: '8ae913b3ecf94e3284d4e8c45296b216',
            logId: 'fcbc4389-0026-44a1-a1eb-63973a61002a',
            application: 'hotelBan js'
        });
    }, []);

    return (
        null
    )
}

export default ElmahLogError;