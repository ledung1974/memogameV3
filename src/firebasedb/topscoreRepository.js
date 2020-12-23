import { db } from "../firebasedb/configFirebase";

export function writeToDatabase (position, newPlayerScore, refName){
    let uid = newPlayerScore.uid;
    let name = newPlayerScore.name;
    let score = newPlayerScore.score;
    let clicks = newPlayerScore.clicks;
    //Using set() overwrites data at the specified location, including any child nodes.
    db.ref(refName + position).set({uid, name, score, clicks});
}

export async function readFromDatabase (fromID, toID, refName){
    let topScores = [];
    for (let i = fromID;i <= toID; i++){
        await db.ref(refName + i).once('value').then(function(snapshot) 
            {
                let uid = (snapshot.val() && snapshot.val().uid) || "null";
                let name = (snapshot.val() && snapshot.val().name) || "null";
                let score = (snapshot.val() && snapshot.val().score) || null;
                let clicks = (snapshot.val() && snapshot.val().clicks) || null;
                topScores.push({uid, name, score, clicks});
            });
    }
    return topScores;
}

