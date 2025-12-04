
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import english from "react-date-object/locales/gregorian_en";

export const toPersianDigits = (x: string) => {
    if (x) {                   
        const persianNumbers = ["۰","۱","۲","۳","۴","۵","۶", "۷", "۸", "۹"];

        for(var i=0; i<10; i++) {
            x = x.replaceAll(i.toString(), persianNumbers[i]);
        }
    }

  return x;
};

export const numberWithCommas = (x: number) => {
    if (x) {        
        const y =  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return toPersianDigits(y);
    } else {
        return "0";
    }
}
export type DateFormat =
  | "weekDayNumber"
  | "m"
  | "d"
  | "HH:mm"
  | "dd mm"
  | "ddd dd mm"
  | "dddd dd MMMM"
  | "ddd dd mm yyyy"
  | "dd mm yyyy"
  | "yyyy/mm/dd"
  | "YYYY-MM-DD"
  | "MM/DD/YYYY"
  | "YYYY/MM/DD"
  | "yyyy/mm/dd h:m";

export const dateDisplayFormat = ({
  date,
  format,
  locale,
}: {
  date: DateObject;
  format?: DateFormat;
  locale?: "fa" | "en";
}): string => {
  if (!date) return "";

  let obj: DateObject;
  
  if (locale === "fa") {
    obj = new DateObject({
      date,
      format: "YYYY/MM/DD",
      calendar: persian,
      locale: persian_fa,
    }).convert(gregorian, english);
  } else {
    obj = new DateObject({
      date,
      format: "MM/DD/YYYY",
      calendar: gregorian,
      locale: english,
    });
  }
  if (!obj.isValid) return "";
  
  if (locale === "fa") {
    obj = obj.convert(persian, persian_fa);
  }

  const map: Record<string, string> = {
    "HH:mm": obj.format("HH:mm"),
    "ddd dd mm": obj.format("ddd DD MMM"),
    "ddd dd mm yyyy": obj.format("ddd DD MMM YYYY"),
    "dddd dd MMMM": obj.format("dddd DD MMMM"),
    "dd mm": obj.format("DD MMM"),
    "dd mm yyyy": obj.format("DD MMM YYYY"),
    "yyyy/mm/dd": obj.format("YYYY/MM/DD"),
    "YYYY-MM-DD": obj.format("YYYY-MM-DD"),
    "MM/DD/YYYY": obj.format("MM/DD/YYYY"),
    "YYYY/MM/DD": obj.format("YYYY/MM/DD"),
    "yyyy/mm/dd h:m": obj.format("YYYY/MM/DD HH:mm"),
    d: obj.format("DD"),
    m: obj.format("MMM"),
    weekDayNumber: obj.weekDay.index.toString(),
  };

  if (format && map[format]) return map[format];

  return obj.format("YYYY/MM/DD");
};

export const dateFormat = (date: Date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const addSomeDays = (date: DateObject, increment: number = 1) => {
  const jsDate = date.toDate(); 

  const newDate = new Date(jsDate.getTime() + increment * 24 * 60 * 60 * 1000);

  return newDate;
};

export const goBackYears = (date: Date, years: number = 1) => {

    const newDate = new Date(date.getTime() - years * 365.25 * 24 * 60 * 60 * 1000);

    return newDate;
}

export const getDatesDiff = (a: Date, b: Date, unit?: "seconds") => {

    if (unit && unit === "seconds") {
        var seconds = (b.getTime() - a.getTime()) / 1000;
        return Math.floor(seconds);
    }

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utca = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcb = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.abs(Math.floor((utcb - utca) / _MS_PER_DAY));
}

export const checkDateIsAfterDate = (a: Date, b: Date) => {
    if (b.getTime() > a.getTime()){
        return false;
    }
    return true;
}

export const persianNumbersToEnglish = (number: string) => {

    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    if (typeof number === 'string') {
        for (var i = 0; i < 10; i++) {
            number = number.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
        }
    }
    return number;
}

export const shamsiToMiladi = (j_y: number, j_m: number, j_d: number) => {

    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * Math.floor(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
        g_day_no--;
        gy += 100 * Math.floor(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * Math.floor(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += Math.floor(g_day_no / 365);
        g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= g_days_in_month[i] + (i == 1 && leap ? 1 : 0); i++)
        g_day_no -= g_days_in_month[i] + (i == 1 && leap ? 1 : 0);

    let gm = (i + 1).toString().padStart(2, '0');
    let gd = (g_day_no + 1).toString().padStart(2, '0');

    return [gy.toString(), gm, gd];

}


export const GTM_ID = process.env.GOOGLE_TAG_MANAGER_ID

export const replaceBrandNames = (text: string) => {

    const isShab = process.env.PROJECT === "SHAB";
    const isTorbeh = process.env.SITE_NAME === 'https://hotel.torbeh.com/';

    if(!text) return text;

    if(isTorbeh){
               return text
        .replace(/هتل\s?‌?\s?بان|هتلبان/gi, 'تربه')
        .replace(/سفرانه/gi, 'تربه')
        .replace(/ایران\s?‌?\s?هتل/gi, 'تربه')
        .replace(/info@hotelban\.com/gi, 'info@torbeh.com')
        .replace(/hotelban\.com/gi, 'hotel.torbeh.com') 
    }
    if (isShab) {
        return text
        .replace(/هتل\s?‌?\s?بان|هتلبان/gi, 'شب')
        .replace(/سفرانه/gi, 'شب')
        .replace(/ایران\s?‌?\s?هتل/gi, 'شب')
        .replace(/info@hotelban\.com/gi, 'info@shab.ir')
        .replace(/hotelban\.com/gi, 'shab.hotelban.com')
    }

    return text;
};