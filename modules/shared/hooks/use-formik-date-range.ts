import { useEffect, useState } from 'react';
import { FormikValues } from 'formik';
import {
  addSomeDays,
  checkDateIsAfterDate,
  dateFormat,
  normalizeToDateObject,
} from '@/modules/shared/helpers';

type UseFormikDateRangeParams<T extends FormikValues> = {
  values: T;
  setFieldValue: (
    field: keyof T | string,
    value: any,
    shouldValidate?: boolean
  ) => void;

  startField: keyof T | string;

  endField: keyof T | string;

  minGapDays?: number;

  isFa: boolean;
};

export function useFormikDateRange<T extends FormikValues>({
  values,
  setFieldValue,
  startField,
  endField,
  minGapDays = 1,
  isFa
}: UseFormikDateRangeParams<T>) {
  const [minEndDate, setMinEndDate] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() + minGapDays))
  );

  useEffect(() => {
    const startValue = values[startField as keyof T];
    const endValue = values[endField as keyof T];

    if (!startValue) return;

    const startDate = normalizeToDateObject(startValue, { localeKey: isFa ? "fa" : "en" })?.toDate();
    const endDate = normalizeToDateObject(endValue,    { localeKey: isFa ? "fa" : "en" })?.toDate();

    if (!startDate) return;

    setMinEndDate(addSomeDays(startDate, minGapDays));

    if (!endDate) return;

    const isValid = checkDateIsAfterDate(endDate, startDate);

    if (!isValid) {
      const nextValidDate = addSomeDays(startDate, minGapDays);
      setFieldValue(endField, dateFormat(nextValidDate), false);
    }
  }, [
    values,
    startField,
    endField,
    minGapDays,
    setFieldValue,
  ]);

  return {
    minEndDate,
  };
}