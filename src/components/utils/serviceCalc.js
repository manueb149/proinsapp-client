const summaryCalc = (data, values, servicesType, servicesTypeCk, detailSinister, detailSinisterCk) => {
    let total = 0;
    if (Number(data.distancia) <= 15) {
        total = 1200;
        if (servicesTypeCk.EX) total = total + Number(servicesType.EX);
        if (servicesTypeCk.CR) total = total + Number(servicesType.CR);
        if (servicesTypeCk.CG) total = total + Number(servicesType.CG);
        if (servicesTypeCk.CE) total = total + Number(servicesType.CE);
        if (servicesTypeCk.SG) total = total + Number(servicesType.SG);
        if (servicesTypeCk.PE) total = total + Number(servicesType.PE);
        if (data.dia==="DF") total += total * Number(values.FF)/100;
        if (servicesTypeCk.SP) total += total * Number(servicesType.SP)/100;
        if (servicesTypeCk.LM) total = total + Number(servicesType.LM) * Number(servicesType.SL);
        if (data.noche) total += total * Number(servicesType.TN)/100;
    } else {
        total = 1200 + ((Number(data.distancia) - 15) * Number(values.CB));
        if (servicesTypeCk.EX) total = total + Number(servicesType.EX);
        if (servicesTypeCk.CR) total = total + Number(servicesType.CR);
        if (servicesTypeCk.CG) total = total + Number(servicesType.CG);
        if (servicesTypeCk.CE) total = total + Number(servicesType.CE);
        if (servicesTypeCk.SG) total = total + Number(servicesType.SG);
        if (servicesTypeCk.PE) total = total + Number(servicesType.PE);
        if (servicesTypeCk.SP) total += total * Number(servicesType.SP)/100;
        if (servicesTypeCk.LM) total = total + Number(servicesType.LM) * Number(servicesType.SL);
        if (data.noche) total += total * Number(servicesType.TN)/100;
    }
    data.precio = total.toFixed(2);
    return (total.toFixed(2))
}

export default summaryCalc;