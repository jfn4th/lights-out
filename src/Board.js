import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';
import solvable from './quietPatterns';

class Board extends Component {
    static defaultProps = {
        ncols: 5,
        nrows: 5,
        chanceLightStartsOn: 0.4
    };

    constructor(props) {
        super(props);
        this.state = {
            hasWon: false,
            board: this.createBoard()
        };
        this.fillTable = this.fillTable.bind(this);
        this.flipCellsAround = this.flipCellsAround.bind(this);
    }

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

    createBoard() {
        let board;
        do {
            board = Array.from({ length: this.props.nrows }, () =>
                Array.from({ length: this.props.ncols }, () => Math.random() < this.props.chanceLightStartsOn)
            );
        } while (!this.checkSolvable(board));
        return board;
    }

    //  check board is solvable against quiet patterns
    checkSolvable(board) {
        return solvable(board) ? true : false;
    }

    /** handle changing a cell: update board & determine if winner */

    flipCellsAround(y, x) {
        let { ncols, nrows } = this.props;
        let board = this.state.board;
        let coords = [ [ y, x ], [ y + 1, x ], [ y - 1, x ], [ y, x + 1 ], [ y, x - 1 ] ];

        function flipCell(y, x) {
            // if this coord is actually on board, flip it
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                board[y][x] = !board[y][x];
            }
        }

        // flip this cell and the cells around it
        coords.forEach((coord) => {
            flipCell(...coord);
        });

        //  determine is the game has been won
        const hasWon = board.every((row) => row.every((cell) => !cell));
        this.setState({ board, hasWon });
    }

    fillTable() {
        return (
            <table className='Board'>
                <tbody>
                    {this.state.board.map((row, i1) => (
                        <tr key={i1}>
                            {row.map((val, i2) => (
                                <Cell key={`${i1}-${i2}`} y={i1} x={i2} isLit={val} flipCellsAroundMe={this.flipCellsAround} />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
    /** Render game board or winning message. */

    render() {
        return (
            <div>
                {this.state.hasWon ? (
                    <div className='winner'>
                        <span className='neon-orange'>YOU</span>
                        <span className='neon-blue'>WIN!</span>
                    </div>
                ) : (
                    <div>
                        <div className='Board-title'>
                            <div className='neon-orange'>Lights</div>
                            <div className='neon-blue'>Out</div>
                        </div>
                        {this.fillTable()}
                    </div>
                )}
            </div>
        );
    }
}

export default Board;
