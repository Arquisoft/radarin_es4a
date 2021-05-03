
package es.uniovi.eii.radarines4a.model.api_pojo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class IdClaims {

    @SerializedName("iss")
    @Expose
    private String iss;
    @SerializedName("sub")
    @Expose
    private String sub;
    @SerializedName("aud")
    @Expose
    private String aud;
    @SerializedName("exp")
    @Expose
    private Integer exp;
    @SerializedName("iat")
    @Expose
    private Integer iat;
    @SerializedName("jti")
    @Expose
    private String jti;
    @SerializedName("nonce")
    @Expose
    private String nonce;

    public String getIss() {
        return iss;
    }

    public void setIss(String iss) {
        this.iss = iss;
    }

    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public String getAud() {
        return aud;
    }

    public void setAud(String aud) {
        this.aud = aud;
    }

    public Integer getExp() {
        return exp;
    }

    public void setExp(Integer exp) {
        this.exp = exp;
    }

    public Integer getIat() {
        return iat;
    }

    public void setIat(Integer iat) {
        this.iat = iat;
    }

    public String getJti() {
        return jti;
    }

    public void setJti(String jti) {
        this.jti = jti;
    }

    public String getNonce() {
        return nonce;
    }

    public void setNonce(String nonce) {
        this.nonce = nonce;
    }

}
