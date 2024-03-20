// Create a file named `PasswordRecoveryContext.js`
import { createContext, useContext, useState } from 'react';

const PasswordRecoveryContext = createContext();

export function usePasswordRecovery() {
    return useContext(PasswordRecoveryContext);
}

export function PasswordRecoveryProvider({ children }) {
    const [hasInitiatedRecovery, setHasInitiatedRecovery] = useState(false);

    return (
        <PasswordRecoveryContext.Provider value={{ hasInitiatedRecovery, setHasInitiatedRecovery }}>
            {children}
        </PasswordRecoveryContext.Provider>
    );
}
