import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-20 border-t-[1.5px] border-hairline ${className}`}
    >
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div
          className={`flex flex-col gap-6 ${
            action ? "md:flex-row md:items-end md:justify-between" : ""
          }`}
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </p>
            <h2
              id={`${id}-title`}
              className="mt-3 text-balance text-2xl text-primary sm:text-[2rem] sm:leading-[1.15]"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-4 text-pretty text-[15px] leading-[1.6] text-muted">
                {description}
              </p>
            ) : null}
          </div>
          {action ? (
            <div className="w-full md:w-auto md:shrink-0">{action}</div>
          ) : null}
        </div>
        <div className="mt-10 sm:mt-12">{children}</div>
      </div>
    </section>
  );
}
