const menu = [null, null];

export default function getActiveMenu(user) {
    switch (user) {
        case 'RAQUEL ROSARIO':
            menu[0] = 'service';
            menu[1] = 'create'
            break;
        case 'JAVIER FERNÁNDEZ':
            menu[0] = 'service';
            menu[1] = 'create'
            break;
        case 'CÉSAR ORTIZ':
            menu[0] = 'service';
            menu[1] = 'create'
            break;
        case 'YENIFER BÁEZ':
            menu[0] = 'service';
            menu[1] = 'create'
            break;
        default:
            menu[0] = 'main';
            menu[1] = ''
            break;
    }
    return menu;
}