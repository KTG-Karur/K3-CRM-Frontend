import Swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import _ from 'lodash';
import ReactDOM from 'react-dom';

const showMessage = (type, msg, title = null) => {
    switch (type) {
        case 'info':
            NotificationManager.info(msg, title);
            break;
        case 'success':
            NotificationManager.success(msg, title);
            break;
        case 'warning':
            NotificationManager.warning(msg, title);
            break;
        case 'error':
            NotificationManager.error(msg, title);
            break;
    }
};

const findMultiSelectObj = (optionList, uniqueKey, selectedValues) => {
    if (selectedValues) {
        return optionList.filter((option) =>
            selectedValues.includes(option[uniqueKey])
        );
    }
};

const amountFormat = (amount) => {
    let formattedNumber = parseInt(amount).toFixed(2);
    return formattedNumber;
}

const getFormFieldName = (dynamicForm) => {
    let arr = [];
    dynamicForm.forEach((formDataArr) => {
        formDataArr?.formFields.forEach((subFormData) => {
            if (subFormData?.require) {
                arr.push(subFormData?.name);
            }
        });
    });

    return arr;
};

function fiscalYear(inputDate) {
    const date = moment(inputDate).year();
    let startYear = date;
    let endYear = startYear + 1;
    // if (date.month() < 6) {
    //     startYear -= 1;
    //     endYear -= 1;
    // }
    const fiscalYear = `${startYear}-${endYear.toString().slice(-2)}`;
    return fiscalYear;
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function noOfDayCount(fromDate, toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const differenceInTime = to.getTime() - from.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays + 1;
}

function timerAmPm(time = "") {
    const [hours, minutes] = time.split(':');
    const isPM = hours >= 12;
    const formattedTime = `${((hours % 12) || 12).toString().padStart(2, '0')}:${minutes} ${isPM ? 'PM' : 'AM'
        }`;
    return formattedTime;
}


function DateMonthYear(date) {
    const ddmmyyyy = date.split('-');
    const d = ddmmyyyy[2];
    const m = ddmmyyyy[1];
    const y = ddmmyyyy[0];
    return `${d}-${m}-${y}`;
}

function updateData(arr, id, newState) {
    // arr[id - 1] = newState;
    // return arr;
    return arr.map((item) => (item.id === id ? newState : item));
}

function deleteData(arr, id, accessKey = null) {
    if (accessKey != null) {
        return arr.filter((item) => {
            return item[accessKey] !== id;
        });
    }
    return arr.filter((item) => {
        return item.id !== id;
    });
}

const removeExistsList = async (allList, existsArrayList, key) => {
    const list = allList.filter(item =>
        !existsArrayList.some(existsItem => existsItem[key] === item[key])
    );
    return list;
};

function findObj(optionList = [], accessKey, value = '') {
    const filterData = optionList.filter((item) => item[accessKey] === value);
    return filterData.length > 0 ? filterData[0] : '';
}

function findArrObj(arr, accessKey, id) {
    return arr.filter((item) => item[accessKey] === id);
}

function percentageVal(amount, percentage) {
    return (parseFloat(amount) * parseFloat(percentage)) / 100;
}

function ValtoPercentage(chargeAmount, loanAmt) {
    return (parseFloat(chargeAmount) / parseFloat(loanAmt)) * 100;
}

const dateConversion = (date, format = 'DD-MM-YYYY') => {
    const result = date ? moment(date).format(format) : '';
    return result;
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function objectToKeyValueArray(obj) {
    return (obj).map(([key, value]) => ({ Key: key, Value: value }));
}

const showConfirmationDialog = (
    message,
    callback,
    sucessViewFalse = false,
    confirmButtonText = 'Yes',
    action = 'Successfully',
    successTitle = 'Successfully',
    cancelButtonText = 'No',
    title = 'Are you sure?'
) => {
    Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: {
            icon: 'swal-icon-custom',
        },
    }).then((result) => {
        if (result.isConfirmed && sucessViewFalse) {
            callback();
        } else if (result.isConfirmed) {
            Swal.fire({
                title: action,
                text: successTitle,
                icon: 'success',
                timer: 500,
            });
            setTimeout(() => {
                callback();
            }, 800);
        } else {
            Swal.fire({
                title: 'Cancelled!',
                text: 'Permission denied.',
                icon: 'error',
                customClass: {
                    icon: 'swal-icon-custom',
                },
                timer: 1500,
            });
        }
    });
};

//emi

const annualToMonthlyInterestRate = (annualInterest) => {
    const r = annualInterest / (12 * 100);
    return r;
};

