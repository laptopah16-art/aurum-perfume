const { execSync } = require('child_process');

const PORT = Number(process.env.PORT || 5000);

const run = (cmd) => {
  return execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'], encoding: 'utf8' });
};

const getPidsUsingPort = (port) => {
  try {
    const output = run('cmd /c "netstat -ano -p tcp"');
    const lines = output.split(/\r?\n/);

    const pids = new Set();
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith('TCP')) continue;

      const parts = trimmed.split(/\s+/);
      if (parts.length < 5) continue;

      const localAddress = parts[1];
      const state = parts[3];
      const pid = parts[4];

      if (state !== 'LISTENING') continue;

      const match = localAddress.match(/:(\d+)$/);
      if (!match) continue;

      if (Number(match[1]) === port) {
        pids.add(pid);
      }
    }

    return Array.from(pids);
  } catch {
    return [];
  }
};

const killPid = (pid) => {
  try {
    run(`cmd /c "taskkill /PID ${pid} /F"`);
    return true;
  } catch {
    return false;
  }
};

const main = () => {
  const pids = getPidsUsingPort(PORT);

  if (pids.length === 0) {
    console.log(`✓ Port ${PORT} is free`);
    return;
  }

  console.log(`⚠️  Port ${PORT} is in use. Attempting to free it...`);
  for (const pid of pids) {
    if (killPid(pid)) {
      console.log(`✓ Killed process PID ${pid} on port ${PORT}`);
    } else {
      console.log(`✗ Failed to kill PID ${pid} on port ${PORT}`);
    }
  }
};

main();
