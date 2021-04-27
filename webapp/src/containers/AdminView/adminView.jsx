import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios"; 

var f = 0;

function removeUser(webid) {
    console.log("Entramos en removeUser para el usuario " + webid);

}

function AdminView() {
    const [lista, setLista] = useState( {} );

    function prueba() {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";

        axios.get( apiEndPoint + "/users/list").then((res) => { setLista(res.data) });
    }

    if (f<5) {
        prueba();
        f++;
    }
    

    return (
        <Container>
        <div id="adminView" class="row justify-content-center">
            <h1>Panel del administrador</h1>
            <h3>Usuarios del sistema</h3>
            <ul>
                { 
                    Object.keys(lista).map( (amigo) => {
                        <Button type="button" variant="outline-primary" onClick={() => removeUser(lista[amigo].webid)}> Eliminar usuario </Button>
                        return (
                            <li>{ lista[amigo].webid }</li>
                        );
                    })
                    
                    
                    /*
                    Object.keys(lista).map( (amigo) => {
                        return (
                            <Button type="button" variant="outline-primary" onClick={() => removeUser(lista[amigo].webid)}> Eliminar usuario </Button>
                        );
                    })
                    */
                }
            </ul>
            <h3>Usuarios activos</h3>
            <ul>
                {
                    
                }
            </ul>
        </div>
        </Container>
    );
}

export default AdminView;