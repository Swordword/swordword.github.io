import { format, parseISO } from "date-fns";
import deLocale from "date-fns/locale/zh-CN";
export default function Date({ dateString }: { dateString: string }) {
  console.log("dateString", dateString);
  if (!dateString) return <span>no time </span>;
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>
      {format(date, "LLLL dd,yyyy", { locale: deLocale })}
    </time>
  );
}
