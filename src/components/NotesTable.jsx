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
    // doc.setFontSize(15);
    // doc.text(120, 10, `${this.props.raga || "title:"}`);
    // doc.save(`${this.props.title || "musicNotes"}.pdf`);
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
          <Typography.Title level={2} className="print-visible">
            {title}
          </Typography.Title>
          <div className="raaga">
            <Input
              placeholder="raaga"
              value={raga}
              id="raga"
              onChange={handleTableChange}
              className="print-visible raga-input"
            />
          </div>
        </div>
        <Tooltip title="Add title" placement="bottomRight">
          <div className="add-title-button" onClick={this.handleAddTitle}>
            <PlusOutlined />
            <span>insert a title</span>
          </div>
        </Tooltip>

        <ReactDataSheet
          data={tableCells}
          valueRenderer={this.getValueFromCell}
          dataRenderer={this.getValueFromCell}
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
            Save Pdf
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
