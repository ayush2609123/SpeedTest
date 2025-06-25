export const runtime = 'nodejs';

import { execFile } from 'child_process';
import { promisify } from 'util';
const execFileAsync = promisify(execFile);

export async function GET() {
  try {
    const { stdout } = await execFileAsync('speedtest', ['--json'], { cwd: process.cwd() });
    const data = JSON.parse(stdout);
    const mbps = data.download / 1e6;
    const status =
      mbps >= 500 ? 'GOOD 🚀' :
      mbps >= 100 ? 'AVERAGE 🙂' :
      'POOR 🔴';
    return new Response(JSON.stringify({ mbps: mbps.toFixed(2), status }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('speedtest CLI error:', err);
    return new Response(JSON.stringify({ error: 'Speed test failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
