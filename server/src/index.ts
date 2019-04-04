import { Application } from './Application';

const app = new Application();
app.start().catch((e) => {
  console.error(e);
  process.exit(1);
});
