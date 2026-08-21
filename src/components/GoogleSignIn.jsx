import { useEffect, useRef } from "react";
import axios from "axios";

function GoogleLogin() {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          resolve();
          return;
        }

        const script = document.createElement("script");

        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () =>
          reject(new Error("Google script failed to load"));

        document.head.appendChild(script);
      });
    };

    const initializeGoogle = async () => {
      try {
        await loadGoogleScript();

        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,

          callback: async (response) => {
            console.log("Google credential received");

            try {
              const result = await axios.post(
                "http://localhost:7800/api/auth/google/signin",
                {
                  credential: response.credential,
                },
                {
                  withCredentials: true,
                },
              );

              console.log(result.data);
            } catch (error) {
              console.log(error.response?.data || error.message);
            }
          },
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          text: "signin_with",
        });
      } catch (error) {
        console.error(error);
      }
    };

    initializeGoogle();
  }, []);

  return <div ref={googleButtonRef}></div>;
}

export default GoogleLogin;
