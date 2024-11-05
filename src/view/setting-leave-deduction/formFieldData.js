const settingLeaveDeductionContainer = [
    {
        formFields: [
            
            {
                'label': "Leave Deduction Percentage",
                'name': "leaveDeductionPercentage",
                'inputType': "text",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "Leave Count Day",
                'name': "leaveCountDay",
                'inputType': "text",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                label: 'Leave Type',
                name: 'leaveTypeId',
                inputType: 'select',
                optionList: 'leaveTypeList',
                displayKey: 'leaveTypeName',
                uniqueKey: 'leaveTypeId',
                require: true,
                'classStyle' : 'col-6'
            },            
            
        ]
    },
]

export {
    settingLeaveDeductionContainer
}