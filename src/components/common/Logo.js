import styled from "styled-components";
import { Link } from "react-router-dom";
import LogoSVG from "../../assets/images/aa_logo.svg";
import SymbolSVG from "../../assets/images/aa_symbol.svg";

const StyledImage = styled.img`
  width: ${(props) => props.size || "8rem"};
`;

const Logo = ({ size }) => {
  return (
    <Link to="/">
      <StyledImage src={LogoSVG} alt="logo" size={size} />
    </Link>
  );
};

const Symbol = ({ size }) => {
  return (
    <Link to="/">
      <StyledImage src={SymbolSVG} alt="logo" size={size} />
    </Link>
  );
};

export { Logo, Symbol };
