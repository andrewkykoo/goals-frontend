import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";

import { useGoalsContext } from "../hooks/useGoalsContext";

const GoalFormModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dispatch } = useGoalsContext();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const goal = { subject, description, deadline };

    const response = await fetch(
      "https://goals-api-seuh.onrender.com/api/goals",
      {
        method: "POST",
        body: JSON.stringify(goal),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setSubject("");
      setDescription("");
      setDeadline("");
      setError(null);
      dispatch({ type: "CREATE_GOAL", payload: json });
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Add New</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create a goal</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Deadline</FormLabel>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              {error && <Text as="mark">{error}</Text>}
              <Button colorScheme="teal" mr={3} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GoalFormModal;
