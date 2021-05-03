package es.uniovi.eii.radarines4a.model;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Represents any point in the SURFACE of the earth.
 */
public class GeoPoint implements Parcelable {
    private float altitude;
    private float latitude;

    public GeoPoint() { /**/ }

    public GeoPoint(float altitude, float latitude) {
        this.altitude = altitude;
        this.latitude = latitude;
    }

    protected GeoPoint(Parcel in) {
        altitude = in.readFloat();
        latitude = in.readFloat();
    }

    public static final Creator<GeoPoint> CREATOR = new Creator<GeoPoint>() {
        @Override
        public GeoPoint createFromParcel(Parcel in) {
            return new GeoPoint(in);
        }

        @Override
        public GeoPoint[] newArray(int size) {
            return new GeoPoint[size];
        }
    };

    public float getAltitude() {
        return altitude;
    }

    public void setAltitude(float altitude) {
        this.altitude = altitude;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeFloat(altitude);
        dest.writeFloat(latitude);
    }
}
