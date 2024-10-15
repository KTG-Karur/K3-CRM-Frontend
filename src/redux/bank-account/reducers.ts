// employee/reducers.ts
const initialState = {
  getBankAccountList: [],
  createBankAccountData: null,
  updateBankAccountData: null,
  isLoading: false,
  errorMessage: null,
  getBankAccountSuccess: false,
  getBankAccountFailure: false,
  createBankAccountSuccess: false,
  createBankAccountFailure: false,
  updateBankAccountSuccess: false,
  updateBankAccountFailure: false,
  deleteBankAccountSuccess: false,
  deleteBankAccountFailure: false,
};

export default function bankAccountReducer(state = initialState, action: any) {
  switch (action.type) {
    case "GET_BANK_ACCOUNT_SUCCESS": {
      return {
        ...state,
        getBankAccountSuccess: true,
        getBankAccountList: action.payload.data.data,
        getBankAccountFailure: false,
      };
    }
    case "GET_BANK_ACCOUNT_FAILURE": {
      return {
        ...state,
        getBankAccountFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        getBankAccountSuccess: false,
      };
    }
    case "RESET_GET_BANK_ACCOUNT": {
      return {
        ...state,
        getBankAccountSuccess: false,
        getBankAccountFailure: false,
        getBankAccountList: [],
        errorMessage: null,
      };
    }

    case "CREATE_BANK_ACCOUNT_SUCCESS": {
      return {
        ...state,
        createBankAccountSuccess: true,
        createBankAccountData: action.payload.data.data,
        createBankAccountFailure: false,
      };
    }
    case "CREATE_BANK_ACCOUNT_FAILURE": {
      return {
        ...state,
        createBankAccountFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        createBankAccountSuccess: false,
      };
    }
    case "RESET_CREATE_BANK_ACCOUNT": {
      return {
        ...state,
        createBankAccountSuccess: false,
        createBankAccountFailure: false,
        createBankAccountData: null,
        errorMessage: null,
      };
    }

    case "UPDATE_BANK_ACCOUNT_SUCCESS": {
      return {
        ...state,
        updateBankAccountSuccess: true,
        updateBankAccountData: action.payload.data.data,
        updateBankAccountFailure: false,
      };
    }
    case "UPDATE_BANK_ACCOUNT_FAILURE": {
      return {
        ...state,
        updateBankAccountFailure: true,
        errorMessage: action.errorMessage.errorMessage,
        updateBankAccountSuccess: false,
      };
    }
    case "RESET_UPDATE_BANK_ACCOUNT": {
      return {
        ...state,
        updateBankAccountSuccess: false,
        updateBankAccountFailure: false,
        updateBankAccountData: null,
        errorMessage: null,
      };
    }

    // case "DELETE_BANK_ACCOUNT_SUCCESS": {
    //   return {
    //     ...state,
    //     deleteBankAccountSuccess: true,
    //     deleteBankAccountFailure: false,
    //   };
    // }
    // case "DELETE_BANK_ACCOUNT_FAILURE": {
    //   return {
    //     ...state,
    //     deleteBankAccountFailure: true,
    //     errorMessage: action.errorMessage.errorMessage,
    //     deleteBankAccountSuccess: false,
    //   };
    // }
    // case "RESET_DELETE_BANK_ACCOUNT": {
    //   return {
    //     ...state,
    //     deleteBankAccountSuccess: false,
    //     deleteBankAccountFailure: false,
    //     errorMessage: null,
    //   };
    // }

    default: {
      return state;
    }
  }
}
