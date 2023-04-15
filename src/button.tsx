import "./index.css";

interface ButtonProps {
  name: string;
  classes?: string;
  icon?: string;
  onClick?: () => void;
  background?: string;
}

export const Button = ({
  name,
  classes,
  icon,
  onClick,
  background,
}: ButtonProps) => {
  return (
    <div className={`button-container ${classes}`}>
      <div
        className="button-unlock"
        onClick={onClick || (() => {})}
        style={{ backgroundColor: background }}
      >
        {icon} {name}
      </div>
    </div>
  );
};

export default Button;
