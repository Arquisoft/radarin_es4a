package es.uniovi.eii.radarines4a.helper.remote;

public class APIUtils {
    public static final String BASE_URL = "https://radarines4a.herokuapp.com/api/";

    private APIUtils() { /**/ }

    public static APIService getAPIService() {
        return RetrofitClient.getClient(BASE_URL).create(APIService.class);
    }
}