import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Button, Row, Col } from "antd";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <Row justify="center" style={{ margin: "4em 2rem" }}>
        <Col span={10}>
          <h1>
            <b>Hello,</b> {user.name.split(" ")[0]}
            <p className="flow-text grey-text text-darken-1">
              You are logged into this{" "} app.
              </p>
          </h1>
          <Button
            type="primary"
            onClick={this.onLogoutClick}
          >
            Logout
        </Button>

        </Col>
      </Row>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
