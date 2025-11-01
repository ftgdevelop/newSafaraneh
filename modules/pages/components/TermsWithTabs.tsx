import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import Tab from "@/modules/shared/components/ui/Tab";
import { replaceBrandNames } from "@/modules/shared/helpers";
import Markdown from 'react-markdown';

type Props = {
    tabItems?: {
        Title?: string;
        Keyword?: string;
        Type?: string;
        id: number;
        Items?: {
            Answer?: string;
            Question?: string;
            id: number;
        }[];
    }[];
}

const TermsWithTabs: React.FC<Props> = props => {

    if (!props.tabItems?.length) {
        return null;
    }

    return (
        <div className="max-w-container m-auto p-5 max-sm:p-3">
            <BreadCrumpt items={[{ label: 'قوانین مقررات' }]} />
            <h2 className="mt-10 font-bold text-2xl">قوانین و مقررات</h2>
            <div className="pl-5 pr-5 pt-5 pb-10 mt-5 border-2 border-gray rounded-md space-y-3 bg-white">
                <Tab
                    style="3"
                    items={props.tabItems.map(tabItem => ({
                        children: <div className="mt-6">
                            {/* <h2 className="mt-6 mb-6 fnt-bold text-lg"> {tabItem.Title} </h2> */}
                            {tabItem.Items?.map(item => {                            
                                const renderedMarkdown = replaceBrandNames(item.Answer || "");
                                return (
                                    <div key={item.id} className="mb-10 ">
                                        <h3 className="mb-4 text-xl font-bold"> {replaceBrandNames(item.Question || "")} </h3>
                                        <div className="inserted-content text-justify">
                                            <Markdown>{renderedMarkdown}</Markdown>
                                        </div>
                                    </div>
                                )
                            }
                            )}
                        </div>,
                        key: tabItem.id,
                        label: <div> {tabItem.Title} </div>
                    }))}
                />
            </div>
        </div>
    )
}

export default TermsWithTabs;