import React, { Component, Fragment } from "react";
import { Button, Form, Icon } from "antd";
import { ColProps } from "antd/lib/grid";
import { Question } from "../../../models/question";
import { DecoratedFormItem } from "./decoratedFormItem";
import { QuestionInputForm } from "./questionInputForm";

interface QuestionGroupProps {
  defaultValue?: Question[];
  formLayoutWithoutLabel: {
    labelCol?: ColProps;
    wrapperCol?: ColProps;
  };
}

interface QuestionGroupState {
  nextKey: number;
  keys: number[];
}

export class QuestionGroup<T> extends Component<
  QuestionGroupProps,
  QuestionGroupState
> {
  constructor(props: QuestionGroupProps) {
    super(props);

    const keys: number[] = (this.props.defaultValue &&
      this.props.defaultValue.map((value, index) => index)) || [0];
    const nextKey = keys.length > 0 ? Math.max(...keys) + 1 : 0;

    this.state = {
      keys,
      nextKey
    };
  }

  addLine() {
    this.setState((state: QuestionGroupState) => ({
      nextKey: state.nextKey + 1,
      keys: state.keys.concat(state.nextKey)
    }));
  }

  removeLine(keyToRemove: number) {
    this.setState({
      keys: this.state.keys.filter(key => key !== keyToRemove)
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.keys.map((key, index) => (
          <DecoratedFormItem
            key={key}
            {...(index === 0 ? {} : this.props.formLayoutWithoutLabel)}
            label={`Question ${index + 1}`}
            fieldName={`questions[${key}]`}
            options={{
              initialValue:
                this.props.defaultValue && this.props.defaultValue[key]
            }}
          >
            <QuestionInputForm
              showRemoveButton
              onRemove={() => this.removeLine(key)}
            />
          </DecoratedFormItem>
        ))}
        <Form.Item {...this.props.formLayoutWithoutLabel}>
          <Button type="dashed" block onClick={() => this.addLine()}>
            <Icon type="plus" />
            Add a question
          </Button>
        </Form.Item>
      </Fragment>
    );
  }
}
