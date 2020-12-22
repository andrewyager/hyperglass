import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Skeleton,
  ModalCloseButton,
} from '@chakra-ui/react';
import { PathButton } from '~/components';
import { useColorValue } from '~/context';
import { useLGState } from '~/hooks';
import { Chart } from './chart';

import type { TPath } from './types';

export const Path = (props: TPath) => {
  const { device } = props;
  const { getResponse } = useLGState();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { displayTarget } = useLGState();
  const response = getResponse(device);
  const output = response?.output as TStructuredResponse;
  const bg = useColorValue('white', 'blackFaded.800');
  return (
    <>
      <PathButton onOpen={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size="full" isCentered>
        <ModalOverlay />
        <ModalContent bg={bg} maxW="80%" maxH="60%">
          <ModalHeader>{`Path to ${displayTarget.value}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {response !== null ? <Chart data={output} /> : <Skeleton w="500px" h="300px" />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
