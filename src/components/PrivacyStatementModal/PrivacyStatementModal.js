import React, { useState } from "react";

import "./PrivacyStatementModal.scss";

import GenericModal from "../GenericModal/GenericModal";

const PrivacyStatementModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModalClick = () => {
    setIsModalOpen(false);
  };
  const handleOpenModalClick = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <button onClick={(event) => handleOpenModalClick(event)} className="btn btn-link">
          Privacy Statement
        </button>
      </div>
      {isModalOpen ? (
        <GenericModal closeModal={handleCloseModalClick}>
          <div className="privacy-statement">
            <h2>Who we are</h2>

            <p>Our website address is: https://thinkquic.com.</p>

            <h2>What personal data we collect and why we collect it</h2>

            <h3>Comments</h3>

            <p>
              When visitors leave comments on the site we collect the data shown in the comments form, and also the
              visitor’s IP address and browser user agent string to help spam detection.
            </p>

            <p>
              An anonymized string created from your email address (also called a hash) may be provided to the Gravatar
              service to see if you are using it. The Gravatar service privacy policy is available here:
              https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the
              public in the context of your comment.
            </p>

            <h3>Media</h3>

            <p>
              If you upload images to the website, you should avoid uploading images with embedded location data (EXIF
              GPS) included. Visitors to the website can download and extract any location data from images on the
              website.
            </p>

            <h3>Contact forms</h3>

            <h3>Cookies</h3>

            <p>
              If you leave a comment on our site you may opt-in to saving your name, email address and website in
              cookies. These are for your convenience so that you do not have to fill in your details again when you
              leave another comment. These cookies will last for one year.
            </p>

            <p>
              If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies.
              This cookie contains no personal data and is discarded when you close your browser.
            </p>

            <p>
              When you log in, we will also set up several cookies to save your login information and your screen
              display choices. Login cookies last for two days, and screen options cookies last for a year. If you
              select “Remember Me”, your login will persist for two weeks. If you log out of your account, the login
              cookies will be removed.
            </p>

            <p>
              If you edit or publish an article, an additional cookie will be saved in your browser. This cookie
              includes no personal data and simply indicates the post ID of the article you just edited. It expires
              after 1 day.
            </p>

            <h3>Embedded content from other websites</h3>

            <p>
              Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content
              from other websites behaves in the exact same way as if the visitor has visited the other website.
            </p>

            <p>
              These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor
              your interaction with that embedded content, including tracking your interaction with the embedded content
              if you have an account and are logged in to that website.
            </p>

            <h3>Analytics</h3>

            <h2>Who we share your data with</h2>

            <p>Google Analytics</p>

            <h2>How long we retain your data</h2>

            <p>
              If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can
              recognize and approve any follow-up comments automatically instead of holding them in a moderation queue.
            </p>

            <p>
              For users that register on our website (if any), we also store the personal information they provide in
              their user profile. All users can see, edit, or delete their personal information at any time (except they
              cannot change their username). Website administrators can also see and edit that information.
            </p>

            <h2>What rights you have over your data</h2>

            <p>
              If you have an account on this site, or have left comments, you can request to receive an exported file of
              the personal data we hold about you, including any data you have provided to us. You can also request that
              we erase any personal data we hold about you. This does not include any data we are obliged to keep for
              administrative, legal, or security purposes.
            </p>

            <h2>Where we send your data</h2>

            <p>Visitor comments may be checked through an automated spam detection service.</p>

            <h2>Your contact information</h2>

            <p>
              The personal information that you are asked to provide, and the reasons why you are asked to provide it,
              will be made clear to you at the point we ask you to provide your personal information.
            </p>

            <p>
              If you contact us directly, we may receive additional information about you such as your name, email
              address, phone number, the contents of the message and/or attachments you may send us, and any other
              information you may choose to provide.
            </p>

            <p>
              When you register for an Account, we may ask for your contact information, including items such as name,
              company name, address, email address, and telephone number.
            </p>

            <h2>How we use your information</h2>

            <p>We use the information we collect in various ways, including to:</p>

            <p>Provide, operate, and maintain our website</p>

            <p>Improve, personalize, and expand our website</p>

            <p>Understand and analyze how you use our website</p>

            <p>Develop new products, services, features, and functionality</p>

            <p>
              Communicate with you, either directly or through one of our partners, including for customer service, to
              provide you with updates and other information relating to the website, and for marketing and promotional
              purposes
            </p>

            <p>Send you emails</p>

            <p>Find and prevent fraud</p>

            <h2>Cookies and Web Beacons</h2>

            <p>
              Like any other website, Thinkquic uses ‘cookies’. These cookies are used to store information including
              visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information
              is used to optimize the users’ experience by customizing our web page content based on visitors’ browser
              type and/or other information.
            </p>

            <p>
              For more general information on cookies, please read&nbsp;
              <a href="https://www.cookieconsent.com/what-are-cookies/">“What Are Cookies” from Cookie Consent</a>.
            </p>

            <h2>CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>

            <p>Under the CCPA, among other rights, California consumers have the right to:</p>

            <p>
              request that a business that collects a consumer’s personal data disclose the categories and specific
              pieces of personal data that a business has collected about consumers.
            </p>

            <p>request that a business delete any personal data about the consumer that a business has collected.</p>

            <p>request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.</p>

            <p>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these
              rights, please contact us.
            </p>

            <h2>GDPR Data Protection Rights</h2>

            <p>
              We would like to make sure you are fully aware of all of your data protection rights. Every user is
              entitled to the following:
            </p>

            <p>
              The right to access – You have the right to request copies of your personal data. We may charge you a
              small fee for this service.
            </p>

            <p>
              The right to rectification – You have the right to request that we correct any information you believe is
              inaccurate. You also have the right to request that we complete the information you believe is incomplete.
            </p>

            <p>
              The right to erasure – You have the right to request that we erase your personal data, under certain
              conditions.
            </p>

            <p>
              The right to restrict processing – You have the right to request that we restrict the processing of your
              personal data, under certain conditions.
            </p>

            <p>
              The right to object to processing – You have the right to object to our processing of your personal data,
              under certain conditions.
            </p>

            <p>
              The right to data portability – You have the right to request that we transfer the data that we have
              collected to another organization, or directly to you, under certain conditions.
            </p>

            <p>
              If you make a request, we have one month to respond to you. If you would like to exercise any of these
              rights, please contact us.
            </p>

            <h2>Children’s Information</h2>

            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage
              parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>

            <p>
              Thinkquic does not knowingly collect any Personal Identifiable Information from children under the age of
              13. If you think that your child provided this kind of information on our website, we strongly encourage
              you to contact us immediately and we will do our best efforts to promptly remove such information from our
              records.
            </p>

            <h2>Additional information</h2>

            <h3>How we protect your data</h3>

            <h3>What data breach procedures we have in place</h3>

            <h3>What third parties we receive data from</h3>

            <h3>What automated decision making and/or profiling we do with user data</h3>

            <h3>Industry regulatory disclosure requirements</h3>
          </div>
        </GenericModal>
      ) : null}
    </>
  );
};

export default PrivacyStatementModal;
