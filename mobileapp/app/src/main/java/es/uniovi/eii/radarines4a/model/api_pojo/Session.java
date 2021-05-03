
package es.uniovi.eii.radarines4a.model.api_pojo;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class Session {

    @SerializedName("credentialType")
    @Expose
    private String credentialType;
    @SerializedName("issuer")
    @Expose
    private String issuer;
    @SerializedName("authorization")
    @Expose
    private Authorization authorization;
    @SerializedName("sessionKey")
    @Expose
    private SessionKey sessionKey;
    @SerializedName("idClaims")
    @Expose
    private IdClaims idClaims;
    @SerializedName("webId")
    @Expose
    private String webId;

    public String getCredentialType() {
        return credentialType;
    }

    public void setCredentialType(String credentialType) {
        this.credentialType = credentialType;
    }

    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    public Authorization getAuthorization() {
        return authorization;
    }

    public void setAuthorization(Authorization authorization) {
        this.authorization = authorization;
    }

    public SessionKey getSessionKey() {
        return sessionKey;
    }

    public void setSessionKey(SessionKey sessionKey) {
        this.sessionKey = sessionKey;
    }

    public IdClaims getIdClaims() {
        return idClaims;
    }

    public void setIdClaims(IdClaims idClaims) {
        this.idClaims = idClaims;
    }

    public String getWebId() {
        return webId;
    }

    public void setWebId(String webId) {
        this.webId = webId;
    }

}
