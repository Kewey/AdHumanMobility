export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "ADHumanMobility",
  description:
    "Beautifully designed components built with Radix UI and Tailwind CSS.",
  mainNav: [
    {
      title: "Accueil",
      href: "/",
    },
    {
      title: "Qui sommes nous ?",
      href: "/a-propos",
    },
    {
      title: "Nos objectifs",
      href: "/objectifs",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
  links: {},
  map: {
    zoom: 15,
  },
}
