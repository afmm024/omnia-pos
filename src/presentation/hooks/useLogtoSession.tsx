'use client';
import { LogtoContext } from '@logto/next';
import { createContext, useContext, ReactNode } from 'react';

export const LogtoSessionContext = createContext<LogtoContext | null>(null);

export const useLogtoSession = () => {
  const context = useContext(LogtoSessionContext);
  if (context === null) {
    throw new Error('useLogtoSession debe usarse dentro de LogtoSessionProvider');
  }
  return context;
};

export const LogtoSessionProvider: React.FC<{ 
  children: ReactNode; 
  context: LogtoContext; 
}> = ({ children, context }) => {
  return (
    <LogtoSessionContext.Provider value={context}>
      {children}
    </LogtoSessionContext.Provider> 
  );
};
