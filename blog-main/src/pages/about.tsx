import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import About from '../containers/about';

type AboutPageProps = {};

const AboutPage: React.FunctionComponent<AboutPageProps> = () => {
  return (
    <Layout>
      <SEO
        title="About me"
        description="I'm Nguyễn Bá Tùng Lâm
        Currently I'm a senior at Hanoi University of Science and Technology.
        Seeking for any opportunities to devoted my time and enegy for better society."
      />

      <About />
    </Layout>
  );
};

export default AboutPage;
