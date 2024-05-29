import dynamic from 'next/dynamic';

const Goftino = dynamic(() => import('./Goftino'), {
    ssr: false
});


const GoftinoWrapper = () => {
    return(
        <Goftino />
    )
}

export default GoftinoWrapper;