export function Obtener_multiplos(num. limite = 50) {
    let Multiplos_Array = [];
    for (let i = 1; i <= limite; i++) {
        if (i % num === 0) {
            Multiplos_Array.push(i);
        }
    }
    return Multiplos_Array;

}