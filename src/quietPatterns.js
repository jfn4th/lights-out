const patterns = {
    p1: [
        [ true, false, true, false, true ],
        [ true, false, true, false, true ],
        [ false, false, false, false, false ],
        [ true, false, true, false, true ],
        [ true, false, true, false, true ]
    ],
    p2: [
        [ true, true, false, true, true ],
        [ false, false, false, false, false ],
        [ true, true, false, true, true ],
        [ false, false, false, false, false ],
        [ true, true, false, true, true ]
    ],
    p3: [
        [ false, true, true, true, false ],
        [ true, false, true, false, true ],
        [ true, true, false, true, true ],
        [ true, false, true, false, true ],
        [ false, true, true, true, false ]
    ]
};

function solvable(board) {
    for (const p in patterns) {
        let sharedTrues = 0;
        for (let y = 0; y < board.length; y++) {
            for (let x = 0; x < board[y].length; x++) {
                if (board[y][x] === true && patterns[p][y][x] === true) sharedTrues++;
            }
        }
        if (sharedTrues % 2 !== 0) return false;
    }
    return true;
}

export default solvable;
