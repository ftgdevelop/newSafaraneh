type Keyword = "breakfast" | "extraBed";

type Props = {
    onItemClick: (keyword: Keyword) => void;
    activeItems: Keyword[];
    availableFilters: {
        label: string;
        keyword: Keyword;
    }[];
}

const RoomFilters: React.FC<Props> = props => {
    return (
        <div className="flex gap-2">
            {props.availableFilters.map(item => (
                <button
                    key={item.keyword}
                    type="button"
                    onClick={() => { props.onItemClick(item.keyword) }}
                    className={`border whitespace-nowrap text-sm rounded-full px-4 h-8 ${props.activeItems.includes(item.keyword) ? "bg-blue-100 text-blue-600 border-blue-600" : "bg-white border-neutral-300"}`}
                >
                    {item.label}
                </button>
            ))}

        </div>
    )
}

export default RoomFilters;