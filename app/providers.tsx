// import { ThemeProvider } from "next-themes";
import React from "react";
import { PetsProvider } from "./context/pets/PetsContext";
import { ServicesProvider } from "./context/services/ServicesContext";
import { GlobalProvider } from "./context/GlobalContext";
import { AdoptionsProvider } from "./context/adoptions/AdoptionsContext";
import { TransactionsProvider } from "./context/transactions/TransactionsContext";
import { UsersProvider } from "./context/users/UsersContext";
import { ForumsProvider } from "./context/forums/ForumsContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <GlobalProvider>
      <UsersProvider>
        <PetsProvider>
          <AdoptionsProvider>
            <ServicesProvider>
              <TransactionsProvider>
                <ForumsProvider>{children}</ForumsProvider>
              </TransactionsProvider>
            </ServicesProvider>
          </AdoptionsProvider>
        </PetsProvider>
      </UsersProvider>
    </GlobalProvider>
  );
};

export default Providers;
