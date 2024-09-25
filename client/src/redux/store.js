import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../redux/features/auth/authSlice'
import accountReducer from './features/account/accountSlice';
import categoryReducer from './features/category/categorySlice';
import expenseReducer from './features/expenses/expenseSlice';
import contactReducer from './features/contacts/contactSlice';


export const store = configureStore({
    reducer:{
        auth:authReducer,
        account:accountReducer,
        category:categoryReducer,
        expense:expenseReducer,
        contact:contactReducer
    }
});