import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Form, Input, Button, Row, Col } from 'antd';
import { SwapLeftOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};



class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Row justify="center" style={{ margin: "4em 2rem" }}>
        <Col span={12}>
          <Row justify="center">
            <Col offset={6}>
              <Link to="/" className="btn-flat waves-effect">
                <SwapLeftOutlined /> Back to
              home
            </Link>
              <h2>
                <b>Register</b>
              </h2>
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </Col>

          </Row>

          <Form
            {...layout}
            name="basic"
            onFinish={this.onSubmit}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                id="name"
                type="text"
                className={classnames("", {
                  invalid: errors.name
                })}

              />
            </Form.Item>

            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("", {
                  invalid: errors.password
                })}

              />
            </Form.Item>

            <Form.Item
              label="Password2"
              name="password2"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password2"
                className={classnames("", {
                  invalid: errors.password2
                })}

              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Sign up
                </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row >

    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
