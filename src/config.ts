import * as path from 'path';
import * as cors from 'cors';
import * as _ from 'lodash';
import { AppConfig } from './models/app-config';
import { getEnvConfig } from './misc/env-config-loader';
import { parseConfig } from './config-manager/config-parser';

process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '/config');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
let exportedConfig = config as AppConfig;

let isDebugging = false;

// Get the environment configurations
const webEnvConfigs = getEnvConfig();

// Read the supplied arguments
process.argv.forEach(function (val) {
  if (val != null && typeof val === 'string') {
    if (val === '-debug') isDebugging = true;
  }
});

const DEBUG_MODE = isDebugging;

const CORS_OPTIONS: cors.CorsOptions = {
  origin: exportedConfig.CLIENT_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

const ENVIRONMENT = process.env['NODE_ENV'] || 'development';

exportedConfig = {
  ...exportedConfig,
  ENVIRONMENT,
  CORS_OPTIONS,
  DEBUG_MODE,
};
/*
Merge the web env configs with the exported configs (so we won't delete any existing values),
environment configurations always have higher priority.
*/
exportedConfig = _.merge(exportedConfig, webEnvConfigs);

// Parse all config values to replace special chars such as '~'
parseConfig(exportedConfig);

export default exportedConfig as AppConfig;
