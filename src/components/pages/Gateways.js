import React, { Component } from 'react'
import {Table, Button} from 'react-bootstrap'
import {Link} from "react-router-dom";

class Gateways extends Component {
  constructor(props) {
    super(props)
    props.setTitle('Bootstrap - Tables')
  }

  render() {
    return (
      <div>
        <span className="container-fluid ">
          <h4 className="font-weight-bold float-left py-3 mb-4">
            Gateways
          </h4>
          <Button variant="success" className="float-right mt-2 mb-3">
            <span className="ion ion-md-add"></span>
          </Button>
        </span>


        <Table hover>
          <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Origin VPN Server</th>
            <th>Applications</th>
            <th width="100px">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><Link to="/gateway">gateway1</Link></td>
            <td>S2S IPSec + IKEv2</td>
            <td>5.6.7.8</td>
            <td><a href="#top">1</a></td>
            <td>
              <Link to="/gateway">
                <Button className="py-0 px-2 mr-1">
                  <span className="ion ion-md-options"></span>
                </Button>
              </Link>
              <Button className="py-0 px-2 mr-1">
                <span className="ion ion-md-trash"></span>
              </Button>
            </td>
          </tr>
          </tbody>
        </Table>
      </div>
    )
  }
}

export default Gateways
