import { Bed } from "@/modules/shared/components/ui/icons";
import { DomesticHotelGetValidateResponse } from "../../types/hotel";
import { useTranslation } from "next-i18next";
import { Field, FormikErrors, FormikTouched } from "formik";
import FormikField from "@/modules/shared/components/ui/FormikField";
import { validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { numberWithCommas } from "@/modules/shared/helpers";
import Quantity from "@/modules/shared/components/ui/Quantity";

type Props = {
  roomIndex: number;
  roomItem: DomesticHotelGetValidateResponse['rooms'][0];
  errors: FormikErrors<{
    reserver: {
      gender: boolean;
      firstName: string;
      lastName: string;
      email: string;
      nationalId: string;
      phoneNumber: string;
    };
    passengers: {
      gender: boolean;
      firstName: string;
      lastName: string;
      roomNumber: number;
      extraBed: number;
    }[];
  }>;
  touched: FormikTouched<{
    reserver: {
      gender: boolean;
      firstName: string;
      lastName: string;
      email: string;
      nationalId: string;
      phoneNumber: string;
    };
    passengers: {
      gender: boolean;
      firstName: string;
      lastName: string;
      roomNumber: number;
      extraBed: number;
    }[];
  }>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<{
    reserver: {
      gender: boolean;
      firstName: string;
      lastName: string;
      email: string;
      nationalId: string;
      phoneNumber: string;
    };
    passengers: {
      gender: boolean;
      firstName: string;
      lastName: string;
      roomNumber: number;
      extraBed: number;
    }[];
  }>>;
  values: {
    reserver: {
      gender: boolean;
      firstName: string;
      lastName: string;
      email: string;
      nationalId: string;
      phoneNumber: string;
    };
    passengers: {
      gender: boolean;
      firstName: string;
      lastName: string;
      roomNumber: number;
      extraBed: number;
    }[];
  }
  disableSyncedPassenger?: () => void;
  onChangeExtraBed: (value: number) => void;
}

const RoomItemInformation: React.FC<Props> = props => {

  const { roomIndex, roomItem, errors, setFieldValue, touched, values } = props;

  const { t } = useTranslation('common');
  const { t: tHotel } = useTranslation('hotel');

  const extraBedPrice = roomItem.pricing?.find((item) => item.type === 'ExtraBed' && item.ageCategoryType === 'ADL')?.amount || 0;


  return (
    <div className='bg-white border border-neutral-300 p-5 rounded-lg grid md:grid-cols-3 gap-2 mb-5' >
      <h5 className='font-semibold text-xl mb-4 md:col-span-3'>
        <Bed className='w-5 h-5 fill-current inline-block align-middle rtl:ml-2 ltr:mr-2' /> {tHotel('room')} {roomIndex + 1} - {roomItem.name}
      </h5>

      <div role="group" aria-labelledby="my-radio-group">
        <label className='block leading-4 text-xs' > جنسیت </label>
        <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4'>
          <Field
            type="radio"
            className="text-xs"
            onChange={(e: any) => {
              const val = e.target.checked;
              setFieldValue(`passengers.${roomIndex}.gender`, val);
              if (props.disableSyncedPassenger) {
                props.disableSyncedPassenger();
              }
            }}
            checked={values.passengers[roomIndex].gender}
          />
          مرد
        </label>
        <label className='inline-flex items-center gap-1'>
          <Field
            type="radio"
            className="text-xs"
            onChange={(e: any) => {
              const val = !e.target.checked;
              setFieldValue(`passengers.${roomIndex}.gender`, val);
              if (props.disableSyncedPassenger) {
                props.disableSyncedPassenger();
              }
            }}
            checked={!values.passengers[roomIndex].gender}
          />
          زن
        </label>
      </div>

      <FormikField
        setFieldValue={setFieldValue}
        id={`passengers_${roomIndex}_firstName`}
        errorText={errors.passengers ? (errors.passengers[roomIndex] as FormikErrors<{
          gender: boolean;
          firstName: string;
          lastName: string;
          roomNumber: number;
        }>)?.firstName : undefined}
        name={`passengers.${roomIndex}.firstName`}
        isTouched={(touched.passengers && touched.passengers[roomIndex]) ? touched.passengers[roomIndex].firstName : false}
        label={t('first-name')}
        validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
        value={values.passengers[roomIndex].firstName}
        onChange={props.disableSyncedPassenger}
      />

      <FormikField
        setFieldValue={setFieldValue}
        id={`passengers_${roomIndex}_lastName`}
        errorText={errors.passengers ? (errors.passengers[roomIndex] as FormikErrors<{
          gender: boolean;
          firstName: string;
          lastName: string;
          roomNumber: number;
        }>)?.lastName : undefined}
        name={`passengers.${roomIndex}.lastName`}
        isTouched={(touched.passengers && touched.passengers[roomIndex]) ? touched.passengers[roomIndex].lastName : false}
        label={t('last-name')}
        validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-last-name'), t('just-english-persian-letter-and-space'))}
        value={values.passengers[roomIndex].lastName}
        onChange={props.disableSyncedPassenger}
      />

      <Field
        type='hidden'
        name={`passengers.${roomIndex}.roomNumber`}
      />

      {!!roomItem.extraBed && (
        <div className='md:col-span-3 border-t border-neutral-300 pt-4 mt-4 flex gap-4 justify-between items-center'>

          <strong className="flex flex-wrap gap-1 md:gap-2 items-center font-semibold text-sm">
            تخت اضافه
            <span className="text-xs">
              ({numberWithCommas(extraBedPrice || 0)} {t('rial')} برای هر شب)
            </span>
          </strong>

          <div dir="ltr" className="whitespace-nowrap">
            <Quantity
              min={0}
              max={roomItem.extraBed}
              onChange={value => {
                props.onChangeExtraBed(value);
                setFieldValue(`passengers.${roomIndex}.extraBed`, value)
              }}
            />
          </div>

        </div>
      )}

    </div>
  )
}

export default RoomItemInformation;