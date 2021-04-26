import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios"; 

var f = 0;

function AdminView() {
    const [lista, setLista] = useState( {} );

    function prueba() {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";

        axios.post( apiEndPoint + "/users/list").then((res) => { setLista(res.data); console.log(lista)});
    }

    if (f<5) {
        prueba();
        f++;
    }
    

    return (
        <Container>
            <h1>Panel del administrador</h1>

            <ul>
                { Object.keys(lista).map( (amigo) => {
                    return (
                    <li>{ lista[amigo].webid }</li>
                    )
                }
                )}
            </ul>
            
        </Container>
    );
}

export default AdminView;