
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { Controller } from 'react-hook-form'

type FieldProps = {
    control: any;
    type?: string;
    name: any;
    placeholder?: string;
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    inputProps?: any,
    children?: React.ReactNode,
}

export const UseFormTextField = ({ control, name, disabled = false, placeholder, type = 'text', className, defaultValue = '', children }: FieldProps) => {

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => (
                <>
                    <InputGroup style={{ flexDirection: 'column' }}>
                        <Form.Control type={type} placeholder={placeholder} value={value} isInvalid={!!error} onChange={onChange} disabled={disabled} className={className} style={{ width: '100%' }} />
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

