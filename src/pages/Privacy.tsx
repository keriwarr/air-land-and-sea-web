import React from "react";
import styled from "styled-components";
import {
  PUBLIC_WEBSITE_URL,
  CONTACT_EMAIL,
  PUBLIC_WEBSITE_NAME
} from "../constants";

const Container = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  margin: 0 auto 100px auto;
  max-width: 600px;

  h2 {
    margin-top: 20px;
  }
`;

const Privacy: React.FC = () => (
  <Container>
    <h1>Welcome to our Privacy Policy</h1>
    <h3>Your privacy is critically important to us.</h3>
    <br />
    <p>
      It is {PUBLIC_WEBSITE_NAME}'s policy to respect your privacy regarding any
      information we may collect while operating our website. This Privacy
      Policy applies to <a href={PUBLIC_WEBSITE_URL}>{PUBLIC_WEBSITE_URL}</a>{" "}
      (hereinafter, "us", "we", or "{PUBLIC_WEBSITE_URL}"). We respect your
      privacy and are committed to protecting personally identifiable
      information you may provide us through the Website. We have adopted this
      privacy policy ("Privacy Policy") to explain what information may be
      collected on our Website, how we use this information, and under what
      circumstances we may disclose the information to third parties. This
      Privacy Policy applies only to information we collect through the Website
      and does not apply to our collection of information from other sources.
    </p>
    <p>
      This Privacy Policy, together with the Terms and conditions posted on our
      Website, set forth the general rules and policies governing your use of
      our Website. Depending on your activities when visiting our Website, you
      may be required to agree to additional terms and conditions.
    </p>
    <h2>Website Visitors</h2>
    <p>
      Like most website operators, {PUBLIC_WEBSITE_NAME} collects
      non-personally-identifying information of the sort that web browsers and
      servers typically make available, such as the browser type, language
      preference, referring site, and the date and time of each visitor request.
      {PUBLIC_WEBSITE_NAME}'s purpose in collecting non-personally identifying
      information is to better understand how {PUBLIC_WEBSITE_NAME}'s visitors
      use its website. From time to time, {PUBLIC_WEBSITE_NAME} may release
      non-personally-identifying information in the aggregate, e.g., by
      publishing a report on trends in the usage of its website.
    </p>
    <p>
      {PUBLIC_WEBSITE_NAME} also collects potentially personally-identifying
      information like Internet Protocol (IP) addresses for logged in users.
    </p>
    <h2>Gathering of Personally-Identifying Information</h2>
    <p>
      Certain visitors to {PUBLIC_WEBSITE_NAME}'s websites choose to interact
      with {PUBLIC_WEBSITE_NAME} in ways that require {PUBLIC_WEBSITE_NAME} to
      gather personally-identifying information. The amount and type of
      information that {PUBLIC_WEBSITE_NAME} gathers depends on the nature of
      the interaction. For example, we ask visitors who sign up for an account at{" "}
      {PUBLIC_WEBSITE_URL} to provide a username and email address.
    </p>
    <h2>Security</h2>
    <p>
      The security of your Personal Information is important to us, but remember
      that no method of transmission over the Internet, or method of electronic
      storage is 100% secure. While we strive to use commercially acceptable
      means to protect your Personal Information, we cannot guarantee its
      absolute security.
    </p>
    <h2>Links To External Sites</h2>
    <p>
      Our Service may contain links to external sites that are not operated by
      us. If you click on a third party link, you will be directed to that third
      party's site. We strongly advise you to review the Privacy Policy and
      terms and conditions of every site you visit.
    </p>
    <p>
      We have no control over, and assume no responsibility for the content,
      privacy policies or practices of any third party sites, products or
      services.
    </p>
    <h2>Protection of Certain Personally-Identifying Information</h2>
    <p>
      {PUBLIC_WEBSITE_NAME} discloses potentially personally-identifying and
      personally-identifying information only to those of its employees,
      contractors and affiliated organizations that (i) need to know that
      information in order to process it on {PUBLIC_WEBSITE_NAME}'s behalf or to
      provide services available at {PUBLIC_WEBSITE_NAME}'s website, and (ii)
      that have agreed not to disclose it to others. Some of those employees,
      contractors and affiliated organizations may be located outside of your
      home country; by using {PUBLIC_WEBSITE_NAME}'s website, you consent to the
      transfer of such information to them. {PUBLIC_WEBSITE_NAME} will not rent
      or sell potentially personally-identifying and personally-identifying
      information to anyone. Other than to its employees, contractors and
      affiliated organizations, as described above, {PUBLIC_WEBSITE_NAME}{" "}
      discloses potentially personally-identifying and personally-identifying
      information only in response to a subpoena, court order or other
      governmental request, or when {PUBLIC_WEBSITE_NAME}
      believes in good faith that disclosure is reasonably necessary to protect
      the property or rights of {PUBLIC_WEBSITE_NAME}, third parties or the
      public at large.
    </p>
    <p>
      If you are a registered user of {PUBLIC_WEBSITE_URL} and have supplied
      your email address, {PUBLIC_WEBSITE_NAME} may occasionally send you an
      email to tell you about new features, solicit your feedback, or just keep
      you up to date with what's going on with {PUBLIC_WEBSITE_NAME} and our
      products. We primarily use our blog to communicate this type of
      information, so we expect to keep this type of email to a minimum. If you
      send us a request (for example via a support email or via one of our
      feedback mechanisms), we reserve the right to publish it in order to help
      us clarify or respond to your request or to help us support other users.
      {PUBLIC_WEBSITE_NAME} takes all measures reasonably necessary to protect
      against the unauthorized access, use, alteration or destruction of
      potentially personally-identifying and personally-identifying information.
    </p>
    <h2>Aggregated Statistics</h2>
    <p>
      {PUBLIC_WEBSITE_NAME} may collect statistics about the behavior of
      visitors to its website. {PUBLIC_WEBSITE_NAME} may display this
      information publicly or provide it to others. However,{" "}
      {PUBLIC_WEBSITE_NAME} does not disclose your personally-identifying
      information.
    </p>
    <h2>Cookies</h2>
    <p>
      To enrich and perfect your online experience, {PUBLIC_WEBSITE_NAME}
      uses "Cookies", similar technologies and services provided by others to
      display personalized content, appropriate advertising and store your
      preferences on your computer.
    </p>
    <p>
      A cookie is a string of information that a website stores on a visitor's
      computer, and that the visitor's browser provides to the website each time
      the visitor returns. {PUBLIC_WEBSITE_NAME} uses cookies to help{" "}
      {PUBLIC_WEBSITE_NAME} identify and track visitors, their usage of
      {PUBLIC_WEBSITE_URL}, and their website access preferences.{" "}
      {PUBLIC_WEBSITE_NAME} visitors who do not wish to have cookies placed on
      their computers should set their browsers to refuse cookies before using{" "}
      {PUBLIC_WEBSITE_NAME}'s websites, with the drawback that certain features
      of {PUBLIC_WEBSITE_NAME}'s websites may not function properly without the
      aid of cookies.
    </p>
    <p>
      By continuing to navigate our website without changing your cookie
      settings, you hereby acknowledge and agree to {PUBLIC_WEBSITE_NAME}'s use
      of cookies.
    </p>
    <h2>Privacy Policy Changes</h2>
    <p>
      Although most changes are likely to be minor, {PUBLIC_WEBSITE_NAME}
      may change its Privacy Policy from time to time, and in{" "}
      {PUBLIC_WEBSITE_NAME}'s sole discretion. {PUBLIC_WEBSITE_NAME} encourages
      visitors to frequently check this page for any changes to its Privacy
      Policy. Your continued use of this site after any change in this Privacy
      Policy will constitute your acceptance of such change.
    </p>
    <h2>Contact Information</h2>
    <p>
      If you have any questions about this Privacy Policy, please contact us via{" "}
      <a href={`mailto:${CONTACT_EMAIL}`}>email</a>.
    </p>
  </Container>
);

export default Privacy;
