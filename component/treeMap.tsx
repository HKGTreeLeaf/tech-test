import { Key } from "react"
import { inputValue } from "../type/index.d"

interface props {
    treeMap: [inputValue[]]
}


const TreeMapComponent = ({ treeMap }: props) => {
    return (<>
        {treeMap.map((row: inputValue[], id: Key | null | undefined) => {
            const rowHeight = 100 / treeMap.length
            return (
                <div data-testid="tree-row" style={{ backgroundColor: 'white', height: `${rowHeight}%`, display: 'flex' }} key={id}>
                    {row[0] !== undefined && row.map((item: inputValue, itemId: Key) => {
                        const weightSum = treeMap[0]?.reduce((sum: number, item: inputValue) => sum + item.weight, 0)
                        const itemWidth = `${(item.weight / weightSum) * 100}%`
                        return (
                            <div
                                data-testid="tree-item"
                                style={{
                                    backgroundColor: item.value > 0 ? 'green' : 'red',
                                    color: 'white',
                                    fontSize: '30px',
                                    margin: '5px',
                                    width: itemWidth,
                                    textAlign: 'center'
                                }} key={itemId}>{item.name}<br />{Math.round((item.value * 100 + Number.EPSILON) * 100) / 100 + '%'}</div>
                        )
                    })}
                </div>
            )
        })}
    </>)
}

export default TreeMapComponent