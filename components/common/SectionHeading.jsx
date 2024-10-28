import { cn } from "@/lib/utils";
import ZigZagLine from "./ZigZagLine";
const SectionHeading = ({ title, tagline, className }) => (
  <>
  <div
    className={cn(
      "w-full text-left flex items-center gap-2   py-2 px-3",
      className
    )}
  >
    <h2 className="font-bold uppercase text-2xl text-white ">{title}</h2>
    {tagline && <p className="uppercase text-sm text-white">{tagline}</p>}
  </div>
    <ZigZagLine  color="#FE5F75" width="12%" height={6} strokeWidth={3} zigZagWidth={7} />
    </>

);
export default SectionHeading;
