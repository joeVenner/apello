import FileHeader from "../components/FileHeader";
import Navbar from "../components/Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
      </Head>
      <div
        className={`App mesh-bg bg-surface relative text-blanc min-h-screen overflow-hidden w-full flex flex-col`}
      >
        <FileHeader
          appPath="/"
          title="Apello"
          description="Evolving the Cosmos ecosystem with tooling for your community."
        />
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;