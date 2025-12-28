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
  let updateData = {};

  if (password) updateData.password = password;
  if (email) updateData.email = email;

  if (fullName || avatar) {
    updateData.data = {};
    if (fullName) updateData.data.fullName = fullName;
    if (avatar) updateData.data.avatar = avatar;
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error.message);
    throw new Error("problem with updating data!");
  }

  return data;
}
