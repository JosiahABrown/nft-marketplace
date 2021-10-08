const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
     //deploy the marketplace
     const Market = await ethers.getContractFactory("NFTMarket")
     const market = await Market.deploy()
     await market.deployed() //waits for the market to be deployed
     const marketAddress = market.address //once deployed it will grab the address

     //deploy the nft contract
     const NFT = await ethers.getContractFactory("NFT")
     const nft = await NFT.deploy(marketAddress)
     await nft.deployed()
     const nftContractAddress = nft.address //grabs NFT address once deployed

     let listingPrice = await market.getListingPrice()//grabs listing price
     listingPrice = listingPrice.toString()//turns listing price into a string

     const auctionPrice = ethers.utils.parseUnits('100', 'ether') //100 since we're working with matic

     //creates two tokens
     await nft.createToken("https://www.mytokenlocation.com")
     await nft.createToken("https://www.mytokenlocation2.com")

     //puts both tokens up for sale
     await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
     await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })

     /*in a real world example users will be interacting with the contract through something like Metamask.
     This is a testing environment so we will be using fake local addresses provided by Hardhat*/
     const [_, buyerAddress] = await ethers.getSigners() 

     //execute sale of token to another user
     await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

     //query for and return the unsold items
     let items = await market.fetchMarketItems()
     
     items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId) 
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  });
});
