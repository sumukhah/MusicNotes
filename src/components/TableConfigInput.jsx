import React from "react";
import { ragas } from "../ragas/exampleRagas.json";
import { Card, Menu, Dropdown, Button } from "antd";
import "./TableConfigInput.scss";

class TableConfig extends React.Component {
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

    const dropDownItems = (
      <Menu>
        {ragas.map((item) => {
          return (
            <Menu.Item onClick={handleRagaChange} key={item.title}>
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <Card className="table-config-input">
        <form onSubmit={handleConfigSubmit} className="table-config-form">
          <div>
            <Dropdown overlay={dropDownItems} placement="bottomCenter">
              <input
                value={title}
                onChange={handleTableChange}
                id="title"
                autoComplete="off"
                required
              />
            </Dropdown>
            <label htmlFor="title">Raaga</label>
          </div>
          <div>
            <input
              min={0}
              id="height"
              type="number"
              value={height}
              onChange={handleTableChange}
              required
              className="number-input"
            />
            <label htmlFor="height">Rows</label>
          </div>
          <div>
            <input
              min={0}
              id="width"
              type="number"
              label="Columns"
              value={width}
              onChange={handleTableChange}
              required
              className="number-input"
            />
            <label htmlFor="width">Columns</label>
          </div>
          <div>
            <input
              min={0}
              id="columnStart"
              type="number"
              value={columnStart}
              onChange={handleTableChange}
              className="number-input"
            />
            <label htmlFor="columnStart">Start</label>
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </form>
      </Card>
    );
  }
}

export default TableConfig;
