export const getRoleName = (n) => {
    switch(n){
        case 1: return "Администратор";
        case 2: return "Менеджер";
        case 3: return "Клиент";
        default: return "";
    }
}