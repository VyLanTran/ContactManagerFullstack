import React, { createContext, useContext } from 'react';

const baseurl = "http://localhost:3001";
// const baseurl = "https://netspire-api.vercel.app";

const BaseUrlContext = createContext();

export const BaseUrlProvider = ({ children }) => {
    return (
        <BaseUrlContext.Provider value={baseurl}>
            {children}
        </BaseUrlContext.Provider>
    );
};

export const useBaseUrl = () => {
    const baseurl = useContext(BaseUrlContext);
    return baseurl;
};
