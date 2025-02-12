const themes = require('prism-react-renderer').themes;
const versionsPlugin = require('./config/versions-plugin');
const VERSIONS = require('./versions.json');
const { markdownBoldPlugin } = require('./config/markdown-bold-plugin');
const lightCodeTheme = themes.dracula;

const logoImg = '/images/logo.svg';

function getDocsVersions() {
    const result = {};
    VERSIONS.map(version => {
        if (version === 'current') {
            result[version] = {
                label: 'Dev',
                path: 'dev',
                banner: 'unreleased',
                // badge: false,
            };
        } else {
            result[version] = {
                banner: 'none',
                badge: false,
            };
        }
    });
    return result;
}

function getLatestVersion() {
    return VERSIONS.includes('2.1') ? '2.1' : VERSIONS[0];
}

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Apache Doris',
    titleDelimiter: '-',
    tagline: 'Apache Doris',
    url: 'https://doris.apache.org',
    baseUrl: '/',
    onBrokenLinks: 'ignore',
    onBrokenMarkdownLinks: 'ignore',
    favicon: 'images/favicon.ico',
    organizationName: 'Apache',
    markdown: {
        format: 'detect',
    },
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'zh-CN'],
        localeConfigs: {
            en: {
                label: 'English',
                htmlLang: 'en-US',
            },
            'zh-CN': {
                label: '中文',
                htmlLang: 'zh-Hans-CN',
            },
        },
    },
    scripts: ['/js/custom-script.js'],
    stylesheets: [
        // 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap',
        // 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans_Latin:100,200,300,400,450,500,600,650,700,900:Latin&display=swap',
        // 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap',
        // 'https://fonts.googleapis.com',
        // 'https://fonts.gstatic.com',
        // 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap'
    ],
    projectName: 'apache/doris-website', // Usually your repo name.
    customFields: {},
    future: {
        experimental_faster: true,
    },
    plugins: [
        'docusaurus-plugin-sass',
        'docusaurus-plugin-matomo',
        // Use custom blog plugin
        versionsPlugin,
        [
            'content-docs',
            /** @type {import('@docusaurus/plugin-content-docs').Options} */
            ({
                id: 'community',
                path: 'community',
                routeBasePath: '/community',
                sidebarPath: require.resolve('./sidebarsCommunity.json'),
            }),
        ],
        async function tailwindcssPlugin(context, options) {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    // Appends TailwindCSS and AutoPrefixer
                    postcssOptions.plugins.push(require('tailwindcss'));
                    postcssOptions.plugins.push(require('autoprefixer'));
                    return postcssOptions;
                },
            };
        },
        [
            '@docusaurus/plugin-client-redirects',
            {
                fromExtensions: ['html', 'htm'],
                redirects: [
                    // /docs/oldDoc -> /docs/newDoc
                    {
                        from: '/docs/dev/summary/basic-summary',
                        to: '/docs/gettingStarted/quick-start',
                    },
                    {
                        from: '/docs/dev/get-starting/',
                        to: '/docs/gettingStarted/quick-start',
                    },
                ],
                createRedirects(existingPath) {
                    if (existingPath.includes('/gettingStarted/what-is-apache-doris')) {
                        // Redirect from /gettingStarted/what-is-new to /gettingStarted/what-is-apache-doris
                        return [
                            existingPath.replace('/gettingStarted/what-is-apache-doris', '/gettingStarted/what-is-new'),
                        ];
                    }
                    return undefined; // Return a falsy value: no redirect created
                },
            },
        ],
    ],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    lastVersion: getLatestVersion(),
                    versions: getDocsVersions(),
                    sidebarPath: require.resolve('./sidebars.json'),
                    // editUrl: ({ locale, versionDocsDirPath, docPath }) => {
                    //     return `https://github.com/apache/doris-website/edit/master/docs/${locale}/docs/${docPath}`;
                    //     // if (versionDocsDirPath === 'versioned_docs/version-dev') {
                    //     //     return `https://github.com/apache/doris-website/edit/master/docs/${locale}/docs/${docPath}`;
                    //     // }
                    // },
                    showLastUpdateAuthor: false,
                    showLastUpdateTime: false,
                    remarkPlugins: [markdownBoldPlugin],
                },
                blog: {
                    blogTitle: 'Apache Doris - Blog | Latest news and events ',
                    blogDescription:
                        'Explore how Doris empower lakehouse, adhoc analysis, customer-facing analysis and various scenarios',
                    postsPerPage: 'ALL',
                    blogSidebarCount: 0,
                    showReadingTime: false,
                    onUntruncatedBlogPosts: 'ignore',
                    onInlineAuthors: 'ignore',
                },
                theme: {
                    customCss: require.resolve('./src/scss/custom.scss'),
                },
                sitemap: {
                    changefreq: 'weekly',
                    priority: 0.5,
                    filename: 'sitemap.xml',
                    createSitemapItems: async params => {
                        const { defaultCreateSitemapItems, ...rest } = params;
                        const items = await defaultCreateSitemapItems(rest);
                        for (let item of items) {
                            if (item.url.includes('docs/1.2')) {
                                item.priority = 0.2;
                            }
                        }
                        return items;
                    },
                },
            }),
        ],
    ],
    themes: [
        [
            '@easyops-cn/docusaurus-search-local',
            {
                hashed: true,
                language: ['en', 'zh'],
                highlightSearchTermsOnTargetPage: true,
                // indexPages: true,
                indexDocs: true,
                // docsRouteBasePath: '/docs',
                indexBlog: false,
                explicitSearchResultPath: true,
                searchBarShortcut: true,
                searchBarShortcutHint: true,
                searchResultLimits: 100,
            },
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            matomo: {
                matomoUrl: 'https://analytics.apache.org/',
                siteId: '43',
                phpLoader: 'matomo.php',
                jsLoader: 'matomo.js',
            },
            announcementBar: {
                id: 'support_us',
                content: `<a href="https://github.com/apache/doris" target="_blank" style="display: flex; width: 100%; align-items: center; justify-content: center; margin-left: 4px; text-decoration: none; color: white">Do you ❤️ Doris? Give us a 🌟 on GitHub 
                <img style="width: 1.2rem; height: 1.2rem; margin-left: 0.4rem;" src="/images/github-white-icon.svg">
                    </a>`,
                backgroundColor: '#3C2FD4',
                textColor: '#FFFFFF',
                // isCloseable: false,
            },
            navbar: {
                title: '',
                logo: {
                    alt: 'Apache Doris',
                    src: logoImg,
                },
                items: [
                    // { to: '/', label: 'Home', position: 'left', exact: true },
                    {
                        position: 'left',
                        label: 'Docs',
                        to: '/docs/gettingStarted/what-is-apache-doris',
                        target: '_blank',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    { to: '/users', label: 'Users', position: 'left' },
                    {
                        label: 'Discussions',
                        to: 'https://github.com/apache/doris/discussions',
                        position: 'left',
                    },
                    {
                        label: 'Ecosystem',
                        to: '/ecosystem/cluster-management',
                        position: 'left',
                    },
                    {
                        label: 'Community',
                        to: '/community/join-community',
                        position: 'left',
                    },
                    // {
                    //     type: 'search',
                    //     position: 'right',
                    //     className: 'docs-search',
                    // },
                    // {
                    //     type: 'localeDropdown',
                    //     position: 'right',
                    // },
                    // {
                    //     type: 'docsVersionDropdown',
                    //     position: 'right',
                    // },
                    // {
                    //     href: 'https://github.com/apache/doris',
                    //     className: 'header-right-button-github',
                    //     position: 'right',
                    //     label: 'GitHub',
                    // },
                    {
                        href: '/download',
                        className: 'header-right-button-primary navbar-download-mobile',
                        label: 'Download',
                        position: 'right',
                    },
                ],
            },
            docNavbarZH: {
                title: '',
                logo: {
                    alt: 'Apache Doris',
                    src: logoImg,
                },
                items: [
                    {
                        type: 'search',
                        position: 'left',
                        className: 'docs-search',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownItemsAfter: [
                            {
                                label: '归档文档',
                                to: `/zh-CN/archive-docs`,
                            },
                        ],
                    },
                ],
            },
            docNavbarEN: {
                title: '',
                logo: {
                    alt: 'Apache Doris',
                    src: logoImg,
                },
                items: [
                    {
                        type: 'search',
                        position: 'left',
                        className: 'docs-search',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                    {
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownItemsAfter: [
                            {
                                label: 'Archived',
                                to: `/archive-docs`,
                            },
                        ],
                    },
                ],
            },
            communityNavbar: {
                title: '',
                logo: {
                    alt: 'Apache Doris',
                    src: logoImg,
                },
                items: [
                    {
                        position: 'left',
                        label: 'Docs',
                        to: '/docs/gettingStarted/what-is-apache-doris',
                        target: '_blank',
                    },
                    { to: '/blog', label: 'Blog', position: 'left' },
                    { to: '/users', label: 'Users', position: 'left' },
                    {
                        label: 'Discussions',
                        to: 'https://github.com/apache/doris/discussions',
                        position: 'left',
                    },
                    {
                        label: 'Ecosystem',
                        to: '/ecosystem/cluster-management',
                        position: 'left',
                    },
                    {
                        label: 'Community',
                        to: '/community/join-community',
                        position: 'left',
                    },
                    {
                        href: '/download',
                        className: 'header-right-button-primary navbar-download-mobile',
                        label: 'Download',
                        position: 'right',
                    },
                    {
                        type: 'localeDropdown',
                        position: 'right',
                    },
                ],
            },
            footer: {
                links: [
                    {
                        title: 'ASF',
                        items: [
                            {
                                label: 'Foundation',
                                href: 'https://www.apache.org/',
                            },
                            {
                                label: 'License',
                                href: 'https://www.apache.org/licenses/',
                            },
                            {
                                label: 'Events',
                                href: 'https://www.apache.org/events/current-event',
                            },
                            {
                                label: 'Sponsorship',
                                href: 'https://www.apache.org/foundation/sponsorship.html',
                            },
                            {
                                label: 'Privacy',
                                href: 'https://privacy.apache.org/policies/privacy-policy-public.html',
                            },
                            {
                                label: 'Security',
                                href: 'https://www.apache.org/security/',
                            },
                            {
                                label: 'Thanks',
                                href: 'https://www.apache.org/foundation/thanks.html',
                            },
                        ],
                    },
                    {
                        title: 'Resources',
                        items: [
                            {
                                label: 'Download',
                                href: '/download',
                            },
                            // {
                            //     label: 'Docs',
                            //     href: '/docs/get-starting/quick-start',
                            // },
                            {
                                label: 'Blog',
                                href: '/blog',
                            },
                            {
                                label: 'Ecosystem',
                                href: '/ecosystem/cluster-management',
                            },
                            {
                                label: 'Users',
                                href: '/users',
                            },
                            {
                                label: 'Discussions',
                                href: 'https://github.com/apache/doris/discussions',
                            },
                        ],
                    },
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'How to contribute',
                                href: '/community/how-to-contribute/',
                            },
                            {
                                label: 'Source code',
                                href: 'https://github.com/apache/doris/',
                            },
                            {
                                label: 'Doris team',
                                href: '/community/team',
                            },
                            {
                                label: 'Roadmap',
                                href: 'https://github.com/apache/doris/issues/30669',
                            },
                            {
                                label: 'Improvement proposal',
                                href: 'https://cwiki.apache.org/confluence/display/DORIS/Doris+Improvement+Proposals',
                            },
                        ],
                    },
                ],
                logo: {
                    alt: '',
                    src: '/images/asf_logo_apache.svg',
                },
                copyright: `Copyright © ${new Date().getFullYear()} The Apache Software Foundation,Licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License, Version 2.0</a>. Apache, Doris, Apache Doris, the Apache feather logo and the Apache Doris logo are trademarks of The Apache Software Foundation.`,
            },
            docs: {
                sidebar: {
                    autoCollapseCategories: true,
                },
            },
            prism: {
                theme: lightCodeTheme,
                additionalLanguages: ['java'],
            },
            colorMode: {
                disableSwitch: true,
            },
            // metadata: [
            //     {
            //         name: 'viewport',
            //         content:
            //             'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no',
            //     },
            // ],s
        }),
};

module.exports = config;
