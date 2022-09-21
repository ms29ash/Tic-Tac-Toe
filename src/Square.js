import React from 'react'


function Square({ value, onClick, winner }) {
    return (
        <button disabled={value !== null || winner === true} className="button" onClick={onClick} >{value}</button>
    )
}

export default Square