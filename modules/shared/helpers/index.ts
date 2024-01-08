export const numberWithCommas = (x: number) => {
    if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
        return "0";
    }
}

export const dateDiplayFormat = ({ date, format, locale }: { date: string; format?: "ddd dd mm" | "dd mm yyyy" | "yyyy/mm/dd" | "YYYY-MM-DD", locale?: string }): string => {

    if (!date) return "";

    const dateObject = new Date(date);
    const day = dateObject.toLocaleString(locale, { day: "numeric" });
    const weekDay = dateObject.toLocaleString(locale, { weekday: 'short' });
    const month = dateObject.toLocaleString(locale, { month: "long" });
    const day2digit = dateObject.toLocaleString(locale, { month: "2-digit" })
    const month2digit = dateObject.toLocaleString(locale, { month: "2-digit" });
    const year = dateObject.toLocaleString(locale, { year: "numeric" });

    if (format === "ddd dd mm") {
        return (`${weekDay} ${day} ${month}`)
    }

    if (format === "dd mm yyyy") {
        return (`${day} ${month} ${year}`)
    }

    if (format === "yyyy/mm/dd") {
        return (`${year}/${month2digit}/${day2digit}`)
    }

    return date;
}

export const dateFormat = (date: Date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
}

export const addSomeDays = (date: Date, increment: number = 1) => {

    const newDate = new Date(date.getTime() + increment * 24 * 60 * 60 * 1000)

    return newDate;
}

export const getDatesDiff = (a:Date, b:Date) => {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utca = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcb = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utcb - utca) / _MS_PER_DAY);
}
