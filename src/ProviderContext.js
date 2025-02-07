// ProviderContext.js
import { createContext, useContext } from 'react';

export const ProviderContext = createContext();

export const useProvider = () => useContext(ProviderContext);