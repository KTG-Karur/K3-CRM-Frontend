const reportFilterFormContainer = [
    {
        formFields: [
            {
                'label': 'Date',
                'name': 'allowanceDate',
                'inputType': 'date',
                'classStyle': 'col-3',
                'onChange': 'onAllowanceDate',
                'type':'month'
            },
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                'classStyle': 'col-3',
                onChange: 'onBranchFilter',
            },
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                'classStyle': 'col-3',
                onChange: 'onDepartmentFilter',
            },
            {
                'label': 'Day',
                'name': 'durationId',
                'inputType': 'radio',
                'optionList': 'durationList',
                'displayKey': 'durationName',
                'uniqueKey': 'durationId',
                'classStyle': 'col-3',
                onChange: 'onDurationFilter',
            },
            {
                'label': "Excel",
                'name': "departmentName",
                'inputType': "button",
                'onClick': "onDownload",
                'classStyle': 'col-12',
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
    reportFilterFormContainer,
    staffSalaryBtn
}