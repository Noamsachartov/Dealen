import React from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  FormSelect,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from "shards-react";

import Chart from "../../../../utils/chart";

class UsersByDevice extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartConfig = {
      type: "pie",
      data: this.props.chartData,
      options: {
        ...{
          legend: {
            position: "bottom",
            labels: {
              padding: 25,
              boxWidth: 20
            }
          },
          cutoutPercentage: 0,
          tooltips: {
            custom: false,
            mode: "index",
            position: "nearest"
          }
        },
        ...this.props.chartOptions
      }
    };
    console.log(chartConfig);

    this.chart = new Chart(this.canvasRef.current, chartConfig);
    this.get_results();
  }

  get_results(){
    var Bus_Id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
    var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/Product/" + Bus_Id;
    var new_results = null;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("ResponseJSON: ", responseJson);
        this.chart.data.datasets[0].data = [];
        this.chart.data.labels = [];
        responseJson.map((item) => {
          this.chart.data.datasets[0].data.push(item.Coupon);
          this.chart.data.labels.push(item.Product);
        });
        this.chart.update();
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
        <CardBody className="d-flex py-0">
          <canvas
            height="220"
            ref={this.canvasRef}
            className="blog-users-by-device m-auto"
          />
        </CardBody>
        <CardFooter className="border-top">
          <Row>
            <Col>
              <FormSelect
                size="sm"
                value="last-week"
                style={{ maxWidth: "130px" }}
                onChange={() => {}}
              >
                <option value="last-week">שבוע אחרון</option>
                <option value="last-month">חודש אחרון</option>
                <option value="last-year">שנה אחרונה</option>
              </FormSelect>
            </Col>
            <Col className="text-right view-report">
              {/* eslint-disable-next-line */}
              <a href="#">View full report &rarr;</a>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

UsersByDevice.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart config object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.object
};

UsersByDevice.defaultProps = {
  title: "ניתוח מוצר",
  chartData: {
    datasets: [
      {
        hoverBorderColor: "#ffffff",
        data: [68.3, 24.2, 7.5],
        backgroundColor: [
          "rgba(0,123,255,0.9)",
          "rgba(0,123,255,0.8)",
          "rgba(0,123,255,0.7)",
          "rgba(0,123,255,0.6)",
          "rgba(0,123,255,0.5)",
          "rgba(0,123,255,0.4)",
          "rgba(0,123,255,0.3)",
          "rgba(0,123,255,0.2)",
          "rgba(0,123,255,0.1)",
          "rgba(0,123,255,)",
          "rgba(0,123,255,0.8)",
          "rgba(0,120,250,0.6)",
          "rgba(0,120,250,0.6)",
        ]
      }
    ],
    labels: ["פיצה", "בירה", "יין"]
  }
};

export default UsersByDevice;
