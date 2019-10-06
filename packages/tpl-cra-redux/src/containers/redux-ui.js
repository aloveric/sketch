/**
 * Example redux-ui example
 */

import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { isNil } from "lodash";
import {
  Switch,
  Row,
  Col,
  Button,
  Form,
  Select,
  InputNumber,
  Slider,
  Radio,
  Divider,
  Progress,
} from "antd";
import {
  makeProgress,
  makeProgressSelector,
  makeAssign,
  makeAssignSelector,
  makeToggle,
  makeToggleSelector,
} from "@36node/redux";

import withBreadCrumb from "../components/withBreadCrumb";
import Container from "../components/layout/container";
import Jumbotron from "../components/layout/jumbotron";

const UI_KEY = "reduxUI";
const Option = Select.Option;

const progress = makeProgress(UI_KEY);
const progressSelector = makeProgressSelector(UI_KEY);
const assign = makeAssign(UI_KEY);
const assignSelector = makeAssignSelector(UI_KEY);
const toggle = makeToggle(UI_KEY);
const toggleSelector = makeToggleSelector(UI_KEY);

@connect(progressSelector)
class ProgressExample extends PureComponent {
  onIncrease = () => this.props.dispatch(progress.increase(5));
  onDecrease = () => this.props.dispatch(progress.decrease(5));
  onReset = () => this.props.dispatch(progress.reset());

  render() {
    return (
      <Row type="flex" align="middle">
        <Col span={2}>Progress Example:</Col>
        <Col span={5} offset={1}>
          <Progress type="circle" percent={this.props.pos} />
        </Col>

        <Col span={16}>
          <Button.Group>
            <Button icon="plus" type="primary" onClick={this.onIncrease}>
              Increase
            </Button>
            <Button icon="plus" onClick={this.onDecrease}>
              Decrease
            </Button>
            <Button type="danger" onClick={this.onReset}>
              Reset
            </Button>
          </Button.Group>
        </Col>
      </Row>
    );
  }
}

@connect(state => ({ assign: assignSelector(state) }))
@Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    props.dispatch(assign(allValues));
  },
})
class AssignExample extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { assign } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" align="middle">
        <Col span={2}>Assign Example:</Col>
        <Col span={8} offset={1}>
          <Form {...formItemLayout}>
            <Form.Item label="Select" hasFeedback>
              {getFieldDecorator("select", {
                rules: [
                  { required: true, message: "Please select your country!" },
                ],
              })(
                <Select placeholder="Please select a country">
                  <Option value="china">China</Option>
                  <Option value="usa">U.S.A</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="Select[multiple]">
              {getFieldDecorator("select-multiple", {
                rules: [
                  {
                    required: true,
                    message: "Please select your favourite colors!",
                    type: "array",
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  placeholder="Please select favourite colors"
                >
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="InputNumber">
              {getFieldDecorator("input-number", { initialValue: 3 })(
                <InputNumber min={1} max={10} />
              )}
              <span className="ant-form-text"> machines</span>
            </Form.Item>

            <Form.Item label="Switch">
              {getFieldDecorator("switch", { valuePropName: "checked" })(
                <Switch />
              )}
            </Form.Item>

            <Form.Item label="Slider">
              {getFieldDecorator("slider")(
                <Slider
                  marks={{
                    0: "A",
                    20: "B",
                    40: "C",
                    60: "D",
                    80: "E",
                    100: "F",
                  }}
                />
              )}
            </Form.Item>

            <Form.Item label="Radio.Group">
              {getFieldDecorator("radio-group")(
                <Radio.Group>
                  <Radio value="a">item 1</Radio>
                  <Radio value="b">item 2</Radio>
                  <Radio value="c">item 3</Radio>
                </Radio.Group>
              )}
            </Form.Item>
          </Form>
        </Col>

        <Col offset={1} span={8}>
          {Object.keys(assign).map(k => {
            const val = isNil(assign[k]) ? "" : assign[k];

            return (
              <Row key={k} style={{ padding: 20 }}>
                <Col span={10}>{k}:</Col>
                <Col span={14}>{val.toString()}</Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    );
  }
}

@connect(state => ({
  value: toggleSelector(state),
}))
class ToggleExample extends Component {
  onChange = () => this.props.dispatch(toggle());
  onOpen = () => this.props.dispatch(toggle(true));
  onClose = () => this.props.dispatch(toggle(false));

  render() {
    const { value } = this.props;

    return (
      <Row type="flex" align="middle">
        <Col span={2}>Toggle example:</Col>
        <Col span={3} offset={1}>
          <Switch checked={value} onChange={this.onChange} />
        </Col>
        <Col span={18}>
          <Button.Group>
            <Button disabled={value} onClick={this.onOpen} type="primary">
              ON
            </Button>
            <Button disabled={!value} onClick={this.onClose}>
              OFF
            </Button>
          </Button.Group>
        </Col>
      </Row>
    );
  }
}

@withBreadCrumb("UI-Example", "UI")
export default class ReduxUi extends Component {
  render() {
    return (
      <Container>
        <Jumbotron> Redux ui. </Jumbotron>
        <Divider />
        <ToggleExample />
        <Divider />
        <AssignExample />
        <Divider />
        <ProgressExample />
      </Container>
    );
  }
}
