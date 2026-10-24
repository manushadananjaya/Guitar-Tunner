import { PrintButton } from "@/components/Printables/PrintButton";

/** A sheet as a sheet of paper on screen, and the only thing on the page
 *  when printed: everything else carries print:hidden, and @page sets the
 *  orientation. Paper size is left to the printer, so A4 and Letter both
 *  work — the sheets scale with the page width. */
export function SheetFrame({
  orientation,
  children,
}: {
  orientation: "portrait" | "landscape";
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
      <style>{`@page { size: ${orientation}; margin: 10mm; }`}</style>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 print:hidden">
        <PrintButton />
        <p className="text-xs text-ink-subtle max-w-md">
          Fits A4 and US Letter. Choose {orientation} if your printer asks, and &ldquo;fit to page&rdquo; or 100% scale.
        </p>
      </div>
      <div className="overflow-x-auto print:overflow-visible">
        <div
          className={`print-sheet mx-auto bg-white p-[8mm] shadow-2xl ring-1 ring-black/10 print:p-0 print:shadow-none print:ring-0 ${
            orientation === "landscape" ? "min-w-[640px] max-w-[297mm]" : "min-w-[520px] max-w-[210mm]"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
