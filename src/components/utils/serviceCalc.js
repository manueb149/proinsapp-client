const summaryCalc = (data, values, servicesType, servicesTypeCk, detailSinister, detailSinisterCk) => {
    let total = 0;
    if (Number(data.distancia) <= 15) {
        total = 1200;
        if (servicesTypeCk.EX && Number(servicesType.EX)>=0) total = total + Number(servicesType.EX);
        if (servicesTypeCk.CR && Number(servicesType.CR)>=0) total = total + Number(servicesType.CR);
        if (servicesTypeCk.CG && Number(servicesType.CG)>=0) total = total + Number(servicesType.CG);
        if (servicesTypeCk.CE && Number(servicesType.CE)>=0) total = total + Number(servicesType.CE);
        if (servicesTypeCk.SG && Number(servicesType.SG)>=0) total = total + Number(servicesType.SG);
        if (servicesTypeCk.PE && Number(servicesType.PE)>=0) total = total + Number(servicesType.PE);

        if (detailSinisterCk.VO && Number(servicesType.VO)>=0) total = total + Number(detailSinister.VO);
        if (detailSinisterCk.IN && Number(servicesType.IN)>=0) total = total + Number(detailSinister.IN);
        if (detailSinisterCk.CO && Number(servicesType.CO)>=0) total = total + Number(detailSinister.CO);
        if (detailSinisterCk.DM && Number(servicesType.DM)>=0) total = total + Number(detailSinister.DM);

        if (data.dia === "DF") total += total * Number(values.FF) / 100;
        if (servicesTypeCk.SP) {
            if (Number(servicesType.SP) >= 1) {
                total += total * Number(servicesType.SP0) / 100;
            }
        }
        if (servicesTypeCk.LM && Number(servicesType.LM)>=0) total = total + Number(servicesType.LM) * Number(servicesType.SL);
        if (data.noche) total += total * Number(servicesType.TN) / 100;
    } else {
        total = 1200 + ((Number(data.distancia) - 15) * Number(servicesType.TG));
        if (servicesTypeCk.EX && Number(servicesType.EX)>=0) total = total + Number(servicesType.EX);
        if (servicesTypeCk.CR && Number(servicesType.CR)>=0) total = total + Number(servicesType.CR);
        if (servicesTypeCk.CG && Number(servicesType.CG)>=0) total = total + Number(servicesType.CG);
        if (servicesTypeCk.CE && Number(servicesType.CE)>=0) total = total + Number(servicesType.CE);
        if (servicesTypeCk.SG && Number(servicesType.SG)>=0) total = total + Number(servicesType.SG);
        if (servicesTypeCk.PE && Number(servicesType.PE)>=0) total = total + Number(servicesType.PE);

        if (detailSinisterCk.VO && Number(servicesType.VO)>=0) total = total + Number(detailSinister.VO);
        if (detailSinisterCk.IN && Number(servicesType.IN)>=0) total = total + Number(detailSinister.IN);
        if (detailSinisterCk.CO && Number(servicesType.CO)>=0) total = total + Number(detailSinister.CO);
        if (detailSinisterCk.DM && Number(servicesType.DM)>=0) total = total + Number(detailSinister.DM);

        if (data.dia === "DF") total += total * Number(values.FF) / 100;
        if (servicesTypeCk.SP) {
            if (Number(servicesType.SP) >= 1) {
                total = total + Number(servicesType.TG) * Number(servicesType.SP) * (1 + Number(servicesType.SP0) / 100);
            }
        }
        if (servicesTypeCk.LM && Number(servicesType.LM)>=0) total = total + (Number(servicesType.SL) + Number(servicesType.TG)) * Number(servicesType.LM);
        if (data.noche) total += total * Number(servicesType.TN) / 100;
    }
    data.precio = total.toFixed(2);
    return (total.toFixed(2))
}

export default summaryCalc;