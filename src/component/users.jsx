import { Component } from "react";
import axios from "axios";
import LoadingUsers from "./looding/loodingUser";
import button from "bootstrap/js/src/button";
import { Link } from "react-router-dom";
class Users extends Component {
    state = {
        userArray: [],
        loading: true,
    };
    async componentDidMount() {
        const response = await axios.get("https://reqres.in/api/users");
        console.log(response);
        // setTimeout(() => {
        //     this.setState({userArray:response.data.data ,loading:false })
        //
        // } ,3000)
        this.setState({ userArray: response.data.data, loading: false });
    }
    render() {
        return (
            <div>
                <button onClick={this.handleCreate} className="btn btn-primary">
                    creat
                </button>
                <div className="row">
                    {this.state.loading ? (
                        <LoadingUsers />
                    ) : (
                        this.state.userArray.map((user) => {
                            return (
                                <div className="col-4 text-center p-5">
                                    <img
                                        src={user.avatar}
                                        style={{ borderRadius: "50%", width: "100px" }}
                                        alt=""
                                    />
                                    <Link to={`/users/${user.id}`}>
                                        <h4>
                                            {user.first_name} {user.last_name}
                                        </h4>
                                    </Link>
                                    <h5>{user.email}</h5>

                                    <div className="row">
                                        <div className="col-6">
                                            <button
                                                onClick={() => this.handleUpdate(user)}
                                                className="btn btn-info btn-sm"
                                            >
                                                Update
                                            </button>
                                        </div>
                                        <div className="col-6">
                                            <button
                                                onClick={() => this.handleDelete(user)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        );
    }

    handleCreate = async () => {
        this.props.history.push('/Dashbord')
        console.log(11);
        const newUser = {
            first_name: "mohammad",
            last_name: "seyedAghaie",
            email: "mohamadhosein20000@gmail.com",
            avatar:
                "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg",
        };
        const response = await axios.post("https://reqres.in/api/users", newUser);
        console.log(response, 100);
        this.setState({ userArray: [...this.state.userArray, newUser] });
    };

    handleUpdate = async (user) => {
        user.first_name = "updated";
        const response = await axios.put("https://reqres.in/api/users/2", user);
        console.log(response);
        const updatedUsers = [...this.state.userArray];
        const index = updatedUsers.indexOf(user);
        updatedUsers[index] = { ...user };
        this.setState({ userArray: updatedUsers });
    };
    handleDelete = async (user) => {
        const response = await axios.delete("https://reqres.in/api/users/2", user);
        const newUsers = this.state.userArray.filter((u) => u.id !== user.id);
        this.setState({ userArray: newUsers });
    };
}

export default Users;
