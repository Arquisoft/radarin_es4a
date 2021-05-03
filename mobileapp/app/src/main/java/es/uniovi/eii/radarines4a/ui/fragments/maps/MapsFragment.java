package es.uniovi.eii.radarines4a.ui.fragments.maps;
import android.annotation.SuppressLint;
import android.location.Location;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapView;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.tasks.Task;
import com.google.android.libraries.places.api.Places;
import com.google.android.libraries.places.api.net.PlacesClient;

import java.util.concurrent.Executor;

import es.uniovi.eii.radarines4a.R;

public class MapsFragment extends Fragment implements OnMapReadyCallback {
    private FusedLocationProviderClient fusedLocationProviderClient;
    private PlacesClient placesClient;
    private Location lastKnownLocation;
    private MapView mapView;
    private GoogleMap googleMap;

    private int current_zoom = 15;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {
        super.onCreateView(inflater, container, savedInstanceState);

        View view = inflater.inflate(R.layout.fragment_maps, container, false);

        // Init places client with maps API KEY
        Places.initialize(this.getContext(), "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY");
        placesClient = Places.createClient(this.getContext());

        // Construct a FusedLocationProviderClient.
        fusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this.getActivity());

        mapView = getView().findViewById(R.id.mapView);

        mapView.getMapAsync(this);
        mapView.onCreate(savedInstanceState);

        return view;
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        this.googleMap = googleMap;
        getCurrentUserlocation();
        // TODO: Show user friends
        // TODO: Display a circle
        // TODO: Use cool markers
        // TODO: Update map zoom on seekBarRadius value change
    }

    private void getCurrentUserlocation() {
        LatLng defaultLocation = new LatLng(-33, 151.2106085);

        @SuppressLint("MissingPermission")
        Task<Location> locationResult = fusedLocationProviderClient.getLastLocation();
        locationResult.addOnCompleteListener((Executor) this, task -> {

            // Could get user location
            if (task.isSuccessful()) {
                lastKnownLocation = task.getResult(); // Update it

                // If it is not null
                if (lastKnownLocation != null) {

                    // Move the camera
                    googleMap.animateCamera(
                            CameraUpdateFactory.newLatLngZoom(
                                    new LatLng(
                                            lastKnownLocation.getLatitude(),
                                            lastKnownLocation.getLongitude()), current_zoom));
                }

            } else { // If not, just move the camera to the default position
                googleMap.animateCamera(CameraUpdateFactory
                        .newLatLngZoom(defaultLocation, current_zoom));
                googleMap.getUiSettings().setMyLocationButtonEnabled(false);
            }
        });
    }
}