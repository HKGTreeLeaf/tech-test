import { Box, FormControl, Grid, TextField } from '@mui/material'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import isValidInput from '../tools/inputValidator'
import isJsonString from '../tools/jsonValidator'
import treeMapGenerator from '../tools/treeMapGenerator'
import TreeMapComponent from '../component/treeMap'
import { inputValue } from '../type/index.d'

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState<string>("")
  const [inputRow, setInputRow] = useState<number>(0)
  const [errorJSONMessage, setJSONErrorMessage] = useState<string>("")
  const [errorRowMessage, setRowErrorMessage] = useState<string>("")
  const [treeMap, setTreeMap] = useState<[inputValue[]] | null>(null)

  const handleInputJSON = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const handleInputRow = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputRow(parseInt(event.target.value))
  }

  useEffect(() => {
    if (inputValue != "") {
      if (!isJsonString(inputValue)) {
        setJSONErrorMessage("It's not a JSON string")
      } else {
        const validatorResult = isValidInput(inputValue)
        if (validatorResult.length > 0) {
          setJSONErrorMessage(validatorResult.join('\r\n'))
        } else {
          setJSONErrorMessage("")
          if (inputRow <= eval(inputValue).length && inputRow > 0) {
            setRowErrorMessage("")
            setTreeMap(treeMapGenerator(eval(inputValue), inputRow))
          } else {
            setRowErrorMessage("Row number should be above 0, smaller or equal to array length")
          }
        }
      }
    }

  }, [inputValue, inputRow])

  return (
    <Grid container direction='row' spacing={2} sx={{ padding: 8 }}>
      <Grid item xs={12} sm={4}>
        <Box
        >
          <FormControl fullWidth >
            <TextField
              data-testid="json-input-field"
              id="filled-multiline-flexible"
              label="Plase input your JSON here"
              multiline
              rows={8}
              value={inputValue}
              onChange={(event) => handleInputJSON(event)}
              variant="filled"
              error={errorJSONMessage != ""}
              helperText={errorJSONMessage}
              sx={{ paddingBottom: '10px', whiteSpace: 'pre' }}
            />
            <TextField
              data-testid="row-input-field"
              id="filled-multiline-flexible"
              label="Plase input your row number here"
              value={inputRow}
              onChange={(event) => handleInputRow(event)}
              variant="filled"
              type="number"
              error={errorRowMessage != ""}
              helperText={errorRowMessage}
              sx={{ paddingBottom: '10px' }}
            />
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8}>
        <div>
          Result:
        </div>
        <div style={{ display: 'contents' }}>
          {treeMap && (
            <TreeMapComponent treeMap={treeMap} />
          )}
        </div>
      </Grid>
    </Grid >
  )
}

export default Home
