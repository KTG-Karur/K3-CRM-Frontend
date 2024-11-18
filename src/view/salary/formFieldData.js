const staffFilterFormContainer = [
    {
        formFields: [
            {
                'label': 'Salary Month',
                'name': 'salaryDate',
                'inputType': 'date',
                'classStyle': 'col-3',
                'onChange': 'handleDate',
            },
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                'classStyle': 'col-3',
                onChange: 'handleBranch',
            },
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                'classStyle': 'col-3',
                onChange: 'handleDepartment',
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
                'classStyle': 'col-12',
            },
        ]
    },
]

export {
    staffFilterFormContainer,
    staffSalaryBtn
}