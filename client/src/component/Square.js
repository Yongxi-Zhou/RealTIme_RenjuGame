import React from "react";

/**
 * Board的子组件，每个square组件代表一个方块
 */
export default function Square({ click, val, row, col }) {
  //this.state 应该被视为一个组件的私有属性
  //每次使用 setCount 时，都会重新执行 Component 的render函数, 重新渲染 Square 组件，所以绝对不能在 Component 函数中同步调用 setCount，这样会导致无限重绘，页面假死。
  return (
    <button className="square" onClick={click}>
      {val}
    </button>
  );
}
