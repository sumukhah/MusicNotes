import React from "react";
import "react-datasheet/lib/react-datasheet.css";

import "./App.css";
import TableConfig from "./components/TableConfig";
import { ragas } from "./ragas/exampleRagas.json";
import NotesTable from "./components/NotesTable";

class App extends React.Component {
  state = {
    title: "",
    height: 0,
    width: 0,
    columnStart: 0,
    hieghestColumn: 0,
  };

  handleRagaChange = (e) => {
    const { title, height, width, hieghestColumn, columnStart } = ragas.find(
      (raga) => raga.title === e.target.value
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
    console.log(e);
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleConfigSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    const { height, width, title, columnStart, hieghestColumn } = this.state;

    return (
      <div className="app">
        <TableConfig
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
    );
  }
}

export default App;
