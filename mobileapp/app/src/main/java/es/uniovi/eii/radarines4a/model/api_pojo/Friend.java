
package es.uniovi.eii.radarines4a.model.api_pojo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Friend {

    @SerializedName("webid")
    @Expose
    private String webid;
    @SerializedName("photo")
    @Expose
    private String photo;

    public String getWebid() {
        return webid;
    }

    public void setWebid(String webid) {
        this.webid = webid;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

}
