pragma solidity ^0.4.24;

contract ProLey {
   
    uint public THRESHOLD;
    uint public TOTAL;
    
    mapping(uint => mapping(address=>bool)) votes;
    
    event ThresholdReached(uint indexed _id);
    
    mapping(uint => bool) isActive; //o es rechazado o ya fue aprobado
    mapping(uint => uint256) hashes; //id to hash
    mapping(uint => string) URIs; // id to URI
    mapping(uint => uint) totalVotes;// id to total votes
    mapping(uint => address[]) voters;
    mapping(uint => address[]) promotors;
    
    
    uint256[] public activeProjects;
    mapping(uint => uint) public activeProjectsIndex;// id to total votes
    
    uint[] public popularProjects;
    mapping(uint => uint) public popularProjectsIndex;// id to total votes
    
    constructor () public {
        THRESHOLD = 3;
        TOTAL = 4;
        
        activeProjects.push(0);
        
        URIs[1] = "google.com";
        isActive[1] = true;
        activeProjects.push(1);
        activeProjectsIndex[1] = 1;
        promotors[1] = [0xca35b7d915458ef540ade6068dfe2f44e8fa733c];
        // dummy 
        
        URIs[2] = "instagram.com";
        isActive[2] = true;
        activeProjects.push(2);
        activeProjectsIndex[2] = 2;
        promotors[1] = [0xca35b7d915458ef540ade6068dfe2f44e8fa733c, 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c];
        
        URIs[3] = "twitter.com";
        isActive[3] = true;
        activeProjects.push(3);
        activeProjectsIndex[3] = 3;
        promotors[1] = [0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db];
        
        URIs[4] = "facebook.com";
        isActive[4] = true;
        activeProjects.push(4);
        activeProjectsIndex[4] = 4;
        promotors[1] = [0xca35b7d915458ef540ade6068dfe2f44e8fa733c];
    }
    
    function createProject(string _URI, address[] _promotors, uint256 _hash) {
        // Anybody can be put as a promotor, for this, 
        // a new contract (multiwallet style) should be created
        // FIRST ADDRESS IS MAIN PROMOTOR, THE ONE WHO SEND THE MESSAGE
        require(_promotors[0] == msg.sender);
        TOTAL = TOTAL + 1;
        
        activeProjects.push(TOTAL);
        activeProjectsIndex[TOTAL] = activeProjects.length - 1;
        
        URIs[TOTAL] = _URI;
        isActive[TOTAL] = true;
        promotors[TOTAL] = _promotors;
        hashes[TOTAL] = _hash;
    }
    
    function disableProject(uint _id) {
        
        require(activeProjects.length > 1);
        require(activeProjectsIndex[_id] != 0);
        
        // onlyFunctionary
        uint256 tokenIndex = activeProjectsIndex[_id];
        uint256 lastTokenIndex = activeProjects.length - 1;
        uint256 lastToken = activeProjects[lastTokenIndex];
    
        activeProjects[tokenIndex] = lastToken;
        activeProjects[lastTokenIndex] = 0;
    
        activeProjects.length--;
        activeProjectsIndex[_id] = 0;
        activeProjectsIndex[lastToken] = tokenIndex;
    }
    
    function getProject(uint _id) view public returns 
    (bool, uint, string, uint, address[], address[]){
        return (isActive[_id],
        hashes[_id],
        URIs[_id],
        totalVotes[_id],  
        voters[_id],
        promotors[_id]);
    }
    
    function signProject(uint _id) public {
        require(_id != 0);
        require(_id <= TOTAL);
        require(activeProjectsIndex[_id] != 0);
        require(votes[_id][msg.sender] == false);

        totalVotes[_id] = totalVotes[_id] + 1;
        if (totalVotes[_id] == THRESHOLD) {
            emit ThresholdReached(_id);
            popularProjects.push(_id);
            popularProjectsIndex[_id] = popularProjects.length - 1;
        }
        votes[_id][msg.sender] = true;
        voters[_id].push(msg.sender);
    }
    
    
    function hasVoted(uint _id) view returns (bool) {
        return votes[_id][msg.sender];
    }
    
    function getActiveProjects() view returns (uint256[]) {
        return (activeProjects);
    }
    
}
