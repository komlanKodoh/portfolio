require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `Daniel Kodoh Portfolio`,
    description: `Portfolio and showcase of Daniel Accomplishment as a full stack developer`,
    author: `Daniel Kodoh`,
    siteUrl: `https://komlankodoh.com/`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        theme_color: "hsl(0, 0%, 5%)",
        background_color: "#fff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        name: "Komlan Kodoh",
        short_name: "Kodoh",
        description: "Portfolio of full stack developer Daniel Kodoh",
        icon: "static/page_icon.png",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-6PKK4EW180"
        ],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
        },
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFULL_SPACEID,
        accessToken: process.env.CONTENTFULL_ACCESS_TOKEN,
      },
    },

    
  ],
};
