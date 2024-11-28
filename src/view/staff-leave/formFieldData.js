const staffLeaveContainer = [
    {
        formFields: [
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
                label: 'Requested By',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                'onChange': 'onStaffChange',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Leave Type',
                name: 'leaveTypeId',
                inputType: 'select',
                optionList: 'leaveTypeList',
                displayKey: 'leaveTypeName',
                uniqueKey: 'leaveTypeId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "From Date",
                'name': "fromDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'minmumDate': 'minmumFrom',
            },
            {
                'label': "To Date",
                'name': "toDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6',
                'minmumDate': 'minmumTo',
            },
            {
                'label': "No Of Leave Days",
                'name': "dayCount",
                'inputType': "number",
                'placeholder': "0",
                'isDisabled': true,
                'classStyle': 'col-6'
            },
            {
                label: 'Spoken Staff',
                name: 'spokenStaffId',
                inputType: 'select',
                optionList: 'spokenStaffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Spoken Time',
                name: 'spokenTime',
                inputType: 'time',
                displayKey: 'staffName',
                uniqueKey: 'spokenTime',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Spoken Date",
                'name': "spokenDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Reason For Leave",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason For Leave",
                'require': true,    
                'classStyle': 'col-6'
            },
        ]
    },
]

export {
    staffLeaveContainer
}