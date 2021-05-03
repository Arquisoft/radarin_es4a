package es.uniovi.eii.radarines4a.ui.fragments.profile;

import android.content.Intent;
import android.location.Geocoder;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import es.uniovi.eii.radarines4a.R;
import es.uniovi.eii.radarines4a.model.Friend;
import es.uniovi.eii.radarines4a.model.User;
import es.uniovi.eii.radarines4a.ui.adapter.HomeFriendsAdapter;

public class ProfileFragment extends Fragment {

    List<Friend> friendsList;
    User usuario;
    RecyclerView friendsRecycler;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState ) {
        super.onCreateView(inflater, container, savedInstanceState);

        View view = inflater.inflate(R.layout.fragment_maps, container, false);
        friendsRecycler = getView().findViewById(R.id.friendsRecycler);

        // TODO: Extract user from shared preferences
        // TODO: Get user friends using REST API
        // friendsList = getUserFriends(usuario.getFriends());

        loadFriendsRecycler();

        return view;
    }

    private void loadFriendsRecycler() {
        friendsRecycler.setHasFixedSize(true);
        friendsRecycler.getRecycledViewPool().setMaxRecycledViews(0, 0);

        loadFriendsOnRecycler();

        RecyclerView.LayoutManager layoutManager = new LinearLayoutManager(this.getContext());
        friendsRecycler.setLayoutManager(layoutManager);
    }

    private void loadFriendsOnRecycler() {
        HomeFriendsAdapter friendsAdapter =
                new HomeFriendsAdapter(getContext(), friendsList.size(), friendsList);
        friendsRecycler.setAdapter(friendsAdapter);
    }

    public void fillProfileData(User usuario){
        // TODO: Complete
    }

    @Override
    public boolean onContextItemSelected(@NonNull MenuItem item) {
        return false;
    }
}
