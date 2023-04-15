import { useState } from "react";
import { Route, BrowserRouter, Routes, Navigate, Link } from "react-router-dom";
import "./index.css";
import Button from "./button";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [errorMessage, setErrormessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const accountChanged = (accountName: any) => {
    setDefaultAccount(accountName);
  };

  const connectWallet = () => {
    if ((window as any).ethereum) {
      (window as any).ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any) => {
          accountChanged(result[0]);
          setIsAuthenticated(true);
        });
    } else {
      setShowMessage(true);
      setErrormessage("Install metamask!");
    }
  };

  return (
    <>
      <header className="header absolute w-[100vw]">
        <Button
          classes="justify-end"
          name={!isAuthenticated ? "Unlock button" : "Sign out"}
          onClick={isAuthenticated ? handleLogout : connectWallet}
        />
      </header>

      <main className="main h-screen">
        <>
          <div className="flex flex-col justify-center">
            {!isAuthenticated && (
              <Button
                name="Unlock button"
                classes="justify-center"
                icon="🔒"
                onClick={isAuthenticated ? handleLogout : connectWallet}
                background={"#bff3d"}
              />
            )}
            {errorMessage}
            {!isAuthenticated && showMessage && (
              <p className="mt-6 text-2xl font-semibold dark:text-white">
                Non-Ethereum browser detected. You should consider trying{" "}
                <a
                  className="underline hover:underline-offset-2"
                  href="https://metamask.io/"
                >
                  Metamask
                </a>
                .
              </p>
            )}
          </div>
          {isAuthenticated && (
            <div>
              <h1 className="text-2xl font-semibold dark:text-white ">
                Dashboard
              </h1>
              <p className="text-2xl font-semibold dark:text-white">
                You are authenticated!
              </p>
            </div>
          )}
        </>
      </main>
    </>
  );
};

export default App;
