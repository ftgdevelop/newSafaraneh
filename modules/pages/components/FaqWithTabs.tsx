import Accordion from "@/modules/shared/components/ui/Accordion";
import BreadCrumpt from "@/modules/shared/components/ui/BreadCrumpt";
import { QuestionCircle } from "@/modules/shared/components/ui/icons";
import Tab from "@/modules/shared/components/ui/Tab";
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

const FaqWithTabs: React.FC<Props> = props => {

    if (!props.tabItems?.length) {
        return null;
    }

    return (
        <div className="max-w-container m-auto p-5 max-sm:p-3">
            <BreadCrumpt items={[{ label: 'سوالات متداول' }]} />
            <h2 className="font-bold mt-10 text-3xl">سوالات متداول</h2>
            <div className="pl-5 pr-5 pt-5 pb-10 mt-5 border-2 border-gray rounded-md space-y-3 bg-white">
                <Tab
                    style="3"
                    items={props.tabItems.map(tabItem => ({
                        children: <div>
                            <h2 className="mt-6 mb-6 fnt-bold text-lg"> {tabItem.Title} </h2>
                            {tabItem.Items?.map(item =>
                                <Accordion
                                    key={item.id}
                                    WrapperClassName="mb-4"
                                    content={item.Answer ? <Markdown children={item.Answer} /> : null}
                                    title={(
                                        <>
                                            <QuestionCircle className='w-5 h-5 mt-.5 rtl:ml-2 ltr:mr-2 fill-current inline-block' />
                                            {item.Question}
                                        </>
                                    )}
                                />
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

export default FaqWithTabs;