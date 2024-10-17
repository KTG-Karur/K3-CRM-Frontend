const staffTabs = [
    {
        label: 'Personal Info',
        name: 'personalInfo',
        icon: 'mdi mdi-account-circle',
        defaultActiveKey: 'personalInfo',
        activeKey: 'personalInfo',
        children: [
            {
                formFields: [
                    {
                        label: 'Sur Name',
                        name: 'surNameId',
                        inputType: 'select',
                        optionList: 'surNameList',
                        displayKey: 'surName',
                        uniqueKey: 'surNameId'
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'First Name',
                        name: 'firstName',
                        inputType: 'text',
                        placeholder: 'Enter First Name',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Last Name',
                        name: 'lastName',
                        inputType: 'text',
                        placeholder: 'Enter Last Name',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Age',
                        name: 'age',
                        inputType: 'text',
                        placeholder: 'Enter Age',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Contact No',
                        name: 'contactNo',
                        placeholder: 'Enter Contact No',
                        maxlength: '10',
                        inputType: 'number',
                        require: true,
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Alternative Contact No',
                        name: 'alternativeContactNo',
                        placeholder: 'Enter Alternative Contact No',
                        maxlength: 10,
                        inputType: 'number',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Email',
                        name: 'email',
                        placeholder: 'Enter Email',
                        inputType: 'text',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Gender',
                        name: 'genderId',
                        inputType: 'select',
                        optionList: 'genderList',
                        displayKey: 'genderName',
                        uniqueKey: 'genderId',
                        selectedObj : "genderObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'textarea',
                        placeholder: 'Enter Address',
                    },
                ],
            },
            
        ],
    },
    {
        label: 'Other Detail',
        name: 'otherDetail',
        icon: 'mdi mdi-checkbox-marked-circle-outline',
        children: [
            
            {
                formFields: [
                    {
                        'label': 'Department',
                        'name': 'departmentId',
                        'inputType': 'select',
                        'optionList': 'departmentList',
                        'displayKey': 'departmentName',
                        'uniqueKey': 'departmentId',
                        selectedObj : "proofTypeObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Designation',
                        'name': 'designationId',
                        'inputType': 'select',
                        'optionList': 'designationList',
                        'displayKey': 'designationName',
                        'uniqueKey': 'designationId'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Bank Account',
                        'name': 'bankAccountId',
                        'inputType': 'select',
                        'optionList': 'bankAccountList',
                        'displayKey': 'bankAccountName',
                        'uniqueKey': 'bankAccountId'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Branch',
                        'name': 'branchId',
                        'inputType': 'select',
                        'optionList': 'branchList',
                        'displayKey': 'branchName',
                        'uniqueKey': 'branchId'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': "Date Of Joining",
                        'name': "dateOfJoining",
                        'inputType': "date",
                        'placeholder': "Enter DOJ"
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': "Date Of Reliving",
                        'name': "dateOfReliving",
                        'inputType': "date",
                        'placeholder': "Enter DOR"
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'Role',
                        'name': 'roleId',
                        'inputType': 'select',
                        'optionList': 'roleList',
                        'displayKey': 'roleName',
                        'uniqueKey': 'roleId'
                    },
                ],
            },
            {
                formFields: [
                    {
                        'label': 'User',
                        'name': 'userId',
                        'inputType': 'select',
                        'optionList': 'userList',
                        'displayKey': 'userName',
                        'uniqueKey': 'userId'
                    },
                ],
            },           
            {
                formFields: [
                    {
                        label: 'Marital Status',
                        name: 'martialStatusId',
                        inputType: 'select',
                        optionList: 'maritalStatusList',
                        displayKey: 'maritalStatusName',
                        uniqueKey: 'martialStatusId',
                        selectedObj : "maritalStatusObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Image Proof',
                        name: 'imageProof',
                        inputType: 'file',
                    },
                ],
            },
        ],
    },
    {
        label: 'Address Info',
        name: 'addressInfo',
        icon: 'mdi mdi-home',
        children: [
           {
                formFields: [
                    {
                        label: 'Address Type',
                        name: 'addressTypeId',
                        inputType: 'select',
                        optionList: 'addressTypeList',
                        displayKey: 'addressTypeName',
                        uniqueKey: 'addressTypeId',
                        onChange : "onHandleProofType",
                        selectedObj : "addressTypeObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Address',
                        name: 'address',
                        inputType: 'text',
                        placeholder: 'Enter Address',
                    },
                ],
            },
           {
                formFields: [
                    {
                        label: 'Land Mark',
                        name: 'landmark',
                        inputType: 'text',
                        placeholder: 'Enter Land Mark',
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'State',
                        name: 'stateId',
                        inputType: 'select',
                        optionList: 'stateList',
                        displayKey: 'stateName',
                        uniqueKey: 'stateId',
                        onChange : "onHandleState",
                        selectedObj : "stateObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'District',
                        name: 'districtId',
                        inputType: 'select',
                        optionList: 'districtList',
                        displayKey: 'districtName',
                        uniqueKey: 'districtId',
                        onChange : "onHandleProofType",
                        selectedObj : "districtObj"
                    },
                ],
            },
            {
                formFields: [
                    {
                        label: 'Pincode',
                        name: 'pincode',
                        inputType: 'number',
                        placeholder: 'Enter Pincode',
                    },
                ],
            },
        ],
    }
];

export { staffTabs };
