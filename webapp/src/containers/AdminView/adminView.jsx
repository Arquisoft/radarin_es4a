import React, { useState, Fragment } from "react";
import { Container } from "react-bootstrap";
import { Card, CardContent, Button, TableRow, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
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
    window.location.reload();
}

function banUser(webid) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.post(apiEndPoint + "/ban", { webid: webid });
    window.location.reload();
}

function unbanUser(webid) {
    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    axios.post(apiEndPoint + "/unban", { webid: webid });
    window.location.reload();
}

function AdminView() {
    const columns = [
        { field: "id", headerName: "User", width: 400 }
    ];
    const [rowsUsers, setRowsUsers] = useState([]);
    const [rowsActiveUsers, setRowsActiveUsers] = useState([]);
    const [rowsBannedUsers, setRowsBannedUsers] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionModelActive, setSelectionModelActive] = React.useState([]);
    const [selectionModelBanned, setSelectionModelBanned] = React.useState([]);

    function insertData() {
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";

        // Usuarios del sistema
        var temp = [];
        var systemUsers = [];
        
        axios.get( apiEndPoint + "/users/system").then((res) => { res.data.map( (item) => systemUsers.push(item)) });

        console.log(systemUsers);
        systemUsers.map((item, index) => {
            var user = { id: item.webid }
            temp.push(user);
        });

        setRowsUsers(temp);

        // Usuarios activos
        var temp2 = [];
        var systemUsers2 = [];
        
        axios.get( apiEndPoint + "/users/currently").then((res) => { systemUsers2.push(res.data) });

        // Usuarios baneados
        var temp3 = [];
        var systemUsers3 = [];
        
        axios.get( apiEndPoint + "/users/ban").then((res) => { systemUsers3.push(res.data) });
    }

    if (f<5) {
        insertData();
        f++;
    }

    return (
        <Container>
            <h1>Panel del administrador</h1>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>Usuarios del sistema</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsUsers} columns={columns} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModel(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModel} />
                        </Box>
                        <Button onClick={() => removeUser(selectionModel)}>Delete</Button>
                        <Button onClick={() => banUser(selectionModel)}>Ban</Button>
                    </CardContent>
                </Card> 
            </Fragment>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>Usuarios activos</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsActiveUsers} columns={columns} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModelActive(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModelActive} />
                        </Box>
                        <Button onClick={() => banUser(selectionModelActive)}>Ban</Button>
                    </CardContent>
                </Card> 
            </Fragment>
            <Fragment>
                <Card>
                    <CardContent>
                        <h3>Usuarios baneados</h3>
                        <Box height="24em">
                        <DataGrid rows={rowsBannedUsers} columns={columns} pageSize={5} checkboxSelection

                            onSelectionModelChange={(newSelection) => {
                                setSelectionModelBanned(newSelection.selectionModel);
                            }}

                            selectionModel={selectionModelBanned} />
                        </Box>
                        <Button onClick={() => unbanUser(selectionModelBanned)}>Unban</Button>
                    </CardContent>
                </Card> 
            </Fragment>
        </Container>
    );
}

export default AdminView;