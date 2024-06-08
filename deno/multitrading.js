// @ts-check

export async function multithreading(path) {
  return async (args) => {
    return new Promise((resolve, reject) => {
      const process = Deno.run({
        cmd: ["deno", "run", path],
        stdin: "piped",
        stdout: "piped",
        stderr: "piped",
      });

      const encoder = new TextEncoder();
      const decoder = new TextDecoder();

      (async () => {
        await process.stdin.write(encoder.encode(JSON.stringify(args)));
        process.stdin.close();

        const { code } = await process.status();

        if (code === 0) {
          const output = await process.output();
          resolve(JSON.parse(decoder.decode(output)));
        } else {
          const errorOutput = await process.stderrOutput();
          reject(new Error(decoder.decode(errorOutput)));
        }
      })();
    });
  };
}

export function connectChildMultithreading(callback) {
  (async () => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    const buffer = new Uint8Array(1024);
    const n = await Deno.stdin.read(buffer);
    const args = JSON.parse(decoder.decode(buffer.subarray(0, n)));

    try {
      const result = await callback(args);
      await Deno.stdout.write(encoder.encode(JSON.stringify(result)));
    } catch (err) {
      await Deno.stderr.write(encoder.encode(`Error: ${err.message}`));
    } finally {
      Deno.exit(0);
    }
  })();
}