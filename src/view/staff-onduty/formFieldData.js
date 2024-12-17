const staffOnDutyContainer = [
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
                'label': "No Of Od Days",
                'name': "dayCount",
                'inputType': "number",
                'placeholder': "0",
                'isDisabled': true,
                'classStyle': 'col-6'
            },
            {
                label: 'Intimate Staff',
                name: 'spokenStaffId',
                inputType: 'select',
                optionList: 'spokenStaffList',
                displayKey: 'staffName',
                uniqueKey: 'staffId',
                require: true,
                'classStyle': 'col-6'
            },
            {
                label: 'Intimate Time',
                name: 'spokenTime',
                inputType: 'time',
                displayKey: 'staffName',
                uniqueKey: 'spokenTime',
                require: true,
                'classStyle': 'col-6'
            },
            {
                'label': "Intimate Date",
                'name': "spokenDate",
                'inputType': "date",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Reason For On-duty",
                'name': "reason",
                'inputType': "textarea",
                'placeholder': "Enter Reason For On-duty",
                'require': true,    
                'classStyle': 'col-6'
            },
        ]
    },
]

export {
    staffOnDutyContainer
}