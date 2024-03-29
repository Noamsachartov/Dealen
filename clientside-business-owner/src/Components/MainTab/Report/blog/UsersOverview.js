import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import RangeDatePicker from "../common/RangeDatePicker";
import Chart from "../../../../utils/chart";

class UsersOverview extends React.Component {

  state = {chartData: {
    labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: "חודש נוכחי",
        fill: "start",
        id_list: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    /*    data:
        [
        30,
          12,
          5,
          18,
          24,
          20,
          30,
          50,
          10,
          3,
          15,
          18,
          7,
          30,
          15,
          9,
          20,
          50,
          50,
          70,
          35,
          20,
          30,
          30,
          45,
          10,
          30,
          9,
          7,
          11
        ],*/
        backgroundColor: "rgba(0,123,255,0.1)",
        borderColor: "rgba(0,123,255,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgb(0,123,255)",
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      },
      {
        label: "חודש קודם",
        fill: "start",
        id_list:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    /*    data: [
          38,
          30,
          12,
          23,
          4,
          7,
          42,
          19,
          31,
          22,
          40,
          23,
          31,
          38,
          29,
          20,
          7,
          10,
          15,
          18,
          32,
          20,
          29,
          17,
          12,
          30,
          50,
          72,
          10,
          12
        ],*/
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
      }
    ]
  }
}

  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.BlogUsersOverview = null;
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 7 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false,
          callbacks: {
            label: function (tooltipItems, data) {
                var i = tooltipItems.index;
                // console.info(data);
                // console.info(tooltipItems);
                // ToDo: add new line
                return (data.datasets[tooltipItems.datasetIndex].label + ": " + tooltipItems.yLabel + " | מספר מבצע: " + data.datasets[tooltipItems.datasetIndex].id_list[i])
            }
        } 
        }
      },
      ...this.props.chartOptions
    };

    this.get_results();

    this.BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.state.chartData,
      options: chartOptions
    });

    this.BlogUsersOverview.render();
    // They can still be triggered on hover.
    const buoMeta = this.BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.state.chartData.datasets[0].data.length - 1
    ]._model.radius = 0;

    // Render the chart.
  }

  
  get_results(){
    var Bus_Id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
    var apiUrl = "https://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/DealByDate/" + Bus_Id;
    var new_stats = null;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson[0]);
        new_stats = this.state.chartData;
        
        console.log(new_stats.datasets[0].data);
        responseJson[0].map((item) => new_stats.datasets[0].data[item.Day] = item.Coupon);
        responseJson[1].map((item) => new_stats.datasets[1].data[item.Day] = item.Coupon);
        responseJson[0].map((item) => new_stats.datasets[0].id_list[item.Day] = item.Deal_id);
        responseJson[1].map((item) => new_stats.datasets[1].id_list[item.Day] = item.Deal_id);
        // responseJson[1].map((item) => new_stats.datasets[1].data.push(item.Coupon));
        
        

        this.setState({chartData: new_stats});
        console.log(responseJson);
        
        this.BlogUsersOverview.update()

      })
      .catch((error) => {
        console.error(error); 
      });
  }

  render() {
    const { title } = this.props;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          {/*<Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
          </Col> 
          </Row>*/}
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

UsersOverview.defaultProps = {
  title: "ניתוח מבצע"
  
};

export default UsersOverview;
