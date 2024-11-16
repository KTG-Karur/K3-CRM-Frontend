const designationContainer = [
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
            }, 
            {
                'label': "Designation Name",
                'name': "designationName",
                'inputType': "text",
                'placeholder': "Enter Designation Name",
                'require': true
            },
        ]
    },
]

export {
    designationContainer
}