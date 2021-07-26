import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  
  CardContent,

  withTheme,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { CardBody,FormSelect, Container, Row, Col, Card, CardHeader } from 'shards-react';


class RedeemByHour extends React.Component {
    

    constructor(props) {
      super(props);
      const {theme} = this.props;

      this.barRef = React.createRef();
      
      this.data = {
        datasets: [
          {
            backgroundColor: "rgba(0,123,255,0.7)",
            data: [18, 5, 19, 27, 29, 19, 20],
            label: 'כמות מימושים שלי'
          },
          {
            backgroundColor: colors.grey[300],
            data: [11, 20, 12, 29, 30, 25, 13],
            label: 'כמות מימושי מתחרים'
          }
        ],
        labels: [ '19 may', '20 may', '21 may', '23 may', '24 may']
      };
    
    this.options = {
        animation: false,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              barThickness: 12,
              maxBarThickness: 10,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
              ticks: {
                fontColor: theme.palette.text.secondary
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: theme.palette.text.secondary,
                beginAtZero: true,
                min: 0
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: theme.palette.divider,
                drawBorder: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: theme.palette.divider
              }
            }
          ]
        },
        tooltips: {
          backgroundColor: theme.palette.background.paper,
          bodyFontColor: theme.palette.text.secondary,
          borderColor: theme.palette.divider,
          borderWidth: 1,
          enabled: true,
          footerFontColor: theme.palette.text.secondary,
          intersect: false,
          mode: 'index',
          titleFontColor: theme.palette.text.primary
        }
    }
    }

    get_results(period="w"){
        var Bus_Id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
        var apiUrl = "https://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/DealCompeting/" + Bus_Id + "/" + period;
      
        fetch(apiUrl)
          .then((response) => response.json())
          .then((responseJson) => {
            // console.log("ResponseJSON: ", responseJson);
            this.data.labels = [];
            this.data.datasets[0].data = [];
            this.data.datasets[1].data = [];
            responseJson.map((item) => {
              this.data.labels.push(item.My_date);
              this.data.datasets[0].data.push(item.My_coupon);
              this.data.datasets[1].data.push(item.Another_coupon);
            });
            
          })
          .then(() => {
            this.reference.chartInstance.update();
          })
          .catch((error) => {
            console.error(error); 
          });
      }

      componentDidMount(){
        // console.log("Component mounted")
        this.get_results();
      }

    render(){
        return (
            <Container fluid className="main-content-container px-0">
            <Card className="mb-4" {...this.props}>
            <CardHeader className="border-bottom">
            <Row>
                <Col>
                    <FormSelect
                        size="sm"
                        style={{ maxWidth: "130px",  }}
                        onChange={(e) => {
                            // console.log(e.target.value)ף;
                            this.get_results(e.target.value);
                        }}
                    >
                    <option value="w">שבוע אחרון</option>
                    <option value="m">חודש נוכחי</option>
                    <option value="lm">חודש קודם</option>
                    <option value="y">שנה נוכחית</option>
                  </FormSelect>
                </Col>
                <Col>
                    <h6 className="m-0">מימושי מתחרים</h6>
                </Col>
            </Row>
            </CardHeader>
            <Divider />
            <CardBody small className="pt-0 ">
                <Box
                sx={{
                    height: 350,
                    position: 'relative'
                }}
                >
                <Bar
                    data={this.data}
                    options={this.options}
                    height={373}
                    redraw={true}
                    ref = {(reference) => this.reference = reference}
                />
                </Box>
            </CardBody>
            {/*
            <Divider />
            <Box
                sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
                }}
            >
                <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"
                >
                Overview
                </Button>
            </Box>
             */}
            </Card>
            </Container>
        );
    }
}

export default withTheme(RedeemByHour);