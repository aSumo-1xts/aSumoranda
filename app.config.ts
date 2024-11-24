export default defineAppConfig({

  docus: {
    title: 'aSumoranda',
    description: 'ｱｽﾓのﾒﾓﾗﾝﾀﾞ、ｱｽﾓﾗﾝﾀﾞ',
    url: 'https://asumoranda.vercel.app/',
    layout: 'default',

    header: {
      logo: false,
      title: 'aSumoranda',
      showLinkIcon: true,
      fluid: true,
    },

    main: {
      fluid: true,
      padded: true,
    },

    aside: {
      level: 1,
      collapsed: false,
    },

    footer: {
      credits: {
        icon: 'heroicons:home',
        text: '1x telescope',
        href: 'https://sites.google.com/view/1xtelescope',
      },
      textLinks: [
        {
          text: 'CC BY-SA 4.0',
          href: 'https://creativecommons.org/licenses/by-sa/4.0/',
          icon: 'simple-icons:creativecommons',
          rel: 'license',
        }
      ],
      iconLinks: [
        {
          label: 'discord',
          href: 'https://discord.app/users/userID',
          icon: 'simple-icons:discord',
          rel: 'noreferer noopener',
        }, {
          label: 'twitter',
          href: 'https://x.com/asumo_1xts',
          icon: 'simple-icons:twitter',
          rel: 'noreferer noopener',
        }, {
          label: 'youtube',
          href: 'https://www.youtube.com/@1xtelescope',
          icon: 'simple-icons:youtube',
          rel: 'noreferer noopener',
        }, {
          label: 'zenn',
          href: 'https://zenn.dev/asumo_1xts',
          icon: 'simple-icons:zenn',
          rel: 'noreferer noopener',
        }, {
          label: 'github',
          href: 'https://github.com/aSumo-1xts',
          icon: 'simple-icons:github',
          rel: 'noreferer noopener',
        }
      ],
      fluid: true,
    }

  }
  
})
