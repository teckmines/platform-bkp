import React, { Component } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";


class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            // newdata: this.props.other[0],
        }
        console.log(this.state.data)
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
    let chart = root.container.children.push( 
        am5xy.XYChart.new(root, {
          panY: false,
          layout: root.verticalLayout
        }) 
    );

      console.log(this.state.data)

      // Define data
      let data = [{
        category: "Research",
        value1: 1000,
      }, {
        category: "Marketing",
        value1: 1200,
      }, {
        category: "Sales",
        value1: 850,
      }];
  
    // Create Y-axis
    let yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
        })
    );
  
  // Create X-Axis
  let xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: "date"
    })
  );
  xAxis.data.setAll(this.state.data);
  
  // Create series
  let series1 = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Series",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      categoryXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}",
        openValueXField: "0"
      })
    })
  );
  series1.data.setAll(this.state.data);
  series1.columns.template.setAll({
    width: am5.percent(10)
  });

  // Create axis ranges
  function createRange(value, endValue, color) {
    var rangeDataItem = yAxis.makeDataItem({
      value: value,
      endValue: endValue
    });
    
    var range = yAxis.createAxisRange(rangeDataItem);
    
    if (endValue) {
      range.get("axisFill").setAll({
        fill: color,
        fillOpacity: 0.2,
        visible: true
      });
      
      range.get("label").setAll({
        fill: am5.color(0xffffff),
        text: value,
        location: 1,
        background: am5.RoundedRectangle.new(root, {
          fill: color
        })
      });
    }
    else {
      range.get("label").setAll({
        fill: am5.color(0xffffff),
        text: value,
        background: am5.RoundedRectangle.new(root, {
          fill: color
        })
      });
    }
  
    range.get("grid").setAll({
      stroke: color,
      strokeOpacity: 1,
      location: 1
    });
    
  }
  
  // createRange(this.state.newdata.avg_volume, this.state.newdata.avg_volume, am5.color(0xff621f));
  // createRange(this.state.newdata.total_volume, this.state.newdata.total_volume, am5.color(0x297373));
  
  // Add cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {
    behavior: "zoomX",
    xAxis: xAxis
  }));
  
  xAxis.set("tooltip", am5.Tooltip.new(root, {
    themeTags: ["axis"]
  }));
  
  yAxis.set("tooltip", am5.Tooltip.new(root, {
    themeTags: ["axis"]
  }));

  // Add cursor
  chart.set("cursor", am5xy.XYCursor.new(root, {}));
}

componentWillUnmount() {
    if (this.chart) {
        this.chart.dispose();
    }
}

reloadData = () => {
    this.state.data = this.props.data;
}

render() {
  return (
    <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
  );
}
}

export default BarChart;