import React, { useContext } from "react";
import { useState } from "react";
import { db } from "../firebase"
import { collection, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { AuthContext } from "./context/AuthContext"

const Search = () => {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);


    const handleSearch = async () => {
        const q = query(collection(db, "user"), where("displayName", "==", userName));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        }
        catch (err) {
            setErr(true);
        }
    };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async (doc) => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedId + ".date"]: serverTimestamp()
                });
            }
        }
        catch (err) {

        }
        setUser(null);
        setUserName("");
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="Find Chats" onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={userName} />
            </div>
            {err && <span>Something went wrong</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt="" />
                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;