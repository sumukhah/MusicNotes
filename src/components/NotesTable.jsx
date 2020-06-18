import React from "react";
import ReactDataSheet from "react-datasheet";

class NotesTable extends React.Component {
  state = {};
  render() {
    return <div></div>;
  }
}

// class NotesTable extends React.Component {
//   state = {};
//   render() {
//     const { height, width, columnStart, hieghestColumn } = this.props.config;
//     const tableHead = () => {
//       const th = [];
//       let colStart = columnStart;
//       for (let i = 1; i <= width; i++) {
//         th.push(colStart);
//         colStart = colStart >= hieghestColumn ? 1 : colStart + 1;
//       }
//       return th;
//     };
//     const constructCells = () => {
//       const cells = [];

//       return cells;
//     };

//     return (
//       <div>
//         <table>
//           {tableHead().map((heading) => {
//             return <td>{heading}</td>;
//           })}
//           {constructCells()}
//         </table>
//       </div>
//     );
//   }
// }

export default NotesTable;
