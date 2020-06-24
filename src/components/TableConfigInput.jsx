import React from "react";
import { thala } from "../helpers/exampleThalas.json";
import { Card, Menu, Dropdown, Button, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";

import "./TableConfigInput.scss";

class TableConfig extends React.Component {
  state = {
    showModal: false,
  };
  handleShowModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  handleModalSubmit = (e) => {
    this.props.handleConfigSubmit(e);
    this.handleShowModal();
  };

  render() {
    const {
      height,
      width,
      title,
      columnStart,
      handleThalaChange,
      handleTableChange,
      handleConfigSubmit,
    } = this.props;

    const dropDownItems = (
      <Menu>
        {thala.map((item) => {
          return (
            <Menu.Item onClick={handleThalaChange} key={item.title}>
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    );

    return (
      <Card className="table-config-input">
        <form onSubmit={handleConfigSubmit} className="table-config-form">
          <button onClick={this.handleShowModal} type="button">
            <SettingFilled />
          </button>
          <div>
            <Dropdown overlay={dropDownItems} placement="bottomCenter">
              <input
                value={title}
                onChange={handleTableChange}
                id="title"
                autoComplete="off"
                placeholder="select a thala"
                required
              />
            </Dropdown>
            <label htmlFor="title">Thaala</label>
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          <Modal
            title="Basic Modal"
            visible={this.state.showModal}
            onOk={this.handleModalSubmit}
            onCancel={this.handleShowModal}
          >
            <Dropdown overlay={dropDownItems} placement="bottomCenter">
              <input
                value={title}
                onChange={handleTableChange}
                id="title"
                autoComplete="off"
                placeholder="select a thala"
                required
              />
            </Dropdown>
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
          </Modal>
        </form>
      </Card>
    );
  }
}

export default TableConfig;
