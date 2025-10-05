export function formatStringPrice(price: string): number {
    const cleanString = price.replace(/,/g, '');
    return parseFloat(cleanString);
}

export function formatColombianMoney(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function percentageValue(amount: number, percentage: number){
    let decimalPercentage = percentage / 100;
    let result = amount * decimalPercentage;
    return amount - result

}