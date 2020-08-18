class DataView {
  data = {};
  rowStyle = {
    display: "grid",
    "background-color": "rgba(0, 0, 0, 0.1)",
    "list-style": "none",
    "border-top": "1px solid black",
    "border-bottom": "1px solid black",
    height: "calc(100vh/15)",
    "place-items": "center",
  };
  headColStyle = {
    height: "calc(100vh/15/2)",
    "background-color": "rgba(0, 0, 0, 0.5)",
  };
  constructor(htmlview) {
    this.element = htmlview;
  }
  error(message) {
    console.error("View error: ", message);
  }
  updateData(newData) {
    this.data = newData;
    this.rowStyle["grid-template-columns"] =
      "repeat(" + this.getRowCount() + ", 1fr)";
    this.showData();
  }
  showData() {
    this.element.childNodes.forEach((child) => {
      this.element.removeChild(child);
    });
    let container = document.createElement("ol");
    this.element.appendChild(container);
    this.addColumnName(container);
    this.addRows(container, this.data, this.rowStyle);
  }
  addRows(listelem, values, ...styles) {
    values.forEach((keydRow) => {
      let item = document.createElement("li");
      Object.values(keydRow).forEach((rowData) => {
        item.innerHTML += "<span>" + rowData + "</span>";
      });
      styles.forEach((style) => {
        this.applyStyle(item, style);
      });
      listelem.appendChild(item);
    });
  }
  getRowCount() {
    return this.data.length == 0 ? 1 : Object.values(this.data[0]).length;
  }
  applyStyle(item, style) {
    for (var prop in style) {
      item.style[prop] = style[prop];
    }
  }
  addColumnName(listelem) {
    if (this.data.length == 0) {
      return;
    }
    let rowObj = [{}];
    let keys = Object.keys(this.data[0]);
    keys.forEach((key) => {
      rowObj[0][key] = key;
    });
    this.addRows(listelem, rowObj, this.rowStyle, this.headColStyle);
  }
}
export default { DataView };
