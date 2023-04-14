import "./index.css";

interface ButtonProps {
  classes?: string;
  icon?: string;
}

export const Button = ({ classes, icon }: ButtonProps) => {
  return (
    <div className={`button-container ${classes}`}>
      <div className="button-unlock" onClick={() => alert("unlock is here")}>
        {icon} Unlock Wallet
      </div>
    </div>
  );
};

export default Button;
