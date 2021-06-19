const summaryCalc = (values, checked) => {
    const vars = {
        total: 0,
        subTotal: 0,
        distancia: 0,
        arranque: 1200,
        kmLoma: 0,
        subTotalLoma: 0,
        kmLlano: 0,
        subTotalLlano: 0,
        kmSobrepeso: 0,
        sobrePeso: 0,
        servicios: 0,
        peaje: 0,
        subTotalNoche: 0,
        subTotalFeriado: 0,
    }
    if (Number(values.KmE) <= 15) {
        vars.distancia = Number(values.KmE);
        if (checked.LM) {
            if (checked.LM && (Number(values.KmL) <= vars.distancia)) vars.kmLoma = Number(values.KmL);
            if (checked.LM && (Number(values.KmL) <= vars.distancia)) vars.kmLlano = vars.distancia - vars.kmLoma;
            if (checked.LM && vars.kmLlano > 0 && Number(values.KmL) > 0) vars.subTotalLlano = vars.kmLlano * Number(values.CB);
            if (checked.SP) vars.sobrePeso = vars.arranque * (Number(values.SP) / 100);
        } else {
            if (checked.SP) vars.sobrePeso = vars.arranque * (Number(values.SP) / 100);
        }
        if (checked.LM && values.KmL > 0 && values.LM > 0) vars.total += (Number(values.LM) * Number(values.KmL));

        if (checked.EX) vars.servicios = Number(values.EX);
        if (Number(values.CP) > 0) vars.peaje = Number(values.CP);

        vars.total = vars.arranque +
            vars.sobrePeso +
            vars.subTotalNoche +
            vars.subTotalFeriado

        if (checked.TN) vars.subTotalNoche = vars.total * Number(values.TN) / 100;
        if (checked.FF) vars.subTotalFeriado = vars.total * Number(values.FF) / 100;

        vars.total = vars.subTotal +
            vars.subTotalLoma +
            vars.subTotalLlano +
            vars.sobrePeso +
            vars.servicios +
            vars.peaje +
            vars.subTotalNoche +
            vars.subTotalFeriado +
            vars.arranque
    } else {
        vars.distancia = Number(values.KmE) - 15;
        if(checked.SP && Number(values.KmSP) > 0) vars.kmSobrepeso = Number(values.KmSP);
        if (checked.LM) {
            if (checked.LM && (Number(values.KmL) <= vars.distancia)) vars.kmLoma = Number(values.KmL);
            if (checked.LM && (Number(values.KmL) <= vars.distancia)) vars.kmLlano = vars.distancia - vars.kmLoma;
            if (checked.LM && vars.kmLoma > 0 && Number(values.LM) > 0) vars.subTotalLoma = vars.kmLoma * Number(values.LM);
            if (checked.LM && vars.kmLlano > 0) vars.subTotalLlano = vars.kmLlano * Number(values.CB);
            // if (checked.SP && vars.kmLlano > 0) vars.sobrePeso = vars.subTotalLlano * (Number(values.SP) / 100);
            if(checked.SP && Number(values.KmSP) > 0 ) vars.sobrePeso = Number(values.KmSP) * Number(values.CB) * (Number(values.SP) / 100);
        } else {
            if (Number(values.CB) > 0) vars.subTotal = vars.distancia * Number(values.CB);
            // if (checked.SP) vars.sobrePeso = vars.distancia * Number(values.CB) * (Number(values.SP) / 100);
            if(checked.SP && Number(values.KmSP) > 0 ) vars.sobrePeso = Number(values.KmSP) * Number(values.CB) * (Number(values.SP) / 100);
        }
        if (checked.LM && values.KmL > 0 && values.LM > 0) vars.total += (Number(values.LM) * Number(values.KmL));

        if (checked.EX) vars.servicios = Number(values.EX);
        if (Number(values.CP) > 0) vars.peaje = Number(values.CP);

        vars.total = vars.subTotal +
            vars.subTotalLoma +
            vars.subTotalLlano +
            vars.sobrePeso +
            vars.subTotalNoche +
            vars.subTotalFeriado +
            vars.arranque // Lo pusimo' otra ve

        if (checked.TN) vars.subTotalNoche = vars.total * Number(values.TN) / 100;
        if (checked.FF) vars.subTotalFeriado = vars.total * Number(values.FF) / 100;

        vars.total = vars.subTotal +
            vars.subTotalLoma +
            vars.subTotalLlano +
            vars.sobrePeso +
            vars.servicios +
            vars.peaje +
            vars.subTotalNoche +
            vars.subTotalFeriado +
            vars.arranque
    }
    console.log(vars);
    return (vars.total.toFixed(2))
}

export default summaryCalc;