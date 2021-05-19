import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./common/PageTitle";
import SmallStats from "./common/SmallStats";
import UsersOverview from "./blog/UsersOverview";
import UsersByDevice from "./blog/UsersByDevice";
import NewDraft from "./blog/NewDraft";
import Tables from "./blog/Tables";
import RedeemByHour from "./blog/RedeemByHour";
import 'bootstrap/dist/css/bootstrap.min.css';


class BlogOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [
      {
        label: "מבצע אחרון ללא מימוש",
        value: "",
        percentage: "4.7%",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "לקוחות חדשים ",
        value: "182",
        percentage: "12.4",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "ממוצע דירוג למבצע",
        value: "8,147",
        percentage: "3.8%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: "ממוצע מימושים למבצע",
        value: "29",
        percentage: "2.71%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: [1, 7, 1, 3, 1, 4, 8]
          }
        ]
      },
      {
        label: "כמות מבצעים",
        value: "17,281",
        percentage: "2.4%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgb(0,123,255,0.1)",
            borderColor: "rgb(0,123,255)",
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      }
    ],
  }
}

  componentDidMount() {
    this.get_datacard_results();
    this.interval = setInterval(() => this.get_datacard_results(), 10000);
  }
  
get_datacard_results(){
  var Bus_Id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
  var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/DataCard/" + Bus_Id;
  var new_stats = null;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      new_stats = this.state.stats;

      new_stats[0].value = responseJson[0].Non_redemmed_deal;
      new_stats[1].value = responseJson[0].New_customers;
      new_stats[2].value = responseJson[0].Avg_rate;
      new_stats[3].value = responseJson[0].Avg_redeem_deal;
      new_stats[4].value = responseJson[0].Count_deal;
      this.setState({stats: new_stats});

      //console.log(new_stats);

      // this.smallStats[0].value = responseJson[0].Non_redemmed_deal;
      // this.smallStats[1].value = responseJson[0].New_customers;
    })
    .catch((error) => {
      console.error(error); 
    });
}

  render(){
    var smallStats = this.state.stats;
    return (<Container  fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row style={{textAlign: "right", direction: "rtl"}} noGutters className="page-header py-4">
      <PageTitle title="ניתוח מבצעים חודשי" subtitle="מבט על" className="text-sm-right mb-3"  />
    </Row>

    {/* Small Stats Blocks */}
    <Row >
    {smallStats.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
          />
        </Col>
      ))}
    </Row>

    <Row>
      {/* Users Overview */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <UsersOverview />
      </Col>

      {/* Users by Device */}
      <Col lg="4" md="6" sm="12" className="mb-4">
        <UsersByDevice />
      </Col>

      {/* New Draft */}
      <Col lg="8" md="12" sm="12" className="mb-4">
        <Tables />
      </Col>
      <Col lg="4" md="6" sm="12" className="mb-4">
        <RedeemByHour />
      </Col>
      </Row>
   {/*   <Row>
      Table 
      <Col lg="8" md="12" sm="12" className="mb-4">
        <Tables />
      </Col>
    </Row>*/}
  </Container>);
  }

} export default BlogOverview;

