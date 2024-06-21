import { AirportAutoCompleteType } from "@/modules/flights/types/flights"
import { BusAutocompleteType } from "../../types"

const list = [
    {
      value: 34,
      label: 'تهران',
      values: {
        name: 'تهران',
        city: {
          name: 'تهران',
          code: 'THR',
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 34,
      },
    },
    {
      value: 827,
      label: 'اصفهان',
      values: {
        name: 'اصفهان',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 827,
      },
    },
    {
      value: 3587,
      label: 'رشت',
      values: {
        name: 'رشت',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 3587,
      },
    },
    {
      value: 1167,
      label: 'تبریز',
      values: {
        name: 'تبریز',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
          code: 'IR',
        },
        code: 1167,
      },
    },
    {
      value: 28,
      label: 'ایروان',
      values: {
        name: 'ایروان',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ارمنستان',
        },
        code: 28,
      },
    },
    {
      value: 10,
      label: 'استانبول',
      values: {
        name: 'استانبول',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ترکیه',
        },
        code: 10,
      },
    },
    {
      value: 6218,
      label: 'یزد',
      values: {
        name: 'یزد',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 6218,
      },
    },
    {
      value: 2288,
      label: 'اهواز',
      values: {
        name: 'اهواز',
        city: {
          name: null,
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 2288,
      },
    },
    {
      value: 1494,
      label: 'پایانه امام رضا',
      values: {
        name: 'پایانه امام رضا',
        city: {
          name: 'مشهد',
          code: null,
        },
        country: {
          name: 'ایران',
        },
        code: 1494,
      },
    },
]
  
export const defaultList: BusAutocompleteType[] = list.map((item:any) => ({
  id: item.value,
  country: {
    name: item.values.country.name
  },
  province: {
    name: item.values.city.name
  },
  name: item.label,
  city: {
    name: item.values.city.name
  }
}))