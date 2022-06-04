import { fireEvent,render, screen,waitFor } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

const testJson =JSON.stringify([
  { name: 'A', weight: 3, value: -0.02 },
  { name: 'B', weight: 3, value: 0.05 },
  { name: 'C', weight: 6, value: 0.015 },
  { name: 'D', weight: 2, value: -0.01 },
  { name: 'E', weight: 3, value: 0.01 }
  ])

const testJsonWithWeightSmallThanZero = JSON.stringify([
  { name: 'A', weight: -1, value: -0.02 },
])

let failedName = ""
let testJSONWithOverSizeArray = []
for (let step = 0; step < 51; step++) {
  failedName += 'a'
  testJSONWithOverSizeArray.push({ name: 'A', weight: 1, value: -0.02 })
}
testJSONWithOverSizeArray = JSON.stringify(testJSONWithOverSizeArray)

const testJsonWitNameBiggerThen50 = JSON.stringify([
  { name: failedName, weight: 1, value: -0.02 },
])

const testJsonWithInputNameError = JSON.stringify([
  { name: 123, weight: 3, value: -0.02 },
])

describe('Home', () => {
  beforeEach(() => {
    render(<Home />)
  })

  it('renders the page with components', () => {
    expect(screen.getByTestId('json-input-field')).toBeTruthy()
    expect(screen.getByTestId('row-input-field')).toBeTruthy()
  })
  
  it('renders a warning if the JSON is incorrect', async () => {
    await waitFor(() => {
      expect(screen.queryByText("It's not a JSON string")).toBeNull()
    })
    const jsonInputField = screen.getByTestId('json-input-field').querySelector('textarea')
    fireEvent.change(jsonInputField , {target: { value: 'something wrong'}})
    await waitFor(() => {
      expect(screen.getByText("It's not a JSON string")).toBeVisible()
    })
    fireEvent.change(jsonInputField , {target: { value: testJsonWithInputNameError}})
    await waitFor(() => {
      expect(screen.getByText("Input name should be a string")).toBeVisible()
    })
    fireEvent.change(jsonInputField , {target: { value: testJsonWithWeightSmallThanZero}})
    await waitFor(() => {
      expect(screen.getByText("Input weight should be a interger number")).toBeVisible()
    })
    fireEvent.change(jsonInputField , {target: { value: testJsonWitNameBiggerThen50}})
    await waitFor(() => {
      expect(screen.getByText("Input name in less than 50 characters")).toBeVisible()
    })
    fireEvent.change(jsonInputField , {target: { value: testJSONWithOverSizeArray}})
    await waitFor(() => {
      expect(screen.getByText("Input value should have less than or equal to 50 items")).toBeVisible()
    })
  })

  it('renders a warning if the row number is incorrect', async () => {
    const rowInputField = screen.getByTestId('row-input-field').querySelector('input')
    const jsonInputField = screen.getByTestId('json-input-field').querySelector('textarea')
    fireEvent.change(jsonInputField , {target: { value: testJson}})
    fireEvent.change(rowInputField , {target: { value: 6}})
    await waitFor(() => {
      expect(screen.getByText("Row number should be above 0, smaller or equal to array length")).toBeVisible()
    })
  })

  it('renders if the requirement is fulfilled, with 3 rows and 5 items', async () => {
    const rowInputField = screen.getByTestId('row-input-field').querySelector('input')
    const jsonInputField = screen.getByTestId('json-input-field').querySelector('textarea')
    fireEvent.change(jsonInputField , {target: { value: testJson}})
    fireEvent.change(rowInputField , {target: { value: 3}})
    await waitFor(() => {
      expect(screen.getAllByTestId('tree-row').length).toEqual(3)
      expect(screen.getAllByTestId('tree-item').length).toEqual(5)
    })
  })
})