import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { Todo } from "../data";

const dateRegex = /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/;

export const EditToDoModal = ({
  todo,
  onClose,
  onSubmit,
}: {
  todo: Todo | null;
  onClose: () => void;
  onSubmit: ({
    todo,
    updateParams,
  }: {
    todo: Todo;
    updateParams: {
      description: string;
      dueDate: string;
    };
  }) => Promise<void>;
}) => {
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);

  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
      setDueDate(todo.dueDate || "");
      setIsComplete(todo.isComplete);
    }
  }, [todo]);

  const onDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setDescription(e.currentTarget.value);
  };

  const onDueDateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setDueDate(e.currentTarget.value);
  };

  const onIsCompleteChange: React.ChangeEventHandler<HTMLSelectElement> = (
    e: React.FormEvent<HTMLSelectElement>
  ) => {
    setIsComplete(e.currentTarget.value === "true" ? true : false);
  };

  const descriptionInvalid = !description?.trim();
  const dateInvalid = !dateRegex.test(dueDate);

  return (
    <Modal isOpen={!!todo} onClose={onClose} id="edit-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit To-do</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="edit-todo-modal-body">
            <FormControl isInvalid={descriptionInvalid}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                placeholder="To-do"
                type="text"
                value={description}
                onChange={onDescriptionChange}
                aria-label="Description"
              />
              <FormErrorMessage>Description cannot be blank</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={dateInvalid}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="date"
                value={dueDate}
                onChange={onDueDateChange}
                placeholder="MM-DD-YYYY"
                data-testid="dueDate"
                width="250px"
                marginLeft="12px"
              />
              <FormErrorMessage>Invalid date</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={dateInvalid}>
              <FormLabel>Completed</FormLabel>
              <Select
                name="isComplete"
                placeholder="Select option"
                value={isComplete ? "true" : "false"}
                onChange={onIsCompleteChange}
              >
                <option value={"true"}>Yes</option>
                <option value={"false"}>No</option>
              </Select>
            </FormControl>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={descriptionInvalid || dateInvalid}
            onClick={() =>
              onSubmit({
                todo: todo as Todo,
                updateParams: { description, dueDate },
              })
            }
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
