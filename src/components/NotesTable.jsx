import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./NoteTable.scss";
// import autoTable from "jspdf-autotable";
// import * as jsPDF from "jspdf";
import "../helpers/fontStyles/DejaVuSans-normal.js";
import "../helpers/fontStyles/OldSansBlackUnderline-normal";
import { Button, Typography, Popconfirm, Input, Tooltip } from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";

class NotesTable extends React.Component {
  state = {
    selectedRow: 0,
    showInsertTitleModal: false,
  };

  handleConfirmAddTitle = () => {
    const { selectedRow } = this.state;
    if (selectedRow === 0) {
      return;
    }
    this.props.handleAddTitle(selectedRow);
  };

  handleSelectMultipleCells = (coords) => {
    const { start, end } = coords;
    if (start.i === end.i && end.j - start.j === this.props.width - 1) {
      this.setState({ selectedRow: start.i, showInsertTitleModal: true });
    }
  };

  displayTableCells = (props) => {
    if (String(props.value).includes("__")) {
      const underlinedValue = props.value.replace("__", "");
      return <div className="underline-text-cell">{underlinedValue}</div>;
    }
    return <React.Fragment>{props.value}</React.Fragment>;
  };

  handlePdfPrint = (e) => {
    window.print();

    // const doc = new jsPDF();
    // console.log(this.props.raga);

    // doc.text(20, 10, `${this.props.title || "title:"}`);

    // autoTable(doc, {
    //   html: "table",
    //   theme: "grid",
    //   styles: {
    //     font: "DejaVuSans",
    //   },
    //   bodyStyles: {
    //     overflow: "visible",
    //     halign: "center",
    //     valign: "bottom",
    //     cellPadding: 1,
    //     minCellHeight: 5,
    //   },
    //   didParseCell: function (data) {
    //     const tdElement = data.cell.raw;
    //     if (tdElement.getElementsByTagName("div").length) {
    //       data.cell.styles.font = "OldSansBlackUnderline";
    //     }
    //   },
    //   willDrawCell: function (data) {
    //     if (data.row.index === 0) {
    //       doc.setFillColor(210, 210, 210);
    //     } else if (data.row.raw.length === 1) {
    //       doc.setFillColor(240, 240, 240);
    //     }
    //   },
    // });
    // doc.save(`${this.props.title || "musicNotes"}.pdf`);
    // doc.setFontSize(15);
    // doc.text(120, 10, `${this.props.raga || "title:"}`);
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
      raga,
      handleTableChange,
    } = this.props;
    return (
      <div className="note-table-component">
        <div className="table-title">
          <div className="raaga">
            <label htmlFor="raga">Raaga</label>
            <Input value={raga} id="raga" onChange={handleTableChange} />
          </div>
        </div>
        <Popconfirm
          title={
            this.state.selectedRow === 0
              ? "select a row, then click this button"
              : `insert a title at row ${this.state.selectedRow}`
          }
          placement="bottomLeft"
          onConfirm={this.handleConfirmAddTitle}
        >
          <div className="add-title-button">
            <PlusOutlined />
            <span>insert a title</span>
          </div>
        </Popconfirm>

        <ReactDataSheet
          data={tableCells}
          valueRenderer={this.getValueFromCell}
          dataRenderer={this.getValueFromCell}
          onCellsChanged={onCellDataChange}
          onSelect={this.handleSelectMultipleCells}
          className="spreadsheet"
          valueViewer={this.displayTableCells}
          attributesRenderer={() => (onchange = this.handleCellInput)}
        />
        <div className="spread-sheet-foot-buttons">
          <Button
            onClick={this.handlePdfPrint}
            type="primary"
            icon={<DownloadOutlined />}
          />
          <Tooltip placement="top" title={"Add a new row"}>
            <Button onClick={handleAddNewRow} icon={<PlusOutlined />} />
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default NotesTable;
