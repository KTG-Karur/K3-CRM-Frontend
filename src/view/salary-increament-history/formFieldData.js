const salaryIncreamentHistoryContainer = [
    {
        formFields: [
            {
                'label': "Increament Date",
                'name': "increamentDate",
                'inputType': "date",
                'require': true,
            },
            {
                'label': "Salary Increament (By Month)",
                'name': "increamentAmount",
                'inputType': "text",
                'placeholder': "Enter Increament Amount",
                'require': true,
                'onChange': 'onSalaryIncreament'
            },
        ]
    },
]

const filterFormContainer = [
    {
        formFields: [
            {
                'label': 'Branch',
                'name': 'branchId',
                'inputType': 'select',
                'optionList': 'branchList',
                'displayKey': 'branchName',
                'uniqueKey': 'branchId',
                'require': true,
                // onChange: 'handleBranch',
            },
        ]
    },
    {
        formFields: [
            {
                'label': 'Department',
                'name': 'departmentId',
                'inputType': 'select',
                'optionList': 'departmentList',
                'displayKey': 'departmentName',
                'uniqueKey': 'departmentId',
                'require': true,
                onChange: 'handleDepartment',
            },
        ]
    },
    {
        formFields: [
            {
                'label': 'Staff',
                'name': 'staffId',
                'inputType': 'select',
                'optionList': 'staffList',
                'displayKey': 'staffName',
                'uniqueKey': 'staffId',
                'require': true
                // onChange: 'handleDepartment',
            },
        ]
    },
]

export {
    salaryIncreamentHistoryContainer,
    filterFormContainer
}