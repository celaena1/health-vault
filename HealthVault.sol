// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HealthVault {
    // Array of CIDs for each patient
    mapping(address => string[]) private patientRecords;

    // Access control: patient => doctor => bool
    mapping(address => mapping(address => bool)) private accessList;

    // Doctor role list (for demo purposes)
    mapping(address => bool) private doctors;

    // Events
    event RecordUploaded(address indexed patient, string cid);
    event AccessGranted(address indexed patient, address indexed doctor);
    event AccessRevoked(address indexed patient, address indexed doctor);

    // Upload a new encrypted file CID
    function uploadRecord(string memory cid) public {
        patientRecords[msg.sender].push(cid);
        emit RecordUploaded(msg.sender, cid);
    }

    // Patient grants access to a doctor's wallet address
    function grantAccess(address doctor) public {
        accessList[msg.sender][doctor] = true;
        // Optionally mark them as a doctor in the system so the frontend can detect them easily
        doctors[doctor] = true; 
        emit AccessGranted(msg.sender, doctor);
    }

    // Patient revokes access
    function revokeAccess(address doctor) public {
        accessList[msg.sender][doctor] = false;
        emit AccessRevoked(msg.sender, doctor);
    }

    // Check if doctor has access
    function hasAccess(address patient, address doctor) public view returns (bool) {
        // A patient always has access to their own records
        if (patient == doctor) return true;
        return accessList[patient][doctor];
    }

    // Utility function for frontend role detection
    function isDoctor(address user) public view returns (bool) {
        return doctors[user];
    }

    // Fetch all CIDs for a patient (caller must have access)
    function getRecords(address patient) public view returns (string[] memory) {
        require(hasAccess(patient, msg.sender), "Access denied");
        return patientRecords[patient];
    }
}
