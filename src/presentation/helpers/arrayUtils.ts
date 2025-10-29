import { Cashier } from "@/domain/types/CashierType";
import { ChartData } from "@/types";

export function transformShiftData(shifts: Cashier[]): ChartData[] {
  const groupedByDate = shifts.reduce((acc, shift) => {
    const date = new Date(shift.createdAt);
    const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", 
                        "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const formattedDate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
    if (!acc[formattedDate]) {
      acc[formattedDate] = {};
    }

    if (!acc[formattedDate][shift.userId]) {
      acc[formattedDate][shift.userId] = 0;
    }
    acc[formattedDate][shift.userId] += shift.totalAmount;
    return acc;
  }, {} as Record<string, Record<string, number>>);
  
  const result: ChartData[] = Object.entries(groupedByDate).map(([date, users]) => {
    const entry: ChartData = { date };
    Object.entries(users).forEach(([user, total]) => {
      entry[user] = total;
    });
    return entry;
  });
  
  return result;
}