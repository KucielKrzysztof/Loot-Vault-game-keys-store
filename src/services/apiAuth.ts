import { supabase } from "./supabase";
import type {
  User,
  AuthResponse,
  UserResponse,
  OAuthResponse,
} from "@supabase/supabase-js";

/* TYPES */
export interface LoginArgs {
  email: string;
  password: string;
}

export interface SignupArgs extends LoginArgs {
  fullName: string;
}

export interface UpdateUserArgs {
  fullName?: string;
  password?: string;
  email?: string;
  avatar?: string | File;
}

/**
 * Get current user based on the active session
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("Problem verifying user");
  }

  return data?.user || null;
}

/* Standard login */
export async function login({
  email,
  password,
}: LoginArgs): Promise<AuthResponse["data"]> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error.message);
    throw new Error("problem with login user");
  }
  return data;
}

/* OAuth login */
export async function loginWithGoogle(): Promise<OAuthResponse["data"]> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/home`,
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error("Could not authenticate with Google");
  }

  return data;
}

/* User registration */
export async function signup({
  email,
  password,
  fullName,
}: SignupArgs): Promise<AuthResponse["data"]> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: "" },
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error("problem with registration of user");
  }

  return data;
}

/* Logout */
export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error("problem with logout!");
  }
}

/* User info update  */
export async function updateUserInfo({
  fullName,
  password,
  email,
  avatar,
}: UpdateUserArgs): Promise<UserResponse["data"]> {
  let avatarUrl = typeof avatar === "string" ? avatar : "";

  if (avatar instanceof File) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) throw new Error("No user found for avatar upload");
    const fileName = `avatar-${userData.user.id}-${Date.now()}`;

    const { error: storageError } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatar);

    if (storageError) throw new Error("Error uploading avatar");

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    avatarUrl = urlData.publicUrl;
  }

  const updateData: any = {};

  if (password) updateData.password = password;
  if (email) updateData.email = email;

  if (fullName || avatarUrl) {
    updateData.data = {};
    if (fullName) updateData.data.fullName = fullName;
    if (avatarUrl) updateData.data.avatar = avatarUrl;
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error.message);
    throw new Error("problem with updating data!");
  }

  return data;
}
