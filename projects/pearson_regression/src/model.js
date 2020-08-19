class Model {
  coorList = [];
  addCoor(coor) {
    this.coorList.push({ x: Number(coor.x), y: Number(coor.y) });
  }
  getCoors() {
    return Object.assign([], this.coorList);
  }
  getPearsonCoef() {
    return this.coorList.length <= 0
      ? NaN
      : this.getCovariance() /
          (this.getStandardDeviationX() * this.getStandardDeviationY());
  }
  isEmpty() {
    return this.coorList.length <= 0;
  }
  getX() {
    return this.coorList.map((elem) => {
      return elem.x;
    });
  }
  getY() {
    return this.coorList.map((elem) => {
      return elem.y;
    });
  }
  getAverageX() {
    return this.getAverage(this.getX());
  }
  getAverageY() {
    return this.getAverage(this.getY());
  }
  getVarianceX() {
    return this.getVariance(this.getX());
  }
  getVarianceY() {
    return this.getVariance(this.getY());
  }
  getStandardDeviationX() {
    return this.getStandardDeviation(this.getX());
  }
  getStandardDeviationY() {
    return this.getStandardDeviation(this.getY());
  }
  getCovariance() {
    let xavg = this.getAverageX();
    let yavg = this.getAverageY();
    return this.coorList.length <= 0
      ? NaN
      : this.coorList.reduce((a, b) => {
          return a + (b.x - xavg) * (b.y - yavg);
        }, 0);
  }
  7;
  getStandardDeviation(points) {
    return points.length <= 0 ? NaN : Math.sqrt(this.getVariance(points));
  }
  getVariance(points) {
    let avg = this.getAverage(points);
    return points.length <= 0
      ? NaN
      : points.reduce((a, b) => {
          return a + (b - avg) * (b - avg);
        }, 0);
  }
  getAverage(points) {
    return points.length <= 0
      ? NaN
      : points.reduce((a, b) => {
          return a + b;
        }, 0) / this.coorList.length;
  }
  reset() {
    this.coorList = [];
  }
}
export default { Model };
