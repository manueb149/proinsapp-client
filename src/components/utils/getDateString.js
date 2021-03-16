import { isDate } from "moment";

export default function filterReportByDate(date, n) {
    let nDate = date;
    
    if(!isDate(date)){
        nDate= date._d
    }
    const dateArray = nDate.toLocaleString().split(",")[0].split("/");
    return `${Number(dateArray[1])+n}-${dateArray[0]}-${dateArray[2]}`
}