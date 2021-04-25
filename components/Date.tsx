import { format, parseISO } from "date-fns";
import deLocale from "date-fns/locale/zh-CN";
export default function Date({ dateString }: { dateString: string }) {
  if (!dateString) return <span> time is not found </span>;
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "LLLL dd", { locale: deLocale })}
    </time>
  );
}
