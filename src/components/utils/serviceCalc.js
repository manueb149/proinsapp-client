export const summaryCalc = (
	data,
	values,
	servicesType,
	servicesTypeCk,
	detailSinister,
	detailSinisterCk,
	dataTrucks,
	splitFare = false,
	proinsaPrice = true
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
		peajeCliente: 0,
		extraccionCliente: 0,
		maniobraCliente: 0,
		subTotalNoche: 0,
		subTotalFeriado: 0,
	};
	const truckRadio = (dataTrucks && dataTrucks[0] && Number(dataTrucks[0]?.radio)) || 15;

	if (Number(data.distancia) <= truckRadio && !splitFare) {
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

		if (servicesTypeCk.EX) vars.servicios += Number(servicesType.EX);
		if (servicesTypeCk.MN) vars.servicios += Number(servicesType.MN);
		if (servicesTypeCk.CR) vars.servicios += Number(servicesType.CR);
		if (servicesTypeCk.CG) vars.servicios += Number(servicesType.CG);
		if (servicesTypeCk.CE) vars.servicios += Number(servicesType.CE);
		if (servicesTypeCk.SG) vars.servicios += Number(servicesType.SG);

		if (detailSinisterCk.VO) vars.servicios += Number(detailSinister.VO);
		if (detailSinisterCk.IN) vars.servicios += Number(detailSinister.IN);
		if (detailSinisterCk.CO) vars.servicios += Number(detailSinister.CO);
		if (detailSinisterCk.DM) vars.servicios += Number(detailSinister.DM);

		if (servicesTypeCk.PE && Number(servicesType.PE) > 0 && !splitFare) vars.peaje = Number(servicesType.PE);
		else {
			vars.peajeCliente = Number(servicesType.PE);
		}

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
		vars.distancia = splitFare
			? Number(data.distancia) - 100 // Para calcular el excedente de 100km
			: proinsaPrice && Number(data.distancia) >= 100
			? 100 - truckRadio
			: Number(data.distancia) - truckRadio;
		if (servicesTypeCk.TG) vars.arranque = splitFare ? 0 : 1200; // Para calcular el excedente de 100km
		if (servicesTypeCk.SP && Number(servicesType.SP) > 0) vars.kmSobrepeso = Number(servicesType.SP);
		if (servicesTypeCk.TG && servicesTypeCk.LM) {
			if (!splitFare) {
				if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLoma = Number(servicesType.LM);
				if (servicesTypeCk.LM && Number(servicesType.LM) <= vars.distancia) vars.kmLlano = vars.distancia - vars.kmLoma;
				if (servicesTypeCk.LM && vars.kmLoma > 0 && Number(servicesType.LM) > 0)
					vars.subTotalLoma = vars.kmLoma * (Number(servicesType.SL) + Number(servicesType.TG));
				if (servicesTypeCk.LM && vars.kmLlano > 0) vars.subTotalLlano = vars.kmLlano * Number(servicesType.TG);
			} else {
				vars.subTotal = Number(vars.distancia) * Number(servicesType.TG);
				if (servicesTypeCk.LM && Number(servicesType.LM) > 0) {
					vars.subTotalLoma = Number(servicesType.LM) * Number(servicesType.SL);
					console.log(Number(servicesType.LM), Number(servicesType.SL));
				}
			}
			if (servicesTypeCk.SP && Number(servicesType.SP) > 0)
				vars.sobrePeso = Number(servicesType.SP) * Number(servicesType.TG) * (Number(servicesType.SP0) / 100);
		} else {
			if (servicesTypeCk.TG && Number(servicesType.TG) > 0) vars.subTotal = vars.distancia * Number(servicesType.TG);
			if (servicesTypeCk.SP && Number(servicesType.SP) > 0)
				vars.sobrePeso = Number(servicesType.SP) * Number(servicesType.TG) * (Number(servicesType.SP0) / 100);
		}

		if (servicesTypeCk.EX) {
			console.log({ splitFare, proinsaPrice });
			if (splitFare === false && proinsaPrice === false) {
				vars.servicios += Number(servicesType.EX);
			} else if (splitFare === false && proinsaPrice === true && Number(servicesType.EX) <= 3000) {
				vars.servicios += Number(servicesType.EX);
			} else if (splitFare === true && proinsaPrice === false && Number(servicesType.EX) > 3000) {
				vars.extraccionCliente += Number(servicesType.EX);
			} else {
			}
		}
		if (servicesTypeCk.MN) {
			if (splitFare === false && proinsaPrice === false) {
				vars.servicios += Number(servicesType.MN);
			} else if (splitFare === true && proinsaPrice === false) {
				vars.maniobraCliente += Number(servicesType.MN);
			} else {
			}
		}
		if (servicesTypeCk.CR) vars.servicios += Number(servicesType.CR);
		if (servicesTypeCk.CG) vars.servicios += Number(servicesType.CG);
		if (servicesTypeCk.CE) vars.servicios += Number(servicesType.CE);
		if (servicesTypeCk.SG) vars.servicios += Number(servicesType.SG);

		if (detailSinisterCk.VO) vars.servicios += Number(detailSinister.VO);
		if (detailSinisterCk.IN) vars.servicios += Number(detailSinister.IN);
		if (detailSinisterCk.CO) vars.servicios += Number(detailSinister.CO);
		if (detailSinisterCk.DM) vars.servicios += Number(detailSinister.DM);

		if (servicesTypeCk.PE && Number(servicesType.PE) > 0 && !proinsaPrice) vars.peaje = Number(servicesType.PE);

		vars.total =
			vars.subTotal + vars.subTotalLoma + vars.subTotalLlano + vars.sobrePeso + vars.subTotalNoche + vars.subTotalFeriado + vars.arranque; // Lo pusimo' otra ve

		if (data.noche && servicesTypeCk.TG) vars.subTotalNoche = vars.total * (Number(servicesType.TN) / 100);
		if (data.dia === "DF" && servicesTypeCk.TG) vars.subTotalFeriado = vars.total * (Number(values.FF) / 100);

		vars.total =
			vars.subTotal +
			vars.subTotalLoma +
			vars.subTotalLlano +
			vars.sobrePeso +
			vars.servicios +
			vars.peaje +
			vars.peajeCliente +
			vars.extraccionCliente +
			vars.maniobraCliente +
			vars.subTotalNoche +
			vars.subTotalFeriado +
			vars.arranque;
	}

	if (splitFare) {
		data.precioCliente = Number(data.distancia) <= 100 ? 0 : Number(vars.total).toFixed(2);
	} else {
		data.precio = Number(vars.total).toFixed(2);
	}

	return Number(vars.total).toFixed(2);
};

export default summaryCalc;
