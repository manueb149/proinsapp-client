const summaryCalc = (values, checked) => {
    let total = 0;
    if (Number(values.KmE) <= 15) {
        total += 1200 + Number(values.CP);
        if (checked.TN) total += total * Number(values.TN)
        if (checked.FF) total += total * Number(values.FF)
        if (checked.EX) total += Number(values.EX)
        if (checked.SP) total += total * Number(values.SP)
        if (checked.LM) total += total + Number(values.L) * Number(values.KmL)
    } else {
        total += 1200 + (Number(values.KmE) - 15) * (Number(values.CB)) + Number(values.CP);
        if (checked.TN) total += total * Number(values.TN)/100;
        if (checked.FF) total += total * Number(values.FF) / 100;
        if (checked.EX) total += Number(values.EX);
        if (checked.SP) total += total * Number(values.SP) / 100;
        if (checked.LM && values.KmL>0 && values.LM>0) total += (Number(values.LM) * Number(values.KmL));
    }
    return (total.toFixed(2))
}

export default summaryCalc;