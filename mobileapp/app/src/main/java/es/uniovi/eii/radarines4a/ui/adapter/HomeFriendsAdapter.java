package es.uniovi.eii.radarines4a.ui.adapter;

import android.content.Context;
import android.view.ContextMenu;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;
import es.uniovi.eii.radarines4a.R;
import es.uniovi.eii.radarines4a.model.Friend;

public class HomeFriendsAdapter extends RecyclerView.Adapter<HomeFriendsAdapter.FriendsViewHolder> {

    /* VIEW HOLDER */
    public static class FriendsViewHolder extends RecyclerView.ViewHolder implements View.OnCreateContextMenuListener{
        private ImageView userImage;
        private TextView userName;
        private Button quedarButton;
        private TextView lastUpdateTime;

        public FriendsViewHolder(@NonNull View itemView) {
            super(itemView);
            userImage      = itemView.findViewById(R.id.userImage);
            userName       = itemView.findViewById(R.id.userName);
            quedarButton   = itemView.findViewById(R.id.quedarButton);
            lastUpdateTime = itemView.findViewById(R.id.lastUpdateTime);
        }

        @Override
        public void onCreateContextMenu(ContextMenu menu, View v, ContextMenu.ContextMenuInfo menuInfo) {

        }
    }

    /* ADAPTER */
    private int mNumberItems;
    private Context context;
    List<Friend> friendList;

    public HomeFriendsAdapter(Context context, int numberOfItems, List<Friend> userList) {
        this.mNumberItems = numberOfItems;
        this.friendList = userList;
        this.context = context;
    }

    // Override the Adapter methods
    @NonNull
    @Override
    public FriendsViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {

        // Inflate our new itemview using a LayoutInflater.
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());

        // Set to false, so that the inflated layout will not be immediately attached to its parent viewgroup.
        View view = inflater.inflate(R.layout.viewholder_friend, parent, false);

        return new FriendsViewHolder(view);
    }

    @Override
    public void onBindViewHolder(FriendsViewHolder currentItemHolder, int position) {

        // Get the data model based on position
        Friend friend = friendList.get(position);

        // Set item views based on our views and data model
        currentItemHolder.userName.setText(friend.getWebid());

        // TODO: set user photo
        // setUserPhoto(currentItemHolder.userImage, friend.getPhoto)

        // TODO: set the appropriate value
        currentItemHolder.lastUpdateTime.setText("Ahora mismo");

    }

    @Override
    public int getItemCount() {
        return friendList.size();
    }
}
