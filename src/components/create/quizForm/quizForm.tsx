import React, { Component, FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Quiz } from "../../../models/quiz";
import { ContentRow } from "../../shared/layout";
import { DecoratedFormItem } from "./decoratedFormItem";
import { formLayout, FormContext, formLayoutWithoutLabel } from "./formContext";

type QuizFormProps = FormComponentProps & QuizStateProps;

interface QuizStateProps {
  quiz?: Quiz;
  submitting: boolean;
  handleUpdate: (quiz: QuizFormFields) => void;
}

export interface QuizFormFields {
  title: string;
}

class QuizFormItem extends DecoratedFormItem<QuizFormFields> {}

export class QuizForm extends Component<
  QuizFormProps
  > {
  render() {
    return (
      <ContentRow>
        <Form {...formLayout} onSubmit={(e: FormEvent) => this.handleSubmit(e)}>
          <FormContext.Provider value={this.props.form}>
            <QuizFormItem
              label="Title"
              fieldName="title"
              options={{
                initialValue:
                  this.props.quiz && this.props.quiz.title,
                rules: [
                  {
                    required: true,
                    message: "Please provide a title for this quiz"
                  }
                ]
              }}
            >
              <Input />
            </QuizFormItem>

            <Form.Item {...formLayoutWithoutLabel}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.props.submitting}
              >
                {this.props.quiz ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </FormContext.Provider>
        </Form>
      </ContentRow>
    );
  }

  private handleSubmit(e: FormEvent) {
    e.preventDefault();
    this.props.form.validateFields(
      (error, values: QuizFormFields) =>
        !error && this.props.handleUpdate(values)
    );
  }
}
