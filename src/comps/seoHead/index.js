import Head from "next/head";

export default function SEOHead(props) {

    return (
        <Head>
            
            <title>Alias | {props.title || ""}</title>
            <meta name="description" content="The fun-to-play family game, now modernized!"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.png" />

            {/* //   <!-- Facebook Meta Tags --> */}
            <meta property="og:url" content="https://aliasgame.xyz" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Alias" />
            <meta property="og:description" content="The fun-to-play family game, now modernized!" />
            <meta property="og:image" content="https://aliasgame.xyz/favicon.png" />

            {/* <!-- Twitter Meta Tags --> */}
            <meta name="twitter:card" content="summary_small_image" />
            <meta property="twitter:domain" content="aliasgame.xyz" />
            <meta property="twitter:url" content="https://aliasgame.xyz" />
            <meta name="twitter:title" content="Alias" />
            <meta name="twitter:description" content="The fun-to-play family game, now modernized!" />
            <meta name="twitter:image" content="https://aliasgame.xyz/favicon.png" />

            {/* <!-- Google / Search Engine Tags --> */}
            <meta itemprop="name" content="Alias" />
            <meta itemprop="description" content="The fun-to-play family game, now modernized!" />
            <meta itemprop="image" content="https://aliasgame.xyz/favicon.png" />
            
        </Head>
    )

}