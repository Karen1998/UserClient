import { join } from 'path';
import fs from 'fs';

let config = fs.readFileSync(join(__dirname, './config.json'));
config = JSON.parse(config);

if (!config.port) {
  config.port = 8080;
}

export default config;
