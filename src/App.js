import { Component } from "react";
import { Navbars } from "./component/navbar";
import Home from "./component/home";
import { Login } from "./component/login";
import { BrowserRouter as  Router} from "react-router-dom";
import {Routes ,  Route } from "react-router-dom";
import {Dashbord} from "./component/Dashbord";
import {LogoutToken} from "./component/logoutToken";
import { Container } from "react-bootstrap";
class App extends Component {

    state= {
        user:null
    }

    async componentDidMount() {
        const Token=localStorage.getItem('token')
        if (!Token){
            this.setState({user:null})
            // this.props.history.push('/login')
            console.log(300)
// History('/login')
// window.location.href='/login'
//             window.location.reload(true)
//             window.location.href = "/login";
            return;


        }
        const Body={ "national_id": "4285846004"}
        const response = await fetch('https://api-crm-dev.savest.ir:443/rpc/ib_investor_portal_info', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${Token}`, // notice the Bearer before your token
            },
            body: JSON.stringify(Body)

        })
        const data = await response.json();








        if (!response){
            this.setState({user:null})


            return;

        }
        this.setState({user:data})





    }






    render() {
        return (
              <>

                <Navbars/>
                <div className="m-lg-5">

                    <Routes>
                      <Route path="/home" element={<Home/>} />
                      <Route path="/Login" element={<Login/>} />
<Route>
                        {/*<Route path="/Dashbord" element={<Dashbord/>} />*/}
                      <LogoutToken component={Home} path='/home'/>
</Route>
                  </Routes>

                </div>

            </>
        );
    }
}
export default App;
