import React, { Component, ReactNodeArray } from "react";
import { Icon, Input, InputNumber, Select } from "antd";
import { Question } from "../../../models/question";


interface QuestionInputProps {
  value?: Question;
  onChange?: (value: Partial<Question>) => void;
  showRemoveButton: boolean;
  onRemove: () => void;
}

export class QuestionInputForm extends Component<QuestionInputProps> {
  triggerChange(changedData: Partial<Question>) {
    this.props.onChange &&
    this.props.onChange({
      ...this.props.value,
      ...changedData
    });
  }

  render() {
    return (
      <Input.Group compact>
        <Input
          placeholder="Question text"
          onChange={e => this.triggerChange({ text: e.target.value })}
          value={this.props.value && this.props.value.text}
        />
        <Input
          placeholder="Correct answer"
          onChange={e => this.triggerChange({ correctAnswer: e.target.value })}
          value={this.props.value && this.props.value.correctAnswer}
        />
        <Input
          placeholder="Alternative answer"
          onChange={e => this.triggerChange({ alternativeAnswer1: e.target.value })}
          value={this.props.value && this.props.value.alternativeAnswer1}
        />
        <Input
          placeholder="Alternative answer"
          onChange={e => this.triggerChange({ alternativeAnswer2: e.target.value })}
          value={this.props.value && this.props.value.alternativeAnswer2}
        />
        <Input
          placeholder="Alternative answer"
          onChange={e => this.triggerChange({ alternativeAnswer3: e.target.value })}
          value={this.props.value && this.props.value.alternativeAnswer3}
        />
        <Input
          placeholder="Alternative answer"
          onChange={e => this.triggerChange({ alternativeAnswer4: e.target.value })}
          value={this.props.value && this.props.value.alternativeAnswer4}
        />
        {this.props.showRemoveButton && (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.props.onRemove()}
            style={{
              width: "5%",
              display: "inline-block",
              verticalAlign: "middle"
            }}
          />
        )}
      </Input.Group>
    );
  }
}
