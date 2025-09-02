// frontend/pages/_app.tsx
// Custom App component to apply global styles.
// Not for page-specific logic.

import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
