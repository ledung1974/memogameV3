import { db } from "../firebasedb/configFirebase";

export async function getPlayer(uid) {
  const playerRef = db.ref(`players/${uid}`);
  const playerSnapshot = await playerRef.once("value");
  return playerSnapshot.val();
}

export function savePlayer(player) {
  const playerRef = db.ref(`players/${player.uid}`);
  return playerRef.set(player);
}


