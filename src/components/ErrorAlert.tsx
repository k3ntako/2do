import React from 'react'
import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

export const ErrorAlert = ({ error }: { error: string }): JSX.Element => {
  return (
    <div className="error">
      <Alert status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Something went wrong!</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    </div>
  )
}
