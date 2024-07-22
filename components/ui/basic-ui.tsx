import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className="max-w-7xl mx-auto px-4">{children}</div>;
};

interface OverTitleProps {
  children: ReactNode;
}

export const OverTitle = ({ children }: OverTitleProps) => {
  return (
    <span className="text-sm font-bold uppercase text-gray-500">
      <span className="inline-block w-2 h-2 bg-primary mr-2 rounded-full" />
      {children}
    </span>
  );
};

interface SectionTitleProps {
  children: ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => {
  return <h2 className="text-3xl font-bold text-center">{children}</h2>;
};

interface ThreeLayersCircleProps {
  baseColor: string;
  secondColor: string;
}

export const ThreeLayersCircle = ({ baseColor, secondColor }: ThreeLayersCircleProps) => {
  return (
    <div className="relative inline-block w-12 h-12 rounded-full opacity-80" style={{ backgroundColor: baseColor }}>
      <div
        className="absolute w-10 h-10 rounded-full"
        style={{
          backgroundColor: secondColor,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className="absolute w-4 h-4 rounded-full"
        style={{
          backgroundColor: baseColor,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
};
