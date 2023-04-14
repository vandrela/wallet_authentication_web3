import Button from "./button";
import "./index.css";

const App = () => {
  return (
    <>
      <header className="header absolute w-[100vw]">
        <Button classes="justify-end" />
      </header>

      <main className="main h-screen">
        <Button classes="justify-center" icon="🔒" />
      </main>
    </>
  );
};

export default App;
