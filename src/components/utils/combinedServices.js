const combinedServices = (data, services) => {
    let count = 0
    for(let service of data){
        const servicesTypeCk = service.tipoServicios.servicesTypeCk
        for(let type in servicesTypeCk){
            if(servicesTypeCk[type]){
                if(services.includes(type)) count++;
            }
        }
    }
    return count;
}

export default combinedServices;