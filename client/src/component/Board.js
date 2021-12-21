import React from "react";
import Square from "./Square";

/**
 * 父组件123
 * 当你遇到需要同时获取多个子组件数据，或者两个组件之间需要相互通讯的情况时，需要把子组件的 state 数据提升至其共同的父组件当中保存。
 */
const Board = ({ square, onClick, len }) => {
  //渲染Square方块组件的函数
  const renderSquare = (i, j) => {
    return (
      <Square
        //TODO
        val={square[i][j]}
        click={() => onClick(i, j)}
        row={i}
        col={j}
        key={i * len + j}
      />
    );
  };

  const generateSquare = () => {
    const squareArr = Array(len)
      .fill(0)
      .map((_) => new Array(len).fill(0));
    // console.log(`len: ${len}`);
    //二维数组重复引用问题
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        squareArr[i][j] = i * len + j;
      }
    }
    // console.log(squareArr);
    const colItems = (row) => {
      return squareArr[0].map((item, idx) => renderSquare(row, idx));
    };
    const square = squareArr.map((item, idx) => {
      return (
        <div className="board-row" key={item}>
          {colItems(idx)}
        </div>
      );
    });
    return square;
  };

  //组件内不能声明变量，只能在函数体中声明,命令式编程

  return generateSquare();
};

export default Board;
