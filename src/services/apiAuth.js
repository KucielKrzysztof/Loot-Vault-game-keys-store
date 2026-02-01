import { supabase } from "./supabase";

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("Problem verifying user");
  }

  return data?.user || null;
}

export async function login({ email, password }) {
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

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/home",
    },
  });

  if (error) {
    console.error(error.message);
    throw new Error("Could not authenticate with Google");
  }

  return data;
}

export async function signup({ email, password, fullName }) {
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

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
    throw new Error("problem with logout!");
  }
}

export async function updateUserInfo({ fullName, password, email, avatar }) {
  let avatarUrl = avatar;

  if (avatar instanceof File) {
    const { data: userData } = await supabase.auth.getUser();
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

  let updateData = {};

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
