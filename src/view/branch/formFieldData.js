const employeeFormContainer = [
    {
        formFields: [
            {
                'label': "Branch Name",
                'name': "branchName",
                'inputType': "text",
                'placeholder': "Enter Branch Name",
                'require': true,
                'classStyle': 'col-6',

            },
            {
                label: 'Contact No',
                name: 'contactNo',
                placeholder: 'Enter Contact No',
                maxlength: '10',
                inputType: 'number',
                require: true,
                'classStyle': 'col-6',
                   
            },
            {
                label: 'Email',
                name: 'email',
                placeholder: 'Enter Email',
                inputType: 'text',
                require: true,
                'classStyle': 'col-12',
                   
            },
            {                
                label: 'Address',
                name: 'address',
                inputType: 'textarea',
                placeholder: 'Enter Address',
                require: true,
                  
            },
            {
                'label': "City",
                'name': "city",
                'inputType': "text",
                'placeholder': "Enter city",
                'require': true,
                'classStyle': 'col-6',
            },
            {
                label: 'Pincode',
                name: 'pincode',
                placeholder: 'Enter Pincode',
                maxlength: '6',
                inputType: 'number',
                require: true,
                'classStyle': 'col-6',
            },
        ]
    },
]

export {
    employeeFormContainer
}