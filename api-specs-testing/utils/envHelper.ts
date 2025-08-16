export function getEnvConfig(env: string) {
  const configs = {
    test: {
      baseURL: 'https://reqres.in',
      username: 'eve.holt@reqres.in',
      password: 'cityslicka'
    },
    stage: {
      baseURL: 'https://reqres.in', // asume stage = reqres
      username: 'eve.holt@reqres.in',
      password: 'cityslicka'
    }
  };
  return configs[env] || configs.test;
}
// module.exports = { getEnvConfig };
