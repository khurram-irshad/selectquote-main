
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Controller } from 'react-hook-form'

type FieldProps = {
    control: any;
    type?: any;
    name: any;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    inputProps?: any,
    children?: React.ReactNode,
    customChange?: any
    accept?: any
    width?: any
    height?: any
    border?: any
    outline?: any
    value? : any
}

export const UseFormTextField = ({ width, height, control, name, disabled = false, placeholder, type = 'text', className, defaultValue = '', children, customChange , accept , border , outline}: FieldProps) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                <>
                    <InputGroup style={{ flexDirection: 'column' }}>
                        <Form.Control type={type} placeholder={placeholder}  value={value} isInvalid={!!error} onChange={(e) => {
                            if(name === "img"){
                                customChange(e)
                            }
                            onChange(e)
                        }} disabled={disabled} className={className} style={{ width: width , height: height , border: border , outline: outline}} accept= {accept} />
                        {children}
                        {error && (
                            <Form.Text id="passwordHelpBlock" className="text-danger" muted>
                                {error?.message}
                            </Form.Text>
                        )}
                    </InputGroup>
                </>
            )}
        />
    )
}
