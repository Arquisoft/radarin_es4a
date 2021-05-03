package es.uniovi.eii.radarines4a.ui.activities;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import es.uniovi.eii.radarines4a.R;
import es.uniovi.eii.radarines4a.model.User;

public class HomeActivity extends AppCompatActivity {

    private User usuario;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Usuario que ha iniciado sesión en la aplicación
        usuario = getIntent().getParcelableExtra("USUARIO");

        setContentView(R.layout.activity_home);

        // Bindear la NavigationView
        BottomNavigationView navView = findViewById(R.id.nav_view);

        // Pasar el ID de cada destino (Perfil, Maps, Notifications)
        AppBarConfiguration appBarConfiguration =
                new AppBarConfiguration.Builder(
                    R.id.bottom_nav_my_profile,
                    R.id.bottom_nav_my_map,
                    R.id.bottom_nav_my_notifications).build();

        // Host del resto de fragments
        NavController navController = Navigation.findNavController(
                this, R.id.nav_host_fragment);

        // Setup
        NavigationUI.setupActionBarWithNavController(
                this, navController, appBarConfiguration);
        NavigationUI.setupWithNavController(navView, navController);
    }
}