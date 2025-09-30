import { DomesticHotelGetValidateResponse } from "../../types/hotel";
import { useTranslation } from "next-i18next";
import { Field, FormikErrors, FormikTouched } from "formik";
import FormikField from "@/modules/shared/components/ui/FormikField";
import { validateRequiedPersianAndEnglish } from "@/modules/shared/helpers/validation";
import { TravelerItem } from "@/modules/shared/types/common";
import FormerTravelers from "@/modules/shared/components/FormerTravelers";
import RadioInputField from "@/modules/shared/components/ui/RadioInputField";

type Props = {
  multiPassenger: boolean;  
  passengerIndex: number;
  roomPassengerIndex: number;
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
  travelers?: TravelerItem[];
  fetchTravelers?: () => void;
  clearTravelers?: () => void;
  fetchingTravelersLoading?: boolean;
}

const PassengerItemInformation: React.FC<Props> = props => {

  const theme1 = process.env.THEME === "THEME1";
  const theme3 = process.env.THEME === "THEME3";

  const { passengerIndex, errors, setFieldValue, touched, values } = props;

  const { t } = useTranslation('common');

  const selectTravelerHandle = (traveler: TravelerItem) => {

    setFieldValue(`passengers.${props.passengerIndex}.gender`, traveler.gender);

    setFieldValue(`passengers.${props.passengerIndex}.firstName`, traveler.firstnamePersian || traveler.firstname, true);
    setFieldValue(`passengers.${props.passengerIndex}.lastName`, traveler.lastnamePersian || traveler.lastname, true);

  }

  return (
    <div className={`grid gap-x-2 gap-y-4 mb-5 ${(theme1 || theme3)?"md:grid-cols-3":""}`} >

      <div className={`flex justify-between text-sm items-start ${(theme1 || theme3)?"md:col-span-3":""}`}>
        {!!props.multiPassenger && <div className={`font-semibold text-sm ${(theme1 || theme3)?"md:col-span-3":""}`}>
            مهمان {props.roomPassengerIndex + 1}
        </div>}

        {(props.fetchTravelers && props.clearTravelers) && <FormerTravelers
          fetchTravelers={props.fetchTravelers}
          fetchingLoading={props.fetchingTravelersLoading || false}
          clearTravelers={props.clearTravelers}
          onSelectTraveler={selectTravelerHandle}
          travelers={props.travelers}
          isHotel
        />}
      </div>

      <div role="group" className="leading-4" >
        <label className='block text-xs mb-2' > جنسیت </label>
        <label className='inline-flex items-center gap-1 rtl:ml-4 ltr:mr-4 cursor-pointer'>
          <RadioInputField 
            onChange={(e: any) => {
              const val = e.target.checked;
              setFieldValue(`passengers.${passengerIndex}.gender`, val);
              if (props.disableSyncedPassenger) {
                props.disableSyncedPassenger();
              }
            }}
            checked={values.passengers[passengerIndex]?.gender}          
          />
          مرد
        </label>
        <label className='inline-flex items-center gap-1 cursor-pointer'>
          <RadioInputField
            onChange={(e: any) => {
              const val = !e.target.checked;
              setFieldValue(`passengers.${passengerIndex}.gender`, val);
              if (props.disableSyncedPassenger) {
                props.disableSyncedPassenger();
              }
            }}
            checked={!values.passengers[passengerIndex]?.gender}
          />
          زن
        </label>
      </div>

      <FormikField
        labelIsSimple={theme3}
        setFieldValue={setFieldValue}
        id={`passengers_${passengerIndex}_firstName`}
        errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
          gender: boolean;
          firstName: string;
          lastName: string;
          roomNumber: number;
        }>)?.firstName : undefined}
        name={`passengers.${passengerIndex}.firstName`}
        isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].firstName : false}
        label={t('first-name')}
        validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-first-name'), t('just-english-persian-letter-and-space'))}
        value={values.passengers[passengerIndex]?.firstName}
        onChange={props.disableSyncedPassenger}
      />

      <FormikField
        labelIsSimple={theme3}
        setFieldValue={setFieldValue}
        id={`passengers_${passengerIndex}_lastName`}
        errorText={errors.passengers ? (errors.passengers[passengerIndex] as FormikErrors<{
          gender: boolean;
          firstName: string;
          lastName: string;
          roomNumber: number;
        }>)?.lastName : undefined}
        name={`passengers.${passengerIndex}.lastName`}
        isTouched={(touched.passengers && touched.passengers[passengerIndex]) ? touched.passengers[passengerIndex].lastName : false}
        label={t('last-name')}
        validateFunction={(value: string) => validateRequiedPersianAndEnglish(value, t('please-enter-last-name'), t('just-english-persian-letter-and-space'))}
        value={values.passengers[passengerIndex]?.lastName}
        onChange={props.disableSyncedPassenger}
      />

      <Field
        type='hidden'
        name={`passengers.${passengerIndex}.roomNumber`}
      />

    </div>
  )
}

export default PassengerItemInformation;