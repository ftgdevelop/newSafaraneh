import Checkbox from "@/modules/shared/components/ui/Checkbox";

const FlightSidebarFlightType: React.FC = () => {
    return (
        <div className="divide-y">
                   <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">نوع بلیط</h5>
                    <Checkbox
                        label={<p className="text-xs">سیستمی</p>}
                        onChange={c => null}
                        value=""
                        />
                    <Checkbox
                        label={<p className="text-xs">چارتری</p>}
                        onChange={c => null}
                        value=""
                        />
                </div>

                <div className="text-sm pt-2 pb-2">
                    <h5 className="text-sm font-semibold mb-2">نوع کابین</h5>
                    <Checkbox
                        label={<p className="text-xs">اکونومی (2)</p>}
                        onChange={c => null}
                        value=""
                        />
                    
                        <Checkbox
                        label={<p>بیزنس (0)</p>}
                        onChange={c => null}
                        value=""
                        />
                </div>
        </div>
    )
}

export default FlightSidebarFlightType;