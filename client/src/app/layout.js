import "../styles/globals.css";
import SessionWrapper from "./SessionProvider";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="cryptomus" content="9d9ae1ed" />
      </head>
      <body>
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
