
// GameBoard 组件，接收 onSelectSquare 和 turns 作为 props, onSelectSquare 实际上是 handleSelectSquare 
//State Lifting 传递给父组件
export default function GameBoard({ onSelectSquare,board}) {

    // const [gameBoard, setGameBoard] =useState(initialGameBoard);

    // function handleSelectSquare(rowIndex, colIndex) {

    //     setGameBoard((prevGameBoard) => {
    //         const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });

    //     onSelectSquare();
    // }

    // 渲染游戏板的 UI 点击按钮时，调用 onSelectSquare,传递行和列索引给handleSelectSquare
    return (
        <ol id="game-board">
          {board.map((row, rowIndex) => (
            <li key={rowIndex}>
              <ol>
                {row.map((playerSymbol, colIndex) => (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, colIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      );
    }