import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./NoteTable.scss";
// import autoTable from "jspdf-autotable";
// import * as jsPDF from "jspdf";
import "../helpers/fontStyles/DejaVuSans-normal.js";
import "../helpers/fontStyles/OldSansBlackUnderline-normal";
import { Button, Typography, Input, Tooltip } from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";

class NotesTable extends React.Component {
  state = {
    allowInsertTitle: false,
    selectedRow: 0,
    showInsertTitleModal: false,
  };

  handleAddTitle = () => {
    this.setState({ allowInsertTitle: true });
  };

  handleSelectMultipleCells = (coords) => {
    if (this.state.allowInsertTitle && coords.start.i !== 0) {
      this.props.handleAddTitle(coords.start.i);
      this.setState({ allowInsertTitle: false });
    }
  };

  displayTableCells = (props) => {
    if (String(props.value).includes("_")) {
      let charList = String(props.value).replace(/__/g, "").split("_");

      if (charList.length > 1) {
        charList = charList.map((char, index) => {
          if (charList[index + 1] === "" || index < charList.length - 1) {
            return char.length > 1 ? (
              <span>
                {char.slice(0, char.length - 1)}
                <u>{char[char.length - 1]}</u>
              </span>
            ) : (
              <u>{char}</u>
            );
          }
          return <span>{char}</span>;
        });
      }

      return String(props.value).includes("__") ? (
        <div className="underline-text-cell">{charList || props.value}</div>
      ) : (
        <div>{charList || props.value}</div>
      );
    }
    return <div>{props.value}</div>;
  };

  handlePdfPrint = (e) => {
    window.print();
  };

  handleLocalSave = (e) => {

  };

  getValueFromCell = (cell) => {
    return cell.value;
  };

  render() {
    const {
      onCellDataChange,
      tableCells,
      title,
      handleAddNewRow,
      handleTableChange,
    } = this.props;
    return (
      <div className="note-table-component">
        <div className="table-title">
          <Typography.Title level={2} className="print-visible">
            {title}
          </Typography.Title>
          <div className="raaga">
            <Input
              placeholder="Raag Yaman"
              id="raga"
              onChange={handleTableChange}
              className="print-visible raga-input"
            />
          </div>
        </div>
        <Tooltip title="Add title" placement="topLeft">
          <div className="add-title-button" onClick={this.handleAddTitle}>
            <PlusOutlined />
            <span>Add a custom row title</span>
          </div>
        </Tooltip>

        <ReactDataSheet
          data={tableCells}
          valueRenderer={this.getValueFromCell}
          dataRenderer={(cell) => cell.value}
          // ^ Don't replace with getValueFromCell ,
          //  It makes multiple select deletion slower, does not rerender.
          onCellsChanged={onCellDataChange}
          onSelect={this.handleSelectMultipleCells}
          className="spreadsheet"
          valueViewer={this.displayTableCells}
        />

        <div className="spread-sheet-foot-buttons">
          <Button
            onClick={this.handlePdfPrint}
            type="primary"
            icon={<DownloadOutlined />}
          >
            Save as PDF
          </Button>
          <Button
            onClick={this.handleLocalSave}
            type="primary"
            icon={<DownloadOutlined />}
          >
            Save locally
          </Button>
          <Button onClick={handleAddNewRow} icon={<PlusOutlined />}>
            Add a row
          </Button>
        </div>
      </div>
    );
  }
}

export default NotesTable;
