import RecentSearchItem from "./RecentSearchItem";

type Props = {
    items : {
        title: React.ReactNode;
        subtitle: string;
        url: string;
    }[];
    type: "cip" | "hotel" | "flight"
    clearItems:()=>void;
}

const RecentSearches : React.FC<Props>= props => {

    const {items} = props;

    if (!items.length) {
        return null
    }

    const theme2 = process.env.THEME === "THEME2";
    const theme3 = process.env.THEME === "THEME3";
    
    const slicedItems = theme2 ? items.slice(0, 4) : items.slice(0, 5);

    return (
        <>
           {!theme3 && <div className="flex gap-2 mb-4 md:mt-3">

                <strong 
                    className={`font-semibold text-md ${theme2 ? "md:text-2xl" : ""}`}
                >
                     جستجوهای اخیر 
                </strong>
                <button
                    type="button"
                    className={`text-red-500 ountline-none ${theme2 ? "text-sm border border-current rounded-full px-2 mx-2 leading-4" : "text-xs"}`}
                    onClick={props.clearItems}
                >
                    حذف
                </button>
            </div>}

            <div className={`grid sm:grid-cols-2 lg:grid-cols-4 pb-3 ${theme2?"":"lg:grid-cols-5"} ${theme3?"mt-2 sm:mt-8 grid-cols-2 gap-2 sm:gap-3":" gap-3 grid-cols-1"}`}>
                {slicedItems.map((item, index) => <RecentSearchItem
                    key={index}
                    model={{
                        url: item.url,
                        title: item.title,
                        subtitle: item.subtitle
                    }}
                    type={props.type}
                />)}
            </div>

        </>
    )
}

export default RecentSearches;