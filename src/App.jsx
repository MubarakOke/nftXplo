import { Box, Button, Container, Flex, Text, Link } from "@radix-ui/themes";
import { configureWeb3Modal } from "./connection";
import "@radix-ui/themes/styles.css";
import Header from "./component/Header";
import AppTabs from "./component/AppTabs";
import Mint from "./component/Mint";
import Transfer from "./component/Transfer";
import useCollections from "./hooks/useCollections";
import { Toaster } from 'react-hot-toast';
import useOwnedNfts from "./hooks/useOwnedNfts";

configureWeb3Modal();

function App() {
    const tokensData = useCollections();
    let [myTokenIds, otherTokenIds, otherUserTokenIdMappping] = useOwnedNfts();


    const myTokensData = tokensData.filter((x, index) =>
        myTokenIds.includes(index)
    );

    const allTokenData = tokensData.map((collection, index)=>({
        ...collection,
        isMyCollection: myTokenIds.includes(index),
        isOtherCollection: otherTokenIds.includes(index)
    }))

    return (
        <Container>
            <Header />
            <main className="mt-6">
                <AppTabs
                    MyNfts={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {myTokensData.length === 0 ? (
                                <Text>No NFT owned yet</Text>
                            ) : (
                                myTokensData.map((x) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        <Link href={`${import.meta.env.VITE_opensea}/${x.edition}`} target="_blank">
                                            View on OpenSea
                                        </Link>
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                    AllCollections={
                        <Flex align="center" gap="8" wrap={"wrap"}>
                            {tokensData.length === 0 ? (
                                <Text>Loading...</Text>
                            ) : (
                                allTokenData.map((x, item) => (
                                    <Box key={x.dna} className="w-[20rem]">
                                        <img
                                            src={x.image}
                                            className="w-full object-contain"
                                            alt={x.name}
                                        />
                                        <Text className="block text-2xl">
                                            Name: {x.name}
                                        </Text>
                                        <Text className="block">
                                            Description: {x.description}
                                        </Text>
                                        {
                                            x.isMyCollection?
                                            (
                                                <flex align="center" display="flex" direction="row" gap="8">
                                                    <div>
                                                        <Link href={`${import.meta.env.VITE_opensea}/${x.edition}`} target="_blank">
                                                            View on OpenSea
                                                        </Link>
                                                    </div>
                                                    <div>
                                                        <Transfer tokenId={x.edition}/>
                                                    </div>
                                                </flex>
                                            ):
                                            (
                                                x.isOtherCollection ? (
                                                    <flex>
                                                        <div>
                                                            <Link href={`${import.meta.env.VITE_opensea}/${x.edition}`} target="_blank">
                                                                    View on OpenSea
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            {`${otherUserTokenIdMappping[x.edition][0].slice(0,8)}...${otherUserTokenIdMappping[x.edition][0].slice(35,-1)}`}
                                                        </div>
                                                    </flex>
                                                    ):(
                                                    (
                                                        <Mint tokenId={x.edition} />
                                                    )
                                                )
                                            )
                                        }
                                    </Box>
                                ))
                            )}
                        </Flex>
                    }
                />
            </main>
            <Toaster />
        </Container>
    );
}

export default App;
