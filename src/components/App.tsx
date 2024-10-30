import { ReactComponent as TimescaleLogo } from "../assets/logo.svg";
import { ChakraProvider, defaultSystem, Flex } from "@chakra-ui/react";
import EmailManager from "./EmailManager";

const App = () => {
  return (
    <ChakraProvider value={defaultSystem}>
      <Flex align="center" direction="column">
        <Flex pt={6}>
          <TimescaleLogo />
        </Flex>
        <EmailManager />
      </Flex>
    </ChakraProvider>
  )
};

export default App;
