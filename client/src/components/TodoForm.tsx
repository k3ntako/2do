import React, { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

export const TodoForm = ({
  createTodo,
}: {
  createTodo: ({
    description,
    dueDate,
  }: {
    description: string;
    dueDate?: string;
  }) => Promise<void>;
}): JSX.Element => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  
  const onSubmit = () => {
    createTodo({ description, dueDate });
  };

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
    <>
      <h2>Create a Todo</h2>
      <Input
        name="description"
        type="text"
        onChange={onDescriptionChange}
        aria-label="Description"
      />
      <Input
        name="dueDate"
        type="date"
        onChange={onDueDateChange}
        data-testid="dueDate"
      />
      <Button colorScheme="blue" onClick={onSubmit}>
        Submit
      </Button>
    </>
  );
};
