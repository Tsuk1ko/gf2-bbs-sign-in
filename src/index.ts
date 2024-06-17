import { GF2BBSClient } from './client';

const { BBS_AUTH } = process.env;

if (!BBS_AUTH) {
  console.error('No BBS_AUTH');
  process.exit(1);
}

let hasError = false;

for (const [i, auth] of BBS_AUTH.split(';').entries()) {
  if (!auth) continue;

  console.log(`[${i}]`);

  try {
    const client = new GF2BBSClient(auth);

    const isSigned = await client.getSignInStatus();

    if (isSigned) {
      console.log('今日已签到');
    } else {
      const { item, count } = await client.signIn();
      console.log(`签到成功，获得【${item}*${count}】`);
    }
  } catch (error) {
    hasError = true;
    console.error(error);
  }
}

if (hasError) process.exit(1);
