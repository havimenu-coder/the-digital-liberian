import { execSync } from 'child_process';
try {
  const py = execSync('python --version', { encoding: 'utf-8' });
  console.log('Python:', py.trim());
} catch (e) {
  console.log('No python on PATH');
}
try {
  const git = execSync('git --version', { encoding: 'utf-8' });
  console.log('Git:', git.trim());
} catch (e) {
  console.log('No git on PATH');
}
