import { Box, Button, Container, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { isAddress } from "ethers";
import useMint from "../hooks/useMint"
import { useState } from "react";

const Mint=({tokenId})=>{
    const [address, setAddress] = useState("");
    const mintNFT = useMint();

    const handleMint = (address, tokenId) => {
        if (!isAddress(address)) {return;}
        mintNFT(address, tokenId);
    }

    return(
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button className="button">Mint</Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450}}>
                    <Dialog.Title>Transfer </Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Mint to an address
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Input
                                value={address}
                                onChange={(e) =>
                                    setAddress(e.target.value)
                                }
                                placeholder="Enter valid address"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button className="cancel-button">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button className="button" onClick={() => {
                                handleMint(address, tokenId)
                            }}>Mint</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

export default Mint;