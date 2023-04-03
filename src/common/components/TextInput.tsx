import { Form, FormControl, InputGroup } from "react-bootstrap";
import { Controller } from "react-hook-form";

type FieldProps = {
  control: any;
  type?: any;
  name: any;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
  disabled?: boolean;
  inputProps?: any;
  children?: React.ReactNode;
  customChange?: any;
  accept?: any;
  width?: any;
  height?: any;
  border?: any;
  outline?: any;
  value?: any;
};

export const UseFormTextField = ({
  width = "100%",
  height = "50px",
  control,
  name,
  disabled = false,
  placeholder,
  type = "text",
  className,
  defaultValue = "",
  children,
  customChange,
  accept,
  border,
  outline,
}: FieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({
        field: { onChange, value },
        fieldState: { error, isDirty },
      }) => (
        <>
          {type === "text" ? (
            <InputGroup style={{ flexDirection: "column" }}>
              <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                isInvalid={!!error}
                onChange={(e) => {
                  if (name === "img") {
                    customChange(e);
                  }
                  onChange(e);
                }}
                disabled={disabled}
                className={className}
                style={{
                  width: width,
                  height: height,
                  border: border,
                  outline: outline,
                }}
                accept={accept}
              />
              {children}
              {error && (
                <Form.Text id="passwordHelpBlock" className="text-danger" muted>
                  {error?.message}
                </Form.Text>
              )}
            </InputGroup>
          ) : (
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                type={type}
                placeholder={placeholder}
                value={value}
                isInvalid={!!error}
                onChange={(e) => {
                  if (name === "img") {
                    customChange(e);
                  }
                  onChange(e);
                }}
                disabled={disabled}
                className={className}
                style={{
                  width: width,
                  height: height,
                  border: border,
                  outline: outline,
                }}
              />
              {children}
              {error && (
                <Form.Text id="passwordHelpBlock" className="text-danger" muted>
                  {error?.message}
                </Form.Text>
              )}
            </Form.Group>
          )}
        </>
      )}
    />
  );
};
