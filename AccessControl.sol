// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    // Struct storing doctor's access details
    struct Access {
        uint256 expiry;         // timestamp when access expires
        string encryptedKey;    // AES key encrypted with doctor's public key
    }

    // permissions[patientAddress][doctorAddress] = Access
    //a two-dimensional lookup table. First key is patient address, second key is doctor address
    mapping(address => mapping(address => Access)) public permissions;

    event AccessGranted(address indexed patient, address indexed doctor, uint256 expiry);
    event AccessRevoked(address indexed patient, address indexed doctor);

    // Patient grants doctor time-limited access
    function grantAccess(
        address doctor,
        uint256 durationInSeconds,
        string memory encryptedKey
    ) public {
        uint256 expiry = block.timestamp + durationInSeconds;
        permissions[msg.sender][doctor] = Access(expiry, encryptedKey);
        emit AccessGranted(msg.sender, doctor, expiry);
    }

    // Check if doctor currently has valid access
    function hasAccess(address patient, address doctor) public view returns (bool) {
        return block.timestamp < permissions[patient][doctor].expiry;
    }

    // Doctor retrieves their encrypted AES key
    function getEncryptedKey(address patient, address doctor) public view returns (string memory) {
        require(hasAccess(patient, doctor), "Access expired or not granted");
        return permissions[patient][doctor].encryptedKey;
    }

    // Patient manually revokes access
    function revokeAccess(address doctor) public {
        delete permissions[msg.sender][doctor];
        emit AccessRevoked(msg.sender, doctor);
    }
}