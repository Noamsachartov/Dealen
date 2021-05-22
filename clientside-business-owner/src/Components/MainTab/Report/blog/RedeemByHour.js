import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  withTheme,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { CardBody,FormSelect } from 'shards-react';


class RedeemByHour extends React.Component {
    

    constructor(props) {
      super(props);
      const {theme} = this.props;

      this.barRef = React.createRef();
      
      this.data = {
        datasets: [
          {
            backgroundColor: colors.indigo[500],
            data: [18, 5, 19, 27, 29, 19, 20],
            label: 'כמות מימושים שלי'
          },
          {
            backgroundColor: colors.grey[200],
            data: [11, 20, 12, 29, 30, 25, 13],
            label: 'כמות מימושי מתחרים'
          }
        ],
        labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug']
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
        var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/DealCompeting/" + Bus_Id + "/" + period;
      
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
            <Card className="h-100" {...this.props}>
            <CardHeader
            className="border-bottom"
                action={(
                    <FormSelect
                    size="sm"
                    style={{ maxWidth: "130px" }}
                    onChange={(e) => {
                        // console.log(e.target.value);
                        this.get_results(e.target.value);
                    }}
                  >
                    <option value="w">שבוע אחרון</option>
                    <option value="m">חודש נוכחי</option>
                    <option value="lm">חודש קודם</option>
                    <option value="y">שנה נוכחית</option>
                  </FormSelect>
                )}
                title="מימושי מתחרים"
            />
            <Divider />
            <CardBody className="pt-0" style={{ height: "360px" }}>
                <Box
                sx={{
                    height: 360,
                    position: 'relative'
                }}
                >
                <Bar
                    data={this.data}
                    options={this.options}
                    height={350}
                    redraw={true}
                    ref = {(reference) => this.reference = reference}
                />
                </Box>
            </CardBody>
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
            </Card>
        );
    }
}

export default withTheme(RedeemByHour);