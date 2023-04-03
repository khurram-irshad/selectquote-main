import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

type FieldProps = {
  control: any;
  type?: string;
  name: any;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputProps?: any;
  children?: React.ReactNode;
  mask: string;
  height: any;
};

export const MyInputMask = ({
  control,
  name,
  type,
  defaultValue,
  placeholder,
  className,
  disabled,
  mask,
  height,
}: FieldProps) => {
  return (
    <Controller
      name={name}
      key={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <InputMask mask={mask} value={value} onChange={onChange}>
            {(inputProps: any) => (
              <Form.Control
                {...inputProps}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                isInvalid={!!error}
                disabled={disabled}
                className={className}
                style={{ width: "100%", height: height }}
              />
            )}
          </InputMask>
          {error && (
            <Form.Text id="passwordHelpBlock" className="text-danger" muted>
              {error?.message}
            </Form.Text>
          )}
        </>
      )}
    />
  );
};
