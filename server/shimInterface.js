const Web3 = require('web3');
const web3 = new Web3('https://geth-8-cazdemun.c9users.io');

const contractAddress = '0x2d228dfdac85658606cfc44177f7cbf9f54c7446';
const contractABI = [{constant:!1,inputs:[{name:"_voter",type:"address"},{name:"_value",type:"uint8"},{name:"_id",type:"uint256"}],name:"voteProject",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"},{name:"",type:"uint256"}],name:"totalVotes",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"TOTAL",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"getActiveProjects",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_id",type:"uint256"}],name:"signProject",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"THRESHOLD",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_URI",type:"string"},{name:"_promotors",type:"address[]"},{name:"_hash",type:"bytes32"},{name:"_ubigeo",type:"uint256"}],name:"createProject",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"popularProjects",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"activeProjects",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"activeProjectsIndex",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_id",type:"uint256"}],name:"hasVoted",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_id",type:"uint256"}],name:"getProject",outputs:[{name:"_status",type:"bool"},{name:"_hash",type:"bytes32"},{name:"_uri",type:"string"},{name:"_totalSigns",type:"uint256"},{name:"_signers",type:"address[]"},{name:"_promotors",type:"address[]"},{name:"_ubigeo",type:"uint256"},{name:"_totalVotes",type:"uint256[4]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_id",type:"uint256"}],name:"disableProject",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"popularProjectsIndex",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{inputs:[],payable:!1,stateMutability:"nonpayable",type:"constructor"},{anonymous:!1,inputs:[{indexed:!0,name:"_id",type:"uint256"}],name:"ThresholdReached",type:"event"}];

const ProLey = new web3.eth.Contract(contractABI, contractAddress);

exports.createAccount = () => {
    let account = web3.eth.accounts.create();
    return account;
}

exports.createProject = () => {
    
    
}

exports.getActiveProjects = () => ProLey.methods.getActiveProjects().call()
                                    .then(projectsArray => {

                                        return Promise.all(
                                                projectsArray.map(
                                                    project => ProLey.methods.getProject(project).call()
                                                                .then(rawData => formatProject(rawData)))
                                                ).then(projects => projects);
                                    });

exports.voteProject = (dni, value, id) => {
    let account = web3.eth.accounts.create(dni);

    let voteProjectData = ProLey.methods.voteProject(account.address, value, id).encodeABI();
    console.log(account);
    console.log(voteProjectData);
    
    let tx = {            
        gasPrice: "0",
        to: contractAddress,
        value: 0x0,
        data: voteProjectData
    }
    
    return web3.eth.estimateGas(tx)
    .then(gasEstimated => web3.eth.accounts.signTransaction(Object.assign(tx, {gas: gasEstimated}), account.privateKey))
    .then(signedTx => web3.eth.sendSignedTransaction(signedTx.rawTransaction))
    .then(txReceipt => txReceipt)
    .catch(err => err);
}
    

formatProject = rawData => {return {
    status: rawData[0],    
    hash: rawData[1],    
    uri: rawData[2],    
    status: rawData[3],    
    voters: rawData[4],    
    promotors: rawData[5],
    ubigeo: rawData[6]
}}
