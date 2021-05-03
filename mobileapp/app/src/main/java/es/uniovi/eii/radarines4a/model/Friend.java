package es.uniovi.eii.radarines4a.model;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.Date;

public class Friend implements Parcelable {
    private String webid;
    private String image_url;
    private Date last_seen;
    private GeoPoint last_location;

    public Friend() { /**/ }

    public Friend(String webid, String image_url, Date last_seen, GeoPoint last_location) {
        this.webid = webid;
        this.image_url = image_url;
        this.last_seen = last_seen;
        this.last_location = last_location;
    }

    protected Friend(Parcel in) {
        webid = in.readString();
        image_url = in.readString();
        last_location = in.readParcelable(GeoPoint.class.getClassLoader());
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(webid);
        dest.writeString(image_url);
        dest.writeParcelable(last_location, flags);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<Friend> CREATOR = new Creator<Friend>() {
        @Override
        public Friend createFromParcel(Parcel in) {
            return new Friend(in);
        }

        @Override
        public Friend[] newArray(int size) {
            return new Friend[size];
        }
    };

    public String getWebid() {
        return webid;
    }

    public void setWebid(String webid) {
        this.webid = webid;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Date getLast_seen() {
        return last_seen;
    }

    public void setLast_seen(Date last_seen) {
        this.last_seen = last_seen;
    }

    public GeoPoint getLast_location() {
        return last_location;
    }

    public void setLast_location(GeoPoint last_location) {
        this.last_location = last_location;
    }
}
