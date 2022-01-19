const combinedServices = (data, services) => {
    let count = 0
    for(let service of data){
        console.log(service);
        const servicesTypeCk = service.tipoServicios.servicesTypeCk
        for(let type in servicesTypeCk){
            console.log(`${type}: ${servicesTypeCk[type]}`);
            if(servicesTypeCk[type]){
                if(services.includes(type)) count++;
            }
        }
    }
    return count;
}

export default combinedServices;