const settingWorkingDayContainer = [
    {
        formFields: [
            
            {
                label: 'Work Day',
                name: 'workDay',
                inputType: 'checkbox',
                optionList: 'workDayList',
                displayKey: 'workDayName',
                uniqueKey: 'workDay',
                onChange: 'onHandleCheckbox',
                require: true,
                'classStyle' : 'col-12'
            },
            
            {
                label: 'Logo ',
                name: 'logoName',
                inputType: 'file',
                'classStyle': 'col-6'
            },
            
        ]
    },
]

export {
    settingWorkingDayContainer
}