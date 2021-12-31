// import "../App.css";
import React, { useState, useContext, useEffect, forwardRef } from "react";
import Board from "./Board";
import { UserContext } from "../util/UserContect";
import JudgeWinner from "../util/JudgeWinner";

/**
 * 爷爷组件
 */
const Game = forwardRef(({ socket, username, room, full }, ref) => {
  const [isLogin, setIsLogin] = useContext(UserContext);
  const [stage, setStage] = useState({
    stepNum: 0,
    xIsNext: true,
    history: [
      {
        username: null,
        square: Array(15)
          .fill(null)
          .map((_) => new Array(15).fill(null)),
      },
    ],
    curX: 0,
    curY: 0,
    isWin: false,
    winner: null,
    room: room,
  });
  // const userList = useRef([]);

  useEffect(() => {
    socket.on("receive_chess", (data) => {
      console.log(data);
      setStage((s) => ({
        ...s,
        ...data,
      }));
    });
  }, [socket]);

  /**
   * 点击跳转到第idx步
   * @param {*} idx 要跳转到的步数
   */
  const jumpTo = async (idx) => {
    if (full) {
      return;
    }
    // console.log(`idx:${idx}`);
    const message = {
      ...stage,
      stepNum: idx,
      xIsNext: idx % 2 === 0,
      isWin: false,
      winner: null,
    };
    console.log(message);
    await socket.emit("retrieve_chess", message);

    setStage({
      ...stage,
      ...message,
    });
  };

  /**
   * 下子后执行的函数
   *
   * @param {*} i 下子的位置
   * @returns     更新state中的stepNum, xIsNext, history
   */
  //TODO i,j
  const handleClick = async (i, j) => {
    if (full) {
      return;
    }
    //获取当前状态square数组的copy（避免直接操作this.state）
    let history = stage.history.slice(0, stage.stepNum + 1);
    let current = history[history.length - 1];
    console.log(stage.history);
    if (current.username === username) {
      return;
    }
    const newSquare = JSON.parse(JSON.stringify(current.square));
    if (calculateWinner(newSquare, i, j) === true || newSquare[i][j]) {
      return;
    }

    newSquare[i][j] = stage.xIsNext ? "X" : "O";

    const message = {
      ...stage,
      //这里是history.length是更新渲染前的长度，所以不用  history.length - 1
      stepNum: history.length,
      xIsNext: !stage.xIsNext,
      //history是放着历次square对象的数组，当点击jumpTo后，会删除之前直到这一步的history，这里不能写this.state.history
      history: history.concat([
        {
          square: newSquare,
          username: username,
        },
      ]),
      curX: i,
      curY: j,
      room: room,
    };
    await socket.emit("set_chess", message);

    setStage({
      ...stage,
      ...message,
    });
  };

  /**
   * 判断在i， j坐标下棋后，是否会有胜利者
   * 是基于某一方在当前位置下能否胜利，如果X胜利了，O可能还会继续判断能否胜利
   * @param {*} squares  当前棋盘数组
   * @returns
   */
  //TODO
  const calculateWinner = (squares, i, j) => {
    if (stage.isWin === true) {
      return true;
    }

    // 不能用squares[i][j]判断当前的棋子，这是还是null
    let chess = stage.xIsNext ? "X" : "O";

    //判断胜利之后还要把棋子加上!!!!
    if (JudgeWinner(squares, i, j, chess)) {
      let history = stage.history.slice(0, stage.stepNum + 1);
      squares[i][j] = chess;
      const message = {
        ...stage,
        isWin: true,
        winner: chess,
        stepNum: history.length,
        xIsNext: !stage.xIsNext,
        history: history.concat([
          {
            square: squares,
          },
        ]),
        curX: i,
        curY: j,
      };
      socket.emit("win_chess", message);

      setStage({
        ...stage,
        ...message,
      });
      return true;
    }
    return false;
  };

  /**
   * 判断当前下子的是谁
   * @param {*} current history中当前的对象
   * @returns
   */
  //TODO
  const getStatus = (current) => {
    // console.log(current.square);
    // console.log(`current history = ${current.square}`);
    //TODO
    const winner = stage.winner;
    let status;
    if (winner) {
      status = `Winner is ${winner}`;
    } else {
      status = `Next player: ${stage.xIsNext ? "X" : "O"}`;
    }
    return status;
  };

  let history = stage.history;
  //current是当前棋盘对象 = {square: [, , , , , ,"X", , ,]}
  let current = history[stage.stepNum];
  // console.log(history.length);

  //history是放着历次square对象的数组
  let moves = history.map((step, idx) => {
    // console.log("move button");
    const dest = idx ? `Go to move #${idx}` : "Go to game start";
    return (
      <li key={idx}>
        <button
          onClick={() => {
            jumpTo(idx);
          }}
        >
          {dest}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          square={current.square}
          onClick={(i, j) => handleClick(i, j)}
          len={15}
        />
      </div>
      <div className="game-info">
        <div>Username:{username}</div>
        <div>ChessRoom:{room}</div>
        <div>{getStatus(current)}</div>
        <div>{`---Location: \n row:${stage.curX} \n col:${stage.curY}----`}</div>
        <button
          onClick={() => {
            setIsLogin(() => false);
            const meg = {
              username: username,
              room: room,
            };
            socket.emit("leave", meg);
          }}
        >
          Log out
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
});

export default Game;
