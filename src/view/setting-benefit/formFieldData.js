const settingBenefitContainer = [
    {
        formFields: [           
                        
            {
                'label': "Benefit Name",
                'name': "benefitName",
                'inputType': "text",
                'placeholder': "Enter Benefit Name",
                'require': true,
                'isDisabled':true,
                'classStyle' : 'col-6'
            },
            {
                'label': "Benefit Percentage",
                'name': "benefitPercentage",
                'inputType': "number",
                'placeholder': "Enter Benefit Percentage",
                'require': true,
                'classStyle' : 'col-6'
            },
        ]
    },
]

export {
    settingBenefitContainer
}