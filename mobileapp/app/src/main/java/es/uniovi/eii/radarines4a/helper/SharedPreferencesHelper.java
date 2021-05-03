package es.uniovi.eii.radarines4a.helper;

import android.content.Context;
import android.content.SharedPreferences;

import com.google.gson.Gson;

import es.uniovi.eii.radarines4a.model.User;

import static android.content.Context.MODE_PRIVATE;

/**
 * Encapsulates methods to save a retrieve user information
 */
public class SharedPreferencesHelper {

    private SharedPreferencesHelper instance = null;
    private Context current_context;

    SharedPreferences mPrefs =
            current_context.getSharedPreferences("USER_PREFS", MODE_PRIVATE);

    private SharedPreferencesHelper() { }

    public SharedPreferencesHelper getInstance (Context activity_context) {
        if( this.instance == null ) {
            instance = new SharedPreferencesHelper();
        }
        this.current_context = activity_context;
        return instance;
    }

    public void saveUser( String key, User value ){
        mPrefs.edit().putString(key, new Gson().toJson( value )).apply();
    }

    public User getUser(String key ){
        return new Gson().fromJson(mPrefs.getString(key, null), User.class);
    }
}
