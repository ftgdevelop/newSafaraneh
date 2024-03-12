import Select from "@/modules/shared/components/ui/Select";

const FlightSidebarPriceChange: React.FC = () => {
    return (
        <div className="text-xs pt-2 pb-2 space-y-2">
            <h2 className="text-sm font-semibold mb-2">مبلغ</h2>
            <div className="grid grid-cols-2 text-xs w-full">
                <p>حداقل مبلغ</p>
                <Select
                    items={[{label: '120000' , value:'120000'}]}
                    label="120000"
                    value="20000"
                    onChange={e => null}
                className="col-span-2 text-xs whitespace-nowrap h-fit p-2"/>
            </div>

            <div className="grid grid-cols-2 text-xs w-full">
                <p>حداکثر مبلغ</p>
                <Select
                    items={[{label: '120000' , value:'120000'}]}
                    label="120000"
                    value="20000"
                    onChange={e => null}
                className="col-span-2 text-xs whitespace-nowrap h-fit p-2"/>
            </div>
        </div>
    )
}

export default FlightSidebarPriceChange;