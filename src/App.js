import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { ChakraProvider, Center, VStack } from "@chakra-ui/react";
import * as React from "react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <VStack>
          <Navbar />
          <Center>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Center>
        </VStack>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
