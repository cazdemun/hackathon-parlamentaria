const Web3 = require('web3');
const web3 = new Web3('https://geth-8-cazdemun.c9users.io');

const contractAddress = '0xca67b0e87c755a54fd6237bc43ce781d9fdd2457';
const contractABI = [{constant:false,inputs:[{name:"_URI",type:"string"},{name:"_promotors",type:"address[]"},{name:"_hash",type:"uint256"}],name:"createProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_id",type:"uint256"}],name:"disableProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{constant:false,inputs:[{name:"_id",type:"uint256"}],name:"signProject",outputs:[],payable:false,stateMutability:"nonpayable",type:"function"},{anonymous:false,inputs:[{indexed:true,name:"_id",type:"uint256"}],name:"ThresholdReached",type:"event"},{inputs:[],payable:false,stateMutability:"nonpayable",type:"constructor"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"activeProjects",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"activeProjectsIndex",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"getActiveProjects",outputs:[{name:"",type:"uint256[]"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_id",type:"uint256"}],name:"getProject",outputs:[{name:"",type:"bool"},{name:"",type:"uint256"},{name:"",type:"string"},{name:"",type:"uint256"},{name:"",type:"address[]"},{name:"",type:"address[]"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"_id",type:"uint256"}],name:"hasVoted",outputs:[{name:"",type:"bool"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"popularProjects",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[{name:"",type:"uint256"}],name:"popularProjectsIndex",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"THRESHOLD",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"},{constant:true,inputs:[],name:"TOTAL",outputs:[{name:"",type:"uint256"}],payable:false,stateMutability:"view",type:"function"}];

const ProLey = new web3.eth.Contract(contractABI, contractAddress);

exports.createAccount = () => {
    let account = web3.eth.accounts.create();
    return account;
}

exports.getActiveProjects = () => ProLey.methods.getActiveProjects().call().then(projectsArray => {
    
    console.log(projectsArray);
    
    projectsArray.forEach( project => {
        console.log(project);
    })
    
    
    //const files = await getFilePaths();

    return Promise.all(projectsArray.map(project => ProLey.methods.getProject(project).call()
                                                    .then(rawData => formatProject(rawData)))
            ).then(projects => projects);
});

formatProject = rawData => {return {
    status: rawData[0],    
    hash: rawData[1],    
    uri: rawData[2],    
    status: rawData[3],    
    voters: rawData[4],    
    promotors: rawData[5],    
}}