// Convierte una fecha a la cadena "YYYY-MM-DDTHH:mm" en hora LOCAL que espera
// <input type="datetime-local">. Usar toISOString().slice(0, 16) da la hora en
// UTC, que no coincide con lo que el usuario ve/eligió en su zona horaria.
export function toDatetimeLocalValue(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
