import { promisify } from "util";
import { exec } from "child_process";

export async function execAsync(command: string): Promise<string> {
  const _exec = promisify(exec);
  try {
    const res = await _exec(command);
    return res.stdout;
  } catch (error: any) {
    throw "stderr" in error ? error.stderr : error;
  }
}
