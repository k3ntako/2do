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
      <Heading size="md" textAlign="center" marginBottom="16px">
        Create a To-do
      </Heading>
      <Flex>
        <Input
          name="description"
          placeholder="To-do"
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
          marginLeft="12px"
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
