const staffLeaveContainer = [
    {
        formFields: [
            {
                label: 'Requested By',
                name: 'staffId',
                inputType: 'select',
                optionList: 'staffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
            },
            {
                label: 'Leave Type',
                name: 'leaveTypeId',
                inputType: 'select',
                optionList: 'leaveTypeList',
                displayKey: 'leaveTypeName',
                uniqueKey: 'leaveTypeId',
                require: true,
            },
            {
                'label': "From Date",
                'name': "fromDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "To Date",
                'name': "toDate",
                'inputType': "date",
                'require': true,
                'classStyle' : 'col-6'
            },    
            {
                'label': "Reason For Leave",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason For Leave",
                'require': true,
            },
        ]
    },
]

export {
    staffLeaveContainer
}