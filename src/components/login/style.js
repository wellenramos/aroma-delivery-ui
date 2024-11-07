import {styled} from "@mui/system";
import {Box, Button, Container} from "@mui/material";

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f7f6;
`;

export const LogoBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

export const Entrar = styled(Button)`
  background-color: #cfcfcf;
  color: white;
  font-weight: bold;
  height: 45px; 
  margin-top: 20px;

  &:hover {
    background-color: #a8a8a8;
  }
`;