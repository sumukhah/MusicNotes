import React from "react";
import "react-datasheet/lib/react-datasheet.css";

import "./App.scss";
import TableConfigInput from "./components/TableConfigInput";
import { ragas } from "./ragas/exampleRagas.json";
import NotesTable from "./components/NotesTable";

class App extends React.Component {
  state = {
    title: "",
    height: 0,
    width: 0,
    columnStart: 0,
    hieghestColumn: 16,
    tableCells: [], // format -> [[{key:k, value: val}, {key:k, value:val}], [{key:k, value:val}]]
  };

  handleAddTitle = (row) => {
    const { tableCells, width } = this.state;
    const updatedTableCells = [...tableCells];
    updatedTableCells[row] = [{ key: `${row}0`, value: "", colSpan: width }]; //colSpan === merge multiple Cells
    this.setState({ tableCells: updatedTableCells });
  };

  handleRagaChange = (e) => {
    const { title, height, width, hieghestColumn, columnStart } = ragas.find(
      (raga) => raga.title === e.key
    );
    this.setState({
      title,
      height,
      width,
      columnStart,
      hieghestColumn,
    });
  };

  handleTableChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleConfigSubmit = (e) => {
    e.preventDefault();
    this.createTableCells();
  };

  createTableCells = () => {
    // react-datasheet > to create a blank cell, set value to empty string.
    // for table creation [[{value: '1st row', key: '1st ele'}, ],[{value:'2nd row', key: 'second ele'}]]
    const { height, width, columnStart, hieghestColumn } = this.state;
    let colStart = parseInt(columnStart);
    const grid = [];

    //[[{key:k, value: val}, {key:k, value:val}], [{key:k, value:val}]]
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        const key = `${i}${j}`;
        if (i === 0) {
          //set 1st row element to readonly
          row.push({ key, value: colStart, readOnly: true });
          colStart = colStart >= hieghestColumn ? 1 : parseInt(colStart) + 1;
        } else {
          row.push({ key, value: "" });
        }
      }
      grid.push(row);
    }
    this.setState({ tableCells: grid });
  };

  onCellDataChange = (change) => {
    const { tableCells } = this.state;
    const table = [...tableCells];
    console.log(change);

    // react-datasheet > gives array of changed/input values [[row:x, column:y, value:'z']]
    // take every change & modify the state.tableCells values
    change.map((change) => {
      const { row, col, value } = change;
      table[row].map((cell) => {
        if (cell.key === `${row}${col}`) {
          cell.value = value;
        }
        return cell;
      });
      return change;
    });
    console.log(table);
    this.setState({ tableCells: table });
  };

  render() {
    const {
      height,
      width,
      title,
      columnStart,
      hieghestColumn,
      tableCells,
    } = this.state;
    return (
      <div className="app">
        <div className="table-config">
          <TableConfigInput
            handleTableChange={this.handleTableChange}
            handleConfigSubmit={this.handleConfigSubmit}
            handleRagaChange={this.handleRagaChange}
            height={height}
            width={width}
            title={title}
            columnStart={columnStart}
            hieghestColumn={hieghestColumn}
          />
        </div>
        <div className="notes-table">
          {tableCells.length ? (
            <NotesTable
              title={title}
              width={width}
              tableCells={tableCells}
              onCellDataChange={this.onCellDataChange}
              handleAddTitle={this.handleAddTitle}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
