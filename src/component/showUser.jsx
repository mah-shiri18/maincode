import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import button from "bootstrap/js/src/button";
import { useNavigate } from "react-router-dom";

const ShowUser = (props) => {
    const params = useParams();
    const navigate = useNavigate();

    const [users, setUser] = useState({});
    useEffect(() => {
        async function fetchMyAPI() {
            const respince = await axios.get(
                `https://reqres.in/api/users/${params.id}`
            );
            setUser(respince.data.data);
        }
        fetchMyAPI();
    }, []);

    return (
        <div>
            <img
                src={users.avatar}
                style={{ borderRadius: "50%", width: "100px" }}
                alt=""
            />
            <h4>
                {users.first_name} {users.last_name}
            </h4>
            <h5>{users.email}</h5>
            <button onClick={handleClick}>Navigate to About</button>
        </div>
    );
    function handleClick() {
        navigate("/login");
    }
};
export default ShowUser;
