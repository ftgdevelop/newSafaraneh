import { Minus, Plus } from "@/modules/shared/components/ui/icons";
import { numberWithCommas } from "@/modules/shared/helpers";

type Props = {
    selectedTransport: any[];
    updateTransport: (id: number, fn: "inc" | "dec") => void;
}

const CipTransport: React.FC<Props> = props => {

    const { updateTransport, selectedTransport } = props;

    if (!selectedTransport || selectedTransport.length === 0) {
        return <div />;
    }
    const someTransportIsSelected = selectedTransport.some(item => item.count > 0);

    return (
        <div
            //className={`${styles.taxiCip} ${process.env.THEME_NAME === "TRAVELO" && styles.taxiCipTravelo}`} 
            id="anchortaxicip"
        >
            <h3>تاکسی ویژه cip</h3>
            <div
            //className={styles.content}
            >
                <div
                //className={styles.carList}
                >
                    {selectedTransport.sort((a, b) => a.id - b.id).map((item, index) => (
                        <div
                            //className={`${styles.car} ${index?"margin-start-10":""}`} 
                            key={item.name}
                        >
                            <div
                            //className={styles.carDetailsCip}
                            >
                                {item.picture.path ?
                                    <img src={item.picture.path} alt={item.picture.altAttribute} title={item.picture.titleAttribute} />
                                    : <img src="/images/default-car.jpg" />}
                                <div
                                //className={styles.carTextCip}
                                >
                                    <h6>{item.name}</h6>
                                    <small>{numberWithCommas(item.salePrice)} ریال</small>
                                </div>
                            </div>
                            <div
                            //className={`${styles.addRemoveCar}`}
                            >
                                <button type="button" onClick={() => updateTransport(item.id, "inc")} >
                                    <Plus />
                                </button>
                                <input type="text" className="value" value={item.count} readOnly />
                                <button type="button" onClick={() => updateTransport(item.id, "dec")} >
                                    <Minus />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* {someTransportIsSelected && <Form.Item name="Address" label="آدرس مقصد از فرودگاه" rules={[{ required: true, message: 'لطفا آدرس مقصد را وارد نمایید.' }]}>
                    <Input size="large" placeholder="آدرس مقصد " />
                </Form.Item>} */}
            </div>
        </div>
    )
}

export default CipTransport;