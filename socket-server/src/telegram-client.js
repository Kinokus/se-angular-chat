//
// const { Client } = require('tdl');
// const { TDLib } = require('tdl-tdlib-ffi');
// const client = new Client(new TDLib(), {
//   apiId: 824662, // Your api_id
//   apiHash: '333971397b4afbaaf6f2ccac087d050e', // Your api_hash
// });
//
// const { API_ID, API_HASH, PHONE_NUMBER, AUTH_NUMBER, AUTH_PASSWORD } = process.env;
//
// const getLogin = () => ({
//   getPhoneNumber: async (retry) => {
//     if (retry) throw new Error('Phone number retry.');
//
//     return PHONE_NUMBER;
//   },
//   getAuthCode: async (retry) => {
//     if (retry) throw new Error('Auth code retry.');
//
//     return AUTH_NUMBER;
//   },
//   getPassword: async (passwordHint, retry) => {
//     console.log('Password hint: ', passwordHint);
//     if (retry) throw new Error('Password retry.');
//
//     return AUTH_PASSWORD;
//   },
//   // getName: async () => ({ firstName: 'Sebastian', lastName: 'Sipos' })
// });
//
// const run = async () => {
//   // const client = new Client(new TDLib(), {
//   //   apiId: API_ID,
//   //   apiHash: API_HASH,
//   //   verbosityLevel: 10
//   //   // useTestDc: true
//   // });
//   client.on('error', console.error);
//
//   await client.connect();
//   debug('connected.');
//
//   await client.login(getLogin);
//   debug('logged in.');
//
//   // const hmr = require('./hot.js');
//   // hmr(client);
//   // if (module.hot) {
//   //   debug('hot active');
//   //   module.hot.accept('./hot.js', function() {
//   //     debug('accept update');
//   //     require('./hot.js')(client);
//   //   });
//   // }
// };
//
// run().catch(console.error);

const { Client } = require('telegram-client')
main();

async function main() {
  const client = new Client({
    apiId: 824662,
    apiHash: '333971397b4afbaaf6f2ccac087d050e'
  });



  try {
    await client.connect('user', '+972548743498');
    await client.getChats();
    await client.createPrivateChat('USER_ID');
    await client.sendMessage('USER_ID', 'Hello my friend!');
    client.on('__updateMessageSendSucceeded', client.close)
  } catch(e) {
    console.error('ERROR', e)
  }
}
