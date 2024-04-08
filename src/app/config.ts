import { http, createConfig } from "wagmi";
import { optimism } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [optimism],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  transports: {
    [optimism.id]: http('https://lb.drpc.org/ogrpc?network=optimism&dkey=Avibgvi26EjPsw76UtdwmsSYYtsQM8QR7riTDs9_4c5n'),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
