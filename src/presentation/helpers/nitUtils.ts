export function calcularDV_NIT(nit: string | number): number {
    const COEFICIENTES = [
        3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71
    ];

    const nitLimpioReverso = String(nit)
        .replace(/\D/g, '')
        .split('')
        .reverse();

    let sumatoria = 0;

    for (let i = 0; i < nitLimpioReverso.length; i++) {
        const digito = parseInt(nitLimpioReverso[i], 10);
        if (COEFICIENTES[i] === undefined) {
            break;
        }
        sumatoria += digito * COEFICIENTES[i];
    }
    const residuo = sumatoria % 11;
    let dv: number;
    if (residuo === 0 || residuo === 1) {
        dv = residuo;
    } else {
        dv = 11 - residuo;
    }

    return dv;
}