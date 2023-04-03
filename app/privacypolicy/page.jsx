"use client";
import React from "react";
import s from "./privacy.module.scss";

function Login() {

  return (
    <div className={s.page}>
      <div className={s.gradient_background} />
      <div className={s.home}>
        <div className={s.navbar} onClick={() => router.push('/')}>
          <img src="/logo_background.svg" alt="logo" className={s.logo} />
          <h1>GPTCOVERLETTER</h1>
        </div>
        <h1>privacy policy</h1>
        <h2>This Privacy Policy governs the manner in which GPTCoverletter collects, uses, maintains and discloses information collected from users (each, a "User") of the GPTCoverletter mobile application ("App"). This privacy policy applies to the App and all products and services offered by GPTCoverletter.</h2>
        <h2>Information Collection and Use</h2>
        <h2>We collect information from Users when they use our App. This information may include:
        <br/>• Personal information such as name and email address
        <br/>• App usage information such as device type and usage statistics</h2>
        <h2>We use this information to:</h2>
        <h2>
        • Provide and improve our App and services
        • Send periodic emails with information about updates or new features
        • Respond to inquiries and support requests
        • Understand how our App is used and improve the user experience</h2>
        <h2>Information Sharing</h2>
        <h2>We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers.</h2>
        <h2>Data Storage and Security</h2>
        <h2>We store User data in secure databases located in the United States. We take reasonable precautions to protect User data against unauthorized access, alteration, disclosure or destruction.</h2>
        <h2>Third-Party Services</h2>
        <h2>We use third-party services to help us operate our App and provide services to Users. These services may have access to User data as necessary to perform their functions. We make reasonable efforts to ensure that these services are GDPR and CCPA compliant.</h2>
        <h2>Changes to This Privacy Policy</h2>
        <h2>We may update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</h2>
        <h2>Your Acceptance of These Terms</h2>
        <h2>By using this App, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our App. Your continued use of the App following the posting of changes to this policy will be deemed your acceptance of those changes.</h2>
        <h2>Contacting Us</h2>
        <h2>If you have any questions about this Privacy Policy, the practices of this App, or your dealings with this App, please contact us at gptcoverletter@gmail.com.</h2>
      </div>
    </div>
  );

  // return (
  //     <div className={s.home}>
  //         <h1 style={{color: "black"}}>Log in</h1>
  //         {user && <h1 style={{color: "black"}}>{user.displayName}</h1> }
  //         {user && <h1 style={{color: "black"}}>{user.uid}</h1> }
  //         <button className={s.black} onClick={() => {googleLogin()}}>google login</button>
  //         <button className={s.black} onClick={() => {handleSignOut()}}>sign out</button>
  //     </div>
  // )
}

export default Login;
