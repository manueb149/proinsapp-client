const summaryCalc = (values, checked) => {
    let total = 0;
    if (Number(values.KmE) <= 15) {
        total = 1200;
        if (checked.SP) total += total * (Number(values.SP) / 100);
        if (checked.EX) total += Number(values.EX);
        total += Number(values.CP);
        if (checked.LM && values.KmL > 0 && values.LM > 0) total += (Number(values.LM) * Number(values.KmL));
        if (checked.TN) total += total * (Number(values.TN) / 100);
        if (checked.FF) total += total * (Number(values.FF) / 100);
    } else {
        total = (Number(values.KmE) - 15) * (Number(values.CB));
        if (checked.SP) total = total + (total * (Number(values.SP) / 100));
        if (checked.EX) total += Number(values.EX);
        if (checked.LM && values.KmL > 0 && values.LM > 0) total += (Number(values.LM) * Number(values.KmL));
        total += Number(values.CP);
        if (checked.TN) total += total * Number(values.TN) / 100;
        if (checked.FF) total += total * Number(values.FF) / 100;
        total += 1200
    }
    return (total.toFixed(2))
}

export default summaryCalc;