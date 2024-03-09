import {
  Box,
  ConnectEmbed,
  ConnectWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  Text,
  ThirdwebProvider,
  trustWallet,
  useAddress,
  useContract,
  walletConnect,
  smartWallet,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {TW_CLIENT_ID, TW_WALLET_FACTORY, SEVEN_COIN} from '@env';
import {BinanceTestnet} from '@thirdweb-dev/chains';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain={BinanceTestnet}
      clientId={TW_CLIENT_ID}
      supportedWallets={[
        // metamaskWallet({
        //   recommended: true,
        // }),
        // rainbowWallet(),
        // walletConnect({
        //   recommended: true,
        // }),
        smartWallet(
          embeddedWallet({
            auth: {
              // you need to enable EmbeddedWallets under your API Key in your thirdweb dashboard:
              // https://thirdweb.com/dashboard/settings/api-keys
              options: ['email', 'google'],
              // you need to add this deeplink in your allowed `Redirect URIs` under your API Key in your thirdweb dashboard:
              // https://thirdweb.com/dashboard/settings/api-keys
              redirectUrl: 'rnstarter://',
            },
          }),
          {
            factoryAddress: TW_WALLET_FACTORY,
            gasless: true,
          },
        ),
        // embeddedWallet({
        //   auth: {
        //     // you need to enable EmbeddedWallets under your API Key in your thirdweb dashboard:
        //     // https://thirdweb.com/dashboard/settings/api-keys
        //     options: ['email', 'google'],
        //     // you need to add this deeplink in your allowed `Redirect URIs` under your API Key in your thirdweb dashboard:
        //     // https://thirdweb.com/dashboard/settings/api-keys
        //     redirectUrl: 'rnstarter://',
        //   },
        // }),
        // trustWallet(),
        // localWallet(),
      ]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const address = useAddress();

  return (
    <Box
      height="100%"
      justifyContent="center"
      paddingHorizontal="xmd"
      backgroundColor="background">
      {address ? (
        <Box gap="md">
          <Text textAlign="center">Welcome!</Text>
          <ConnectWallet
            supportedTokens={{
              [BinanceTestnet.chainId]: [
                {
                  address: SEVEN_COIN, // token contract address
                  name: 'SevenCoin',
                  symbol: '7C',
                  icon: 'https://assets.coingecko.com/coins/images/9956/small/Badge_Dai.png?1687143508',
                },
              ],
            }}
            displayBalanceToken={{
              [BinanceTestnet.chainId]: SEVEN_COIN, // show SEVENCOIN token balance when connected to Base mainnet
            }}
          />
        </Box>
      ) : (
        <Box gap="md">
          <Text textAlign="center">Welcome!</Text>
          <ConnectEmbed modalTitle="" modalTitleIconUrl="" />
        </Box>
      )}
    </Box>
  );
};

export default App;
