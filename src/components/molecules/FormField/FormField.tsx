import React from "react";
import styled from "styled-components";
import { Label } from "components/atoms/Label/Label";
import { Input } from "components/atoms/Input/Input";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  ${Label} {
    margin: 10px 0;
  }
`;

interface IFormFieldProps {
  onChange: React.FormEventHandler<HTMLInputElement>;
  label: string;
  name: string;
  id: string;
  placeholder?: string;
  type?: string;
}

const FormField = React.forwardRef(
  (
    {
      onChange,
      type = "text",
      label,
      name,
      id,

      ...props
    }: IFormFieldProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <Wrapper>
        <Label htmlFor={id}>{label}</Label>
        <Input
          name={name}
          id={id}
          type={type}
          onChange={onChange}
          data-testid={label}
          {...props}
          ref={ref}
        />
      </Wrapper>
    );
  }
);

export default FormField;
