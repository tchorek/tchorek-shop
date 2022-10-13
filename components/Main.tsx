import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return (
    <main className="mx-auto flex max-w-screen-xl items-center gap-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
      {children}
    </main>
  );
};
