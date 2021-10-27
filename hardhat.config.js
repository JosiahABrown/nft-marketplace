require("@nomiclabs/hardhat-waffle");

const fs = require("fs")
const privateKey = fs.readFileSync(".secret").toString().trim();
const projectId = "af695e3666d443c2b8477a2941470fb8";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/af695e3666d443c2b8477a2941470fb8',
      accounts: [privateKey]
    },
    mainnet: {
      url: 'https://polygon-mainnet.infura.io/v3/af695e3666d443c2b8477a2941470fb8',
      accounts: [privateKey]
    },
  },  
  solidity: "0.8.4",
};
