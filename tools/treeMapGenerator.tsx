import { inputValue } from "../type/index.d";

const treeMapGenerator = (inputArray: inputValue[], row: number) => {
    let treeMap: any = []
    const weightSum = inputArray.reduce((sum, item) => sum + item.weight, 0)
    let sortedArray = inputArray.sort((a, b) => b.weight - a.weight)
    const RowWeight = Math.ceil(weightSum / row)
    for (let rowCount = 0; rowCount < row; rowCount++) {
        let rowArray = [sortedArray[0]]
        sortedArray.splice(0, 1)
        for (let j = 0; j < sortedArray.length; j++) {
            const currentRowSum = rowArray.reduce((sum: number, item) => sum + item.weight, 0)
            if (sortedArray[j].weight <= RowWeight - currentRowSum && RowWeight - currentRowSum > 0) {
                rowArray.push(sortedArray[j])
            }
        }
        sortedArray = sortedArray.filter(item => !rowArray.includes(item))

        treeMap.push(rowArray)
    }
    return treeMap
}

export default treeMapGenerator