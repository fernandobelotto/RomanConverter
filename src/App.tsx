import {
  Box, Center,
  Heading,
  Input,
  Text, VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function App() {
  const [romanValue, setRomanValue] = useState<string>("");
  const [decimal, setDecimal] = useState<number | null>();

  const storageKey = "text";

  useEffect(() => {
    if (romanValue) {
      localStorage.setItem(storageKey, romanValue);
    }
  }, [romanValue]);

  useEffect(() => {
    console.log("localStorage.getItem(", localStorage.getItem(storageKey));
    if (localStorage.getItem(storageKey)) {
      setRomanValue(localStorage.getItem(storageKey) || "");
    }
  }, []);

  useEffect(() => {
    romanToDecimal();
  }, [romanValue]);

  // TODO: check invalid roman number such as XIIIIIIIIIIIIIIIIIIIII
  let romanToDecimal = () => {
    let newDecimal = 0;
    const romanToNumber: { [key: string]: number } = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };
    for (let value of romanValue) {
      newDecimal += romanToNumber[value];
    }
    setDecimal(newDecimal);
  };

  return (
    <>
      <Center h="100vh">
        <Box>
          <VStack spacing={3} p={5} borderRadius={10}>
            <Heading>Roman to Decimal</Heading>
            <Input
              value={romanValue ?? ""}
              onChange={(e: any) => setRomanValue(e.target.value)}
              placeholder="Enter a roman value"
            />

            {decimal ? (
              <Box m={4} p={4} bg="gray.100" borderRadius="md" w="100%">
                <Text w="300px">{decimal}</Text>
              </Box>
            ) : null}
          </VStack>
        </Box>
      </Center>
    </>
  );
}
