import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const TitlePost: NextPage<any> = ({ BlogPost }) => {
    
    return (
        <div className="pl-5 pr-5 max-sm:p-3">
        <div className="overflow-hidden rounded-md flex items-center relative h-550 max-lg:h-full max-lg:mt-5 shadow-xl max-sm:shadow-none">
                <div className="text-center absolute z-20 w-full p-4">
                    <Link href={`/blog/category/${BlogPost?.[0]?.categories[0]}`}
                        className="bg-white text-sm text-red-600 p-3 rounded-2xl hover:text-white hover:bg-red-600 duration-300">
                    {BlogPost?.[0]?.categories_names[0]}</Link>
                    <p
                        className="font-bold text-4xl max-sm:text-xl text-white mt-8 leading-10 text-center">
                        {BlogPost?.[0]?.title.rendered}
                    </p>
                </div>
                <div className="w-full h-full absolute z-10 bg-black/40 bottom-0"></div>
                <Image
                    src={BlogPost?.[0]?.images?.large} alt={BlogPost?.[0]?.title?.rendered} onContextMenu={(e) => e.preventDefault()}
                    width={400} height={250} className="w-full" priority={true} />
        </div>
            <div className="w-full flex justify-center max-sm:w-fit text-center"> 
                <div
                    className="bg-white shadow-2xl max-sm:shadow-none flex p-4 max-sm:pr-1 relative bottom-6
                     max-sm:-bottom-2 rounded-full text-sm justify-between w-72 max-sm:w-full text-gray-500 z-20">
                    <p>{BlogPost?.[0]?.date}</p>
                    <p className="text-4xl font-bold max-sm:ml-6 max-sm:mr-6">.</p>
                    <p>{BlogPost?.[0]?.time_read}</p>
                </div>
            </div>

            <div className="flex justify-center max-sm:justify-start gap-5 max-sm:mt-5">
                <Image alt="WhatsappIcon" width={25} height={25}
                src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cGF0aCBzdHlsZT0iZmlsbDojNENBRjUwOyIgZD0iTTI1Ni4wNjQsMGgtMC4xMjhsMCwwQzExNC43ODQsMCwwLDExNC44MTYsMCwyNTZjMCw1NiwxOC4wNDgsMTA3LjkwNCw0OC43MzYsMTUwLjA0OGwtMzEuOTA0LDk1LjEwNAoJbDk4LjQtMzEuNDU2QzE1NS43MTIsNDk2LjUxMiwyMDQsNTEyLDI1Ni4wNjQsNTEyQzM5Ny4yMTYsNTEyLDUxMiwzOTcuMTUyLDUxMiwyNTZTMzk3LjIxNiwwLDI1Ni4wNjQsMHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZBRkFGQTsiIGQ9Ik00MDUuMDI0LDM2MS41MDRjLTYuMTc2LDE3LjQ0LTMwLjY4OCwzMS45MDQtNTAuMjQsMzYuMTI4Yy0xMy4zNzYsMi44NDgtMzAuODQ4LDUuMTItODkuNjY0LTE5LjI2NAoJQzE4OS44ODgsMzQ3LjIsMTQxLjQ0LDI3MC43NTIsMTM3LjY2NCwyNjUuNzkyYy0zLjYxNi00Ljk2LTMwLjQtNDAuNDgtMzAuNC03Ny4yMTZzMTguNjU2LTU0LjYyNCwyNi4xNzYtNjIuMzA0CgljNi4xNzYtNi4zMDQsMTYuMzg0LTkuMTg0LDI2LjE3Ni05LjE4NGMzLjE2OCwwLDYuMDE2LDAuMTYsOC41NzYsMC4yODhjNy41MiwwLjMyLDExLjI5NiwwLjc2OCwxNi4yNTYsMTIuNjQKCWM2LjE3NiwxNC44OCwyMS4yMTYsNTEuNjE2LDIzLjAwOCw1NS4zOTJjMS44MjQsMy43NzYsMy42NDgsOC44OTYsMS4wODgsMTMuODU2Yy0yLjQsNS4xMi00LjUxMiw3LjM5Mi04LjI4OCwxMS43NDQKCWMtMy43NzYsNC4zNTItNy4zNiw3LjY4LTExLjEzNiwxMi4zNTJjLTMuNDU2LDQuMDY0LTcuMzYsOC40MTYtMy4wMDgsMTUuOTM2YzQuMzUyLDcuMzYsMTkuMzkyLDMxLjkwNCw0MS41MzYsNTEuNjE2CgljMjguNTc2LDI1LjQ0LDUxLjc0NCwzMy41NjgsNjAuMDMyLDM3LjAyNGM2LjE3NiwyLjU2LDEzLjUzNiwxLjk1MiwxOC4wNDgtMi44NDhjNS43MjgtNi4xNzYsMTIuOC0xNi40MTYsMjAtMjYuNDk2CgljNS4xMi03LjIzMiwxMS41ODQtOC4xMjgsMTguMzY4LTUuNTY4YzYuOTEyLDIuNCw0My40ODgsMjAuNDgsNTEuMDA4LDI0LjIyNGM3LjUyLDMuNzc2LDEyLjQ4LDUuNTY4LDE0LjMwNCw4LjczNgoJQzQxMS4yLDMyOS4xNTIsNDExLjIsMzQ0LjAzMiw0MDUuMDI0LDM2MS41MDR6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" />

                <Image alt="WhatsappIcon" width={25} height={25}
                src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im00ODMuNzM4MjgxIDBoLTQ1NS41Yy0xNS41OTc2NTYuMDA3ODEyNS0yOC4yNDIxODcyNSAxMi42NjAxNTYtMjguMjM4MjgxIDI4LjI2MTcxOXY0NTUuNWMuMDA3ODEyNSAxNS41OTc2NTYgMTIuNjYwMTU2IDI4LjI0MjE4NyAyOC4yNjE3MTkgMjguMjM4MjgxaDQ1NS40NzY1NjJjMTUuNjA1NDY5LjAwMzkwNiAyOC4yNTc4MTMtMTIuNjQ0NTMxIDI4LjI2MTcxOS0yOC4yNSAwLS4wMDM5MDYgMC0uMDA3ODEyIDAtLjAxMTcxOXYtNDU1LjVjLS4wMDc4MTItMTUuNTk3NjU2LTEyLjY2MDE1Ni0yOC4yNDIxODcyNS0yOC4yNjE3MTktMjguMjM4Mjgxem0wIDAiIGZpbGw9IiM0MjY3YjIiLz48cGF0aCBkPSJtMzUzLjUgNTEydi0xOThoNjYuNzVsMTAtNzcuNWgtNzYuNzV2LTQ5LjM1OTM3NWMwLTIyLjM4NjcxOSA2LjIxNDg0NC0zNy42NDA2MjUgMzguMzE2NDA2LTM3LjY0MDYyNWg0MC42ODM1OTR2LTY5LjEyODkwNmMtNy4wNzgxMjUtLjk0MTQwNi0zMS4zNjMyODEtMy4wNDY4NzUtNTkuNjIxMDk0LTMuMDQ2ODc1LTU5IDAtOTkuMzc4OTA2IDM2LTk5LjM3ODkwNiAxMDIuMTQwNjI1djU3LjAzNTE1NmgtNjYuNXY3Ny41aDY2LjV2MTk4em0wIDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=" />
            </div>

        </div>
    )
}

export default TitlePost;