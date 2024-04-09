export function timeFormatToLocale(date: Date) {
    return new Date(date).toLocaleString();
}

export function timeFormat(date: Date){
    //date without hours
    return new Date(date).toLocaleDateString();
}