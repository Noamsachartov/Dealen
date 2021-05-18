import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {results: []}
  }

  componentDidMount(){
    this.get_results();
  }
  

get_results(){
  var Bus_Id = localStorage.getItem("user_id") ? localStorage.getItem("user_id") : 0;
  var apiUrl = "http://proj.ruppin.ac.il/igroup49/test2/tar1/api/Deal/Alldeal/" + Bus_Id;
  var new_results = null;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      new_results = this.state.results;
      
      new_results.push()
      responseJson.map((item) => new_results.push(item));
      // responseJson[1].map((item) => new_stats.datasets[1].data.push(item.Coupon));

      this.setState({results: new_results});
      
      // this.Tables.update()
      //console.log(new_stats);

      // this.smallStats[0].value = responseJson[0].Non_redemmed_deal;
      // this.smallStats[1].value = responseJson[0].New_customers;
    })
    .catch((error) => {
      console.error(error); 
    });
}

render() {
  return (
  <Container fluid className="main-content-container px-0">
    {/* Page Header */}


    {/* Default Light Table */}
    <Row>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">פירוט מבצעים</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0"  style={{'display' : 'block', 'overflowY':'scroll', 'height':'400PX'}}>
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    מספר מבצע
                  </th>
                  <th scope="col" className="border-0">
                    שם מבצע
                  </th>
                  <th scope="col" className="border-0">
                    מוצר
                  </th>
                  <th scope="col" className="border-0">
                    תיאור מבצע
                  </th>
                  <th scope="col" className="border-0">
                    תאריך 
                  </th>
                  <th scope="col" className="border-0">
                    שעת התחלה
                  </th>
                  <th scope="col" className="border-0">
                    שעת סיום
                  </th>
                  <th scope="col" className="border-0">
                    כמות מימושים
                  </th>
                </tr>
              </thead>
              <tbody>
              {this.state.results.map(function(item, i){
                return (
                  <React.Fragment key={i}>
                  <tr>
                    <td>{item.Id}</td>
                    <td>{item.Name}</td>
                    <td>{item.Product}</td>
                    <td>{item.Description}</td>
                    <td>{item.Date}</td>
                    <td>{item.Startime}</td>
                    <td>{item.Endtime}</td>
                    <td>{item.Coupon}</td>
                  </tr>
                </React.Fragment>
                );
              })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>



  
  </Container>
);
  
}
}

export default Tables;
