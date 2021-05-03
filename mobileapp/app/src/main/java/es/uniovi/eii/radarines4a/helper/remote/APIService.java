package es.uniovi.eii.radarines4a.helper.remote;

import es.uniovi.eii.radarines4a.model.api_pojo.LoginResponse;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.POST;

/**
 * Defines methods to interact with the REST API
 */
public interface APIService {
    @POST("/api/user/login")
    Call<LoginResponse> login(@Field("username")   String username,
                              @Field("password")   String password,
                              @Field("ident_prov") String ident_provider);
}