const dfsHorizon = (squares, i, j, chess) => {
  let count = 0;
  let idx = j;
  while (i >= 0 && i < 15 && j - 1 >= 0 && squares[i][j - 1] === chess) {
    count++;
    j--;
  }
  while (i >= 0 && i < 15 && j + 1 < 15 && squares[i][idx + 1] === chess) {
    count++;
    idx++;
  }
  return count;
};

const dfsVertical = (squares, i, j, chess) => {
  let count = 0;
  let idx = i;
  while (j >= 0 && j < 15 && i - 1 >= 0 && squares[i - 1][j] === chess) {
    count++;
    i--;
  }
  while (j >= 0 && j < 15 && idx + 1 < 15 && squares[idx + 1][j] === chess) {
    count++;
    idx++;
  }
  return count;
};
//TODO 不加越界条件会跑出去
const dfsLeftTop = (squares, i, j, chess) => {
  let count = 0;
  // console.log(`dfsLeftTop i: ${i}`);
  // console.log(`dfsLeftTop j: ${j}`);
  let row = i;
  let col = j;
  while (row + 1 < 15 && col + 1 < 15 && squares[row + 1][col + 1] === chess) {
    row++;
    col++;
    count++;
  }
  while (i - 1 >= 0 && j - 1 >= 0 && squares[i - 1][j - 1] === chess) {
    i--;
    j--;
    count++;
  }
  // console.log(`count:${count}`);
  return count;
};

const dfsLeftBottom = (squares, i, j, chess) => {
  let count = 0;
  // console.log(`dfsLeftBottom i: ${i}`);
  // console.log(`dfsLeftBottom j: ${j}`);
  let row = i;
  let col = j;
  while (row - 1 >= 0 && col + 1 < 15 && squares[row - 1][col + 1] === chess) {
    row--;
    col++;
    count++;
  }
  while (i + 1 < 15 && j - 1 >= 0 && squares[i + 1][j - 1] === chess) {
    i++;
    j--;
    count++;
  }
  return count;
};

const JudgeWinner = (squares, i, j, chess) => {
  return (
    dfsVertical(squares, i, j, chess) + 1 >= 5 ||
    dfsHorizon(squares, i, j, chess) + 1 >= 5 ||
    dfsLeftTop(squares, i, j, chess) + 1 >= 5 ||
    dfsLeftBottom(squares, i, j, chess) + 1 >= 5
  );
};

export default JudgeWinner;
