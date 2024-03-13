import { useTranslation } from "next-i18next";

import {CipValidateResponseType } from "../../types/cip";
import { numberWithCommas } from '@/modules/shared/helpers';
import Button from '@/modules/shared/components/ui/Button';

type Props = {
    selectedServicesArray: CipValidateResponseType['optionalServices'];
    updateSelectedServices: (id: number, property: string, change: "inc" | "dec") => void;
    addedExtraService: number[];
    updateAddedExtraService: (id: number) => void;
}

const CipExtraServices: React.FC<Props> = props => {

    const { t } = useTranslation('common');

    const { selectedServicesArray, updateSelectedServices, addedExtraService, updateAddedExtraService } = props;

    return (
        <div className='bg-white rounded-lg border border-neutral-300 p-5 mb-5 md:mb-8'>
            <strong className="font-semibold text-base block sm:col-span-2 md:col-span-5 "> انتخاب سرویس های مازاد </strong>


            {selectedServicesArray.sort((a, b) => b.id - a.id).map(serviceItem => (
                <div
                    key={serviceItem.id}
                    className="rounded-lg border border-neutral-300 p-4 mt-4 flex flex-wrap justify-between"
                >
                    <div>
                        {serviceItem.picture.path && <img src={serviceItem.picture.path} alt={serviceItem.picture.altAttribute} title={serviceItem.picture.titleAttribute} />}
                        <div>
                            <h5 className=''>{serviceItem.name}</h5>
                            <p>{serviceItem.description}</p>
                        </div>
                        {(serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom") && <div>
                            {[
                                { label: "تعداد میان وعده", property: "extraCount" },
                                { label: "تعداد ساعت اضافه", property: "hourCount" }
                            ].map(countItem => (
                                <div
                                    key={countItem.property}
                                //className={`margin-end-30 ${styles.addRemoveBoxItem}`}
                                >
                                    <label
                                    //className={`margin-end-10 ${styles.itemLabel}`}
                                    >
                                        {countItem.label}
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => updateSelectedServices(serviceItem.id, countItem.property, "inc")}
                                        disabled={(addedExtraService.includes(serviceItem.id))}
                                    >
                                        {/* <PlusOutlined /> */}
                                        +
                                    </button>
                                    <input
                                        type="text"
                                        readOnly
                                    //value = {serviceItem[countItem.property] || 0}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => updateSelectedServices(serviceItem.id, countItem.property, "dec")}
                                        disabled={(addedExtraService.includes(serviceItem.id))}
                                    >
                                        {/* <MinusOutlined /> */}
                                        -
                                    </button>

                                </div>
                            ))}
                        </div>}

                        {serviceItem.type === "Pet" && <div
                        //className={`margin-end-30 ${styles.addRemoveBoxItem}`}
                        >
                            <button
                                type="button"
                                onClick={() => updateSelectedServices(serviceItem.id, "count", "inc")}
                                disabled={(addedExtraService.includes(serviceItem.id))}
                            >
                                {/* <PlusOutlined /> */}
                                +
                            </button>
                            <input
                                type="text"
                                readOnly
                                value={serviceItem.count || 0}
                            />
                            <button
                                type="button"
                                onClick={() => updateSelectedServices(serviceItem.id, "count", "dec")}
                                disabled={(addedExtraService.includes(serviceItem.id))}
                            >
                                {/* <MinusOutlined /> */}
                                -
                            </button>

                        </div>}
                    </div>
                    <div
                    //className={styles.cipExtraServiceItemCardFooter}
                    >
                        <b>{numberWithCommas(
                            (serviceItem.salePrice * (serviceItem.type === "Pet" ? serviceItem.count : 1))
                            +
                            ((serviceItem.type === "Conference" || serviceItem.type === "MeetingRoom") ? ((serviceItem.extraCount || 0) * (serviceItem.extraSalePrice || 0) + (serviceItem.hourCount || 0) * (serviceItem.hourSalePrice || 0)) : 0)
                        )} ریال</b>
                        <Button
                            type='button'
                            //className={`button blue-btn inline-btn margin-top-5 ${styles.addExtraSerrviceBtn}`}
                            onClick={() => updateAddedExtraService(serviceItem.id)}
                            disabled={addedExtraService.includes(serviceItem.id)}
                        >
                            {(addedExtraService.includes(serviceItem.id)) ?
                                <>
                                    {/* <CheckOutlined /> */}

                                    <span>انتخاب شد</span>
                                </>
                                : <span>انتخاب کن</span>}
                        </Button>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default CipExtraServices;