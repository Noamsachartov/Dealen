import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";

const Tables = () => (
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
            <table className="table mb-0">
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
                    שעה
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Ali</td>
                  <td>Kerry</td>
                  <td>Russian Federation</td>
                  <td>Gdańsk</td>
                  <td>107-0339</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Clark</td>
                  <td>Angela</td>
                  <td>Estonia</td>
                  <td>Borghetto di Vara</td>
                  <td>1-660-850-1647</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jerry</td>
                  <td>Nathan</td>
                  <td>Cyprus</td>
                  <td>Braunau am Inn</td>
                  <td>214-4225</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Colt</td>
                  <td>Angela</td>
                  <td>Liberia</td>
                  <td>Bad Hersfeld</td>
                  <td>1-848-473-7416</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>

    {/* Default Dark Table */}
  
  </Container>
);

export default Tables;
