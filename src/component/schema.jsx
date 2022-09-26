import * as yup from 'yup';


export const userSchema   = yup.object().shape({

    username: yup
        .string()
        .required("پر کن داداش"),
    password : yup.string().required('پسورد را بزن').min(4,'4 تا بیشتر بزن داداش').label('Password')

});