import type { ReactNode } from 'react';

const TILE_COUNT = 1000;

const tileClass =
  'transition-colors duration-[1.5s] hover:duration-[0s] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-brand-100 hover:bg-brand-300';

interface AuthLayoutProps {
  title: string;
  children: ReactNode;
}

export function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 flex flex-wrap content-start gap-0.5">
        {Array.from({ length: TILE_COUNT }, (_, i) => (
          <div key={i} className={tileClass} />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-3 sm:px-5 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md rounded-lg border border-brand-300 bg-white/90 px-6 py-4 text-gray-800 shadow-lg">
          <div className="w-full flex justify-center text-brand-700 font-semibold text-xl mb-2 md:mb-5">
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
