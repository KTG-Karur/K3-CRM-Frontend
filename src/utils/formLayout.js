import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import FormComponent from './formComponent';
import { getFormFieldName } from './AllFunction';

const FormLayout = forwardRef((props, ref) => {
    const { dynamicForm, noOfColumns, state, setState, errors, setErrors, handleSubmit, toggleModal = null, showSelectmodel = [], optionListState, onChangeCallBack,onClickCallBack,IsEditArrVal } = props;
    const screenWidth = window.innerWidth;
    const noOfCol = 12 / noOfColumns;
    const errorHandle = useRef(null);

    useImperativeHandle(ref, () => ({
        validateFormFields,
    }));
    // Validation
    const validateFormFields = async () => {
        let arr = [];
        const getFormName = await getFormFieldName(dynamicForm);
        getFormName.forEach((formFieldObj) => {
            if (state?.[formFieldObj] === undefined || state?.[formFieldObj] === null || state?.[formFieldObj] === '') {
                arr.push(formFieldObj);
            }
        });
        setErrors(arr);
        onSubmit(arr.length === 0);
    };

    const onSubmit = (isValid) => {
        if (isValid)
            handleSubmit();
    }

    //Remove Errors
    const removeHanldeErrors = (formName) => {
        let copytheArr = errors.filter((item) => item !== formName);
        setErrors(copytheArr);
    };
    return (
        <div className='row'>
            {dynamicForm.map((rowData, index) => {
                return (
                    <div key={index} className={screenWidth > 600 ? `col-${noOfCol}` : 'col-12'}>
                        <FormComponent
                            formField={rowData?.formFields}
                            setState={setState}
                            state={state}
                            onChangeCallBack={onChangeCallBack}
                            onClickCallBack={onClickCallBack}
                            IsEditArrVal={IsEditArrVal}
                            optionListState={optionListState}
                            errors={errors}
                            showSelectmodel={showSelectmodel}
                            toggleModal={toggleModal}
                            removeHanldeErrors={removeHanldeErrors}
                        />
                    </div>
                )
            })}
        </div>
    );
});

export default FormLayout;
