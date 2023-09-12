import { AppKey, createJsonFile, openFileIn, run } from "./utils/cliUtils";

const OPEN_IN: AppKey = 'textEdit'

run(helloWorldFile);

async function helloWorldFile(): Promise<void> {
  const helloWorld = { hello: "world" };

  const res = await createJsonFile("helloWorld", helloWorld);

  openFileIn(res.path, OPEN_IN);
}
