import React from "react";
import Button from "./button";
import "./index.css";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-600">
        Simple React Typescript Tailwind Sample
      </h1>

      <header className="header">
        <Button />
      </header>

      <main className="main">
        <Button />
      </main>
    </>
  );
}

export default App;
