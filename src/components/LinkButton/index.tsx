import { FC } from "react";
import "./style.scss";

const LinkButton: FC<{ href: string; text: string }> = ({ href, text }) => {
  return (
    <a href={href} className="link-button">
      {text}
    </a>
  );
};

export default LinkButton;
