import { formatDate } from '../../utils'

describe('formatDate', () => {
  it('formats ISO string to month/day/year format', () => {
    const isoString = '2021-03-21T13:30:00.000Z'
    expect(formatDate(isoString)).toEqual('03/21/2021')
  })
})
