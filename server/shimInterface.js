const Web3 = require('web3');
const web3 = new Web3('https://geth-8-cazdemun.c9users.io');

const contractAddress = '0xd6cca14f734d53c0f1c539edd1d9d01a03fa28e4';
const contractABI = [{constant:false,inputs:[{name:"_URI",type:"string"},{name:"_promotors",type:"address[]"},{name:"_hash",type:"uint256"}],name:"createProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_id",type:"uint256"}],name:"disableProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_id",type:"uint256"}],name:"signProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{anonymous:false,inputs:[{indexed:true,name:"_id",type:"uint256"}],name:"ThresholdReached",type:"event"},{inputs:[],payable:false,stateMutability:"nonpayable",type:"constructor"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"activeProyects",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"activeProyectsIndex",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"getActiveProyects",outputs:[{name:"",type:"uint256[]"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_id",type:"uint256"}],name:"getProject",outputs:[{name:"",type:"bool"},{name:"",type:"uint256"},{name:"",type:"string"},{name:"",type:"uint256"},{name:"",type:"address[]"},{name:"",type:"address[]"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_id",type:"uint256"}],name:"hasVoted",outputs:[{name:"",type:"bool"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"popularProyects",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"popularProyectsIndex",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"THRESHOLD",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"TOTAL",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"}];

const ProLey = new web3.eth.Contract(contractABI, contractAddress);

exports.createAccount = () => {
    
    let account = web3.eth.accounts.create();
    return account;
}

exports.getActiveProjects = () => ProLey.methods.getActiveProyects().call().then(projectsArray => {
    console.log(projectsArray);
    return projectsArray;
});