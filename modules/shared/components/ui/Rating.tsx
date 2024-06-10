import { Star } from './icons';

type Props = {
    className?: string;
    number: number;
    inline?: boolean;
}

const Rating: React.FC<Props> = props => {

    if (!props.number) return null;
    
    const theme2 = process.env.THEME === "THEME2";

    return (
        <div className={`${props.inline ? "inline-flex" : "flex"} items-center gap-.5 ${props.className || ""}`}>
            {[...new Array(props.number)].map((_, index) => <Star className={`w-4.5 h-4.5 ${theme2?"fill-neutral-700":"fill-amber-400"}`} key={index} />)}
        </div>
    )
};

export default Rating;