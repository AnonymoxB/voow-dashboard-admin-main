export function truncateText(text:string,slice:number) {
  const str = text;
  const truncatedStr = str.slice(0, slice) + "...";
  return truncatedStr;
}

export function formatCurrencyToIDR(number:number) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  });
  return formatter.format(number);
}

