import React from "react";
import { ragas } from "../ragas/exampleRagas.json";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./TableConfigInput.scss";

class TableConfig extends React.Component {
  dropDownChangehandler = (e) => {
    this.props.handleRagaChange(e);
  };
  render() {
    const {
      height,
      width,
      title,
      columnStart,
      handleRagaChange,
      handleTableChange,
      handleConfigSubmit,
    } = this.props;

    return (
      <div>
        <form onSubmit={handleConfigSubmit} className="table-config-form">
          <label>
            Raaga:
            <Select
              labelId="raga-select"
              id="select"
              value={title}
              onChange={handleRagaChange}
              className="drop-down-menu"
            >
              {ragas.map((raga) => {
                return (
                  <MenuItem value={raga.title} key={raga.title}>
                    {raga.title}
                  </MenuItem>
                );
              })}
            </Select>
          </label>
          <div className="basic-input">
            <TextField
              id="height"
              type="number"
              label="Row"
              variant="outlined"
              value={height}
              onChange={handleTableChange}
            />
            <TextField
              id="width"
              type="number"
              label="Columns"
              variant="outlined"
              value={width}
              onChange={handleTableChange}
            />
            <TextField
              id="columnStart"
              type="number"
              label="Start from"
              variant="outlined"
              value={columnStart}
              onChange={handleTableChange}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            title="Submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default TableConfig;
