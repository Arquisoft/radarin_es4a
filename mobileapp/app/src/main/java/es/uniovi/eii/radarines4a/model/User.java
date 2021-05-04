package es.uniovi.eii.radarines4a.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

/**
 * POJO Usuario.
 * Representa un usuario de la aplicación.
 */
public class User implements Parcelable {
    private String webid;
    private String username;
    private String login_provider;
    private String image_url;
    private HashMap<String, Object> session;
    private Date last_seen;
    private List<Friend> friends;
    private GeoPoint last_location;

    public User() { /**/ }

    public User(
            String webid,
            String username,
            String login_provider,
            String image_url,
            HashMap<String, Object> session,
            Date last_seen,
            List<Friend> friends,
            GeoPoint last_location) {

        this.webid = webid;
        this.username = username;
        this.login_provider = login_provider;
        this.image_url = image_url;
        this.session = session;
        this.last_seen = last_seen;
        this.friends = friends;
        this.last_location = last_location;
    }

    protected User(Parcel in) {
        webid = in.readString();
        username = in.readString();
        login_provider = in.readString();
        image_url = in.readString();
        friends = in.createTypedArrayList(Friend.CREATOR);
        last_location = in.readParcelable(GeoPoint.class.getClassLoader());
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(webid);
        dest.writeString(username);
        dest.writeString(login_provider);
        dest.writeString(image_url);
        dest.writeTypedList(friends);
        dest.writeParcelable(last_location, flags);
    }
}
