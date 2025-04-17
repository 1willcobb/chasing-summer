import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";


export interface User {
  [x: string]: string;
  pk: `USER#${string}`
  sk: "details"
  username: string;
  email: string;
}

export interface Password {
  pk: `${User["pk"]}`
  sk: "password"
  password: string;
}

export async function getUserById(pk: User["pk"]): Promise<User | null> {
  const db = await arc.tables();
  const result = await db.summer.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": pk },
  });

  const [record] = result.Items;
  if (record) return { pk: record.pk, sk: record.sk, username: record.username, email: record.email };
  return null;
}

export async function getUserByEmail(email: User["email"]): Promise<User | null> {
  console.log("getUserByEmail", email);
  const db = await arc.tables();
  const result = await db.summer.scan({
    FilterExpression: "email = :email",
    ExpressionAttributeValues: { ":email": email },
  });

  const [record] = result.Items;
  if (record) return {     
    pk: record.pk, 
    sk: record.sk, 
    username: record.username,
    email: record.email, 
  }
  return null;
}

export async function getUserByUsername(username: User["username"]): Promise<User | null> {
  console.log("getUserByUsername", username);
  const db = await arc.tables();
  const lowerUsername = username.toLowerCase().trim();
  const result = await db.summer.scan({
    FilterExpression: "username = :username AND sk = :details",
    ExpressionAttributeValues: { 
      ":username": lowerUsername, 
      ":details": "details" 
    },
  });
  const [record] = result.Items;
  if (record) return {     
    pk: record.pk, 
    sk: record.sk, 
    username: record.username,
    email: record.email, 
  }

  return null;
}

export async function getUserPasswordById(pk: User["pk"]) {
  console.log("getUserPasswordById", pk);
  const db = await arc.tables();
  const result = await db.password.query({
    KeyConditionExpression: "pk = :pk and sk = :sk",
    ExpressionAttributeValues: { ":pk": pk, ":sk": "password"},
  });

  const [record] = result.Items;

  if (record) return { hash: record.password }; 
  return null;
}

export async function createUser(
  email: User["email"],
  password: Password["password"],
  username: User["username"],
): Promise<User> {
  console.log(" createUser", email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = `USER#${createId()}` as const as `USER#${string}`;
  const db = await arc.tables();

  if (await getUserByEmail(email)) {
    throw new Error(`User with email ${email} already exists`);
  }

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    throw new Error(`User with username ${username} already exists`);
  }
  
  try {
    await db.password.put({
      pk: userId,
      sk: "password",
      password: hashedPassword,
    });
  
    await db.summer.put({
      pk: userId,
      sk: "details",
      username: username.toLowerCase().trim(),
      email,
      // profilePictureUrl: "https://myfilmfriends.s3.us-west-1.amazonaws.com/Screenshot%202024-07-11%20at%208.38.05%E2%80%AFPM.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMSJGMEQCIDkDxA8N4V5RvXW22Bz1%2BHjX7FQsZIv%2B5CDAWFq6ixwTAiBjJ6XuCmLcxqIB%2B%2BQbujIBA6GTCOmPegWJR1Jn2y26diroAghtEAEaDDQ2NTE1MzIwNzgwMyIMIDBjppXGPnN%2B35KvKsUC4wpaVEVe6DcYAwL%2Bqhb8TvSOlGlmoDcu2LBM5x8I%2FS96lZ8nZF8pW8SSZ16SWt0RgI6AFzWGMU8NbfJRQOrnZjwv2KqPh6MSnKTNdCgq5a0QAHAAV06xfA61Ek%2FnXyPsrisQar%2FPa8Z%2FbZys%2FkuThkqaqZPu%2FRVMB4H%2BeVF1pBdfxfyh47k%2FcS8kHJaMqMy7btXPCenSigRjgw1yNENJwA3bI87Dre12fy6I5%2FgQVrt8XYYaIc3A9N4RtNn%2FUsPjFRMTHy6J%2FRjMoUMpZ7D43nw1%2F2QK9O%2Bah2N70566qCMVTsw8R2qTmR9zZcONWy4E5i7eXwiIIv8pwp0NkjHzYuQ8UwDvtmzJP03AHQ4a0jYqjqLwtFo1kX2Qo4VxnK8U4mrAa5AY2fcajxuuVGJ6jOFRnPhuP9DCfdlmu04jHBLfAmTrLTDivMC0Bjq0Amwt%2BjIv53TlFCGjEnYY8oLucr4irNFiVZ3Xbyb1%2FcLDmI3ApxSaVQVsEQzh8sZKiibB%2BERpaLE6AisAKu4YDeMG6%2B%2FAyai%2FhIwgEXtFGZ%2F%2Fl8N6rlb7A5hcBLikpY8UZxsCj5jwcO1A%2BMRNFiNgjgLEmfZmQtvE0VCroILA1DhVGJJp3jrXVf5ebsXSPRJb8D2CcLnDw3sW2Oup%2FtqDqtxhgVh2WDQsrS5YZDNHJ229LkbJGbl5Z8ECPWxWeymuM9Dy9BOaKUOTgaYv5cUBq1XBk7zyqnO%2B%2BYxoHwEpZeT%2FKdPBnqqahAWEmrSaSMUEa9rnfismaMnn8n0eaoBtYAJhKcS4Zdp6BJgz87MIgjKDzJ5Oo8xDrTuJf86t%2FFkGJYSc7IWjd3esBANz4VvCwzhRso6F&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240712T033918Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAWYTKKVX5XBMYU5HZ%2F20240712%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=dcd5e6b86dd90d4ecc7ecec7a772503740ab9212bc9f751d278b5739d8812eaf",
      // username: username.toLowerCase().trim(),
      // permissions: "guest",
      // status: "active",
      // communities: ["myFilmFriends"],
      // createdAt: new Date().toISOString(),
    });

    return { pk: userId, sk: "details", username, email };
  
  } catch (error) {
    invariant(false, error instanceof Error ? error.message : String(error));
  }
  
}

export async function deleteUser(pk: User["pk"]) {
  console.log("deleteUser", pk);
  const db = await arc.tables();
  await db.password.delete({ pk: pk, sk: "password"});
  await db.summer.delete({ pk: pk, sk: "details" });

}

export async function verifyLogin(
  userOrEmail: string,
  password: Password["password"],
) {
  let user;

  if (userOrEmail.includes("@")) {
    user = await getUserByEmail(userOrEmail);
  } else {
    user = await getUserByUsername(userOrEmail);
  }

  if (!user) {
    return undefined;
  }

  const userPassword = await getUserPasswordById(user.pk);
  if (!userPassword) {
    return undefined;
  }

  const isValid = await bcrypt.compare(password, userPassword.hash);
  if (!isValid) {
    return undefined;
  }

  return user;
}