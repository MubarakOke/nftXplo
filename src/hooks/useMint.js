import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import toast from 'react-hot-toast';
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { getNFTContract } from "../constants/contracts";

const useMint = () => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();

    return useCallback(
        async (address, tokenId) => {
            if (!isSupportedChain(chainId))
                return console.error("Wrong network");
            const readWriteProvider = getProvider(walletProvider);
            const signer = await readWriteProvider.getSigner();

            const contract = getNFTContract(signer);
            const toastId= toast.loading('Minting...');
            try {
                const transaction = await contract.safeMint(address, tokenId, {value:"1000000000000000"});
                console.log("transaction: ", transaction);
                const receipt = await transaction.wait();

                toast.remove(toastId)
                if (receipt.status) {
                    toast.success(`Minting successful!`);
                }

                console.log("Failed to mint");
            } catch (error) {
                toast.remove(toastId)
                toast.error(`Minting failed! ${error.reason}`)
            }
        },
        [chainId, walletProvider]
    );
};

export default useMint;