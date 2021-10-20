module.exports = {
  reactStrictMode: true,
}
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
const Shell = require('node-powershell');
 
const ps = new Shell({
  executionPolicy: 'Bypass',
  noProfile: true
});
 
ps.addCommand('echo node-powershell');
ps.invoke()
.then(output => {
  console.log(output);
})
.catch(err => {
  console.log(err);
});
