const summaryCalc = (
	data,
	values,
	servicesType,
	servicesTypeCk,
	detailSinister,
	detailSinisterCk,
	dataTrucks,
	proinsaPrice = true,
	fihogarPrice = false,
	futuroPrice = false,
	isServiceVIP = false,
	proinsaAmount = 0
) => {
	const vars = {
		total: 0,
		subTotal: 0,
		distancia: 0,
		arranque: 0,
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
	};
	const truckRadio = (dataTrucks && dataTrucks[0] && Number(dataTrucks[0]?.radio)) || 15;

	if (Number(data.distancia) <= truckRadio) {
		if (!futuroPrice) {
			vars.distancia = Number(data.distancia);
			if (servicesTypeCk.TG) vars.arranque = 1200;
			if (servicesTypeCk.SP && Number(servicesType.SP) > 0) vars.kmSobrepeso = Number(servicesType.SP);

			if (servicesTypeCk.TG && servicesTypeCk.LM) {
				if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLoma = Number(servicesType.LM);
				if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLlano = vars.distancia - vars.kmLoma;
				if (servicesTypeCk.LM && Number(servicesType.LM) > 0 && vars.kmLlano > 0) vars.subTotalLlano = vars.kmLlano * Number(servicesType.TG);
				if (servicesTypeCk.SP && Number(servicesType.SP) > 0) vars.sobrePeso = vars.arranque * (Number(servicesType.SP0) / 100);
			} else {
				if (servicesTypeCk.SP && Number(servicesType.SP) > 0) vars.sobrePeso = vars.arranque * (Number(servicesType.SP0) / 100);
			}
		}

		if (servicesTypeCk.EX) {
			if (Number(servicesType.EX) <= 3000) {
				vars.servicios += 0;
			} else {
				vars.servicios += Number(servicesType.EX) - 3000;
			}
		}

		if (servicesTypeCk.PE) {
			if (isServiceVIP) {
				if (Number(servicesType.PE) > 500) {
					vars.peaje = Number(servicesType.PE) - 500;
				} else {
					vars.peaje = 0;
				}
			} else {
				vars.peaje = Number(servicesType.PE);
			}
		}
		if (servicesTypeCk.MN) vars.servicios += Number(servicesType.MN);

		vars.total = vars.arranque + vars.sobrePeso + vars.subTotalNoche + vars.subTotalFeriado;

		if (data.noche && servicesTypeCk.TG) vars.subTotalNoche = vars.total * (Number(servicesType.TN) / 100);
		if (data.dia === "DF" && servicesTypeCk.TG) vars.subTotalFeriado = vars.total * (Number(values.FF) / 100);

		vars.total =
			vars.subTotal +
			vars.subTotalLoma +
			vars.subTotalLlano +
			vars.sobrePeso +
			vars.servicios +
			vars.peaje +
			vars.subTotalNoche +
			vars.subTotalFeriado +
			vars.arranque;
	} else {
		vars.distancia = Number(data.distancia) - 50;
		if (servicesTypeCk.TG) vars.arranque = 0;
		if (servicesTypeCk.SP && Number(servicesType.SP) > 0) vars.kmSobrepeso = Number(servicesType.SP);
		if (servicesTypeCk.TG && servicesTypeCk.LM) {
			if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLoma = Number(servicesType.LM);
			if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLlano = vars.distancia - vars.kmLoma;
			if (servicesTypeCk.LM && vars.kmLoma > 0 && Number(servicesType.LM) > 0)
				vars.subTotalLoma = vars.kmLoma * (Number(servicesType.SL) + Number(servicesType.TG));
			if (servicesTypeCk.LM && vars.kmLlano > 0) vars.subTotalLlano = vars.kmLlano * Number(servicesType.TG);
			if (servicesTypeCk.SP && Number(servicesType.SP) > 0)
				vars.sobrePeso = Number(servicesType.SP) * Number(servicesType.TG) * (Number(servicesType.SP0) / 100);
		} else {
			if (servicesTypeCk.TG && Number(servicesType.TG) > 0) vars.subTotal = vars.distancia * Number(servicesType.TG);
			if (servicesTypeCk.SP && Number(servicesType.SP) > 0)
				vars.sobrePeso = Number(servicesType.SP) * Number(servicesType.TG) * (Number(servicesType.SP0) / 100);
		}

		if (servicesTypeCk.EX) {
			if (Number(servicesType.EX) <= 3000) {
				vars.servicios += 0;
			} else {
				vars.servicios += Number(servicesType.EX) - 3000;
			}
		}

		if (servicesTypeCk.PE) {
			if (isServiceVIP) {
				if (Number(servicesType.PE) > 500) {
					vars.peaje = Number(servicesType.PE) - 500;
				} else {
					vars.peaje = 0;
				}
			} else {
				vars.peaje = Number(servicesType.PE);
			}
		}
		if (servicesTypeCk.MN) vars.servicios += Number(servicesType.MN);

		vars.total =
			vars.subTotal + vars.subTotalLoma + vars.subTotalLlano + vars.sobrePeso + vars.subTotalNoche + vars.subTotalFeriado + vars.arranque; // Lo pusimo' otra ve

		if (data.noche && servicesTypeCk.TG) vars.subTotalNoche = vars.total * (Number(servicesType.TN) / 100);
		if (data.dia === "DF" && servicesTypeCk.TG) vars.subTotalFeriado = vars.total * (Number(values.FF) / 100);

		if (isServiceVIP || Number(data.distancia) <= 50) {
			vars.total = vars.servicios + vars.peaje;
		} else {
			vars.total =
				vars.subTotal +
				vars.subTotalLoma +
				vars.subTotalLlano +
				vars.sobrePeso +
				vars.servicios +
				vars.peaje +
				vars.subTotalNoche +
				vars.subTotalFeriado +
				vars.arranque;
		}
	}

	console.log("Futuro: ", { ...vars, proinsaAmount });
	data.precioCliente = Number(vars.total).toFixed(2);
	return Number(vars.total).toFixed(2);
};

export default summaryCalc;
