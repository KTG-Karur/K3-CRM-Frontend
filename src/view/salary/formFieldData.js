const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Department Name",
                'name': "departmentName",
                'inputType': "text",
                'placeholder': "Enter Department Name",
                'require': true,
                'classStyle':'col-6'
            },
        ]
    },
]

const staffSalaryBtn = [
    {
        formFields: [
            {
                'label': "Submit",
                'name': "departmentName",
                'inputType': "button",
                'onClick': "onFormSubmit",
                 'classStyle':'col-12',
            },
        ]
    },
]

export {
    employeeFormContainer,
    staffSalaryBtn
}