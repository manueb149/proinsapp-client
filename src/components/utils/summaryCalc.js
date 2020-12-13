const summaryCalc = (KmE, CB, CP, TN, FF, E, SP, L) => {
    let CBPKM = ((Number(KmE)>15) ? (Number(KmE)-15) : 1 * (Number(CB)))
    return CBPKM
}

export default summaryCalc;