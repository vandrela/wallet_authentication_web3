import { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes, Navigate, Link } from "react-router-dom";
import "./index.css";
import Button from "./button";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [, setDefaultAccount] = useState(null);
  const [errorMessage, setErrormessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const [NFTs, setNFTs] = useState<any[]>([]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const accountChanged = (accountName: any) => {
    setDefaultAccount(accountName);
  };

  const fetchNFT = async () => {
    const response = await fetch(
      "https://api.rarible.org/v0.1/items/byCollection?collection=ETHEREUM:0x4EA67AeBb61f7Ff6E15E237C8b79D29C41F750fd"
    );

    const data = await response.json();
    setNFTs(data?.items);
  };

  useEffect(() => {
    fetchNFT();
  }, []);

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
      <header
        className={`header ${
          !isAuthenticated ? "absolute" : "static"
        } w-[100vw]`}
      >
        <Button
          classes="justify-end"
          name={!isAuthenticated ? "Unlock button" : "Sign out"}
          onClick={isAuthenticated ? handleLogout : connectWallet}
        />
      </header>

      <main className="main min-h-screen">
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
            <div className="w-full flex flex-wrap gap-[25px] mt-[25px]">
              {NFTs?.length > 0 &&
                NFTs?.map((nft) => (
                  <div
                    key={nft.id}
                    className="w-[282px] h-[400px] p-8 rounded"
                    style={{ backgroundColor: "#141925" }}
                  >
                    <img
                      className="h-[50%] object-cover m-auto mb-3"
                      src={nft?.meta?.content?.[0]?.url}
                      alt={nft?.meta?.name}
                    />
                    <div className="text-white font-bold">
                      <span className="text-gray-400 font-medium">
                        Bid count:{" "}
                      </span>{" "}
                      1
                    </div>
                    <div className="text-white font-bold">
                      <span className="text-gray-400 font-medium">
                        Winning bid:
                      </span>{" "}
                      32 SHB
                    </div>
                    <div className="text-white font-bold">
                      <span className="text-gray-400 font-medium">
                        End block:{" "}
                      </span>
                      {nft?.contract.slice(9, 14)}...$
                      {nft?.contract.slice(-5)}
                    </div>
                    <div className="text-white font-bold">
                      <span className="text-gray-400 font-medium">Winner:</span>{" "}
                      {nft?.meta?.description}
                    </div>
                    <div className="text-green-500 font-bold">
                      <span className="text-gray-400 font-medium">
                        Time Left:
                      </span>{" "}
                      Finished
                    </div>
                  </div>
                ))}
            </div>
          )}
        </>
      </main>
    </>
  );
};

export default App;
