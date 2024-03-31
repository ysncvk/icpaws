# ICPPaws: A Fullstack Pet Adoption Application on ICP

![home page](/src/icpaws_frontend/public/screen-shot.png)

## Description

ICPPaws is a fullstack pet adoption application developed on the Internet Computer Protocol (ICP). It was created as the final project for the ICP Internship Bootcamp in collaboration with [Rise In](https://www.risein.com/). The backend is implemented using Motoko, while React is utilized for the frontend. Material-UI (Mui) is employed for frontend design. Users can log in to the system using Internet Identity and manage their profiles. They can also create listings for pets available for adoption, view their previous listings, and perform editing or deletion operations on their listings.

## A Brief Overview of the Internet Computer Protocol

ICP (Internet Computer Protocol) is the core protocol of the Internet Computer, a blockchain network. This protocol is used for developing decentralized applications and operates securely and efficiently on a decentralized network. ICP encompasses a set of protocols and algorithms used to manage smart contracts and decentralized databases. Users on the network can store, process, and share data through ICP. As a result, the Internet Computer provides a more scalable, secure, and open internet experience beyond traditional web services.

You can learn more on [ICP](https://internetcomputer.org/)

## Feature Overview: Interactive Dashboard with Pet Record Management

When the user logs into the application with their internet identity, their information is automatically saved to the database. After logging in, a mini dashboard greets the user with a default name "Hi Paws Friend" and a default sweet profile avatar. in the top right corner of the screen. After logging into the system, you can update your profile information and avatar by clicking on the 'Update Profile' button on the dashboard. Alternatively, you can permanently delete your account from the system.

![dashboard](/src/icpaws_frontend/public/dashboard.png)

You can use the "Add New Pet" button on the dashboard to open a popup where you can upload the information and photo of the pet you want to publish. The system will save this information via the canister, and once the process is complete, your listing will be displayed on the main screen. You can list your pets via the my pets button. We will explain this screen. 
 
 ![dashboard](/src/icpaws_frontend/public/addpet.png)

 On the "My Pets" page, you can view the pet listings that you have previously saved in our system. You can edit or delete your selected pet in the popup that appears. Any changes you make will be instantly updated on the main page and in your listing.

  ![dashboard](/src/icpaws_frontend/public/pets.png)


## Future Feature Additions

- Inter-user Messaging Feature for Pet-related Communication
- Mapping the Location of the Pet on a Map
- Implementing an E-commerce Feature for Selling Pet Supplies to Generate Revenue"
- Capability to Donate via Coin for Stray Animals


## You can watch all feauters our video hosted in Youtube

[![ICPaws on youtube](https://img.youtube.com/vi/1UhCUEA7KfM/0.jpg)](https://www.youtube.com/watch?v=1UhCUEA7KfM)

## Installation 

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.

To learn more before you start working with icpaws, see the following documentation available online:

- [Quick Start](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-locally)
- [SDK Developer Tools](https://internetcomputer.org/docs/current/developer-docs/setup/install)
- [Motoko Programming Language Guide](https://internetcomputer.org/docs/current/motoko/main/motoko)
- [Motoko Language Quick Reference](https://internetcomputer.org/docs/current/motoko/main/language-manual)

## Quick Start

If you want to start working on your project right away, you might want to try the following commands:

```bash
cd icpaws/
dfx help
dfx canister --help
```

## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --clean 

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.

If you are making frontend changes, you can start a development server with

```bash
npm start
```

Which will start a server at `http://localhost:8080`, proxying API requests to the replica at port 4943.

## Installing MUI for your project

For implementing frontend in React, using Material UI is a simple and effective way. You can install MUI via 
npm using command below. 
 
 ```bash
 npm install @mui/material @emotion/react @emotion/styled

```  

# Integrate Internet Identity in your project

You can integrate your project follwing instructions on Internet Identity web page.

Ckeckout this [link](https://internetcomputer.org/docs/current/developer-docs/web-apps/user-login/internet-identity/integrate-internet-identity) for detailed info.


While testing your app in local enviorenment, Internet identity provider will be your  backend canister. You have to update
in your frontend code backened canister id. You can find your backend canister id your .env file.

```bash
loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app"
        : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
  },

```