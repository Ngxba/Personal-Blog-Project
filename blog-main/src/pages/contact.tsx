import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Contact from '../containers/contact';

type ContactPageProps = {};

const ContactPage: React.FunctionComponent<ContactPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="Contact me"
        description="If you have any problem or would like to contact me please fill out the form below. Nguyễn Bá Tùng Lâm Blog, Ngxba Blog"
      />

      <Contact />
    </Layout>
  );
};

export default ContactPage;
