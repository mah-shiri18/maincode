import * as React from 'react';


export const Input = ({name ,lable, value, handelchange}) => {
    return (
        <div className="mb-3">
            <label htmlFor="email">{lable}</label>
            <input
                id={name}
                className="form-control"
                type="text  "
                value={value}
                name={name}
                onChange={handelchange}


            />
        </div>
    );
};