package es.uniovi.eii.radarines4a.model.api_pojo;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class FriendsResponse {

    @SerializedName("friends")
    @Expose
    private List<Friend> friends = null;

    public List<Friend> getFriends() {
        return friends;
    }

    public void setFriends(List<Friend> friends) {
        this.friends = friends;
    }
}