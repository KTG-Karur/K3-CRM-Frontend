const staffContainer = [
    {
        formFields: [
            {
                'label': "First Name",
                'name': "firstName",
                'inputType': "text",
                'placeholder': "Enter First Name",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Last Name",
                'name': "lastName",
                'inputType': "text",
                'placeholder': "Enter Last Name",
                'require': true,
                'classStyle': 'col-6'

            },
            {
                'label': "Age",
                'name': "age",
                'inputType': "text",
                'placeholder': "Enter Age",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': "Address",
                'name': "address",
                'inputType': "textarea",
                'placeholder': "Enter Address",
                'require': true,
                'classStyle': 'col-6'
            },
            {
                'label': 'Caste Type',
                'name': 'casteTypeId',
                'inputType': 'select',
                'optionList': 'staffList',
                'displayKey': 'firstName',
                'uniqueKey': 'staffId',
                'require': true,
                'classStyle' : 'col-6'
            },
        ]
    },
]

export {
    staffContainer
}