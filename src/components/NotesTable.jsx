import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./NoteTable.scss";
import autoTable from "jspdf-autotable";
import JsPDF from "jspdf";
import { Button, Typography, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";

class NotesTable extends React.Component {
  state = {
    selectedRow: 0,
    showInsertTitleModal: false,
  };

  handleConfirmAddTitle = () => {
    const { selectedRow } = this.state;
    this.props.handleAddTitle(selectedRow);
  };

  handleSelectMultipleCells = (coords) => {
    const { start, end } = coords;
    if (start.i === end.i && end.j - start.j === this.props.width - 1) {
      this.setState({ selectedRow: start.i, showInsertTitleModal: true });
    }
  };

  handlePdfPrint = (e) => {
    const doc = new JsPDF();
    doc.text(`${this.props.title || "title:"}`, 14, 10);
    autoTable(doc, {
      html: "table",
      body: [
        [
          {
            content: "Text",
            colSpan: 2,
            rowSpan: 2,
            styles: { halign: "center" },
          },
        ],
      ],
      styles: { cellWidth: "wrap" },
      theme: "grid",
      alternateRowStyles: {
        0: {
          fillColor: [46, 128, 186],
        },
      },
      willDrawCell: function (data) {
        if (data.row.index === 0) {
          doc.setFillColor(224, 224, 224);
        }
      },
    });
    // const finalY = doc.previousAutoTable.finalY;
    doc.save(`${this.props.title || "raag"}.pdf`);
    // document.print()
    // console.log(element);
    // doc.fromHTML(element, 15, 15, {}, () => {
    //   const pdf = doc.output("datauristring");
    //   this.doc = doc;
    // });
    // this.doc.save(`${this.props.title}.pdf`);
  };

  render() {
    const { onCellDataChange, tableCells, title } = this.props;
    return (
      <div className="note-table-component">
        {tableCells.length ? (
          <Typography.Title level={2}>{title}</Typography.Title>
        ) : (
          ""
        )}
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
          onContextMenu={(e, cell, i, j) =>
            cell.readOnly ? e.preventDefault() : null
          }
          valueRenderer={(cell) => cell.value}
          dataRenderer={(cell) => cell.value}
          className="spreadsheet"
          onCellsChanged={onCellDataChange}
          ref={this.documentRef}
          id="spread-sheet"
          onSelect={this.handleSelectMultipleCells}
        />

        <Button onClick={this.handlePdfPrint} type="primary">
          Save Pdf
        </Button>
      </div>
    );
  }
}

export default NotesTable;
