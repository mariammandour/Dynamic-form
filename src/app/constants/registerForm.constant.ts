import { IForm } from "../interface/form.interface";

export const registerFormConfig: IForm = {
    formTitle: 'IQRAA Registration Form',
    saveBtnTitle: 'Confirm Registration',
    resetBtnTitle: 'Reset',
    formControls: [
        {
            name: 'firstName',
            label: 'First name',
            class: 'col-md-6',
            type: 'text',
            validators: [
                {
                    validatorName: 'pattern',
                    pattern: '^[A-Z,a-z]{3,15}$',
                    message: 'First name should be 3-15 characters',
                },
                {
                    validatorName: 'required',
                    message: 'First Name is Required',
                }
            ],
        },
        {
            name: 'lastName',
            label: 'Last name',
            class: 'col-md-6',
            type: 'text',
            validators: [
                {
                    validatorName: 'required',
                    message: 'Last Name is Required',
                }
            ],
        },
        {
            name: 'email',
            label: 'Email',
            class: 'col-md-6',
            type: 'email',
            validators: [
                {
                    validatorName: 'required',
                    message: 'Email is Required',
                },
                {
                    validatorName: 'email',
                    message: 'Invalid Email',
                }
            ],
        },
        {
            name: 'password',
            label: 'Password',
            class: 'col-md-6',
            type: 'password',
            validators: [
                {
                    validatorName: 'required',
                    message: 'Password is Required',
                },
                {
                    validatorName: 'minlength',
                    minLength: 8,
                    message: 'Password must be at least 8 characters',
                },
                {
                    validatorName: 'maxlength',
                    maxLength: 16,
                    message: 'Password must be less than 16 characters',
                }
            ],
        },
        {
            name: 'country',
            label: 'Country',
            class: 'col-md-6',
            type: 'select',
            options: [
                {
                    id: 1,
                    value: 'Egypt',
                    label: 'Egypt',
                },
                {
                    id: 2,
                    value: 'Saudi Arabia',
                    label: 'Saudi Arabia',
                },
                {
                    id: 3,
                    value: 'United Arab Emirates',
                    label: 'United Arab Emirates',
                },
                {
                    id: 4,
                    value: 'other',
                    label: 'Other',
                },
            ],
            validators: [
                {
                    validatorName: 'required',
                    message: 'Country is Required',
                },
            ]
        }, {
            name: "gender",
            label: "Gender",
            class: 'col-md-6',
            type: "radio",
            options: [
                {
                    id: 1,
                    value: 'male',
                    label: 'Male',
                },
                {
                    id: 2,
                    value: 'female',
                    label: 'Female',
                }
            ]
        },
        {
            name: "Address",
            label: "Address",
            class: 'col-md-12',
            type: "nested",
            nestedControls: [
                {
                    name: 'city',
                    label: 'City',
                    class: 'col-md-4',
                    type: 'text',
                    validators: [
                        {
                            validatorName: 'required',
                            message: 'City is Required',
                        },
                    ]
                },
                {
                    name: 'street',
                    label: 'Street',
                    class: 'col-md-4',
                    type: 'text',
                    validators: [
                        {
                            validatorName: 'required',
                            message: 'Street is Required',
                        },
                    ]
                },
                {
                    name: 'building',
                    label: 'Building',
                    class: 'col-md-4',
                    type: 'text',
                    validators: [
                        {
                            validatorName: 'required',
                            message: 'Street is Required',
                        },
                    ]
                }
            ],
        },
        {
            type: "array",
            label: "Hobbies",
            name: "hobbies",
            class: 'col-md-12',
            fieldType: "text",
            fieldLabel: "Hobby",
            validators: [
                {
                    validatorName: 'required',
                    message: 'All Hobbies are Required',
                },
            ]
        },
        {
            name: "privacyPolicy",
            label: "I accept the terms and conditions and privacy policy",
            type: "checkbox",
            validators: [
                {
                    validatorName: 'required',
                    message: 'You must accept the terms and conditions and privacy policy',
                },
            ],
        }
    ],
};
