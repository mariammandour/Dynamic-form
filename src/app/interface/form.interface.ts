export interface IForm {
    formTitle?: string;
    saveBtnTitle?: string;
    resetBtnTitle?: string;
    formControls: IFormControl[];
}

export interface IFormControl {
    name: string;
    label: string;
    value?: string;
    options?: IOption[];
    placeholder?: string;
    class?: string;
    type: string;
    validators?: IValidator[];
    nestedControls?: IFormControl[];
    fieldType?: string;
    fieldLabel?: string;
}

export interface IValidator {
    validatorName: string;
    message?: string;
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
}

interface IOption {
    id: number;
    value: string;
    label: string;
}

