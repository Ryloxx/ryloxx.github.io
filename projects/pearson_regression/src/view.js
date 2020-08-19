import ChartModule from "./Chart.js";
class View {
  constructor(
    coorListSelector,
    resultDisplaySelector,
    chartCanvasSelector,
    dataLabelSelectorX,
    dataLabelSelectorY
  ) {
    this.coorListElem = document.querySelector(coorListSelector);
    this.resultDisplayEleme = document.querySelector(resultDisplaySelector);
    this.coorChartData = this.getDefaultChartConfig();
    this.dataLabelElemsX = document.querySelectorAll(dataLabelSelectorX);
    this.dataLabelElemsY = document.querySelectorAll(dataLabelSelectorY);
    this.chart = new ChartModule.Chart(
      document.querySelector(chartCanvasSelector).getContext("2d"),
      this.coorChartData
    );
  }

  reset() {
    while (this.coorListElem.firstChild) {
      this.coorListElem.removeChild(this.coorListElem.firstChild);
    }
    this.resultDisplayEleme.textContent = "";
    let defaultChart = this.getDefaultChartConfig();
    for (let key in defaultChart) {
      this.coorChartData[key] = defaultChart[key];
    }
    this.setYLabel();
    this.setXLabel();
  }

  addCoor(coor) {
    let coorDisplayElem = document.createElement("li");
    this.coorListElem.appendChild(coorDisplayElem);
    coorDisplayElem.textContent = `(${coor.x}, ${coor.y})`;
    this.coorChartData.data.datasets[0].data.push(coor);
    this.chart.update();
  }
  displayResult(pearsonCoef) {
    if (Number.isNaN(pearsonCoef)) {
      this.resultDisplayEleme.textContent =
        "Not enough points to calculate the coefficient.";
    } else {
      this.resultDisplayEleme.innerHTML = `Pearson Coefficient(r) = <span style='color :red;'>${pearsonCoef}</span>`;
    }
  }
  setDataLabel(newLabel) {
    this.coorChartData.data.datasets[0].label = newLabel;
  }
  getDefaultChartConfig() {
    return {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Data Points",
            pointBackgroundColor: "black",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "X",
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Y",
              },
            },
          ],
        },
      },
    };
  }
  setXLabel(newlabel = "X") {
    this.coorChartData.options.scales.xAxes[0].scaleLabel.labelString = String(
      newlabel
    );

    this.dataLabelElemsX.forEach((labelX) => {
      labelX.textContent = this.coorChartData.options.scales.xAxes[0].scaleLabel.labelString;
    });

    this.chart.update();
  }
  setYLabel(newlable = "Y") {
    this.coorChartData.options.scales.yAxes[0].scaleLabel.labelString = String(
      newlable
    );

    this.dataLabelElemsY.forEach((labelY) => {
      labelY.textContent = this.coorChartData.options.scales.yAxes[0].scaleLabel.labelString;
    });
    this.chart.update();
  }
}
export default { View };
