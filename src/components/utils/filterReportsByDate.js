import { isDate } from "moment";

export default function filterReportByDate( data, StartDate, EndDate ) {
    let startDate = StartDate;
    let endDate = EndDate;
    
    if(!isDate(StartDate)){
        startDate= StartDate._d
    }
    if(!isDate(EndDate)){
        endDate= EndDate._d
    }

    const reformatDate = data.map((item, index) => {
        if(data[index]["fechaSiniestro"] === "") item["fechaSiniestro"] = new Date(2021, 0, 12);
        return data[index];
    })

    const filteredData = reformatDate.map((item, index) => {
        let currentDate = item.fechaSiniestro
        let result = null

        if(String(currentDate).split(" ").length<=3){
            const nDate = String(currentDate).split(" ")[0].split("/");
            currentDate = new Date(Number(nDate[2]), Number(nDate[1])-1, Number(nDate[0]));
        }
        if(startDate <= currentDate && currentDate <= endDate){
            result = data[index];
        }
        return result;
    })

    return filteredData.filter( value => value !== null);
}