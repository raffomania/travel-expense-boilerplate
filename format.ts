export function formatCurrency(val: number) {
    return Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "eur",
    }).format(val);
}

export function formatDate(date: Date) {
    return date.toLocaleDateString("de-DE", {
        month: "2-digit",
        year: "numeric",
        day: "2-digit",
    });
}
