import React, { Component, FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { Quiz } from "../../../models/quiz";
import { ContentRow } from "../../shared/layout";
import { DecoratedFormItem } from "./decoratedFormItem";
import { formLayout, FormContext, formLayoutWithoutLabel } from "./formContext";
import { QuestionGroup } from "./questionGroup";
import { Question } from "../../../models/question";


interface QuizFormOwnProps {
  defaultQuiz?: Quiz;
  submitButtonName: string;
  onSubmit: (quiz: QuizFormFields) => Promise<void>;
}

type QuizFormProps = FormComponentProps & QuizFormOwnProps

interface QuizFormState {
  submitting: boolean;
}

export interface QuizFormFields {
  title: string;
  questions: Question[];
}

class QuizFormItem extends DecoratedFormItem<QuizFormFields> {}

class QuizFormStructure extends Component<
  QuizFormProps, QuizFormState
  > {
  state = {
    submitting: false
  };

  render() {
    const defaultQuiz = this.props.defaultQuiz;

    return (
      <ContentRow>
        <Form {...formLayout} onSubmit={(e: FormEvent) => this.handleSubmit(e)}>
          <FormContext.Provider value={this.props.form}>
            <QuizFormItem
              label="Title"
              fieldName="title"
              options={{
                initialValue:
                  defaultQuiz && defaultQuiz.title,
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
            <QuestionGroup
                formLayoutWithoutLabel={formLayoutWithoutLabel}
                defaultValue={
                  this.props.defaultQuiz &&
                    this.props.defaultQuiz.questions
                }/>
            <Form.Item {...formLayoutWithoutLabel}>
              <Button
                type="primary"
                htmlType="submit"
                loading={this.state.submitting}
              >
                {this.props.submitButtonName}
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
        !error && this.props.onSubmit(values)
    );
  }
}

export const QuizForm = Form.create<QuizFormProps>({name: "createQuiz"})(QuizFormStructure)