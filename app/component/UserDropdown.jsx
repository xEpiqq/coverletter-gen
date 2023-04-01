import react from "react";
import { useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

import s from "./UserDropdown.module.scss";
//router from next/navigation
import { useRouter } from "next/navigation";

import { signOut, getAuth } from "firebase/auth";


export default function UserDropdown() {
    const router = useRouter();
    const auth = getAuth();

    const [user, loading, error] = useAuthState(auth);
    
  return (
    <div className={s.dropdown}>
      <img className={s.dropdown} alt="user profile" src={user.photoURL} />
      <ul className={s.dropdown_menu}>
        <li className={s.dropdown_item} onClick={() => router.push('/dashboard')}>Dashboard</li>
        <li className={s.dropdown_item} onClick={() => router.push('/dashboard')}>Settings</li>
        <li className={s.dropdown_item} onClick={() => signOut(auth)}>Logout</li>
      </ul>
    </div>
  );
}
