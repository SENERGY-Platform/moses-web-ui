/*
 * Copyright 2019 InfAI (CC SES)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This is good for local dev environments, when it's better to
// store a projects environment variables in a .gitignore'd file
require('dotenv').config();

const fs = require('fs');
const yargs = require('yargs');

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = yargs.argv.environment;
const isProd = environment === 'prod';

const targetPath = './src/environments/environment.' + environment + '.ts';
const envConfigFile = `
export const environment = {
  production: ${isProd},
  keyCloakRealm: '${process.env.KEYCLOACK_REALM}',
  keyCloakClientId: '${process.env.KEYCLOACK_CLIENT_ID}',
  keycloakUrl: '${process.env.KEYCLOACK_URL}',
  permissionSearchUrl: '${process.env.PERMISSION_SEARCH_URL}',
  mosesUrl: '${process.env.MOSES_URL}',
};
`;

fs.writeFile(targetPath, envConfigFile, function (err: any) {
    if (err) {
        console.log(err);
    }

    console.log(`Output generated at ${targetPath}`);
});