const attendanceInchargeContainer = [
    {
        formFields: [


            {
                label: 'Department',
                name: 'departmentId',
                inputType: 'select',
                optionList: 'departmentList',
                displayKey: 'departmentName',
                uniqueKey: 'departmentId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Branch',
                name: 'branchId',
                inputType: 'select',
                optionList: 'branchList',
                displayKey: 'branchName',
                'onChange': 'onBranchChange',
                uniqueKey: 'branchId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Staff',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
        ]
    },
]

export {
    attendanceInchargeContainer
}