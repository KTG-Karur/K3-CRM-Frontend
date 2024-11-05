const settingContainer = [
    {
        formFields: [
            
            {
                label: 'Work Day',
                name: 'workDayId',
                inputType: 'checkbox',
                optionList: 'workDayList',
                displayKey: 'workDayName',
                uniqueKey: 'workDayId',
                onChange: 'onHandleCheckbox',
                require: true,
                'classStyle' : 'col-12'
            },
            {
                'label': "ESI Percentage",
                'name': "esiPercentage",
                'inputType': "number",
                'placeholder': "Enter ESI Percentage",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "PF Percentage",
                'name': "pfPercentage",
                'inputType': "number",
                'placeholder': "Enter PF Percentage",
                'require': true,
                'classStyle' : 'col-6'
            },   
            {
                'label': "Permission Deduction",
                'name': "permissionDeduction",
                'inputType': "number",
                'placeholder': "Enter Permission Deduction",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                'label': "Leave Deduction",
                'name': "leaveDeduction",
                'inputType': "number",
                'placeholder': "Enter Leave Deduction",
                'require': true,
                'classStyle' : 'col-6'
            },
            {
                label: 'Image ',
                name: 'imageName',
                inputType: 'file',
                'classStyle': 'col-6'
            },
            
        ]
    },
]

export {
    settingContainer
}