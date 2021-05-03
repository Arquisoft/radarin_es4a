import React, { useEffect, useState, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Card, CardContent, Button, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import "./adminView.css";
import { getText } from "../../i18n";

function removeUser(users) {
    /* 
        No es necesario comprobar el webid ya que el admin 
        no aparecería en la lista de usuarios, así que no se
        puede eliminar
    */
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    users.map((user) => {
        axios.post(apiEndPoint + "/remove/user", { webid: user });
        return null;
    })
    window.location.reload();
}

function banUser(users) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    users.map((user) => {
        axios.post(apiEndPoint + "/ban", { webid: user });
        return null;
    })
    window.location.reload();
}

function unbanUser(users) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    users.map((user) => {
        axios.post(apiEndPoint + "/unban", { webid: user });
        return null;
    })
    window.location.reload();
}

function AdminView() {
    const columnsUsers = [
        { field: "id", headerName: "User", width: 400 },
        { field: "lat", headerName: "Latitude", width: 400 },
        { field: "lon", headerName: "Longitude", width: 400 },
        { field: "lastUpdate", headerName: "Last Update", width: 400 }
    ];
    const columns = [
        { field: "id", headerName: "User", width: 400 }
    ];
    const [rowsUsers, setRowsUsers] = useState([]);
    const [rowsActiveUsers, setRowsActiveUsers] = useState([]);
    const [rowsBannedUsers, setRowsBannedUsers] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionModelActive, setSelectionModelActive] = React.useState([]);
    const [selectionModelBanned, setSelectionModelBanned] = React.useState([]);

    var insertData = async function() {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";

        // Usuarios del sistema
        var systemUsers = [];
        
        axios.get( apiEndPoint + "/users/system").then((res) => { res.data.map( (item) => {
            systemUsers.push({ id: item.webid, lat: item.data.lat, lon: item.data.lon , lastUpdate: new Date(item.data.timestamp).toUTCString() });
            return null;
            });
            setRowsUsers(systemUsers);
         });

        // Usuarios activos
        var systemUsers2 = [];
        
        axios.get( apiEndPoint + "/users/currently").then((res) => { res.data.map( (item) => {
            systemUsers2.push({ id: item });
            return null;
            });
            setRowsActiveUsers(systemUsers2);
         });
         
        // Usuarios baneados
        var systemUsers3 = [];
        
        axios.get( apiEndPoint + "/users/ban").then((res) => { res.data.map( (item) => {
            systemUsers3.push({ id: item.webid });
            return null;
            });
            setRowsBannedUsers(systemUsers3);
         });
    }

    useEffect(() => {
        insertData();
      }, []);

    return (
        <Container width="100%">
            <h1>{getText("admin.panel")}</h1>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>{getText("admin.system")}</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsUsers} columns={columnsUsers} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModel(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModel} />
                        </Box>
                        <Button onClick={() => removeUser(selectionModel)}>{getText("admin.button.remove")}</Button>
                        <Button onClick={() => banUser(selectionModel)}>{getText("admin.button.ban")}</Button>
                    </CardContent>
                </Card> 
            </Fragment>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>{getText("admin.active")}</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsActiveUsers} columns={columns} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModelActive(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModelActive} />
                        </Box>
                        <Button onClick={() => banUser(selectionModelActive)}>{getText("admin.button.ban")}</Button>
                    </CardContent>
                </Card> 
            </Fragment>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>{getText("admin.banned")}</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsBannedUsers} columns={columns} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModelBanned(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModelBanned} />
                        </Box>
                        <Button onClick={() => unbanUser(selectionModelBanned)}>{getText("admin.button.unban")}</Button>
                    </CardContent>
                </Card> 
            </Fragment>
        </Container>
    );
}

export default AdminView;