// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Stony Brook Church';
export const SITE_DESCRIPTION = 'Welcome home.';
export const BASE_URL = '';
export const ADDRESS = '14345 Y St, Omaha, NE 68137';
export const NAVIGATION = [
    {
        title: 'About Us',
        url: '/about',
        dropdown: [
            {
                title: 'What we believe',
                url: '/about#what-we-believe'
            },
            {
                title: 'Our story',
                url: '/about#our-story'
            },
            {
                title: 'Meet the pastor',
                url: '/about#meet-the-pastor'
            },
            {
                title: 'Staff',
                url: '/about#staff'
            },
            {
                title: 'Leadership',
                url: '/about#leaders'
            },
            {
                title: 'USMB',
                url: '/about#usmb'
            }
        ]
    },
    {
        title: 'Ministries',
        url: '/ministries',
        dropdown: [
            {
                title: 'Kid Life',
                url: '/ministries#kids'
            },
            {
                title: 'Youth',
                url: '/ministries#youth'
            },
            {
                title: 'Women',
                url: '/ministries#women'
            },
            {
                title: 'Men',
                url: '/ministries#men'
            },
            {
                title: 'Life',
                url: '/ministries#life'
            },
            {
                title: 'Preaching',
                url: '/ministries#preaching'
            },
            {
                title: 'Worship',
                url: '/ministries#worship'
            },
            {
                title: 'Global & Local Missions',
                url: '/ministries#missions'
            }
        ]
    },
    {
        title: 'Messages',
        url: '/messages/recent'
    },
    {
        title: 'Calendar',
        url: '/calendar'
    }
];
export const SOCIALS = [
    {
        title: 'Facebook',
        icon: 'fa-facebook-f',
        class: 'facebook',
        url: 'http://www.facebook.com/StonyBrookChurch'
    },
    {
        title: 'Twitter',
        icon: 'fa-twitter',
        class: 'twitter',
        url: 'https://twitter.com/StonyBrookFam'
    },
    {
        title: 'Instagram',
        icon: 'fa-instagram',
        class: 'instagram',
        url: 'https://www.instagram.com/StonyBrookFam'
    },
    {
        title: 'Vimeo',
        icon: 'fa-vimeo-v',
        class: 'vimeo',
        url: 'http://vimeo.com/StonyBrook'
    },
    {
        title: 'YouTube',
        icon: 'fa-youtube',
        class: 'youtube',
        url: 'https://www.youtube.com/channel/UC7toQ0WRsc4n220h0QYeRHw'
    }
];
export const VIMEO_SHOWCASE_ID = '10085736';
export const VIMEO_SHOWCASE_NAME = 'Messages 2023';
export const YOUTUBE_CHANNEL_ID = 'UC7toQ0WRsc4n220h0QYeRHw';
export const APP_STORE_URL = 'https://apps.apple.com/us/app/church-center-app/id1357742931';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ministrycentered.churchcenter&hl=en_US';