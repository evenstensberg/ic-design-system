import React, { useState, useContext, useEffect } from "react";
import { IcSwitch } from "@ukic/react";
import {
  consentCookieApproved,
  setCookieConsent,
  setLocalStorageConsent,
} from "../../../components/CookieBanner/cookies.helper";
import CookieConsentContext from "../../../context/CookieConsentContext";

const InlineCookiesManager: React.FC = () => {
  const [cookiesApproved, setCookiesApproved] = useState(
    consentCookieApproved()
  );
  const [localStorageApproved, setLocalStorageApproved] = useState(() => {
    if (typeof window !== "undefined") {
      const storedConsent = localStorage.getItem("localStorageConsent");
      return storedConsent === "true";
    }
    return false;
  });
  const { handleCookieConsent, handleLocalStorageConsent } =
    useContext(CookieConsentContext);

  const handleCookiesChange = () => {
    setCookiesApproved(!cookiesApproved);
    setCookieConsent(!cookiesApproved);
    handleCookieConsent(!cookiesApproved);
  };

  const handleLocalStorageChange = () => {
    setLocalStorageApproved(!localStorageApproved);
    setLocalStorageConsent(!localStorageApproved);
    handleLocalStorageConsent(!localStorageApproved);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "localStorageConsent",
        localStorageApproved.toString()
      );
    }
  }, [localStorageApproved]);

  return (
    <>
      <div>
        <IcSwitch
          checked={cookiesApproved}
          label="Optional analytics cookies"
          onIcChange={() => handleCookiesChange()}
          disabled={
            !process.env.GATSBY_MTM_SITE_ID || !process.env.GATSBY_MTM_DOMAIN
          }
        />
      </div>
      <br />
      <br />
      <div>
        <IcSwitch
          checked={localStorageApproved}
          label="Optional local storage"
          onIcChange={() => handleLocalStorageChange()}
        />
      </div>
    </>
  );
};

export default InlineCookiesManager;
