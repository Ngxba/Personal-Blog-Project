import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import SocialProfile from "../../components/social-profile/social-profile";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io";
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
} from "./style";

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
];

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = () => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about2.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
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

  return (
    <AboutWrapper>
      <AboutPageTitle>
        <h2>About me - <strong>Nguyễn Bá Tùng Lâm</strong></h2>
        <p>
          Currently I'm a senior at Hanoi University of Science and Technology.{" "}
          Seeking for any opportunities to devoted my time and enegy for better society.
        </p>
        <p>
          I have two yeas experience in Web full-stack development and more than
          one year experience in Data Science, Big Data and Machine Learning
          Field. I’m looking for a job that involved in data, machine learning
          and so on.
        </p>
      </AboutPageTitle>

      <AboutImage>
        <Image fluid={Data.avatar.childImageSharp.fluid} alt="author" />
      </AboutImage>

      <AboutDetails>
        <h2>Hey there, what’s up?</h2>
        <p>Ever since I was a little kid, software development and become data
        science has been my passion. As I went through the basic tutorial to
        work with computer, it was almost magic, being able to get the computer
        to do whatever I wanted, just by typing in these funny little symbols,
        limited only by my own imagination and ingenuity. Throughout high
        school, I could manage moving from "Hello World" all the way to a simple
        Web Application, a 2D Game, Viettel Data Science competition, Facebook
        DevC Innovation challenge and with dozens of projects in between. I
        learned Python, Java, Javascript and SQL and uncountable frameworks,
        libraries.</p>
        <p>
        This passion carried me through my education at Hanoi University of
        Science and Technology. Here there were more resources available to me
        than I ever could have imagined as a kid. I studied new languages,
        algorithms, compilers, higher mathematics, all with pretty much the same
        fascination that drove me as a kid. And it was here that I learned truly
        how much there was yet to learn.</p>
        <p>
        So, now, in want this passion remains with me. There's certainly yet
        more to learn, yet more problems to solve, and yet more to build. And
        for this, I am very grateful.</p>
        <p>
        Specialties: Languages: Python, Java, Javascript, SQL, Spark, ReactJS.
        <br />
        Academic: System Programming, Algorithms, Web Development, Data Engineering.</p>
        <SocialProfiles>
          <SocialProfile items={SocialLinks} />
        </SocialProfiles>
      </AboutDetails>
    </AboutWrapper>
  );
};

export default About;
