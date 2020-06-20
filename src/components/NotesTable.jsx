import React from "react";
import ReactDataSheet from "react-datasheet";
import "react-datasheet/lib/react-datasheet.css";
import "./NoteTable.scss";
import autoTable from "jspdf-autotable";
import JsPDF from "jspdf";
import { Button, Typography } from "antd";

class NotesTable extends React.Component {
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
      <div>
        {tableCells.length ? (
          <Typography.Title level={2}>{title}</Typography.Title>
        ) : (
          ""
        )}
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
        />
        {tableCells.length ? (
          <Button onClick={this.handlePdfPrint} type="primary">
            Save Pdf
          </Button>
        ) : null}
      </div>
    );
  }
}

export default NotesTable;
