import React, {Component} from 'react'
import {Breadcrumb, Card, Col} from 'react-bootstrap'
import Table from "react-bootstrap/Table";

class Gateway extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Gateways')
  }

  render() {
    return (
      <div>
        <h4 className="py-3 mb-3">
          <Breadcrumb className="font-weight-bold m-0" listProps={{ className: 'm-0' }}>
            <Breadcrumb.Item active={false} key="Gateways" href="/gateways">Gateways</Breadcrumb.Item>
            <Breadcrumb.Item active={true} key="gateway1" href="/gateway">gateway1</Breadcrumb.Item>
          </Breadcrumb>
        </h4>
        <Col md={12}>
          <Card>
            <Card.Header>
              <h3 className="mt-3">Gateway Details</h3>
            </Card.Header>
            <Card.Body>
              <Table>
                <tr className="table-borderless">
                  <th width="200px">Name</th>
                  <td>gateway1</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>S2S IPSec + IKEv2</td>
                </tr>
                <tr>
                  <th>Oort VPN Server</th>
                  <td>1.2.3.4</td>
                </tr>
                <tr>
                  <th>Oort CIDR</th>
                  <td>10.0.0.0/30</td>
                </tr>
                <tr>
                  <th>Origin VPN Server</th>
                  <td>5.6.7.8</td>
                </tr>
                <tr>
                  <th>Origin CIDRs</th>
                  <td>10.10.10.0/24, 10.10.11.0/24 10.50.0.0/16</td>
                </tr>
                <tr>
                  <th>Origin Public Key</th>
                  <td>SHA256: ZZODz8mnbxXdhYg4Ovm8s4kwLkJPFmbZnBafXiKsxd8</td>
                </tr>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </div>
    )
  }
}

export default Gateway
