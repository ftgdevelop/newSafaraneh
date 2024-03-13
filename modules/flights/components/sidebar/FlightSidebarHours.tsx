import Checkbox from "@/modules/shared/components/ui/Checkbox";

const FlightSidebarHours: React.FC = () => {
    return (
        <div className="text-xs pt-2 pb-2">
        <h5 className="text-sm font-semibold mb-2">زمان پرواز</h5>
        <Checkbox
            label={<p className="text-xs">قبل از ۶:۰۰ صبح</p>}
            onChange={c => null}
            value=""
            />
        <Checkbox
            label={<p className="text-xs">۶:۰۰ صبح تا ۱۱:۵۹ ظهر</p>}
            onChange={c => null}
            value=""
            />
        <Checkbox
            label={<p className="text-xs">۱۲:۰۰ ظهر تا ۱۸:۰۰ بعد از ظهر</p>}
            onChange={c => null}
            value=""
            />
        <Checkbox
            label={<p className="text-xs">بعد از ۱۸:۰۰ بعد از ظهر</p>}
            onChange={c => null}
            value=""
            />
    </div>
    )
}

export default FlightSidebarHours;