const emiCalculation = (principal, annualInterest, tenurePeriod) => {
    const p = parseFloat(principal);
    const r = annualToMonthlyInterestRate(annualInterest);
    const t = parseFloat(tenurePeriod) * 12;

    const emi = (p * r * Math.pow(1 + r, t)) / (Math.pow(1 + r, t) - 1);

    return emi;
};

const findDueDate = (disbursedDate = formatDate()) => {
    // const disbursedDateArr = disbursedDate.split('-');
    // const year = disbursedDateArr[0];
    // const day = 10;
    // let month = parseInt(disbursedDateArr[1]) + 1;
    // if (parseInt(disbursedDateArr[1]) >= 12) {
    //     month = 1;
    // }
    // return `${year}-${month}-${day}`;
    return moment(disbursedDate).add(1, 'months').date(10).format("YYYY-MM-DD")
};

const findLastDate = (disbursedDate = formatDate(), tenurePeriod) => {
    // Split the disbursedDate into an array of [year, month, day]
    const disbursedDateArr = disbursedDate.split('-');
    let year = parseInt(disbursedDateArr[0]);
    let month = parseInt(disbursedDateArr[1]);
    let day = 10;

    let additionalYears = Math.floor(tenurePeriod / 12);
    let additionalMonths = tenurePeriod % 12;

    year += additionalYears;
    month += additionalMonths;

    if (month > 12) {
        year += 1;
        month -= 12;
    }

    month = month < 10 ? `0${month}` : month;

    return `${year}-${month}-${day}`;
};

const interestForMonth = (remainingPrincipal, monthlyInterestRate) => {
    const monthInterest = parseFloat(remainingPrincipal * monthlyInterestRate);
    return monthInterest;
};

const principalRepayment = (emi, monthInterest) => {
    const principalRepay = parseFloat(emi - monthInterest);
    return principalRepay;
};

const principalRemaining = (remainingPrincipal, principalRepayment) => {
    const principalRemain = parseFloat(remainingPrincipal - principalRepayment);
    return principalRemain;
};

const calculateTotalInterestPayable = (principal, annualInterest, tenurePeriod) => {
    let totalInterestPayable = 0;
    let remainingPrincipal = principal;
    const monthlyInterestRate = annualToMonthlyInterestRate(annualInterest);
    const emi = emiCalculation(principal, annualInterest, tenurePeriod);

    for (let month = 1; month <= tenurePeriod * 12; month++) {
        const monthInterestAmount = interestForMonth(remainingPrincipal, monthlyInterestRate);
        const principalRepay = principalRepayment(emi, monthInterestAmount);
        remainingPrincipal = principalRemaining(remainingPrincipal, principalRepay);

        // Accumulate the interest for the current month
        totalInterestPayable += monthInterestAmount;
    }

    return totalInterestPayable;
};

const removeNullKeyFromObj = (data) => {
    let result =""
    if(Array.isArray(data)){
        result = data.map((obj) => _.omitBy(obj, (value) => value === null));
    }else{
        result = _.omitBy(data, (value) => value === null)
    }
    return result;
}

function numberToRupeesWords(number) {
    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
        'Eighteen', 'Nineteen'
    ];
    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];
    const thousands = [
        '', 'Thousand', 'Lakh', 'Crore'
    ];

    let numStr = number.toString();

    function convertThreeDigits(num) {
        let str = '';
        if (num >= 100) {
            str += ones[Math.floor(num / 100)] + ' Hundred ';
            num %= 100;
        }
        if (num >= 20) {
            str += tens[Math.floor(num / 10)] + ' ';
            num %= 10;
        }
        if (num > 0) {
            str += ones[num] + ' ';
        }
        return str.trim();
    }

    if (number === 0) return 'Zero Rupees';

    let words = '';
    let partCount = 0;

    while (numStr.length > 0) {
        let part = numStr.slice(-3);
        numStr = numStr.slice(0, -3);

        if (parseInt(part) > 0) {
            words = convertThreeDigits(parseInt(part)) + ' ' + thousands[partCount] + ' ' + words;
        }
        partCount++;
    }
    words = words.trim() + ' Rupees';

    return words;
}



export {
    showMessage,
    removeNullKeyFromObj,
    getFormFieldName,
    formatDate,
    showConfirmationDialog,
    updateData,
    deleteData,
    removeExistsList,
    findObj,
    findArrObj,
    percentageVal,
    ValtoPercentage,
    dateConversion,
    findLastDate,
    findDueDate,
    findMultiSelectObj,
    emiCalculation,
    interestForMonth,
    principalRepayment,
    principalRemaining,
    annualToMonthlyInterestRate,
    calculateTotalInterestPayable,
    numberWithCommas,
    DateMonthYear,
    amountFormat,
    capitalizeFirstLetter,
    objectToKeyValueArray,
    noOfDayCount,
    timerAmPm,
    numberToRupeesWords,
    fiscalYear,
};
