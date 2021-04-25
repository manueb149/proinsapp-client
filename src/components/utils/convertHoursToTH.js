const convertToTH = (date, format) => {
    console.log(date);
    if(String(date).split(" ").length<=3){
        if(format){
            let twelveHour = String(date).split(" ")[1].split(":")
            const am_pm = String(date).split(" ")[2]
             if(am_pm==="p. m."){
                 return `${Number(twelveHour[0])+12}:${twelveHour[1]}:${twelveHour[2]}`
             }
            return String(date).split(" ")[1]
        }else{
            return `${String(date).split(" ")[1]} ${String(date).split(" ")[2]}`
        }
    }else{
        console.log([String(date).substring(0, 15), String(date).substring(16, String(date).length)])
    }
}

export default convertToTH;