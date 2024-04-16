'use client';
import React, { useState, createContext, useContext, ReactNode } from 'react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
const ConfettiContext = createContext({
  isShowing: false,
  toggle: () => {},
});

export const ConfettiProvider = ({ children }: { children: ReactNode }) => {
  const [isShowing, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };
  const { width, height } = useWindowSize();

  return (
    <ConfettiContext.Provider value={{ isShowing, toggle }}>
      {isShowing && <Confetti width={width} height={height} />}
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => {
  const context = useContext(ConfettiContext);

  if (context === undefined) {
    throw new Error('useOpenClose must be used within an OpenCloseProvider');
  }

  return context;
};
