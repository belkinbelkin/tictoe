import React from 'react'
import CellValueEnum from './CellValueEnum'
import './CellValue.css'

const CellValue = ({value}) => 
    {
        switch (value) {
            case CellValueEnum.ONE: {
                return <div className='cell-value-box'>X</div>
            }
            case CellValueEnum.TWO: {
                return <div className='cell-value-box'>O</div>
            }
            default: return <div className='cell-value-box'></div>
        }
    }

export default CellValue