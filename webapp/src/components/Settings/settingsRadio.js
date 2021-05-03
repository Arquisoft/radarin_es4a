import React, { Component } from "react";
import { getText } from "../../i18n";

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
        window.sessionStorage.setItem("radius", document.getElementById("radius").value);
        window.location.href = "/friendsMap";
    }

    render(){
        return (
            <div>
                <h2>{getText("navBar.settingsRadio")}</h2>

                <form className="form-horizontal" onSubmit={this.handleSubmit} >

                    <div>
                        <label>{getText("map.radius.text")}</label>
                        <input type="number" defaultValue={window.sessionStorage.getItem("radius")} placeholder="default = 5" id="radius" name="radius" min="1" max="30" onChange={this.handleChange} />
                    </div>
                    <input href="/friendsMap" type="submit" className="btn btn-primary" value={getText("map.radius.button")}/>
                </form>
            </div>
        );
    }
}

export default Settings;