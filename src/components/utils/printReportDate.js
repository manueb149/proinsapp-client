const printReportDate = (date) => {
    if(String(date).split(" ").length<=3){
        return String(date).split(" ")[0]
    }else{
        return String(date).substring(0, 15)
    }
}

export default printReportDate;