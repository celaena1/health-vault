# Blockchain-Based Decentralised Complaint Management System

A blockchain-powered complaint management platform designed to provide transparency, security, anonymity, and tamper-proof record handling for educational institutions and organisations.

---

## Overview

Traditional complaint systems are centralized and prone to manipulation, deletion of records, and lack of accountability. This project uses blockchain technology to create a decentralized grievance platform where complaints are securely recorded and cannot be altered or deleted.

The system ensures:

- Anonymous complaint submission
- Immutable complaint records
- Transparent complaint tracking
- Secure and verifiable status updates

---

## Problem Statement

In many educational institutions and organisations, existing complaint management systems lack transparency, accountability, and trust.

Users are often reluctant to file complaints due to:

- Fear of retaliation
- Identity exposure
- Possibility of complaints being ignored or deleted

Traditional centralized systems may result in:

- Loss of trust
- Lack of accountability
- No proof of submission
- Poor complaint tracking

This project addresses these issues using blockchain technology to ensure decentralization, immutability, and transparency.

---

## Objectives

### Primary Objective

To design and implement a decentralized complaint management system using blockchain technology for secure and transparent grievance handling.

### Specific Objectives

- Enable anonymous complaint submission
- Prevent modification or deletion of complaint records
- Provide immutable timestamps as proof of submission
- Allow transparent complaint status updates
- Track complaint lifecycle from submission to resolution
- Improve accountability in grievance handling
- Build a user-friendly web interface integrated with blockchain

---

## System Architecture

The system consists of the following layers:

### 1. User Layer

- Students/users submit complaints
- Users track complaint status
- Admins review and update complaints

### 2. Frontend Layer

Built using React.js and Web technologies.

Responsibilities:

- Complaint submission forms
- User dashboards
- Blockchain interaction via MetaMask

### 3. Smart Contract Layer

Implemented using Solidity.

Responsibilities:

- Store complaint records
- Manage complaint statuses
- Record timestamps
- Ensure immutability

### 4. Blockchain Network

Ethereum/Ganache network used for:

- Permanent transaction storage
- Decentralized verification
- Security and transparency

### 5. Off-Chain Storage (Optional)

IPFS can be used for:

- File attachments
- Supporting documents
- Large data storage

Only file hashes are stored on-chain.

---

## Tech Stack

### Blockchain

- Ethereum
- Solidity
- Ganache
- Hardhat / Remix IDE

### Frontend

- React.js
- HTML/CSS/JavaScript
- Bootstrap / Tailwind CSS

### Integration

- Ethers.js / Web3.js
- MetaMask Wallet

### Storage

- IPFS (Optional)

### Development Tools

- Node.js
- VS Code
- Git & GitHub

---

## Project Structure

```text
blockchain-complaint-system/
├── blockchain/
│   ├── contracts/
│   │   └── ComplaintSystem.sol
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   └── hardhat.config.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── constants.js
│   └── package.json
│
├── README.md
└── .env
```

---

## Smart Contract Features

- Complaint registration
- Complaint status updates
- Immutable blockchain records
- Timestamp generation
- Role-based interactions
- Transparent complaint lifecycle tracking

---

## Installation and Setup

### Prerequisites

Install the following:

- Node.js
- MetaMask browser extension
- Git
- Ganache or Hardhat

---

### Clone Repository

```bash
git clone https://github.com/your-username/blockchain-complaint-system.git
cd blockchain-complaint-system
```

---

### Install Backend Dependencies

```bash
cd blockchain
npm install
```

---

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

## Running the Project

### Start Local Blockchain

```bash
cd blockchain
npx hardhat node
```

---

### Deploy Smart Contract

Open another terminal:

```bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address and update it inside:

```text
client/src/constants.js
```

---

### Start Frontend

```bash
cd client
npm start
```

The application will run at:

```text
http://localhost:3000
```

---

## System Workflow

1. User connects MetaMask wallet
2. User submits complaint through frontend
3. Complaint data is stored on blockchain
4. Smart contract records timestamp and status
5. Admin reviews and updates complaint status
6. Users can track complaint progress transparently

---

## Expected Outcomes

- Tamper-proof complaint records
- Anonymous and secure submissions
- Transparent complaint tracking
- Increased trust and accountability
- Functional decentralized web application

---

## Future Enhancements

- IPFS-based document uploads
- Role-based access control
- Multi-admin verification
- Email/SMS notifications
- Deployment on Polygon network
- Mobile application integration

---

## Conclusion

This project demonstrates how blockchain technology can improve transparency, accountability, and trust in complaint management systems.

By combining decentralized storage, smart contracts, and Web3 integration, the system provides a secure and tamper-proof platform for grievance handling.

---

## License

This project is developed for academic and educational purposes.
