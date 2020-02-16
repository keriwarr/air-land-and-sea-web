import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import { useAuthStore } from "utils/useAuthStore";

const UsersOnlineWidget: React.FC = () => {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const auth = useAuthStore();
  const uid = auth.uid();

  useEffect(
    () =>
      firebase
        .firestore()
        .collection("users-online")
        .onSnapshot(querySnapshot => {
          console.log(uid, querySnapshot.docs);
          setOnlineUsers(
            querySnapshot.docs
              .map(doc => doc.data())
              .filter(data => data.id !== uid)
              .map(data => data.displayName)
          );
        }),
    [uid]
  );

  return (
    <div>
      There {onlineUsers.length === 1 ? "is" : "are"} {onlineUsers.length} other{" "}
      {onlineUsers.length === 1 ? "user" : "users"} online.
      <ul>
        {onlineUsers.map(displayName => (
          <li key={displayName}>{displayName}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersOnlineWidget;
