import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href="/" className="w-36 text-[#451675] font-semibold">
          <Image
            src="/assets/images/SN_name.svg"
            width={128}
            height={38}
            alt="ScriptNest logo"
          />
        </Link>
        <p className="p-semibold-18">2024 Script Nest. All Rights Reserved</p>
        <Link href="/privacy" className="p-semibold-18 text-primary-500">
          Privacy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

/*
<Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={128}
            height={38}
          />
*/
