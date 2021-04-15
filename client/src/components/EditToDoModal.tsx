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
} from "@chakra-ui/react";
import { Todo } from "../data";

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

  useEffect(() => {
    if (todo) {
      setDescription(todo.description);
      setDueDate(todo.dueDate || "");
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

  return (
    <Modal isOpen={!!todo} onClose={onClose} id="edit-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit To-do</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="edit-todo-modal-body">
            <Input
              name="description"
              placeholder="To-do"
              type="text"
              value={description}
              onChange={onDescriptionChange}
              aria-label="Description"
            />
            <Input
              className="asd"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={onDueDateChange}
              data-testid="dueDate"
              width="250px"
              marginLeft="12px"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
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
