import { format, parseISO } from "date-fns";
import deLocale from "date-fns/locale/zh-CN";
export default function LocalDate({ dateString, option }: { dateString: string, option?: string }) {
  if (!dateString) return <span> time is not found </span>;
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, option ? option : date.getFullYear() < new Date().getFullYear() ? "yy-LL-dd" : "LL-dd", { locale: deLocale })}
    </time>
  );
}
