import { format, parseISO } from "date-fns";
export default function Date({ dateString }) {
  console.log("dateString", dateString);
  if (!dateString) return <span>no time </span>;
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL,d,yyyy")}</time>;
}
