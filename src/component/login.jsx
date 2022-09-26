import * as React from "react";
import axios from "axios";
import {useState} from "react";
import {Input} from "./input";
import {userSchema} from "./schema";
import {useNavigate} from "react-router-dom";


export const Login = (props) => {
    // *****************
    const [userLoginData, setuserLoginData] = useState([
        {username: '',password:'',errors:[]},
    ]);
    const  username=userLoginData.map(p => p.username)
    const  password=userLoginData.map(p => p.password)
    const history = useNavigate();



    async function handelchange(e) {
        e.preventDefault();
        const input= e.currentTarget
        const accunt=[...userLoginData]
        if (input.name === 'username') {
            accunt.map(p => p.username =input.value)

        }
        if (input.name === 'password') {
            accunt.map(p => p.password = input.value  )

        }
        setuserLoginData(accunt)
    }

    const creatuser =async (e) =>{
        e.preventDefault()
        let formDate ={
            username: e.target[0].value,
            password:e.target[1].value
        }
        try {
            const isvalid = await  userSchema.validate(userLoginData[0],{abortEarly:false})

            return isvalid

        }catch (
            error
            ){
            const answer=[...userLoginData]

            answer.map(p => p.errors =error.errors)

            setuserLoginData(answer)
        }

    }

    async function handeleSubmit(e){
        e.preventDefault()
        const result =await creatuser(e)
        console.log(result)



        delete result['errors']



        console.log(result)

        if (result){
            try {
                const response = await axios.post("https://api-crm-dev.savest.ir/rpc/login", result);
                console.log(response)
                localStorage.setItem('token',response.data.token)
                console.log(response.data.token,'token')

                history('/Dashbord');
                window.location.reload(true);

            }
            catch (
                error
                ){
                const answer=[...userLoginData]

                answer.map(p => p.errors =['ایمیل یا پسورد صحیح نمی باشد'])

                setuserLoginData(answer)
            }

        }
    }
    const Token=localStorage.getItem('token')

 async function test(){
     // const requestOptions = {
     //     headers: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2F2ZXN0Y3JtX29fc2FlZWQiLCJ1c2VybmFtZSI6InNhZWVkIiwiZXhwIjoxNjYzNjU2MzE5fQ.P_5ustH8FomkiGdeC6xELBz8GUEcjHJmqTZFuBl0B_w',
     //     body: { "national_id": "4285846004"}
     // };
     // const responce= await axios.post('https://api-crm-dev.savest.ir:443/rpc/ib_investor_portal_info',
     //     data,header
     //
     // )



     // try {
     //     await axios({
     //         url: 'https://api-crm-dev.savest.ir:443/rpc/ib_investor_portal_info',
     //         method: 'POST',
     //         body:{ "national_id": "4285846004"},
     //         headers: {
     //             'Content-Type': 'application/json',
     //         }
     //     }).then(function (res) {
     //         console.dir(res); // we are good here, the res has the JSON data
     //         return res;
     //     }).catch(function (err) {
     //         console.error(err);
     //     })
     // }
     // catch (err) {
     //     console.error(err);
     // }




const Body={ "national_id": "4285846004"}
     const response = await
         fetch('https://api-crm-dev.savest.ir:443/rpc/ib_investor_portal_info', {
         method: 'POST',
         headers: {
             'Content-type': 'application/json',
             'Authorization': `Bearer ${Token}`, // notice the Bearer before your token
         },
             body: JSON.stringify(Body)

 })


     // const requestOptions = {
     //     method: 'POST',
     //     headers: { 'Content-Type': 'application/json' },
     //     body: JSON.stringify({ title: 'React POST Request Example' })
     // };
     // const response = await fetch('https://reqres.in/api/posts', requestOptions);
     const data = await response.json();
     // this.setState({ postId: data.id });

console.log(data,'data')



 }


    // ****************







    return (
        <div>
            <h1>login</h1>
            <button onClick={test}>test</button>
            <form onSubmit={handeleSubmit}>
                <div className="mb-3">

                    {
                        userLoginData.map(p => p.errors.length === 0 ?
                            <li>{p.errors.length}</li>
                            :
                            <div className='alert alert-danger'>
                                <ul>
                                    {
                                        userLoginData.map(p => <li >{p.errors}{p.errors.length}</li>)
                                    }
                                </ul>
                            </div>
                        )



                    }
                    <Input value={username} name='username' handelchange={handelchange} lable='username'></Input>

                    <Input value={password} name='password' handelchange={handelchange} lable='password'></Input>
                    <button className="btn btn-primary">login</button>
                </div>
            </form>




        </div>
    );



};
