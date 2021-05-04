package es.uniovi.eii.radarines4a.helper.remote;

import es.uniovi.eii.radarines4a.model.api_pojo.FriendsResponse;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.POST;

/**
 * Defines methods to interact with the REST API
 */
public interface APIService {
    // User login
    @POST("/api/user/login")
    Call<LoginResponse> login(@Field("username")   String username,
                              @Field("password")   String password,
                              @Field("ident_prov") String ident_provider);

    // User friends
    @POST("/api/user/friends")
    Call<FriendsResponse> getFriends(@Field("webid") String webid);
}