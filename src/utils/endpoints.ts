export const ApiEndpoints = {
  get: () => `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/get`,
  update: (todoId: string) =>
    `https://944ba3c5-94c3-4369-a9e6-a509d65912e2.mock.pstmn.io/patch/${todoId}`
}
