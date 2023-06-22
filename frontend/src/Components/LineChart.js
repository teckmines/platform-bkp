import React, { Component } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";


class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.data) {
            return { data: nextProps.data };
        }
        else return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data }, this.reloadData);            
        }
    }

componentDidMount() {
    var root = am5.Root.new("chartdiv"); 
    var chart = root.container.children.push( 
        am5xy.XYChart.new(root, {
          panY: false,
        //   wheelY: "zoomX",
          layout: root.verticalLayout
        }) 
      );

      console.log(this.state.data)

      // Define data
var data = [{
    date: new Date(2021, 0, 1).getTime(),
    value: 1000,
    openValue: 200
  }, {
    date: new Date(2021, 0, 2).getTime(),
    value: 800,
    openValue: 400
  }, {
    date: new Date(2021, 0, 3).getTime(),
    value: 700,
    openValue: 950
  }, {
    date: new Date(2021, 0, 4).getTime(),
    value: 1200,
    openValue: 700
  }, {
    date: new Date(2021, 0, 5).getTime(),
    value: 740,
    openValue: 720
  }];
  
  // Craete Y-axis
let yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
        maxDeviation: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {})
    })
  );
  
  // Create X-Axis
var xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.1,
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: "x-axis"
    })
  );
//   xAxis.data.setAll(data);
  xAxis.data.setAll(this.state.data);
  
  // Create series
//   function createSeries(name,field,data) {
    var series = chart.series.push( 
        am5xy.LineSeries.new(root, { 
          xAxis: xAxis, 
          yAxis: yAxis, 
          valueYField: "y-axis", 
          categoryXField: "x-axis",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{valueY}"
          })
        //   stacked: true
        }) 
      );
      series.strokes.template.setAll({
        strokeWidth: 2,
        // strokeDasharray: [10,5]
      });
      series.fills.template.setAll({
        fillOpacity: 0.5,
        visible: true
      });
      series.data.setAll(this.state.data);

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis
      }));
      cursor.lineY.set("visible", false);
}

componentWillUnmount() {
    if (this.chart) {
        this.chart.dispose();
    }
}

// reloadData = () => {
//     this.chart.data = this.state.data;
// }

render() {
  return (
    <div id="chartdiv" style={{ width: "100%", height: "400px" }}></div>
  );
}
}

export default LineChart;