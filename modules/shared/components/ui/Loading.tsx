type Props = {
    className?:string;
    size?: "small" | "large" | "medium"
}

const Loading : React.FC<Props> = props => {

    let sizeClassNames: string;

    switch (props.size){
        case "small":
            sizeClassNames = "w-6 h-6 after:top-0.5 after:bottom-0.5 after:right-0.5 after:left-0.5";
            break;
        default:
            sizeClassNames  = "w-10 h-10 after:top-1 after:bottom-1 after:right-1 after:left-1";
    }

    return(
        <span 
            className={`relative ${sizeClassNames} animate-spin inline-block ${props.className}  before:block before:rounded-full before:w-full before:h-full before:absolute before:gradient-circle-loading 
            after:block after:rounded-full after:absolute after:bg-white 
            `} 
        />
    )
}

export default Loading;