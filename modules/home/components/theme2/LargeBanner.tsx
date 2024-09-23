import Button from "@/modules/shared/components/ui/Button"
import Image from "next/image"
import parse from 'html-react-parser';

type Props ={
    sectionTitle?: string;
    sectionDescription?: string;
    buttonText?: string;
    linkUrl?: string;
    imageAlt?: string;
    imageTitle?: string;
    imageUrl: string;
}

const LargeBanner : React.FC<Props> = props => {
    return (
        <section
            className="max-w-container m-auto px-3 max-xl:p-5 mb-5 sm:mb-10"
        >
            <div className="relative">
                <Image
                    src={props.imageUrl}
                    alt={props.imageAlt || ""}
                    title={props.imageTitle}
                    width={1000}
                    height={400}
                    className="w-full min-h-72 object-cover rounded-2xl block"
                />

                <div className="bg-white/75 h-full sm:h-auto sm:bg-white flex flex-col gap-5 p-8 sm:p-3 sm:p-8 rounded-2xl absolute top-0 sm:top-1/2 sm:-translate-y-1/2 rtl:right-0 ltr:left-0 sm:rtl:right-10 sm:ltr:left-10 w-full sm:w-96 items-start">
                    <strong className="font-bold text-xl lg:text-3xl">
                        {props.sectionTitle}
                    </strong>
                    <p className="text-sm">
                        {!!props.sectionDescription && parse(props.sectionDescription)}
                    </p>
                    <Button
                        target="_blank"
                        href={props.linkUrl || "#"}
                        className="h-12 px-5"
                    >
                        {props.buttonText}
                    </Button>
                </div>
            </div>

        </section>
    )
}

export default LargeBanner;