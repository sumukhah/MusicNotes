import React from "react";
import "react-datasheet/lib/react-datasheet.css";

import { specialChars } from "./helpers/specialCharectors.json";
import "./App.scss";
import TableConfigInput from "./components/TableConfigInput";
import { ragas } from "./helpers/exampleRagas.json";
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

  //-----------------------------------------------TO-DO---------------------------------------------------
  // if nextState is dependent on previous state use setState((previousState) => {key: prevousState.value})
  // This has not implemented in the Current app
  // setState is an asynchronous function
  // This does not create a big issue though..But it is not a good practise in react
  // ------------------------------------------------------------------------------------------------------

  handleAddNewRow = () => {
    const { width, height, tableCells } = this.state;
    const row = [];
    for (let i = 0; i < width; i++) {
      row.push({ key: `${height}${i}`, value: "" });
    }
    const updatedTableCells = [...tableCells];
    updatedTableCells.push(row);
    this.setState({ height: height + 1, tableCells: updatedTableCells });
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
          row.push({
            key,
            value: colStart,
            readOnly: true,
          });
          colStart = colStart >= hieghestColumn ? 1 : parseInt(colStart) + 1;
        } else {
          row.push({
            key,
            value: "",
          });
        }
      }
      grid.push(row);
    }
    this.setState({ tableCells: grid });
  };

  onCellDataChange = (change) => {
    const { tableCells } = this.state;
    const table = [...tableCells];

    // react-datasheet > gives array of changed/input values [[row:x, column:y, value:'z']]
    // take every change & modify the state.tableCells values
    change.map((change) => {
      const { row, col, value } = change;
      table[row].map((cell) => {
        if (cell.key === `${row}${col}`) {
          let updatedVal = value;
          Object.keys(specialChars).forEach((key) => {
            if (updatedVal.toLowerCase().includes(key)) {
              updatedVal = updatedVal.replace(
                new RegExp(key, "g"),
                specialChars[key]
              );
              if (updatedVal.includes(key.toUpperCase())) {
                updatedVal = updatedVal.replace(
                  new RegExp(key.toUpperCase(), "g"),
                  specialChars[key].toUpperCase()
                );
              }
            }
          });
          cell.value = updatedVal;
        }
        return cell;
      });
      return change;
    });
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
              handleAddNewRow={this.handleAddNewRow}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
