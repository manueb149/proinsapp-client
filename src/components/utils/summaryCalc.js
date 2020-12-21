const summaryCalc = (values, checked) => {
    let total = 0;
    if (Number(values.KmE) <= 15) {
        total += 1200 + Number(values.CP);
        if (checked.TN) total += total * Number(values.TN)/100;
        if (checked.FF) total += total * Number(values.FF)/100;
        if (checked.EX) total += Number(values.EX);
        if (checked.SP) total += total * Number(values.SP)/100;
        if (checked.LM && values.KmL>0 && values.LM>0) total += (Number(values.LM) * Number(values.KmL));
    } else {
        total += 1200 + (Number(values.KmE) - 15) * (Number(values.CB)) + Number(values.CP);
        if (checked.TN) total += total * Number(values.TN)/100;
        if (checked.FF) total += total * Number(values.FF)/100;
        if (checked.EX) total += Number(values.EX);
        if (checked.SP) total += Number(values.CB) * Number(values.KmSP) * Number(values.SP)/100;
        if (checked.LM && values.KmL>0 && values.LM>0) total += (Number(values.LM) * Number(values.KmL));
    }
    return (total.toFixed(2))
}

export default summaryCalc;