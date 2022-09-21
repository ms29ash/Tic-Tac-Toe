import React, { useReducer, useEffect } from 'react'
import Square from './Square'
import produce from "immer"
import { findWinner } from './winner';


const initialState = {
    board: Array(9).fill(null),
    index: 0,
    player: true,
    winner: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'click':

            if (state.index % 2 === 0) {
                return produce(state, draft => {
                    draft.board[action.index] = 'O'
                    draft.index++
                    draft.player = false
                })
            } else {
                return produce(state, draft => {
                    draft.board[action.index] = 'X'
                    draft.index++
                    draft.player = true
                })
            }
        case 'win':
            return produce(state, draft => {
                draft.winner = true
            })
        case 'reset': return initialState

        default: return state
    }

}



function Game() {
    const [values, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const win = findWinner(values.board);
        if (win === true) {

            dispatch({ type: 'win' })
        }

        return () => {

        }
    }, [values.board])


    const clickChange = (index) => {
        dispatch({ index: index, type: 'click' })



    }
    return (
        <div className="container">
            <h1>{values.winner === true && `${values.player === true ? 'B' : 'A'} Won`}</h1>

            <div className="game" >
                {
                    values.board?.map((value, index) =>

                        <Square key={index} value={value} winner={values.winner} onClick={() => { clickChange(index); }} />

                    )
                }

            </div>
            <button className="btn" onClick={() => dispatch({ type: 'reset' })} >
                Restart
            </button>
        </div>
    )
}

export default Game