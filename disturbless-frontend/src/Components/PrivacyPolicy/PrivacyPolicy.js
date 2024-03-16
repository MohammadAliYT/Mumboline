// The privacy policy page that Facebook required

import React from "react";

import PropTypes from "prop-types";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <>
      <div className="flex flex-col view max-w-mac mx-auto mb-8">
        <nav className="lg:flex mx-auto mt-6">
          <Link
            to="/"
            className="text-blue text-2xl font-sans font-medium pr-14"
          >
            Home
          </Link>
          <Link
            to="/vote-for-features"
            className="text-gray text-2xl font-sans font-Medium"
          >
            Vote for features
          </Link>
        </nav>
        <Title text="Our privacy policy" />
        <Paragraph
          text='MumboLine enables its users (“they”, “their”, “you” or “your”), via
    its website (https://www.mumboline.com) (the “Website”), its API, its
    services or other means, to rent virtual phone numbers and receive text
    & voice messages which are then forwarded to the email (collectively,
    the "MumboLine" service). MumboLine service is owned and
    operated by Brinko Ventures LTD, a UK limited company (“its”,
    MumboLine, “we” or “us”) with address of Unit 22624, PO Box 6945,
    London, W1A 6US.'
        />
        <Subtitle text="1. Terms of Use" />
        <Paragraph
          text="By accessing the website at https://mumboline.com, you are agreeing to
        be bound by these terms of service, all applicable laws and regulations,
        and agree that you are responsible for compliance with any applicable
        local laws. If you do not agree with any of these terms, you are
        prohibited from using or accessing this site. The materials contained in
        this website are protected by applicable copyright and trademark law."
        />
        <Subtitle text="2. Use License" />
        <Paragraph
          text="Permission is granted to temporarily download one copy of the 
      materials (information or software) on MumboLine's website for personal, 
      non-commercial transitory viewing only. This is the grant of a license, not a 
      transfer of title, and under this license you may not: modify or copy the materials; 
      use the materials for any commercial purpose, or for any public display (commercial or 
      non-commercial); attempt to decompile or reverse engineer any software contained on 
      MumboLine's website; remove any copyright or other proprietary notations from the 
      materials; or transfer the materials to another person or &quot;mirror&quot; the 
      materials on any other server. This license shall automatically terminate if you 
      violate any of these restrictions and may be terminated by MumboLine at any time. 
      Upon terminating your viewing of these materials or upon the termination of this license, 
      you must destroy any downloaded materials in your possession whether in electronic or 
      printed format."
        />
        <Subtitle text="3. Disclaimer" />
        <Paragraph
          text="The materials on MumboLine's website are provided on an 'as is' basis. 
      MumboLine makes no warranties, expressed or implied, and hereby disclaims and negates 
      all other warranties including, without limitation, implied warranties or conditions of 
      merchantability, fitness for a particular purpose, or non-infringement of intellectual 
      property or other violation of rights. Further, MumboLine does not warrant or make any 
      representations concerning the accuracy, likely results, or reliability of the use of the 
      materials on its website or otherwise relating to such materials or on any sites linked to 
      this site."
        />
        <Subtitle text="4. Limitations" />
        <Paragraph
          text="In no event shall MumboLine or its suppliers be liable for any damages 
      (including, without limitation, damages for loss of data or profit, or due to business 
      interruption) arising out of the use or inability to use the materials on MumboLine's 
      website, even if MumboLine or a MumboLine authorized representative has been notified 
      orally or in writing of the possibility of such damage. Because some jurisdictions do not
       allow limitations on implied warranties, or limitations of liability for consequential or 
       incidental damages, these limitations may not apply to you."
        />
        <Subtitle text="5. Accuracy of materials" />
        <Paragraph
          text="The materials appearing on MumboLine's website could include technical, 
       typographical, or photographic errors. MumboLine does not warrant that any of the materials
        on its website are accurate, complete or current. MumboLine may make changes to the materials
         contained on its website at any time without notice. However MumboLine does not make any 
         commitment to update the materials."
        />
        <Subtitle text="6. Links" />
        <Paragraph
          text="MumboLine has not reviewed all of the sites linked to its website and is not 
      responsible for the contents of any such linked site. The inclusion of any link does not imply 
      endorsement by MumboLine of the site. Use of any such linked website is at the user's own risk."
        />
        <Subtitle text="7. Modifications" />
        <Paragraph
          text="MumboLine may revise these terms of service for its website at any time without notice. 
      By using this website you are agreeing to be bound by the then current version of these terms of service."
        />
        <Subtitle text="8. Governing Law" />
        <Paragraph
          text="These terms and conditions are governed by and construed in accordance with the laws of United 
      Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
        />
        <Subtitle text="9. Privacy" />
        <Paragraph
          text="Your privacy is important to us. It is MumboLine's policy to respect your privacy regarding any 
        information we may collect from you across our website, https://Mumboline.com, and other sites we own 
        and operate. We only ask for personal information when we truly need it to provide a service to you. 
        We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re 
        collecting it and how it will be used. We only retain collected information for as long as necessary to 
        provide you with your requested service. What data we store, we’ll protect within commercially acceptable
         means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification. 
         We don’t share any personally identifying information publicly or with third-parties, except when required to by law. 
         Our website may link to external sites that are not operated by us. Please be aware that we have no control over 
         the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies. 
         You are free to refuse our request for your personal information, with the understanding that we may be unable 
         to provide you with some of your desired services. Your continued use of our website will be regarded as 
         acceptance of our practices around privacy and personal information. If you have any questions about 
         how we handle user data and personal information, feel free to contact us. This policy is effective 
         as of 1 January 2021."
        />
        <Subtitle text="10. Cancellations & Refunds Policy" />
        <Paragraph
          text="Monthly subscriptions are not refundable, you can cancel anytime to avoid charge for the next month. 
      For yearly subscribtions you can cancel anytime and receive a pro-rated refund for unused months (for example, cancelling 
        a $49.99/y service on a 45th day is eligible for a $41.67 refund; cancelling $49.99/y service on a 3rd day is eligible 
        for a $45.82, etc) All cancelations are processed after a customer contacts our live customer support via chat 
        and confirms the cancellation."
        />
      </div>
      <Footer />
    </>
  );
}
function Subtitle({ text }) {
  Subtitle.propTypes = {
    text: PropTypes.string,
  };

  return <h6 className="text-gray text-lg font-sans leading-8 mt-4">{text}</h6>;
}

function Paragraph({ text }) {
  Paragraph.propTypes = {
    text: PropTypes.string,
  };

  return <p className="text-gray text-base font-sans mt-2">{text}</p>;
}

function Title({ text }) {
  Title.propTypes = {
    text: PropTypes.string,
  };

  return <h6 className="text-gray text-xl font-sans leading-8 mt-4">{text}</h6>;
}
