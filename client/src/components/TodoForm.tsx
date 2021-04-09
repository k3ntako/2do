import React, { useState } from "react";
import { Button, Input, Box, Heading, Flex, Spacer } from "@chakra-ui/react";

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
    <Box padding="2em">
      <Heading size="md">Create a Todo</Heading>
      <Flex>
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
          width="250px"
        />
      </Flex>
      <Flex>
        <Spacer />
        <Button colorScheme="blue" onClick={onSubmit} margin="0.5em 0">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};
