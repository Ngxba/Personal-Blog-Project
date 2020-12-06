import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import SocialProfile from '../../../components/social-profile/social-profile';
import { IntroWrapper, IntroImage, IntroTitle, Desciption } from './style';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
  IoLogoLinkedin
} from 'react-icons/io';

type IntroProps = {};

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: "https://www.facebook.com/ngxba/",
    tooltip: "Facebook",
  },
  {
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com/capturebyngx/",
    tooltip: "Instagram",
  },
  {
    icon: <IoLogoTwitter />,
    url: "https://twitter.com/ngxba",
    tooltip: "Twitter",
  },
  {
    icon: <IoLogoLinkedin />,
    url: "https://www.linkedin.com/tunglamngxba",
    tooltip: "Linked In",
  },
  {
    icon: <IoLogoGithub />,
    url: "https://www.github.com/ngxba",
    tooltip: "Github",
  },
];

const Intro: React.FunctionComponent<IntroProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/ava.png/" }) {
        childImageSharp {
          fluid(maxWidth: 210, maxHeight: 210, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `);

  const { author, about } = Data.site.siteMetadata;
  const AuthorImage = Data.avatar.childImageSharp.fluid;

  return (
    <IntroWrapper>
      <IntroImage>
        <Image fluid={AuthorImage} alt="author" />
      </IntroImage>
      <IntroTitle>
        Hey! I’m <b>{author}</b>
      </IntroTitle>
      <Desciption>{about}</Desciption>
      <SocialProfile items={SocialLinks} />
    </IntroWrapper>
  );
};

export default Intro;
