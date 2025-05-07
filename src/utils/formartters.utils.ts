import { parseISO, format } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (dateTime: string): string => {
  const dateObject = parseISO(dateTime);
  return format(dateObject, 'MMM dd, yyyy', { locale: es });
}
