export function obtenerDivisores(numero) {
    let Divisor_Array = [];
    for (let i = 1; i <= numero; i++) {
        if (numero % i === 0) {
            Divisor_Array.push(i);
        }
        return Divisor_Array;
    }
}