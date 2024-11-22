import { cn } from "@/lib/utils";
const SectionHeading = ({ title, tagline, className }) => (
  <>
  <div
    className={cn(
      "w-full text-left flex justify-center items-center gap-2  mt-6 mb-4 py-2 px-3 border-t border-gray-700 ",
      className
    )}
  >
    <h2 className="font-bold uppercase text-2xl text-white text-center -mt-6  px-4 bg-theme ">{title}</h2>
    {tagline && <p className="uppercase text-sm text-white">{tagline}</p>}
  </div>
    </>

);
export default SectionHeading;
