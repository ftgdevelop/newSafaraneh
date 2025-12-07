import { Formik, Form } from "formik";
import FormikField from "@/modules/shared/components/ui/FormikField";
import PhoneInput from "@/modules/shared/components/ui/PhoneInput";
import { validateRequiedPersianAndEnglish, validateRequied } from "@/modules/shared/helpers/validation";

type PassengerInfoFormProps = {
  onSubmit: (values: { firstName: string; lastName: string; phoneNumber: string }) => void;
};

const PassengerInfoForm = ({ onSubmit }: PassengerInfoFormProps) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      onSubmit={(values) => {
        onSubmit(values); // Pass the form values to the parent component
      }}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => (
        <Form
          className="space-y-4"
          onChange={() => {
            handleSubmit(); // Automatically submit the form on any change
          }}
        >
          {/* First Name */}
          <FormikField
            name="firstName"
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
            showRequiredStar
            className="rounded-full"
          />

          {/* Last Name */}
          <FormikField
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

          {/* Phone Number */}
          <PhoneInput
            name="phoneNumber"
            label="شماره تلفن"
            initialValue={values.phoneNumber}
            onChange={(value) => {
              setFieldValue("phoneNumber", value);
              handleSubmit(); // Automatically submit the form when the phone number changes
            }}
            errorText={errors.phoneNumber}
            isTouched={touched.phoneNumber}
            validateFunction={(value: string) =>
              validateRequied(value, "لطفا شماره تلفن خود را وارد کنید.") ||
              (!/^\+\d{10,15}$/.test(value) && "شماره تلفن معتبر نیست.")
            }
            defaultCountry={{
              countryCode: "IR",
              dialCode: "98",
            }}
            showRequiredStar
          />
        </Form>
      )}
    </Formik>
  );
};

export default PassengerInfoForm;