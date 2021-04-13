import React, { Component } from 'react';

class Settings extends Component{

    constructor(props) {
        super(props);
        var radius = 5;
        radius.valueOf();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
         this.radius = document.getElementById("radius").value ;
    }

    handleSubmit(event) {
        event.preventDefault();
        window.sessionStorage.setItem("radius",this.radius);
        window.location.href = "/friendsMap";
    }

    render(){
        return (
            <div>
                <h2>Settings</h2>

                <form className="form-horizontal" onSubmit={this.handleSubmit} >

                    <div>
                        <label>Radius in km around the user to load on the map :</label>
                        <input type="number" defaultValue={window.sessionStorage.getItem("radius")} placeholder="default = 5" id="radius" name="radius" min="0" onChange={this.handleChange} />
                    </div>
                    <input href="/friendsMap" type="submit" className="btn btn-primary" value="Apply"/>
                </form>
            </div>
        );
    }
}

export default Settings;