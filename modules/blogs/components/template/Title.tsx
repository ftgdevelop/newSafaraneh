type Props = {
    data: string;
    searchValue?: string;
}
const Title: React.FC<Props> = props => {
    
    const {data, searchValue} = props;

    return (
        <div>
        <div className="text-center p-16 max-sm:pb-1">
            <h2 className="text-4xl p-4 font-bold">{data}</h2>
            <p>{searchValue ? searchValue : 'حرفه ای ترین شبکه معرفی هتل های ایران' }</p>
        </div>
        </div>
    )
}

export default Title;