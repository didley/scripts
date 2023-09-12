import { type PathOrFileDescriptor } from "fs";
import { execAsync } from "./execAsync";
import { writeFile } from "fs/promises";

const ROOT_PATH = process.cwd();
const OUTPUTS_PATH = ROOT_PATH + "/outputs/";

async function run(
  cb: (() => unknown) | (() => Promise<unknown>),
): Promise<void> {
  try {
    const output = await cb();
    console.log(output);
  } catch (error) {
    console.log("⚠️ Error with script: ", error);
  }
  console.log(`✨ Script ${cb.name} complete`);
}

async function openFileIn(
  path: PathOrFileDescriptor,
  app: AppKey = "default",
): Promise<string> {
  const openCmd = app !== undefined ? `-a "${APPS[app]}"` : "";

  return await execAsync(`open ${openCmd} ${String(path)}`);
}

const APPS = {
  default: "",
  textEdit: "TextEdit",
  vsCode: "Visual Studio Code",
  chrome: "Google Chrome.app",
  notes: "Notes",
} as const;

async function createJsonFile(
  fileName: string,
  data: object,
  openIn?: AppKey
): Promise<{ successMsg: string; path: string }> {
  if (fileName.endsWith('.json')) {
    fileName.slice(0, -5);
  }

  const PATH = OUTPUTS_PATH + fileName + '.json';

  await writeFile(PATH, JSON.stringify(data));

  await openFileIn(PATH, openIn);

  return { successMsg: `${fileName} created @ ${PATH}`, path: PATH };
}

type AppKey = keyof typeof APPS;

export { AppKey, OUTPUTS_PATH, run, openFileIn, createJsonFile, execAsync };
