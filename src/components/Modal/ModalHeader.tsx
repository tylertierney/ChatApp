import { Flex, Heading, Icon } from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

const ModalHeader: React.FC = () => {
  return (
    <Flex w="100%" align="center" p="0.4rem 1rem 0 1rem">
      <Flex align="center" opacity="0.8">
        <Heading mr="10px">Customize</Heading>
        <Icon as={BsGearFill} fontSize="1.8rem" />
      </Flex>
    </Flex>
  );
};

export default ModalHeader;
