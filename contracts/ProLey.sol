pragma solidity ^0.4.24;

contract ProLey {
   
    uint public THRESHOLD;
    uint public TOTAL;
    
    mapping(uint256 => mapping(address=>bool)) signs;
    mapping(uint256 => mapping(address=>uint8)) votes; 
    // 0 - no vote / 1 - positive / 2 - negative 
    
    event ThresholdReached(uint indexed _id);
    
    mapping(uint256 => bool) isActive; //o es rechazado o ya fue aprobado
    mapping(uint256 => bytes32) hashes; //id to hash
    mapping(uint256 => string) URIs; // id to URI
    mapping(uint256 => uint256) totalSigns;// id to total votes
    mapping(uint256 => address[]) signers;
    mapping(uint256 => address[]) promotors;
    
    mapping(uint256 => uint256[4]) public totalVotes;
    // id to total votes - 4th index are total values
    // critical overflow vulnerability
    
    mapping(uint256 => uint256) ubigeos;
    
    
    uint256[] public activeProjects;
    mapping(uint256 => uint) public activeProjectsIndex;// id to total votes
    
    uint256[] public popularProjects;
    mapping(uint256 => uint) public popularProjectsIndex;// id to total votes
    
    // presented or not presented
    
    function voteProject(address _voter, uint8 _value, uint256 _id) {
        require(_value != 1 || _value != 2);
        require(votes[_id][_voter] != _value);
        
        if (votes[_id][_voter] == 0){
            totalVotes[_id][3] = totalVotes[_id][3] + 1;
        }
        if (votes[_id][_voter] != 0){
            totalVotes[_id][votes[_id][_voter]] = totalVotes[_id][votes[_id][_voter]] - 1;
        }
        votes[_id][_voter] = _value;
        totalVotes[_id][_value] = totalVotes[_id][_value] + 1;
    }
    
    constructor () public {
        THRESHOLD = 3;
        TOTAL = 0;
        activeProjects.push(0);
        address[] memory dummyProm = new address[](1);
        dummyProm[0] = msg.sender;
    
        // Dummy Projects
        createProject("google.com",
                        dummyProm,
                        keccak256(0xB221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79),
                        90903);
        
        createProject("instagram.com",
                        dummyProm,
                        keccak256(0xB221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79),
                        2207);
        
        createProject("twitter.com",
                        dummyProm,
                        keccak256(0xB221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79),
                        131005);
        
        createProject("facebook.com",
                        dummyProm,
                        keccak256(0xB221D9DBB083A7F33428D7C2A3C3198AE925614D70210E28716CCAA7CD4DDB79),
                        40507);
    }
    
    function createProject(string _URI, address[] _promotors, bytes32 _hash, uint256 _ubigeo) {
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
        ubigeos[TOTAL] = _ubigeo;
        signProject(TOTAL);
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
    (bool _status, 
    bytes32 _hash, 
    string _uri, 
    uint _totalSigns, 
    address[] _signers, 
    address[] _promotors, 
    uint256 _ubigeo,
    uint256[4] _totalVotes){
        
    _status= isActive[_id];
     _hash= hashes[_id];
    _uri= URIs[_id];
    _totalSigns= totalSigns[_id]; 
    _signers= signers[_id]; 
    _promotors= promotors[_id]; 
    _ubigeo= ubigeos[_id];
    _totalVotes= totalVotes[_id];
    
    }
    
    function signProject(uint _id) public {
        require(_id != 0);
        require(_id <= TOTAL);
        require(activeProjectsIndex[_id] != 0);
        require(signs[_id][msg.sender] == false);

        totalSigns[_id] = totalSigns[_id] + 1;
        if (totalSigns[_id] == THRESHOLD) {
            emit ThresholdReached(_id);
            popularProjects.push(_id);
            popularProjectsIndex[_id] = popularProjects.length - 1;
        }
        signs[_id][msg.sender] = true;
        signers[_id].push(msg.sender);
    }
    
    
    function hasVoted(uint _id) view returns (bool) {
        return signs[_id][msg.sender];
    }
    
    function getActiveProjects() view returns (uint256[]) {
        return (activeProjects);
    }
    
}
