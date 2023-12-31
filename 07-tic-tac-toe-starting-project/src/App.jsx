// 引入 React 的 useState 钩子
import { useState } from "react";

// 引入子组件：Player, GameBoard, Log
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

// 初始的游戏板状态，3x3 矩阵，所有值均为 null
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
        // 创建一个游戏板的本地副本
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
      // 遍历每个回合，根据回合记录更新游戏板
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

// 定义 App 函数组件
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  // 使用 useState 创建并管理 gameTurns 状态，初始为空数组
  // gameTurns 用于存储游戏的每一步 更新当前玩家 以及 选择的方格
  //gameTurns 的值是 useState 提供的初始值，setGameTurns 是用于更新 gameTurns 的函数
  const [gameTurns, setGameTurns] = useState([]);

  // 使用 useState 创建并管理 activePlayer 状态，初始为 'X'
  // activePlayer 代表当前轮到的玩家
  // const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  // 定义处理选中方格的函数
  function handleSelectSquare(rowIndex, colIndex) {
    // 切换活动玩家：如果当前是 'X'，则切换到 'O'，反之亦然
    // setActivePlayer((curActivePlayer) => (curActivePlayer === 'X' ? 'O' : 'X'));
    // 更新游戏回合记录
    setGameTurns((prevTurns) => {
      // 确定当前玩家
      // let currentPlayer = 'X';
      // if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
      //   currentPlayer = 'O';
      // }

      const currentPlayer = deriveActivePlayer(prevTurns);

      // 创建新的回合记录并添加到游戏回合记录的开头
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  // JSX 结构，渲染应用的 UI
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* 渲染两个 Player 组件，表示两位玩家 */}
          {/* 这样的修改确保了代码的一致性和灵活性，
          因为玩家名称现在是从一个集中的位置（PLAYERS 对象）获取的，
          这使得未来的更改更加方便。 */}
          <Player 
            initialName={PLAYERS.X}
            symbol="X" 
            isActive={activePlayer === 'X'} 
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {/* 显示获胜者 */}
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        {/* 渲染 GameBoard 组件，传递 onSelectSquare 和 turns 作为 props */}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      {/* 渲染 Log 组件，显示游戏的历史记录 */}
      <Log turns={gameTurns} />
    </main>
  );
}

// 导出 App 组件
export default App;
