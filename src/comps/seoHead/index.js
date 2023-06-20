import Head from "next/head";

export default function SEOHead(props) {

    return (
        <Head>
            
            <title>Alias | {props.title}</title>
            <meta name="description" content="The fun-to-play family game, now modernized!"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />

            {/* //   <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://aliasgame.xyz" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Seeds" />
            <meta property="og:description" content="The easiest bot to use on Discord" />
            <meta property="og:image" content="https://aliasgame.xyz/favicon.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_small_image" />
            <meta property="twitter:domain" content="aliasgame.xyz" />
            <meta property="twitter:url" content="https://aliasgame.xyz" />
            <meta name="twitter:title" content="Seeds" />
            <meta name="twitter:description" content="The easiest bot to use on Discord" />
            <meta name="twitter:image" content="https://aliasgame.xyz/favicon.png" />

            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content="Seeds" />
            <meta itemprop="description" content="The easiest bot to use on Discord" />
            <meta itemprop="image" content="https://aliasgame.xyz/favicon.png" />
            
        </Head>
    )

}