const setServiceName = (service) => {
    switch (service) {
        case "TG":
            return "Transporte de Grúa";
        case "EX":
            return "Extracción";
        case "CR":
            return "Cerragería";
        case "CG":
            return "Cambio de Gomas";
        case "CE":
            return "Corriente y Encendido";
        case "PE":
            return "Peaje";
        case "SG":
            return "Suministros y Gasolina";
        default:
            break;
    }
}

export default function getServiceType(serviceType) {
    const services = [];
    const object = serviceType["servicesTypeCk"]
    for (const key in object) {
        if (object[key]){
            services.push(setServiceName(key));
        }
    }
    return services.join(", ");
}
