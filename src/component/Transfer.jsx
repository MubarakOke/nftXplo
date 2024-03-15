import { Box, Button, Container, Dialog, Flex, Link, Text, TextField } from "@radix-ui/themes";
import { isAddress } from "ethers";
import useTransfer from "../hooks/useTransfer"
import { useState } from "react";

const Transfer=({tokenId})=>{
    const [addressTo, setAddressTo] = useState("");

    const transfer = useTransfer();

    const handleTransfer = (addressTo, tokenId) => {
        if (!isAddress(addressTo)) {return;}
        transfer(addressTo, tokenId);
    }

    return(
        <>
            <Dialog.Root>
                <Dialog.Trigger>
                    <Button className="button">Transfer</Button>
                </Dialog.Trigger>

                <Dialog.Content style={{ maxWidth: 450 }}>
                    <Dialog.Title>Transfer </Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        Input address
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Address
                            </Text>
                            <TextField.Input
                                value={addressTo}
                                onChange={(e) =>
                                    setAddressTo(e.target.value)
                                }
                                placeholder="Enter valid address"
                            />
                        </label>   
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button className="cancel-button" variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button className="button" onClick={() => {
                                handleTransfer(addressTo, tokenId)
                            }}>Transfer</Button>
                        </Dialog.Close>
                    </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </>
    )
}

export default Transfer;