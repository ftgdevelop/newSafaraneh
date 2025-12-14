import { Formik, Form } from "formik";
import FormikField from "@/modules/shared/components/ui/FormikField";
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import { validateRequiedPersianAndEnglish, validateRequied } from "@/modules/shared/helpers/validation";

type PassengerInfoFormProps = {
  onSubmit: (values: { firstName: string; lastName: string; phoneNumber: string }) => void;
  submitTrigger?: (submitForm: () => void) => void;
};

const PassengerInfoForm = ({ onSubmit, submitTrigger }: PassengerInfoFormProps) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit, submitForm }) => {
        // ارسال submitForm به والد
        if (submitTrigger) submitTrigger(submitForm);

        return (
          <Form
            className="space-y-4" autoComplete='off'
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormikField
                labelIsSimple
                name="firstName"
                id="firstName"
                label="نام"
                value={values.firstName}
                errorText={errors.firstName}
                isTouched={touched.firstName}
                setFieldValue={setFieldValue}
                validateFunction={(value: string) =>
                  validateRequiedPersianAndEnglish(
                    value,
                    "لطفا نام خود را وارد کنید.",
                    "نام باید فقط شامل حروف فارسی یا انگلیسی باشد."
                  )
                }
                onChange={(value: string) => { setFieldValue('firstName', value, true) }}
                showRequiredStar
              />

              <FormikField
                labelIsSimple
                name="lastName"
                label="نام خانوادگی"
                value={values.lastName}
                errorText={errors.lastName}
                isTouched={touched.lastName}
                setFieldValue={setFieldValue}
                validateFunction={(value: string) =>
                  validateRequiedPersianAndEnglish(
                    value,
                    "لطفا نام خانوادگی خود را وارد کنید.",
                    "نام خانوادگی باید فقط شامل حروف فارسی یا انگلیسی باشد."
                  )
                }
                showRequiredStar
              />
              <PhoneInput
                labelIsSimple
                name="phoneNumber"
                label="شماره تلفن"
                initialValue={values.phoneNumber}
                onChange={(value: string) => { setFieldValue('phoneNumber', value, true) }}
                errorText={errors.phoneNumber}
                isTouched={touched.phoneNumber}
                // validateFunction={(value: string) =>
                //   validateRequied(value, "لطفا شماره تلفن خود را وارد کنید.") ||
                //   (!/^\+\d{10,15}$/.test(value) && "شماره تلفن معتبر نیست.")
                // }
                defaultCountry={{
                  countryCode: "IR",
                  dialCode: "98",
                  format: "... ... ...."
                }}
                showRequiredStar
              />
            </div>


          </Form>
        );
      }}
    </Formik>
  );
};

export default PassengerInfoForm;