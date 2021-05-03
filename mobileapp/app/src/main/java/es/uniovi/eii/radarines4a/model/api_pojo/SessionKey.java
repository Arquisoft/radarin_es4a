
package es.uniovi.eii.radarines4a.model.api_pojo;

import java.util.List;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class SessionKey {

    @SerializedName("kty")
    @Expose
    private String kty;
    @SerializedName("alg")
    @Expose
    private String alg;
    @SerializedName("key_ops")
    @Expose
    private List<String> keyOps = null;
    @SerializedName("ext")
    @Expose
    private Boolean ext;
    @SerializedName("n")
    @Expose
    private String n;
    @SerializedName("e")
    @Expose
    private String e;
    @SerializedName("d")
    @Expose
    private String d;
    @SerializedName("p")
    @Expose
    private String p;
    @SerializedName("q")
    @Expose
    private String q;
    @SerializedName("dp")
    @Expose
    private String dp;
    @SerializedName("dq")
    @Expose
    private String dq;
    @SerializedName("qi")
    @Expose
    private String qi;

    public String getKty() {
        return kty;
    }

    public void setKty(String kty) {
        this.kty = kty;
    }

    public String getAlg() {
        return alg;
    }

    public void setAlg(String alg) {
        this.alg = alg;
    }

    public List<String> getKeyOps() {
        return keyOps;
    }

    public void setKeyOps(List<String> keyOps) {
        this.keyOps = keyOps;
    }

    public Boolean getExt() {
        return ext;
    }

    public void setExt(Boolean ext) {
        this.ext = ext;
    }

    public String getN() {
        return n;
    }

    public void setN(String n) {
        this.n = n;
    }

    public String getE() {
        return e;
    }

    public void setE(String e) {
        this.e = e;
    }

    public String getD() {
        return d;
    }

    public void setD(String d) {
        this.d = d;
    }

    public String getP() {
        return p;
    }

    public void setP(String p) {
        this.p = p;
    }

    public String getQ() {
        return q;
    }

    public void setQ(String q) {
        this.q = q;
    }

    public String getDp() {
        return dp;
    }

    public void setDp(String dp) {
        this.dp = dp;
    }

    public String getDq() {
        return dq;
    }

    public void setDq(String dq) {
        this.dq = dq;
    }

    public String getQi() {
        return qi;
    }

    public void setQi(String qi) {
        this.qi = qi;
    }

}
