import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Button, Space } from 'antd';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to home page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    return (
      <Row justify="center" align="middle" style={{ margin: "4rem 0rem" }}>
        <Col xs={{ span: 11 }} lg={{ span: 8 }}>
          <div style={{ fontSize: "3em", fontWeight: "800", margin: "4rem 0" }}>
            Welcome to Celestia
          </div>
          <div style={{ margin: "2em" }}></div>
          <Row justify="center">
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
              <Button type="primary">
                <Link
                  to="/register"
                  style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                  }}
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
              </Link>
              </Button>
            </Col>
            <Col xs={20} sm={16} md={12} lg={8} xl={4}>
              <Button><Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link></Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Landing);

{/* <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hello,</b>
              <div>Celestia</div>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              An Milky way community platform
            </p>
            <br />
            <div className="col s6">
              
            </div>
            <div className="col s6">
              
            </div>
          </div>
        </div>
      </div> */}