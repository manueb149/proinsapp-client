const printReportDate = (date) => {
    console.log(date);
    console.log(String(date).substring(0, String(date).length));
    if(String(date).split(" ").length<=3){
        return [String(date).split(" ")[0], `${String(date).split(" ")[1]} ${String(date).split(" ")[2]}`]
    }else{
        return [String(date).substring(0, 15), String(date).substring(16, String(date).length)]
    }
}

export default printReportDate;