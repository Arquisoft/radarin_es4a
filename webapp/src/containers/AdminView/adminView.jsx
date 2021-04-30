import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios"; 

var f = 0;

function removeUser(webid) {
    /* 
        No es necesario comprobar el webid ya que el admin 
        no aparecería en la lista de usuarios, así que no se
        puede eliminar
    */
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.post(apiEndPoint + "/remove/user", { webid: webid });
}

function banUser(webid) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.post(apiEndPoint + "/ban", { webid: webid });
}

function unbanUser(webid) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.post(apiEndPoint + "/unban", { webid: webid });
}

function AdminView() {
    const [usuariosSistema, setUsuariosSistema] = useState( {} );
    const [usuariosActivos, setUsuariosActivos] = useState( {} );
    const [usuariosBaneados, setUsuariosBaneados] = useState( {} );

    function prueba() {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";

        // Usuarios del sistema
        axios.get( apiEndPoint + "/users/list").then((res) => { setUsuariosSistema(res.data) });
        // Usuarios activos
        axios.get( apiEndPoint + "/users/currently" , { users: usuariosSistema }).then((res) => { setUsuariosActivos(res.data) });
        // Usuarios baneados
        axios.get( apiEndPoint + "/users/ban").then((res) => { setUsuariosBaneados(res.data) });
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
            <table class="default">
                {
                    Object.keys(usuariosSistema).map( (sistema) => {
                        return (
                            <tr>
                                <td>{ usuariosSistema[sistema].webid }</td>
                                <td>
                                    <Button type="button" variant="outline-primary" onClick=
                                    {() => {
                                                removeUser(usuariosSistema[sistema].webid);
                                                window.location.reload();
                                            }
                                    }> Eliminar usuario </Button> 
                                </td>
                                <td>
                                    <Button type="button" variant="outline-primary" onClick=
                                    {() => {
                                                banUser(usuariosSistema[sistema].webid);
                                                window.location.reload();
                                            }
                                    }> Banear usuario </Button> 
                                </td>
                            </tr>
                        );
                    })
                }
            </table>
            <h3>Usuarios activos</h3>
            <ul>
                {
                     Object.keys(usuariosActivos).map( (activo) => {
                        return (
                            <tr>
                                <td>{ usuariosActivos[activo].webid }</td>
                                <td>
                                    <Button type="button" variant="outline-primary" onClick=
                                    {() => {
                                                banUser(usuariosActivos[activo].webid);
                                                window.location.reload();
                                            }
                                    }> Banear usuario </Button> 
                                </td>
                            </tr>
                        );
                    })
                }
            </ul>
            <h3>Usuarios baneados</h3>
            <table class="default">
                {
                     Object.keys(usuariosBaneados).map( (ban) => {
                        return (
                            <tr>
                                <td>{ usuariosBaneados[ban].webid }</td>                                
                                <td>
                                    <Button type="button" variant="outline-primary" onClick=
                                    {() => {
                                                unbanUser(usuariosBaneados[ban].webid);
                                                window.location.reload();
                                            }
                                    }> Desbanear usuario </Button> 
                                </td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
        </Container>
    );
}

export default AdminView;