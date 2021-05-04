package es.uniovi.eii.radarines4a.ui.activities;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.textfield.TextInputEditText;
import es.uniovi.eii.radarines4a.R;
import es.uniovi.eii.radarines4a.helper.SharedPreferencesHelper;
import es.uniovi.eii.radarines4a.helper.remote.APIService;
import es.uniovi.eii.radarines4a.helper.remote.APIUtils;
import es.uniovi.eii.radarines4a.model.User;

public class LoginActivity extends AppCompatActivity {

    private Button login_button;
    private Button signin_button;
    private TextInputEditText username_input_edit;
    private TextInputEditText password_input_edit;
    private Spinner providers_spinner;
    private SharedPreferencesHelper userHelper;

    private APIService mAPIService;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        mAPIService = APIUtils.getAPIService();

        providers_spinner   = findViewById(R.id.provider_spinner);
        password_input_edit = findViewById(R.id.password_input_edit);
        username_input_edit = findViewById(R.id.username_input_edit);
        signin_button       = findViewById(R.id.signin_button);
        login_button        = findViewById(R.id.login_button);


        // Helper to access locally stored users
        userHelper = userHelper.getInstance(getApplicationContext());

        // On login button click log the user in
        login_button.setOnClickListener(view -> {
            String login_provider = providers_spinner.getSelectedItem().toString();
            String username = username_input_edit.getText().toString();
            String password = password_input_edit.getText().toString();

            // Query the user's pod for the information we need
            User logged_in_user = userServerLogin( login_provider, username, password );

            // Save to shared preferences with Gson
            userHelper.saveUser( "usuario", logged_in_user );

            // Notify the user with a toast
            Toast.makeText(getApplicationContext(), R.string.logged_in, Toast.LENGTH_SHORT);
        });
    }

    private User userServerLogin(String login_provider, String username, String password) {
        User current_user;

        /*
        mAPIService.login(login_provider, username, password).enqueue(new Callback<LoginResponse>() {

            @Override
            public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
                // Update current user
            }

            @Override
            public void onFailure(Call<LoginResponse> call, Throwable t) {
                // Notify login error
                Toast.makeText(getApplicationContext(), R.string.login_error, Toast.LENGTH_SHORT);
            }
        });
         */
        return new User();
    }
}