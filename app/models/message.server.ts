import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";


export interface Message {
  pk: `USER#${string}`
  sk: `MESSAGE#${string}`
  json: string;
}


export async function getAllMessages(pk: Message["pk"]): Promise<Message[]> {
  const db = await arc.tables();
  const result = await db.summer.query({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": pk,
      ":skPrefix": "MESSAGE#",
    },
  });

  return result.Items.map((item: any) => ({
    pk: item.pk,
    sk: item.sk,
    json: item.json,
  }));
}



export async function createMessage(pk: Message["pk"], content: object): Promise<Message> {
  const db = await arc.tables();
  const sk: Message["sk"] = `MESSAGE#${createId()}`;
  const json = JSON.stringify(content);

  const newMessage: Message = { pk, sk, json };

  await db.summer.put(newMessage);
  return newMessage;
}

export async function deleteMessage(pk: Message["pk"], sk: Message["sk"]): Promise<void> {
  const db = await arc.tables();
  await db.summer.delete({ pk, sk });
}

export async function deleteAllMessages(pk: Message["pk"]): Promise<void> {
  const db = await arc.tables();
  const result = await db.summer.query({
    KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
    ExpressionAttributeValues: {
      ":pk": pk,
      ":skPrefix": "MESSAGE#",
    },
  });

  const deletePromises = result.Items.map((item: Message) => {
    return db.summer.delete({ pk, sk: item.sk });
  });

  await Promise.all(deletePromises);
}
 